import z from "zod"

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Please enter a valid email address"),
  password: z.string().nonempty("Password is required"),
})

export const signupSchema = z.object({
  email: z.string().nonempty("Email is required").email("Please enter a valid email address"),
  password: z.string().nonempty("Password is required").min(8, "Password must be at least 8 characters long"),
  name: z.string().nonempty("Name is required"),
})
