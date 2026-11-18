import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { auth } from "@/auth";
import { Brand } from "./brand";

const LINKS = [
  { href: "/#mechanisms", label: "Mechanisms" },
  { href: "/#how", label: "How it works" },
  { href: "/projects", label: "Projects" },
  { href: "/opportunities", label: "Opportunities" }
];

/** Public header. Shows "Dashboard" instead of sign-in buttons when the visitor is signed in. */
export async function SiteHeader() {
  const session = await auth();
  const signedIn = !!session?.user;
  const actions = signedIn ? (
    <Link className="btn btn-primary" href="/dashboard">Go to dashboard <ArrowUpRight size={16} aria-hidden="true" /></Link>
  ) : (
    <>
      <Link className="btn btn-ghost" href="/login">Sign in</Link>
      <Link className="btn btn-primary" href="/register">Join the platform</Link>
    </>
  );
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" aria-label="Talent to Impact — home"><Brand /></Link>
        <nav className="nav-links" aria-label="Main">
          {LINKS.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
        <div className="nav-actions">{actions}</div>
        <details className="mobile-menu">
          <summary aria-label="Open menu"><Menu size={20} aria-hidden="true" /></summary>
          <nav className="mobile-menu-panel" aria-label="Main">
            {LINKS.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            {signedIn ? (
              <Link className="btn btn-primary btn-block" href="/dashboard">Go to dashboard</Link>
            ) : (
              <>
                <Link className="btn btn-secondary btn-block" href="/login">Sign in</Link>
                <Link className="btn btn-primary btn-block" href="/register">Join the platform</Link>
              </>
            )}
          </nav>
        </details>
      </div>
    </header>
  );
}
