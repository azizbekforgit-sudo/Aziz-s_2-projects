import Link from "next/link";
import { auth } from "@/auth";
import { getDict } from "@/i18n/server";
import { Wordmark } from "./wordmark";
import { LanguageSwitcher } from "./language-switcher";

export async function SiteHeader() {
  const [session, t] = await Promise.all([auth(), getDict()]);
  const signedIn = !!session?.user;
  const links = [
    { href: "/projects", label: t.nav.projects },
    { href: "/opportunities", label: t.nav.opportunities },
    { href: "/#how", label: t.nav.how }
  ];
  const account = signedIn ? (
    <Link className="btn btn-primary" href="/dashboard">{t.appNav.myProjects}</Link>
  ) : (
    <>
      <Link href="/login">{t.common.signIn}</Link>
      <Link className="btn btn-primary" href="/register">{t.common.signUp}</Link>
    </>
  );
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" aria-label={t.common.home}><Wordmark /></Link>
        <nav className="nav-links" aria-label={t.common.home}>
          {links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
        <div className="nav-actions">
          <LanguageSwitcher />
          {account}
        </div>
        <details className="mobile-menu">
          <summary>{t.common.openMenu}</summary>
          <nav className="mobile-menu-panel" aria-label={t.common.home}>
            {links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            {signedIn ? (
              <Link className="btn btn-primary btn-block" href="/dashboard">{t.appNav.myProjects}</Link>
            ) : (
              <>
                <Link href="/login">{t.common.signIn}</Link>
                <Link className="btn btn-primary btn-block" href="/register">{t.common.signUp}</Link>
              </>
            )}
            <LanguageSwitcher />
          </nav>
        </details>
      </div>
    </header>
  );
}
