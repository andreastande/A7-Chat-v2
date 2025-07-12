"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, FieldValues, Path } from "react-hook-form"
import AnimatedField from "./AnimatedField"

interface EmailFieldProps<T extends FieldValues> {
  control: Control<T>
}

export function EmailField<T extends FieldValues>({ control }: EmailFieldProps<T>) {
  return (
    <AnimatedField>
      <FormField
        control={control}
        name={"email" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="you@example.com" type="email" autoComplete="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </AnimatedField>
  )
}
