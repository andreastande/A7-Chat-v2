import { chat } from "@/db/schema"
import { createSelectSchema } from "drizzle-zod"
import z from "zod"

const chatSchema = createSelectSchema(chat)
export type Chat = z.infer<typeof chatSchema>
