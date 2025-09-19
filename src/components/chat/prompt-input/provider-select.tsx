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
      <SelectTrigger>
        <SelectValue placeholder="Select provider" />
      </SelectTrigger>
      <SelectContent side="top">
        {!providerLoading &&
          providers.map((provider) => (
            <SelectItem key={provider.id} value={String(provider.id)}>
              {provider.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
