"use server"

import { revalidatePath } from "next/cache"

export async function invalidateRouterCache() {
  /*
   * note: this path does not exist, but it will
   * trigger a client-side reload.
   */
  await new Promise((r) => setTimeout(r, 100)) // wait a tiny bit
  revalidatePath("/just-trigger-client-reload")
}
