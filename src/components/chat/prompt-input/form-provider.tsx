import { createContext, useContext } from "react";
import { useForm, FormProvider as RHFProvider } from "react-hook-form";
import { useModel } from "@/lib/hooks/use-model"; // kendi hook'un
import { z } from "zod";
import { promptschema } from "@/lib/validation/prompt";
import { Outlet } from "react-router";

type PromptContextType = ReturnType<typeof useModel> & {
  form: ReturnType<typeof useForm<z.infer<typeof promptschema>>>;
};

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export function PromptProvider() {
  const model = useModel();
  const form = useForm<z.infer<typeof promptschema>>({
    defaultValues: { content: "", modelId: 1 },
  });

  return (
    <PromptContext.Provider value={{ ...model, form }}>
      <RHFProvider {...form}><Outlet /></RHFProvider>
    </PromptContext.Provider>
  );
}

export function usePrompt() {
  const context = useContext(PromptContext);
  if (!context) throw new Error("usePrompt must be used within PromptProvider");
  return context;
}
