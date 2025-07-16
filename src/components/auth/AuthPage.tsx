"use client"

import SocialProvider from "@/components/auth/buttons/SocialProvider"
import { motion } from "motion/react"
import Link from "next/link"
import { ReactNode } from "react"

interface AuthPageProps {
  title: string
  description: ReactNode
  children: ReactNode
  bottomText: string
  bottomLink: { href: string; text: string }
  imageSrc?: string
}

export function AuthPage({
  title,
  description,
  children,
  bottomText,
  bottomLink,
  imageSrc = "/images/login-background.jpg",
}: AuthPageProps) {
  const socialProviders = ["Google", "Apple", "GitHub"]

  return (
    <div className="flex w-full">
      {/* Left half: Auth */}
      <div className="relative flex w-full items-center justify-center lg:w-1/2">
        <div className="flex w-80 flex-col items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-4xl font-medium"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-4 text-center text-gray-500"
          >
            {description}
          </motion.p>

          {/* Form */}
          {children}

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
            className="mt-6 flex w-full items-center gap-4"
          >
            <div className="h-px flex-1 bg-gray-400" />
            <span className="text-sm">or continue with</span>
            <div className="h-px flex-1 bg-gray-400" />
          </motion.div>

          {/* Social buttons */}
          <div className="mt-6 flex gap-4">
            {socialProviders.map((provider, i) => (
              <SocialProvider key={provider} provider={provider} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom link */}
        <p className="absolute right-12 bottom-12">
          {bottomText}{" "}
          <Link
            href={bottomLink.href}
            className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent"
          >
            {bottomLink.text}
          </Link>
        </p>
      </div>

      {/* Right half: background image */}
      <div className="hidden w-1/2 bg-cover lg:block" style={{ backgroundImage: `url(${imageSrc})` }} />
    </div>
  )
}
