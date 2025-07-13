"use client"

import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeClosed } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Control, FieldValues, Path } from "react-hook-form"
import AnimatedField from "./AnimatedField"

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>
  showForgotPassword?: boolean
}

export function PasswordField<T extends FieldValues>({ control, showForgotPassword }: PasswordFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <AnimatedField>
      <FormField
        control={control}
        name={"password" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="pr-10"
                  {...field}
                />
                {field.value.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-7 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </Button>
                )}
              </div>
            </FormControl>
            <FormMessage />
            {showForgotPassword && (
              <Link
                href="#"
                className="w-fit bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-sm text-transparent"
              >
                Forgot your password?
              </Link>
            )}
          </FormItem>
        )}
      />
    </AnimatedField>
  )
}
