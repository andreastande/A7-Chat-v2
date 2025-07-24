import { verifySession } from "@/lib/dal"
import Image from "next/image"
import Link from "next/link"
import { SidebarFooter, SidebarMenu, SidebarMenuButton } from "../ui/sidebar"
import ProfilePicture, { User } from "./ProfilePicture"

export default async function AppSidebarFooter() {
  const { isAuth, user } = await verifySession()

  return (
    <SidebarFooter className="flex h-16 items-center space-x-2">
      <SidebarMenu>
        {isAuth ? (
          <ProfilePicture user={user as User} />
        ) : (
          <SidebarMenuButton asChild>
            <Link href="/login">
              <div className="relative size-5 shrink-0">
                <Image src="/icons/LogInGradient.png" alt="Log in" fill />
              </div>
              <span>Sign in</span>
            </Link>
          </SidebarMenuButton>
        )}
      </SidebarMenu>
    </SidebarFooter>
  )
}
