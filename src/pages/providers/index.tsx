import { useState, useEffect } from "react";
import { ProviderCard } from "@/components/providers/provider-card";
import { ProviderDialog } from "@/components/providers/provider-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getMockProviders } from "@/lib/mock/provider-data";
import type { ProviderWithApiKey } from "@/lib/types/provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ProvidersPage() {
  const [providers, setProviders] = useState<ProviderWithApiKey[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ProviderWithApiKey | null>(null);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const isMobile = useIsMobile();

  useEffect(() => {
    // Simulate API call
    const loadProviders = async () => {
      // In real app: const response = await apiFetch<{ providers: ProviderWithApiKey[] }>('/ai/providers');
      const mockProviders = getMockProviders();
      setProviders(mockProviders);
    };

    loadProviders();
  }, []);

  const handleEdit = (provider: ProviderWithApiKey) => {
    setSelectedProvider(provider);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleToggle = async (provider: ProviderWithApiKey) => {
    // In real app: await apiFetch(`/ai/provider/${provider.id}`, { method: 'PATCH', body: JSON.stringify({ isActive: !provider.isActive }) });
    setProviders(providers.map(p => 
      p.id === provider.id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const handleSave = async (data: { id?: number; name?: string; apiKey: string }) => {
    if (data.id) {
      // Edit existing provider
      // In real app: await apiFetch(`/ai/provider/${data.id}`, { method: 'PATCH', body: JSON.stringify({ apiKey: data.apiKey }) });
      setProviders(providers.map(p => 
        p.id === data.id ? { ...p, apiKey: `${data.apiKey.slice(0, 3)}...${data.apiKey.slice(-4)}` } : p
      ));
    } else {
      // Create new provider
      // In real app: await apiFetch('/ai/provider', { method: 'POST', body: JSON.stringify({ name: data.name, apiKey: data.apiKey }) });
      const newProvider: ProviderWithApiKey = {
        id: providers.length + 1,
        name: data.name!,
        apiKey: `${data.apiKey.slice(0, 3)}...${data.apiKey.slice(-4)}`,
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProviders([...providers, newProvider]);
    }
    setSelectedProvider(null);
  };

  const handleAddNew = () => {
    setSelectedProvider(null);
    setDialogMode('create');
    setDialogOpen(true);
  };

  return (
    <main className="flex w-full h-screen flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-background z-10 flex h-16 w-full shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          {isMobile && <SidebarTrigger />}
          <h1 className="text-xl font-semibold">AI Providers</h1>
        </div>
        <Button onClick={handleAddNew}>
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
      />
    </main>
  );
}

