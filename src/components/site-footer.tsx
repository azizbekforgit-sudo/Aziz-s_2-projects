import Link from "next/link";
import { Brand } from "./brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="stack-sm">
          <Brand />
          <p className="subtle">© {new Date().getFullYear()} Talent to Impact · Uzbekistan · Pilot: Navoi region</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link href="/projects">Projects</Link>
          <Link href="/opportunities">Opportunities</Link>
          <Link href="/login">Sign in</Link>
          <Link href="/register">Create account</Link>
        </nav>
      </div>
    </footer>
  );
}
