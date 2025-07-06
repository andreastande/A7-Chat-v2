"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "../ui/input"
import AnimatedField from "./AnimatedField"

const formSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Please enter a valid email address"),
  password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters long"),
})

export default function LoginForm() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<null | string>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
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
          setAuthError(ctx.error.message)
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 w-full space-y-6">
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
                <Link
                  href="/forgot-password"
                  className="w-fit bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-sm text-transparent"
                >
                  Forgot your password?
                </Link>
              </FormItem>
            )}
          />
        </AnimatedField>

        {authError && <p className="text-sm text-red-500">{authError}</p>}

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
        >
          <Button
            type="submit"
            className={`w-full cursor-pointer bg-gradient-to-r font-semibold text-white transition-colors ${isLoading ? "from-blue-300 to-pink-300 hover:from-blue-300 hover:to-pink-300" : "from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"}`}
          >
            Continue
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}
