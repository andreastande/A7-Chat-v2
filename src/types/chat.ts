import { chat } from "@/db/schema"
import { createSelectSchema } from "drizzle-zod"
import z from "zod"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const chatSchema = createSelectSchema(chat)
export type Chat = z.infer<typeof chatSchema>

// export type Chat2 = typeof chat.$inferSelect
