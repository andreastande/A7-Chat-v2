import SignupForm from "@/components/forms/SignupForm"
import SocialProvider from "@/components/SocialProvider"
import Link from "next/link"

export default function Page() {
  const socialProviders = ["Google", "Apple", "GitHub"]

  return (
    <div className="flex w-full">
      <div className="relative flex w-full items-center justify-center lg:w-1/2">
        <div className="flex w-80 flex-col items-center">
          <h1 className="text-4xl font-medium">Get Started</h1>
          <p className="mt-4 text-center text-gray-500">
            Welcome to <span className="font-semibold">A7 Chat</span> — Let&apos;s create your account.
          </p>
          <SignupForm />
          <div className="mt-6 flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-gray-400" />
            <span className="text-sm">or continue with</span>
            <div className="h-px flex-1 bg-gray-400" />
          </div>
          <div className="mt-6 flex gap-4">
            {socialProviders.map((provider, index) => (
              <SocialProvider key={provider} provider={provider} index={index} />
            ))}
          </div>
        </div>

        <p className="absolute right-12 bottom-12">
          Already have an account?{" "}
          <Link href="/login" className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
            Log in!
          </Link>
        </p>
      </div>

      <div className="hidden w-1/2 bg-[url('/images/login-background4.jpg')] bg-cover lg:block" />
    </div>
  )
}
