import { INTL_LOCALE, type Locale } from "@/i18n/config";

// Dates are rendered on the server — always pin locale and time zone,
// otherwise the output depends on the machine the server runs on.
const cache = new Map<Locale, Intl.DateTimeFormat>();

export function formatDate(d: Date, locale: Locale): string {
  let f = cache.get(locale);
  if (!f) {
    f = new Intl.DateTimeFormat(INTL_LOCALE[locale], { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Tashkent" });
    cache.set(locale, f);
  }
  return f.format(d);
}

/** "Aziza Karimova" → "Aziza K." — students are minors, public pages never show full names. */
export function shortName(name: string): string {
  const [first, last] = name.trim().split(/\s+/);
  return last ? `${first} ${last[0]}.` : first;
}
