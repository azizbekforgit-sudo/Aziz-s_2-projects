import Link from "next/link";
import { ArrowLeft, Compass, Rocket, Send } from "lucide-react";
import { Brand } from "./brand";

const POINTS = [
  { icon: Compass, accent: "purple", t: "Discover your strengths", d: "Explore what you are good at and where you want to grow." },
  { icon: Rocket, accent: "pink", t: "Build real projects", d: "Submit your idea, get it reviewed and show it to the community." },
  { icon: Send, accent: "gold", t: "Find opportunities", d: "Competitions, scholarships and programmes in one place." }
] as const;

/** Two-column layout for sign-in / sign-up. The left panel hides on small screens. */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <div className="auth">
        <aside className="auth-aside">
          <Link href="/" aria-label="Talent to Impact — home"><Brand /></Link>
          <div className="stack-lg">
            <h2 className="h2">From potential <span className="gradient-text">to real impact.</span></h2>
            <ul className="auth-aside-points">
              {POINTS.map((p) => (
                <li key={p.t} className={`accent-${p.accent}`}>
                  <span className="icon-tile"><p.icon size={18} aria-hidden="true" /></span>
                  <span><strong>{p.t}</strong>{p.d}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="subtle">Uzbekistan · Pilot: Navoi region</p>
        </aside>
        <main id="main" className="auth-main">
          <div className="auth-card">
            <Link href="/" className="back-link"><ArrowLeft size={16} aria-hidden="true" /> Back to home</Link>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
