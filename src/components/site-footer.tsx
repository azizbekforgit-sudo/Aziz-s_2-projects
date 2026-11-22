import Link from "next/link";
import { getDict } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";

export async function SiteFooter() {
  const t = await getDict();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="stack">
          <Logo />
          <p className="caption">{t.common.tagline}</p>
        </div>
        <div>
          <h2>{t.common.mainNav}</h2>
          <ul>
            <li><Link href="/projects">{t.nav.projects}</Link></li>
            <li><Link href="/opportunities">{t.nav.opportunities}</Link></li>
            <li><Link href="/#how">{t.nav.how}</Link></li>
          </ul>
        </div>
        <div className="stack">
          <p className="caption">{t.common.pilot}</p>
          <LanguageSwitcher />
        </div>
      </div>
      <div className="container footer-bottom">{fmt(t.common.rights, { year: new Date().getFullYear() })}</div>
    </footer>
  );
}
