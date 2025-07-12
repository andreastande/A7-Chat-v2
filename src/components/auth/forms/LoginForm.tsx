"use client"

import { useAuthForm } from "@/hooks/useAuthForm"
import { GradientButton } from "../buttons/GradientButton"
import { EmailField } from "../fields/EmailField"
import { PasswordField } from "../fields/PasswordField"
import { AuthForm } from "./AuthForm"

export default function LoginForm() {
  const { form, onSubmit, isLoading, authError, clearError } = useAuthForm("logIn")

  return (
    <AuthForm form={form} onSubmit={onSubmit} clearError={clearError}>
      <EmailField control={form.control} />
      <PasswordField control={form.control} />

      {authError && <p className="text-sm text-red-500">{authError}</p>}

      <GradientButton loading={isLoading}>Continue</GradientButton>
    </AuthForm>
  )
}
