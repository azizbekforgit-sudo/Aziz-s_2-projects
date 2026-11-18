import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Same cookie handling as the rest of Auth.js (works behind Render's HTTPS proxy).
// This only checks that a session exists; account status and role are checked
// against the database in `requireUser` / `requireRole` (src/lib/session.ts).
export default NextAuth(authConfig).auth;

export const config = { matcher: ["/dashboard/:path*", "/admin/:path*", "/projects/new"] };
