import type { Metadata, Viewport } from "next";
import { Golos_Text, Literata } from "next/font/google";
import { getDict, getLocale } from "@/i18n/server";
import { I18nProvider } from "@/i18n/client";
import { RevealObserver } from "@/components/motion";
import "./globals.css";

// Both support Cyrillic and Latin Extended (Uzbek Oʻ, Gʻ).
const golos = Golos_Text({ subsets: ["latin", "latin-ext", "cyrillic"], weight: ["400", "500", "600"], variable: "--font-golos", display: "swap" });
const literata = Literata({ subsets: ["latin", "latin-ext", "cyrillic"], weight: ["500", "600"], variable: "--font-literata", display: "swap" });

// Runs before paint: `js` enables scroll reveal; `intro` plays the hero sequence once per browser session.
const BOOT = `document.documentElement.classList.add("js");try{if(!sessionStorage.getItem("tti-intro")){document.documentElement.classList.add("intro");sessionStorage.setItem("tti-intro","1")}}catch(e){}`;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDict();
  return { title: { default: t.meta.title, template: "%s · Talent to Impact" }, description: t.meta.description };
}

export const viewport: Viewport = { themeColor: "#f7f5ef", colorScheme: "light" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [locale, t] = await Promise.all([getLocale(), getDict()]);
  return (
    <html lang={locale} className={`${golos.variable} ${literata.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <a className="skip-link" href="#main">{t.common.skip}</a>
        <I18nProvider locale={locale} t={t}>{children}</I18nProvider>
        <RevealObserver />
      </body>
    </html>
  );
}
