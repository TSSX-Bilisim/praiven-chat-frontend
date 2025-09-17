import type { Provider, Model } from '@/lib/types/model';
import { create } from 'zustand';

type ModelStore = {
    providers: Provider[];
    models: Model[];

    activeProvider: Provider | null;
    activeModel: Model | null;

    setProviders: (providers: Provider[]) => void;
    setModels: (models: Model[]) => void;
    setActiveProvider: (providerId: number) => void;
    setActiveModel: (modelId: number) => void;
}

export const useModelStore = create<ModelStore>(
    (set): ModelStore => ({
        providers: [],
        models: [],
        activeProvider: null,
        activeModel: null,

        setProviders: (providers) => set((state) => ({
            ...state.providers,
            providers: providers,
        })),
        setModels: (models) => set((state) => ({
            ...state.models,
            models: models,
        })),
        setActiveProvider: (providerId: number) =>
            set((state) => ({
                activeProvider: state.providers.find(p => p.id === providerId) || null
            })),
        setActiveModel: (modelId: number) => set((state) => ({
            activeModel: state.models.find(m => m.id === modelId) || null
        }))
    })
)