import { User } from "better-auth"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : ""
  return first + last
}

export default async function ProfilePicture({ user }: { user: User }) {
  return (
    <button className="size-8 cursor-pointer rounded-full shadow-md">
      <Avatar className="transition-all hover:brightness-90">
        {user.image && <AvatarImage src={user.image} />}
        <AvatarFallback className="bg-[url('/images/avatar-background.jpg')] bg-cover">
          <span className="text-sm font-semibold text-white drop-shadow-lg">{getInitials(user.name)}</span>
        </AvatarFallback>
      </Avatar>
    </button>
  )
}
