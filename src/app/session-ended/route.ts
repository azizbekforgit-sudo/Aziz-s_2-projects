import { signOut } from "@/auth";

/**
 * The session cookie points to an account that no longer exists or is no longer active.
 * Clear the cookie and send the visitor to sign-in with an explanation.
 * Without this, /dashboard → /login → /dashboard looped forever (ERR_TOO_MANY_REDIRECTS).
 */
export async function GET(req: Request) {
  const reason = new URL(req.url).searchParams.get("reason") === "inactive" ? "inactive" : "session";
  await signOut({ redirectTo: `/login?error=${reason}` });
}
