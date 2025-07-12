"use client"

import { useAuthForm } from "@/hooks/useAuthForm"
import { useState } from "react"
import { GradientButton } from "../buttons/GradientButton"
import { EmailField } from "../fields/EmailField"
import { NameField } from "../fields/NameField"
import { PasswordField } from "../fields/PasswordField"
import { StepIndicator } from "../StepIndicator"
import { AuthForm } from "./AuthForm"

export default function SignupForm() {
  const [step, setStep] = useState<1 | 2>(1)

  const { form, onSubmit, isLoading, authError, clearError } = useAuthForm("signUp")

  return (
    <>
      <StepIndicator step={step} onStepChange={setStep} clearError={clearError} />

      <AuthForm form={form} onSubmit={onSubmit} clearError={clearError}>
        {step === 1 ? (
          <>
            <EmailField control={form.control} />
            <PasswordField control={form.control} />

            {authError && <p className="text-sm text-red-500">{authError}</p>}

            <GradientButton
              type="button"
              onClick={async () => {
                clearError()
                if (await form.trigger(["email", "password"])) {
                  setStep(2)
                }
              }}
            >
              Continue
            </GradientButton>
          </>
        ) : (
          <>
            <NameField control={form.control} />

            {authError && <p className="text-sm text-red-500">{authError}</p>}

            <GradientButton loading={isLoading}>Create your account</GradientButton>
          </>
        )}
      </AuthForm>
    </>
  )
}
