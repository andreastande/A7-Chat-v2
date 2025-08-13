import { AuthPage } from "@/components/auth/AuthPage"
import LoginForm from "@/components/auth/forms/LoginForm"

export default function Page() {
  return (
    <AuthPage
      title="Welcome Back"
      description="Enter your email and password to access your account."
      bottomText="No account?"
      bottomLink={{ href: "/signup", text: "Sign up!" }}
    >
      <LoginForm />
    </AuthPage>
  )
}
