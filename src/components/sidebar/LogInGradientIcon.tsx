import Image from "next/image"

export default function LogInGradientIcon() {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center">
      <div className="relative size-5">
        <Image src="/icons/LogInGradient.png" alt="Log in" fill />
      </div>
    </div>
  )
}
