import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Lightweight edge-safe guard: only checks that a valid session token exists.
// Role checks happen in the pages / API routes themselves (Node runtime).
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET, secureCookie: req.nextUrl.protocol === "https:" });
  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/admin/:path*", "/api/private/:path*"] };
