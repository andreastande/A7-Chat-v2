import { AuthPage } from "@/components/auth/AuthPage"
import SignupForm from "@/components/auth/forms/SignupForm"

export default function Page() {
  return (
    <AuthPage
      title="Get Started"
      description={
        <>
          Welcome to <span className="font-semibold">A7 Chat</span> — Let's create your account.
        </>
      }
      bottomText="Already have an account?"
      bottomLink={{ href: "/login", text: "Log in!" }}
    >
      <SignupForm />
    </AuthPage>
  )
}
