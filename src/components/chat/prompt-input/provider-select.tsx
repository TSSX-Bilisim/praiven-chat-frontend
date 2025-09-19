'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useModel } from "@/lib/hooks/use-model";

export function ProviderSelect() {
  const { providers, activeProvider, changeProvider, providerLoading } = useModel();

  return (
    <Select
      onValueChange={(val) => changeProvider(Number(val))}
      value={activeProvider?.id ? String(activeProvider.id) : ""}
    >
      <SelectTrigger className="border-none dark:bg-input/0">
        <SelectValue placeholder="Select provider" />
      </SelectTrigger>
      <SelectContent side="top" className="p-0">
        {!providerLoading &&
          providers.map((provider) => (
            <SelectItem key={provider.id} value={String(provider.id)}>
              {provider.name === 'OPENAI' && 'OpenAI'}
              {provider.name === 'GEMINI' && 'Gemini'}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
