'use client'

import { FormControl, FormField, FormItem } from "@/components/ui/form"
import type { FieldValues, Path, Control } from "react-hook-form"
import { PromptInputTextarea } from "@/components/ui/prompt-input"

interface PromptTextAreaProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  placeholder?: string
}

export function PromptTextArea<T extends FieldValues>({
  control,
  name,
  placeholder = "Type your prompt...",
}: PromptTextAreaProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <PromptInputTextarea className="min-h-[44px]" placeholder={placeholder}  {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
