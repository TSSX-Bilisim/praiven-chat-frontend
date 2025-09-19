import { fetchAvailableAIModels, fetchAvailableAIProviders } from "@/lib/api/ai";
import { fetchLastMessage } from "@/lib/api/message";
import { useModelStore } from "@/lib/stores/model";
import { useQuery } from "@tanstack/react-query";

function useModel() {
    const { 
        providers, models, activeModel, activeProvider, setActiveModel, setActiveProvider, setModels, setProviders
    } = useModelStore();

    const loadModels = async () => {
        const res = await fetchAvailableAIModels();
        if (!res.success) throw new Error(res.error || "Failed to fetch models");
        setModels(res.data?.models || []);
        return res.data?.models || [];
    };

    const loadProviders = async () => {
        const res = await fetchAvailableAIProviders();
        if (!res.success) throw new Error(res.error || "Failed to fetch providers");
        setProviders(res.data?.providers || []);
        return res.data?.providers || [];
    };

    const loadActiveModelandProvider = async () => {
        const res = await fetchLastMessage();
        if (!res.success) throw new Error(res.error || "Failed to fetch last message");
        const modelId = res.data?.message.modelId;
        const providerId = models.find(m => m.id === modelId)?.providerId;
        console.log("Last used modelId:", modelId, "providerId:", providerId);
        setActiveModel(modelId || 1);
        setActiveProvider(providerId || 1);
        console.log("Active model:", activeModel, "provider:", activeProvider);
        return res.data?.message;
    }

    const { error: modelError, isLoading: modelLoading } = useQuery({
        queryKey: ["available-models"],
        queryFn: async() => loadModels(),
        staleTime: 1000 * 60,
    });

    const { error: providerError, isLoading: providerLoading } = useQuery({
        queryKey: ["available-providers"],
        queryFn: async() => loadProviders(),
        staleTime: 1000 * 60,
    });

    const { error: activeError, isLoading: activeLoading } = useQuery({
        queryKey: ["active-model-provider"],
        queryFn: async() => loadActiveModelandProvider(),
        enabled: !modelLoading && !providerLoading,
        staleTime: 1000 * 60,
    });

    function changeProvider (id: number) {
        setActiveProvider(id);
    }

    function changeModel (id: number) {
        setActiveModel(id);
    }


    return {
        providers, models, activeModel, activeProvider,
        providerError, modelError, providerLoading, modelLoading,
        activeError, activeLoading, changeProvider, changeModel
    }
}

export { useModel };