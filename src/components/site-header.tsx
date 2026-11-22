import Link from "next/link";
import { auth } from "@/auth";
import { ADMIN_ROLES, hasRole } from "@/lib/roles";
import { getDict } from "@/i18n/server";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { CloseOnNavigate, CompactOnScroll } from "./motion";

/**
 * Public header. What it offers depends on who is looking:
 * guest → sign in / create account; student → my projects + submit; moderator → moderation.
 * (The role here only decides which links to show; access is still checked on every page.)
 */
export async function SiteHeader() {
  const [session, t] = await Promise.all([auth(), getDict()]);
  const role = session?.user?.role;
  const staff = hasRole(role, ADMIN_ROLES);
  const links = [
    { href: "/projects", label: t.nav.projects },
    { href: "/opportunities", label: t.nav.opportunities },
    { href: "/#how", label: t.nav.how }
  ];
  const actions = !session?.user
    ? [{ href: "/login", label: t.common.signIn, primary: false }, { href: "/register", label: t.common.signUp, primary: true }]
    : staff
      ? [{ href: "/admin", label: t.nav.moderation, primary: true }]
      : [{ href: "/dashboard", label: t.nav.myProjects, primary: false }, { href: "/projects/new", label: t.nav.submit, primary: true }];

  return (
    <header className="site-header" id="site-header">
      <CompactOnScroll targetId="site-header" />
      <div className="container site-header-inner">
        <Link href="/" aria-label={t.common.homeLabel}><Logo /></Link>
        <nav className="nav-links" aria-label={t.common.mainNav}>
          {links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
        <div className="nav-actions">
          <LanguageSwitcher />
          {actions.map((a) => <Link key={a.href} href={a.href} className={a.primary ? "btn btn-primary" : undefined}>{a.label}</Link>)}
        </div>
        <details className="mobile-menu" id="mobile-menu">
          <summary>{t.common.openMenu}</summary>
          <CloseOnNavigate targetId="mobile-menu" />
          <nav className="mobile-menu-panel" aria-label={t.common.mainNav}>
            {links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            {actions.map((a) => <Link key={a.href} href={a.href} className={a.primary ? "btn btn-primary btn-lg btn-block" : undefined}>{a.label}</Link>)}
            <LanguageSwitcher />
          </nav>
        </details>
      </div>
    </header>
  );
}
