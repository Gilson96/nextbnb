// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: "/sign-in",
      "Set-Cookie": [
        `next-auth.session-token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
        `__Secure-next-auth.session-token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
        `next-auth.callback-url=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
      ].join(", "),
    },
  });
}
