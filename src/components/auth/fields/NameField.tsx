"use client"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, FieldValues, Path } from "react-hook-form"
import AnimatedField from "./AnimatedField"

interface NameFieldProps<T extends FieldValues> {
  control: Control<T>
}

export function NameField<T extends FieldValues>({ control }: NameFieldProps<T>) {
  return (
    <AnimatedField>
      <FormField
        control={control}
        name={"name" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" type="text" autoComplete="name" {...field} />
            </FormControl>
            <FormDescription>Before we continue, we&apos;d love to know your name!</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </AnimatedField>
  )
}
