import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { auth } from "@/auth";
import { getDict } from "@/i18n/server";
import { Brand } from "./brand";
import { LanguageSwitcher } from "./language-switcher";

/** Public header. Shows "My dashboard" instead of sign-in buttons when the visitor is signed in. */
export async function SiteHeader() {
  const [session, t] = await Promise.all([auth(), getDict()]);
  const signedIn = !!session?.user;
  const links = [
    { href: "/#mechanisms", label: t.nav.mechanisms },
    { href: "/#how", label: t.nav.how },
    { href: "/projects", label: t.nav.projects },
    { href: "/opportunities", label: t.nav.opportunities }
  ];
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" aria-label={t.common.home}><Brand /></Link>
        <nav className="nav-links" aria-label={t.nav.mechanisms}>
          {links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
        <div className="nav-actions">
          <LanguageSwitcher />
          {signedIn ? (
            <Link className="btn btn-primary" href="/dashboard">{t.common.goDashboard} <ArrowUpRight size={16} aria-hidden="true" /></Link>
          ) : (
            <>
              <Link className="btn btn-ghost" href="/login">{t.common.signIn}</Link>
              <Link className="btn btn-primary" href="/register">{t.common.join}</Link>
            </>
          )}
        </div>
        <details className="mobile-menu">
          <summary aria-label={t.common.openMenu}><Menu size={20} aria-hidden="true" /></summary>
          <nav className="mobile-menu-panel" aria-label={t.nav.mechanisms}>
            {links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            {signedIn ? (
              <Link className="btn btn-primary btn-block" href="/dashboard">{t.common.goDashboard}</Link>
            ) : (
              <>
                <Link className="btn btn-secondary btn-block" href="/login">{t.common.signIn}</Link>
                <Link className="btn btn-primary btn-block" href="/register">{t.common.join}</Link>
              </>
            )}
            <LanguageSwitcher />
          </nav>
        </details>
      </div>
    </header>
  );
}
