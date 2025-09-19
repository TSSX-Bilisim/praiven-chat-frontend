'use client'

import { FormField, FormItem, FormControl } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useModel } from "@/lib/hooks/use-model"
import type { Control, FieldValues, Path } from "react-hook-form"

type PromptModelSelectProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
}

export function PromptModelSelect<T extends FieldValues>({ control, name }: PromptModelSelectProps<T>) {
  const { models, activeProvider, activeModel, changeModel, modelLoading } = useModel()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Select
            onValueChange={(val) => {
              changeModel(Number(val))
              field.onChange(Number(val))
            }}
            value={activeModel?.id ? String(activeModel.id) : ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
            </FormControl>
            <SelectContent side="top">
              {!modelLoading &&
                models
                  .filter((m) => m.providerId === activeProvider?.id)
                  .map((model) => (
                    <SelectItem key={model.id} value={String(model.id)}>
                      {model.name}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}
