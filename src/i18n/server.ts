import "server-only";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./config";
import { DICTIONARIES } from "./dictionaries";

/** Current UI language: from the `lang` cookie, default Uzbek. */
export async function getLocale(): Promise<Locale> {
  const v = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(v) ? v : DEFAULT_LOCALE;
}

/** Dictionary for server components: `const t = await getDict(); t.home.titleA` */
export async function getDict() {
  return DICTIONARIES[await getLocale()];
}
