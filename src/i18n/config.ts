export const LOCALES = ["uz", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uz";
export const LOCALE_COOKIE = "lang";
export const LOCALE_LABELS: Record<Locale, string> = { uz: "Oʻzbekcha", ru: "Русский" };
export const LOCALE_SHORT: Record<Locale, string> = { uz: "UZ", ru: "RU" };
/** BCP-47 tags for Intl (dates). */
export const INTL_LOCALE: Record<Locale, string> = { uz: "uz-Latn-UZ", ru: "ru-RU" };

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}
