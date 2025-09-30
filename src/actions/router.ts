"use server"

import { revalidatePath } from "next/cache"
import { setTimeout as sleep } from "node:timers/promises"

export async function invalidateRouterCache() {
  /*
   * note: this path does not exist, but it will
   * trigger a client-side reload.
   */
  await sleep(100)
  revalidatePath("/just-trigger-client-reload")
}
