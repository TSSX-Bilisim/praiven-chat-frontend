'use client'

import { FormControl, FormField, FormItem } from "@/components/ui/form"
import type { FieldValues, Path, Control } from "react-hook-form"
import { TextArea } from "@radix-ui/themes"

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
            <TextArea placeholder={placeholder} {...field} 
              style={{ 
                backgroundColor: "transparent"
              }}/>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
