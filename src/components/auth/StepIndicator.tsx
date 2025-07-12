"use client"

import { motion } from "motion/react"
import { Dispatch, SetStateAction } from "react"

interface StepIndicatorProps {
  step: 1 | 2
  onStepChange: Dispatch<SetStateAction<1 | 2>>
  clearError: () => void
}

export function StepIndicator({ step, onStepChange, clearError }: StepIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mt-6 mb-8 flex w-full items-center justify-center"
    >
      {/* Step 1 Button */}
      <button
        className="relative z-10 flex size-10 cursor-pointer items-center justify-center rounded-full ring ring-blue-400"
        onClick={() => {
          onStepChange(1)
          clearError()
        }}
      >
        <p className="text-sm">1</p>
        <p className="absolute top-11 text-center text-xs">Account Details</p>
      </button>

      {/* Progress bar between steps */}
      <div className="h-1 flex-1 overflow-hidden bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-300"
          style={{ width: step === 2 ? "100%" : "0%" }}
        />
      </div>

      {/* Step 2 Button */}
      <button
        className={`relative z-10 flex size-10 items-center justify-center rounded-full ring ${
          step === 1 ? "ring-gray-200" : "ring-pink-400"
        }`}
      >
        <p className={`text-sm ${step === 1 && "text-gray-300"}`}>2</p>
        <p className={`absolute top-11 text-center text-xs ${step === 1 && "text-gray-400"}`}>Personal Info</p>
      </button>
    </motion.div>
  )
}
