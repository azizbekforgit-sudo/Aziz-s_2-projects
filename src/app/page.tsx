import Link from "next/link";
import { ArrowUpRight, Compass, Rocket, Network, Send, Sparkles, ShieldCheck, Eye, HeartHandshake } from "lucide-react";
import { PublicPage } from "@/components/public-page";
import { getDict } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";

// Order matches t.home.mechanisms / t.home.steps.
const MECH = [
  { icon: Compass, accent: "violet", open: false },
  { icon: Rocket, accent: "pink", open: true },
  { icon: Network, accent: "teal", open: false },
  { icon: Send, accent: "amber", open: true }
] as const;
const PRINCIPLE_ICONS = [ShieldCheck, Eye, HeartHandshake];

export default async function Home() {
  const t = await getDict();
  const h = t.home;
  return (
    <PublicPage>
      <div className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <span className="hero-pill">
              <span className="hero-pill-dot" aria-hidden="true"><Sparkles size={13} /></span>
              {h.pill}
            </span>
            <h1 id="hero-title" className="h1">
              {h.titleA} <span className="gradient-text">{h.titleB}</span>
            </h1>
            <p className="lead">{h.lead}</p>
            <div className="hero-cta">
              <Link href="/register" className="btn btn-primary btn-lg">{h.ctaPrimary} <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <Link href="/projects" className="btn btn-secondary btn-lg">{h.ctaSecondary}</Link>
            </div>
            <dl className="hero-facts">
              {h.facts.map((f) => (
                <div key={f.v} className="hero-fact"><dt className="sr-only">{f.l}</dt><dd><strong>{f.v}</strong><span>{f.l}</span></dd></div>
              ))}
            </dl>
          </div>

          <div className="journey" aria-hidden="true">
            <div className="journey-head">
              <span className="eyebrow">{h.journeyTitle}</span>
              <span className="badge badge-success">{h.youAreHere}</span>
            </div>
            <ol className="journey-steps">
              {MECH.map((m, i) => (
                <li key={i} className={`journey-step accent-${m.accent}`}>
                  <span className="icon-tile icon-tile-solid"><m.icon size={20} /></span>
                  <span><strong>{h.mechanisms[i].name}</strong><span>{fmt(h.step, { n: i + 1 })} · {h.steps[i].t}</span></span>
                  {m.open ? <span className="badge badge-success badge-plain">{t.common.open}</span> : <span className="badge badge-neutral badge-plain">{t.common.comingSoon}</span>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="mechanisms" aria-labelledby="mech-title">
          <div className="section-head">
            <div className="stack">
              <span className="eyebrow">{h.mechEyebrow}</span>
              <h2 id="mech-title" className="h2">{h.mechTitle}</h2>
              <p className="muted">{h.mechLead}</p>
            </div>
          </div>
          <div className="grid-4">
            {MECH.map((m, i) => (
              <article key={i} className={`mechanism accent-${m.accent}`}>
                <span className="icon-tile icon-tile-solid"><m.icon size={20} aria-hidden="true" /></span>
                <span className="mechanism-tag">{h.mechanisms[i].tag}</span>
                <h3>{h.mechanisms[i].name}</h3>
                <p>{h.mechanisms[i].desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="how" aria-labelledby="how-title">
          <div className="section-head">
            <div className="stack">
              <span className="eyebrow">{h.howEyebrow}</span>
              <h2 id="how-title" className="h2">{h.howTitle}</h2>
            </div>
          </div>
          <ol className="steps">
            {h.steps.map((s, i) => (
              <li key={s.t} className={`accent-${MECH[i].accent}`}>
                <span className="step-num" aria-hidden="true">0{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" aria-labelledby="principles-title">
          <div className="section-head">
            <div className="stack">
              <span className="eyebrow">{h.principlesEyebrow}</span>
              <h2 id="principles-title" className="h2">{h.principlesTitle}</h2>
            </div>
          </div>
          <div className="grid-3">
            {h.principles.map((p, i) => {
              const Icon = PRINCIPLE_ICONS[i];
              return (
                <div key={p.t} className={`card principle accent-${MECH[(i + 2) % 4].accent}`}>
                  <span className="icon-tile"><Icon size={20} aria-hidden="true" /></span>
                  <div><h3>{p.t}</h3><p>{p.d}</p></div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section" aria-labelledby="cta-title">
          <div className="cta-band">
            <div className="stack">
              <span className="eyebrow">{h.ctaEyebrow}</span>
              <h2 id="cta-title" className="h2">{h.ctaTitle}</h2>
              <p>{h.ctaText}</p>
            </div>
            <Link className="btn btn-white btn-lg" href="/register">{h.ctaButton} <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>
      </div>
    </PublicPage>
  );
}
