"use server";
import { cookies } from "next/headers";
import { LOCALE_COOKIE, isLocale } from "./config";

/** Language switcher. Setting a cookie in a server action re-renders the current page in the new language. */
export async function setLocaleAction(formData: FormData) {
  const locale = formData.get("locale");
  if (!isLocale(locale)) return;
  (await cookies()).set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
}
