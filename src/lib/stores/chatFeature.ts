import { create } from "zustand";

type chatStore = {
  isMasked: boolean;
  toggleMasked: () => void;
};

export const useChatFeatureStore = create<chatStore>(
  (set): chatStore => ({
    isMasked: false,
    toggleMasked: () => set((state) => ({ isMasked: !state.isMasked })),
  })
);