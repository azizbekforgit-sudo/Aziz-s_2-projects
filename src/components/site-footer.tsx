import Link from "next/link";
import { getDict } from "@/i18n/server";
import { Brand } from "./brand";

export async function SiteFooter() {
  const t = await getDict();
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="stack-sm">
          <Brand />
          <p className="subtle">© {new Date().getFullYear()} Talent to Impact · {t.common.region}</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link href="/projects">{t.nav.projects}</Link>
          <Link href="/opportunities">{t.nav.opportunities}</Link>
          <Link href="/login">{t.common.signIn}</Link>
          <Link href="/register">{t.footer.createAccount}</Link>
        </nav>
      </div>
    </footer>
  );
}
