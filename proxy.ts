// Next.js 16: this file is proxy.ts and the function is `proxy`.
// (On Next.js 15 or older, name the file middleware.ts and the function `middleware`.)
import { NextResponse, type NextRequest } from "next/server";
import {
  verifySessionToken,
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/session";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  const isLogin = pathname === "/eoha/login";

  if (isLogin) {
    if (session) return NextResponse.redirect(new URL("/eoha", request.url));
    return NextResponse.next();
  }

  if (!session) {
    const url = new URL("/eoha/login", request.url);
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  // Sliding timeout: every request renews the 15-minute window
  const res = NextResponse.next();
  const fresh = await createSessionToken(String(session.username));
  res.cookies.set(SESSION_COOKIE, fresh, sessionCookieOptions);
  return res;
}

export const config = {
  matcher: ["/eoha", "/eoha/:path*"],
};
