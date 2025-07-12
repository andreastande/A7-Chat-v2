"use client"

import { loginSchema, signupSchema } from "@/components/auth/schemas"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

function getEmptyDefaults<T extends Record<string, string>>(schema: z.ZodObject<any>) {
  const keys = schema.keyof().options as Array<keyof T>
  const defaults = {} as Record<keyof T, string>
  for (const key of keys) {
    defaults[key] = ""
  }
  return defaults
}

export function useAuthForm(action: "logIn" | "signUp") {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const schema = action === "logIn" ? loginSchema : signupSchema

  type FormValues = z.infer<typeof schema>

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: getEmptyDefaults<FormValues>(schema),
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setAuthError(null)
    setIsLoading(true)

    if (action === "logIn") {
      await authClient.signIn.email(values as any, {
        onSuccess: () => router.push("/"),
        onError: (ctx: { error: { message: string } }) => {
          setIsLoading(false)
          setAuthError(ctx.error.message)
        },
      })
    } else {
      await authClient.signUp.email(values as any, {
        onSuccess: () => router.push("/"),
        onError: (ctx: { error: { message: string } }) => {
          setIsLoading(false)

          if (ctx.error.message === "User already exists") {
            setAuthError("Looks like you already have an account with us. Try logging in instead.")
          } else {
            setAuthError(ctx.error.message)
          }
        },
      })
    }
  })

  const clearError = () => setAuthError(null)

  return { form, onSubmit, isLoading, authError, clearError }
}
