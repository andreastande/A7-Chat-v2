"use client"

import { Form } from "@/components/ui/form"
import { ReactNode } from "react"
import { UseFormReturn } from "react-hook-form"

interface AuthFormProps<T extends Record<string, any>> {
  form: UseFormReturn<T>
  onSubmit: () => Promise<void>
  clearError: () => void
  children: ReactNode
}

export function AuthForm<T extends Record<string, any>>({ form, onSubmit, clearError, children }: AuthFormProps<T>) {
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void onSubmit()
        }}
        onChange={clearError}
        className="mt-8 w-full space-y-6"
      >
        {children}
      </form>
    </Form>
  )
}
