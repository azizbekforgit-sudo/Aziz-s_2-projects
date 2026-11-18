import { Globe } from "lucide-react";
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT } from "@/i18n/config";
import { getLocale, getDict } from "@/i18n/server";
import { setLocaleAction } from "@/i18n/actions";

/** Segmented UZ | RU switch. Works without JavaScript (plain form posts). */
export async function LanguageSwitcher() {
  const [locale, t] = await Promise.all([getLocale(), getDict()]);
  return (
    <form action={setLocaleAction} className="lang-switch" aria-label={t.common.language}>
      <Globe size={16} aria-hidden="true" className="lang-switch-icon" />
      {LOCALES.map((l) => (
        <button key={l} type="submit" name="locale" value={l} aria-pressed={l === locale} lang={l} title={LOCALE_LABELS[l]}>
          {LOCALE_SHORT[l]}
          <span className="sr-only"> — {LOCALE_LABELS[l]}</span>
        </button>
      ))}
    </form>
  );
}
