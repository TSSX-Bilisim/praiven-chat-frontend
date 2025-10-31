import { useState } from "react";
import { ProviderCard } from "@/components/providers/provider-card";
import { ProviderDialog } from "@/components/providers/provider-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { ProviderWithApiKey, CreateProviderRequest } from "@/lib/types/provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllProviders, updateProvider, createProvider, updateProviderApiKey, deleteProvider, type ProviderResponse } from "@/lib/api/ai";
import { Loader } from "@/components/ui/loader";

export default function ProvidersPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ProviderWithApiKey | null>(null);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();

  // Fetch all providers using React Query
  const { data: providersData, isLoading, error } = useQuery({
    queryKey: ['all-providers'],
    queryFn: async () => {
      const response = await fetchAllProviders();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch providers');
      }
      // Transform backend data to frontend format
      const backendProviders = response.data?.providers || [];
      return backendProviders.map((provider: ProviderResponse): ProviderWithApiKey => ({
        id: provider.id,
        name: provider.name,
        apiKey: provider.apiKey ? `${provider.apiKey.slice(0, 3)}...${provider.apiKey.slice(-4)}` : undefined,
        isActive: provider.isActive,
        createdAt: provider.createdAt || new Date(),
        updatedAt: provider.updatedAt || new Date(),
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Mutation for updating provider (toggle active status)
  const updateProviderMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      const response = await updateProvider(id, { isActive });
      if (!response.success) {
        throw new Error(response.error || 'Failed to update provider');
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-providers'] });
      queryClient.invalidateQueries({ queryKey: ['available-providers'] });
    },
  });

  // Mutation for creating provider
  const createProviderMutation = useMutation({
    mutationFn: async (data: CreateProviderRequest) => {
      const response = await createProvider(data);
      if (!response.success) {
        throw new Error(response.error || 'Failed to create provider');
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-providers'] });
      queryClient.invalidateQueries({ queryKey: ['available-providers'] });
      queryClient.invalidateQueries({ queryKey: ['all-models'] }); // Invalidate models cache too
      queryClient.invalidateQueries({ queryKey: ['available-models'] });
      setDialogOpen(false);
      setSelectedProvider(null);
    },
  });

  // Mutation for updating provider API key
  const updateProviderApiKeyMutation = useMutation({
    mutationFn: async ({ id, apiKey }: { id: number; apiKey: string }) => {
      const response = await updateProviderApiKey(id, apiKey);
      if (!response.success) {
        throw new Error(response.error || 'Failed to update provider');
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-providers'] });
      queryClient.invalidateQueries({ queryKey: ['available-providers'] });
      queryClient.invalidateQueries({ queryKey: ['all-models'] }); // Invalidate models cache too
      queryClient.invalidateQueries({ queryKey: ['available-models'] });
      setDialogOpen(false);
      setSelectedProvider(null);
    },
  });

  // Mutation for deleting provider
  const deleteProviderMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteProvider(id);
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete provider');
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-providers'] });
      queryClient.invalidateQueries({ queryKey: ['available-providers'] });
      queryClient.invalidateQueries({ queryKey: ['all-models'] }); // Invalidate models cache too
      queryClient.invalidateQueries({ queryKey: ['available-models'] });
    },
  });

  const handleEdit = (provider: ProviderWithApiKey) => {
    setSelectedProvider(provider);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleToggle = async (provider: ProviderWithApiKey) => {
    updateProviderMutation.mutate({ id: provider.id, isActive: !provider.isActive });
  };

  const handleSave = async (data: { id?: number; name?: string; apiKey: string }) => {
    if (data.id) {
      // Edit existing provider - update API key
      updateProviderApiKeyMutation.mutate({
        id: data.id,
        apiKey: data.apiKey,
      });
    } else {
      // Create new provider
      createProviderMutation.mutate({
        name: data.name as 'OPENAI' | 'GEMINI' | 'CLAUDE',
        apiKey: data.apiKey,
      });
    }
  };

  const handleDelete = async (provider: ProviderWithApiKey) => {
    if (window.confirm(`Are you sure you want to delete ${provider.name}? This will also delete all associated models.`)) {
      deleteProviderMutation.mutate(provider.id);
    }
  };

  const handleAddNew = () => {
    setSelectedProvider(null);
    setDialogMode('create');
    setDialogOpen(true);
  };

  const providers = providersData || [];

  if (isLoading) {
    return (
      <main className="flex w-full h-screen flex-col overflow-hidden">
        <header className="bg-background z-10 flex h-16 w-full shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            {isMobile && <SidebarTrigger />}
            <h1 className="text-xl font-semibold">AI Providers</h1>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex w-full h-screen flex-col overflow-hidden">
        <header className="bg-background z-10 flex h-16 w-full shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            {isMobile && <SidebarTrigger />}
            <h1 className="text-xl font-semibold">AI Providers</h1>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-2">Error loading providers</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex w-full h-screen flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-background z-10 flex h-16 w-full shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          {isMobile && <SidebarTrigger />}
          <h1 className="text-xl font-semibold">AI Providers</h1>
        </div>
        <Button onClick={handleAddNew} disabled={createProviderMutation.isPending}>
          <Plus className="h-4 w-4 mr-2" />
          Add Provider
        </Button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-muted-foreground mb-6">
            Manage your AI provider API keys and their active status. Enable or disable providers to control which models are available.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onEdit={handleEdit}
                onToggle={handleToggle}
                onDelete={handleDelete}
                isDeleting={deleteProviderMutation.isPending}
              />
            ))}
          </div>

          {providers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No providers configured yet.</p>
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Provider
              </Button>
            </div>
          )}
        </div>
      </div>

      <ProviderDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        provider={selectedProvider}
        onSave={handleSave}
        mode={dialogMode}
        isLoading={createProviderMutation.isPending || updateProviderApiKeyMutation.isPending}
      />
    </main>
  );
}

