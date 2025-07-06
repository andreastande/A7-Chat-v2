"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "../ui/input"
import AnimatedField from "./AnimatedField"

const formSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Please enter a valid email address"),
  password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters long"),
  name: z.string({ required_error: "Name is required" }).min(1, "Please enter your name"),
})

export default function SignupForm() {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<null | string>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onRequest: () => {
          setIsLoading(true)
        },
        onSuccess: () => {
          router.push("/")
        },
        onError: (ctx) => {
          setIsLoading(false)
          if (ctx.error.message === "User already exists") {
            setAuthError("Looks like you already have an account with us. Try logging in instead.")
          } else {
            setAuthError(ctx.error.message)
          }
        },
      }
    )
  }

  return (
    <>
      <div className="mt-6 flex w-full items-center justify-center">
        <button
          className="relative z-10 flex size-10 cursor-pointer items-center justify-center rounded-full ring ring-blue-400"
          onClick={() => {
            setStep(1)
            setAuthError(null)
          }}
        >
          <p className="text-sm">1</p>
          <p className="absolute top-11 text-center text-xs">Account Details</p>
        </button>
        <div className="h-1 w-40 overflow-hidden bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-300"
            style={{ width: step === 2 ? "100%" : "0%" }}
          />
        </div>
        <div
          className={`relative flex size-10 items-center justify-center rounded-full ring ${step === 1 ? "ring-gray-200" : "ring-pink-400"}`}
        >
          <p className={`text-sm ${step === 1 && "text-gray-300"}`}>2</p>
          <p className="absolute top-11 text-center text-xs">Personal Info</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-16 w-full space-y-6">
          {step === 1 ? (
            <>
              <AnimatedField>
                <FormField
                  control={form.control}
                  name="email"
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

              <AnimatedField>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" type="password" autoComplete="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AnimatedField>

              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
                >
                  <Button
                    type="button"
                    className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-pink-500 font-semibold text-white transition-colors hover:from-blue-600 hover:to-pink-600"
                    onClick={async () => {
                      const isValid = await form.trigger(["email", "password"])
                      if (isValid) {
                        setStep(2)
                      }
                    }}
                  >
                    Continue
                  </Button>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="name"
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

              {authError && <p className="text-sm text-red-500">{authError}</p>}

              <Button
                type="submit"
                className={`w-full cursor-pointer bg-gradient-to-r font-semibold text-white transition-colors ${isLoading ? "from-blue-300 to-pink-300 hover:from-blue-300 hover:to-pink-300" : "from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"}`}
                onClick={() => setStep(2)}
              >
                Create your account
              </Button>
            </>
          )}
        </form>
      </Form>
    </>
  )
}
