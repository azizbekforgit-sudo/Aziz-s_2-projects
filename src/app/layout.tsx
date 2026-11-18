import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { getDict, getLocale } from "@/i18n/server";
import { I18nProvider } from "@/i18n/client";
import "./globals.css";

// Both fonts support Cyrillic (Russian) and Latin with Uzbek characters (Oʻ, Gʻ).
const manrope = Manrope({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-manrope", display: "swap" });
const unbounded = Unbounded({ subsets: ["latin", "latin-ext", "cyrillic"], weight: ["600", "700"], variable: "--font-unbounded", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDict();
  return { title: { default: t.meta.title, template: "%s · Talent to Impact" }, description: t.meta.description };
}

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [locale, t] = await Promise.all([getLocale(), getDict()]);
  return (
    <html lang={locale} className={`${manrope.variable} ${unbounded.variable}`}>
      <body>
        <a className="skip-link" href="#main">{t.common.skip}</a>
        <I18nProvider locale={locale} t={t}>{children}</I18nProvider>
      </body>
    </html>
  );
}
