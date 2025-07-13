import { user } from "@/db/schema"
import { createSelectSchema } from "drizzle-zod"
import z from "zod"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userSchema = createSelectSchema(user)
export type User = z.infer<typeof userSchema>

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : ""
  return first + last
}

export default function ProfilePicture({ user }: { user: User }) {
  return (
    <Avatar>
      <AvatarImage src={user.image ?? ""} />
      <AvatarFallback className="bg-[url('/images/avatar-background.jpg')] bg-cover">
        <span className="font-semibold text-white drop-shadow-lg group-data-[state=expanded]:hidden">
          {getInitials(user.name)}
        </span>
      </AvatarFallback>
    </Avatar>
  )
}
