"use client";
import { createContext, useContext } from "react";
import type { Locale } from "./config";
import type { Dict } from "./dictionaries";

const Ctx = createContext<{ locale: Locale; t: Dict } | null>(null);

/** Root layout wraps the app in this so client components can translate. */
export function I18nProvider({ locale, t, children }: { locale: Locale; t: Dict; children: React.ReactNode }) {
  return <Ctx.Provider value={{ locale, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used inside <I18nProvider>");
  return v;
}
