import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export function middleware(req: NextRequest) {
  const cookieName = "guestId"
  const existing = req.cookies.get(cookieName)?.value

  if (!existing) {
    const guestId = uuidv4()
    const res = NextResponse.next()
    res.cookies.set({
      name: cookieName,
      value: guestId,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*", "/chat/:path*", "/", "/login", "/signup"],
}
