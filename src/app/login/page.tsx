import LoginForm from "@/components/forms/LoginForm"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
  const socialProviders = ["Google", "Apple", "GitHub"]

  return (
    <div className="flex w-full">
      <div className="relative flex w-full items-center justify-center lg:w-1/2">
        <div className="flex w-80 flex-col items-center">
          <h1 className="text-4xl font-medium">Welcome Back</h1>
          <p className="mt-4 text-center text-gray-500">Enter your email and password to access your account.</p>
          <LoginForm />
          <div className="mt-6 flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-gray-400" />
            <span className="text-sm">or continue with</span>
            <div className="h-px flex-1 bg-gray-400" />
          </div>
          <div className="mt-6 flex gap-4">
            {socialProviders.map((provider) => (
              <button
                key={provider}
                className="size-12 cursor-pointer rounded-full bg-gradient-to-r from-blue-300 to-pink-300 p-[1px] hover:from-blue-500 hover:to-pink-500"
              >
                <div className="flex size-full items-center justify-center rounded-full bg-white">
                  <div className="relative size-5">
                    <Image src={`/logos/${provider}.png`} alt={`${provider} logo`} fill />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="absolute right-12 bottom-12">
          No account?{" "}
          <Link href="/signup" className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
            Sign up!
          </Link>
        </p>
      </div>
      <div className="hidden w-1/2 bg-[url('/images/login-background4.jpg')] bg-cover lg:block" />
    </div>
  )
}
