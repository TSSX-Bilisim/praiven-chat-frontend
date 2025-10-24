import { useState, useEffect } from "react";
import { ModelCard } from "@/components/models/model-card";
import { Badge } from "@/components/ui/badge";
import { getMockModels } from "@/lib/mock/provider-data";
import type { ModelWithProvider } from "@/lib/types/provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ModelsPage() {
  const [models, setModels] = useState<ModelWithProvider[]>([]);
  const [filterProvider, setFilterProvider] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const isMobile = useIsMobile();

  useEffect(() => {
    // Simulate API call
    const loadModels = async () => {
      // In real app: const response = await apiFetch<{ models: ModelWithProvider[] }>('/ai/models');
      const mockModels = getMockModels();
      setModels(mockModels);
    };

    loadModels();
  }, []);

  const handleToggle = async (model: ModelWithProvider) => {
    // In real app: await apiFetch(`/ai/model/${model.id}`, { method: 'PATCH', body: JSON.stringify({ isActive: !model.isActive }) });
    setModels(models.map(m => 
      m.id === model.id ? { ...m, isActive: !m.isActive } : m
    ));
  };

  // Get unique providers
  const providers = Array.from(new Set(models.map(m => m.providerName)));

  // Filter models
  const filteredModels = models.filter(model => {
    if (filterProvider && model.providerName !== filterProvider) return false;
    if (filterStatus === 'active' && !model.isActive) return false;
    if (filterStatus === 'inactive' && model.isActive) return false;
    return true;
  });

  // Group by provider
  const modelsByProvider = filteredModels.reduce((acc, model) => {
    if (!acc[model.providerName]) {
      acc[model.providerName] = [];
    }
    acc[model.providerName].push(model);
    return acc;
  }, {} as Record<string, ModelWithProvider[]>);

  return (
    <main className="flex w-full h-screen flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-background z-10 flex h-16 w-full shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          {isMobile && <SidebarTrigger />}
          <h1 className="text-xl font-semibold">AI Models</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="hidden sm:inline-flex">
            {filteredModels.length} {filteredModels.length === 1 ? 'model' : 'models'}
          </Badge>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-muted-foreground mb-6">
            Manage AI models and their active status. Active models are available for use in chats.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Provider:</span>
              <button
                onClick={() => setFilterProvider(null)}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  filterProvider === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                All
              </button>
              {providers.map(provider => (
                <button
                  key={provider}
                  onClick={() => setFilterProvider(provider)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    filterProvider === provider
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {provider}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  filterStatus === 'active'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus('inactive')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  filterStatus === 'inactive'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>

          {/* Models grouped by provider */}
          <div className="space-y-8">
            {Object.entries(modelsByProvider).map(([providerName, providerModels]) => (
              <div key={providerName}>
                <h2 className="text-lg font-semibold mb-4">{providerName}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {providerModels.map((model) => (
                    <ModelCard
                      key={model.id}
                      model={model}
                      onToggle={handleToggle}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredModels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No models found with the current filters.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

