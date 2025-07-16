"use client"

import { motion } from "motion/react"
import Image from "next/image"

export default function SocialProvider({ provider, index }: { provider: string; index: number }) {
  return (
    <motion.button
      key={provider}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 + 0.1, duration: 0.4, ease: "easeOut" }}
      className="size-12 cursor-pointer rounded-full bg-gradient-to-r from-blue-300 to-pink-300 p-[1px] hover:from-blue-500 hover:to-pink-500"
    >
      <div className="flex size-full items-center justify-center rounded-full bg-white">
        <div className="relative size-5">
          <Image src={`/logos/${provider}.png`} alt={`${provider} logo`} fill />
        </div>
      </div>
      <span className="sr-only">Sign in with {provider}</span>
    </motion.button>
  )
}
