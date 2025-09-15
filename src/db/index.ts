import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as relations from "./relations"
import * as auth from "./schema/auth"
import * as chat from "./schema/chat"

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(process.env.DATABASE_URL!, { prepare: false })
export const db = drizzle(client, {
  schema: { ...auth, ...chat, ...relations },
  casing: "snake_case",
})
