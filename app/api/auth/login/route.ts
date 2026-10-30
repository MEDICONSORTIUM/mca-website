import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/session";

export const runtime = "nodejs";

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, bufA); // keep timing similar
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "");

  const expectedUser = process.env.ADMIN_USERNAME ?? "";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";

  if (!expectedUser || !expectedPass || !process.env.AUTH_SECRET) {
    return NextResponse.json({ error: "Login is not configured on the server." }, { status: 500 });
  }

  const ok = safeEqual(username, expectedUser) && safeEqual(password, expectedPass);
  if (!ok) {
    return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
  }

  const token = await createSessionToken(username);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return res;
}
