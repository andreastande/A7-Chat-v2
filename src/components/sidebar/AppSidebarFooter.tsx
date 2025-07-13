import { verifySession } from "@/lib/dal"
import Link from "next/link"
import { SidebarFooter, SidebarMenuButton } from "../ui/sidebar"
import LogInGradientIcon from "./LogInGradientIcon"
import ProfilePicture, { User } from "./ProfilePicture"

export default async function AppSidebarFooter() {
  const { user } = await verifySession()

  return (
    <SidebarFooter className="flex h-16 items-center space-x-2">
      <SidebarMenuButton size="lg" className="cursor-pointer" asChild={user ? false : true}>
        {user ? (
          <>
            <ProfilePicture user={user as User} />
            <p className="whitespace-nowrap">{user.name}</p>
          </>
        ) : (
          <Link href="/login" className="flex items-center gap-2">
            <LogInGradientIcon />
            <p className="whitespace-nowrap">Log in</p>
          </Link>
        )}
      </SidebarMenuButton>
    </SidebarFooter>
  )
}
