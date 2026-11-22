import { LOCALES, LOCALE_LABELS, LOCALE_SHORT } from "@/i18n/config";
import { getLocale, getDict } from "@/i18n/server";
import { setLocaleAction } from "@/i18n/actions";

/** UZ | RU. Works without JavaScript (plain form post). */
export async function LanguageSwitcher() {
  const [locale, t] = await Promise.all([getLocale(), getDict()]);
  return (
    <form action={setLocaleAction} className="lang-switch" aria-label={t.common.language}>
      {LOCALES.map((l) => (
        <button key={l} type="submit" name="locale" value={l} aria-pressed={l === locale} lang={l} title={LOCALE_LABELS[l]}>
          {LOCALE_SHORT[l]}
          <span className="sr-only"> — {LOCALE_LABELS[l]}</span>
        </button>
      ))}
    </form>
  );
}
