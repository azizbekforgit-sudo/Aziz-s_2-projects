"use server";
import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { signIn } from "@/auth";

export type LoginState = { error?: string; email?: string };

/**
 * Only allow redirects back to our own site (prevents open-redirect via ?callbackUrl=https://evil).
 * Auth.js sends an absolute URL (http://host/admin), our own links send a path (/admin).
 */
async function safeCallback(url: FormDataEntryValue | null): Promise<string> {
  if (typeof url !== "string" || !url) return "/dashboard";
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const parsed = new URL(url);
    const host = (await headers()).get("host");
    if (host && parsed.host === host) return parsed.pathname + parsed.search;
  } catch {
    /* not a URL */
  }
  return "/dashboard";
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  try {
    await signIn("credentials", {
      email,
      password: formData.get("password"),
      redirectTo: await safeCallback(formData.get("callbackUrl"))
    });
    return {};
  } catch (e) {
    // signIn() throws a redirect on success — it must be re-thrown, not swallowed.
    if (e instanceof AuthError) {
      const code = (e as AuthError & { code?: string }).code;
      if (code === "inactive")
        return { email, error: "Your account isn’t active yet. An administrator needs to approve it first." };
      return { email, error: "Incorrect email or password." };
    }
    throw e;
  }
}
