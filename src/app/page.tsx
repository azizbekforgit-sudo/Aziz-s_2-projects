import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ADMIN_ROLES, hasRole } from "@/lib/roles";
import { PUBLIC_PROJECT_STATUSES } from "@/lib/projects";
import { shortName } from "@/lib/format";
import { getDict } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import type { Dict } from "@/i18n/dictionaries";
import { PublicPage } from "@/components/public-page";
import { ProjectSheet } from "@/components/project-sheet";
import { Contours, HeroRoute, Illo, RouteLine } from "@/components/graphics";

const STEP_ILLOS = ["notice", "propose", "share"] as const;
const SOON = [{ href: "/talent-map", illo: "talent" }, { href: "/community", illo: "bridge" }, { href: "/mentorship", illo: "mentor" }] as const;

type Card = { id: string; title: string; summary: string; category: string; owner: { name: string; grade: number | null } };

function ProjectCard({ p, t, featured }: { p: Card; t: Dict; featured?: boolean }) {
  const cat = t.categories[p.category as keyof Dict["categories"]] ?? p.category;
  const author = fmt(t.project.author, { name: shortName(p.owner.name), grade: p.owner.grade ?? "—" });
  const badge = <span className="badge-ok"><Check size={14} strokeWidth={2} aria-hidden="true" />{t.status.APPROVED}</span>;
  if (featured)
    return (
      <Link href={`/projects/${p.id}`} className="pcard pcard-featured">
        <div className="grid-paper stack-sm"><span className="tag">{cat}</span><h3>{p.title}</h3></div>
        <div className="pcard-body">
          <p>{p.summary}</p>
          <div className="pcard-foot"><span>{author}</span>{badge}</div>
          <span className="arrow-link">{t.home.openProject}<ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" /></span>
        </div>
      </Link>
    );
  return (
    <Link href={`/projects/${p.id}`} className="pcard">
      <div className="pcard-top"><span className="tag">{cat}</span>{badge}</div>
      <h3>{p.title}</h3>
      <p>{p.summary}</p>
      <div className="pcard-foot"><span>{author}</span><span className="arrow-link">{t.home.openProject}<ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" /></span></div>
    </Link>
  );
}

export default async function Home() {
  const [t, session, latest] = await Promise.all([
    getDict(),
    auth(),
    prisma.project.findMany({
      where: { status: { in: [...PUBLIC_PROJECT_STATUSES] } },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, title: true, summary: true, category: true, owner: { select: { name: true, grade: true } } }
    })
  ]);
  const h = t.home;
  const s = h.sample;
  const [first, ...rest] = latest;
  // The main action depends on who is looking (links only; access is checked on the target page).
  const cta = !session?.user
    ? { href: "/register", label: h.ctaPrimary }
    : hasRole(session.user.role, ADMIN_ROLES)
      ? { href: "/admin", label: t.nav.moderation }
      : { href: "/projects/new", label: t.nav.submit };

  return (
    <PublicPage>
      <div className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-text">
            <span className="eyebrow eyebrow-blue">{h.label}</span>
            <h1 id="hero-title">{h.title}</h1>
            <p className="lead">{h.lead}</p>
            <div className="hero-actions">
              <Link href={cta.href} className="btn btn-primary btn-lg">{cta.label}</Link>
              <Link href="/projects" className="btn btn-text">{h.ctaSecondary}<ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" /></Link>
            </div>
            <p className="caption hero-note">{h.note}</p>
          </div>
          <div className="hero-visual">
            <HeroRoute />
            <ProjectSheet t={t} label={s.label} number={s.number} category={s.category} title={s.title} author={s.author}
              sections={[{ label: s.problemLabel, text: s.problem }, { label: s.solutionLabel, text: s.solution }, { label: s.checkLabel, text: s.check }]}
              status="APPROVED" />
          </div>
        </section>
      </div>

      <div className="trust">
        <ul className="container">
          {h.trust.map((x) => <li key={x}><Check size={18} strokeWidth={1.8} aria-hidden="true" />{x}</li>)}
        </ul>
      </div>

      <div className="container">
        <section className="section reveal" id="how" aria-labelledby="how-title">
          <div className="sec-head"><h2 id="how-title" className="h2">{h.howTitle}</h2></div>
          <div className="steps-wrap">
          <RouteLine />
          <ol className="steps">
            {h.steps.map((step, i) => (
              <li key={step.t} className="step">
                <span className="step-mark">{String(i + 1).padStart(2, "0")}</span>
                <Illo name={STEP_ILLOS[i]} />
                <h3>{step.t}</h3>
                <p>{step.d}</p>
              </li>
            ))}
          </ol>
          </div>
        </section>

        {first && (
          <section className="section" aria-labelledby="latest-title">
            <div className="sec-head reveal">
              <h2 id="latest-title" className="h2">{h.latestTitle}</h2>
              <Link className="arrow-link" href="/projects">{h.latestAll}<ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" /></Link>
            </div>
            {rest.length > 0 ? (
              <div className="cards-feature reveal-stagger">
                <ProjectCard p={first} t={t} featured />
                <div className="side">{rest.map((p) => <ProjectCard key={p.id} p={p} t={t} />)}</div>
              </div>
            ) : (
              <div className="cards reveal-stagger"><ProjectCard p={first} t={t} /></div>
            )}
          </section>
        )}

        <section className="section reveal" aria-labelledby="opp-title">
          <div className="opp-band">
            <Illo name="door" />
            <div className="stack-sm">
              <h2 id="opp-title" className="h2">{h.oppTitle}</h2>
              <p className="muted">{h.oppText}</p>
            </div>
            <Link className="btn btn-secondary" href="/opportunities">{h.oppCta}<ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="section" aria-labelledby="soon-title">
          <div className="sec-head reveal">
            <div className="stack-sm"><h2 id="soon-title" className="h2">{h.soonTitle}</h2><p className="muted">{h.soonLead}</p></div>
          </div>
          <div className="soon-grid reveal-stagger">
            {h.soon.map((m, i) => (
              <Link key={m.name} href={SOON[i].href} className="soon-card">
                <Illo name={SOON[i].illo} />
                <span className="soon-tag-chip">{t.common.soon}</span>
                <h3 className="h3">{m.name}</h3>
                <p className="muted">{m.d}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="final-cta reveal" aria-labelledby="cta-title">
          <Contours />
          <h2 id="cta-title">{h.ctaTitle}</h2>
          <Link className="btn btn-lg" href={cta.href}>{cta.label}</Link>
        </section>
      </div>
    </PublicPage>
  );
}
