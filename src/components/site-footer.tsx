import Link from "next/link";
import { getDict } from "@/i18n/server";

export async function SiteFooter() {
  const t = await getDict();
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <span>Talent to Impact · {t.common.pilot}</span>
        <nav className="footer-links" aria-label="Footer">
          <Link href="/projects">{t.nav.projects}</Link>
          <Link href="/opportunities">{t.nav.opportunities}</Link>
          <Link href="/login">{t.common.signIn}</Link>
        </nav>
      </div>
    </footer>
  );
}
