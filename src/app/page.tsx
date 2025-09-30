import Chat from "@/components/chat/Chat"
import AppSidebar from "@/components/sidebar/AppSidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { verifySession } from "@/lib/auth/session"
import { NotAuthenticatedError } from "@/lib/errors"
import { getModel } from "@/lib/model"
import { cookies } from "next/headers"

export default async function Home() {
  let session = undefined
  try {
    session = await verifySession()
  } catch (e) {
    if (!(e instanceof NotAuthenticatedError)) throw e
  }

  const cookieStore = await cookies()

  const modelId = cookieStore.get("last_selected_model")?.value ?? "openai/gpt-5-nano"
  const initialModel = getModel(modelId) ?? "openai/gpt-5-nano"

  return (
    <>
      {session && <AppSidebar collapsible="icon" />}
      <main className="bg-sidebar relative w-full">
        {session && <SidebarTrigger className="sticky top-3 mt-3 ml-3 md:hidden" />}

        <Chat id={crypto.randomUUID()} initialModel={initialModel} isNewChat />
      </main>
    </>
  )
}
