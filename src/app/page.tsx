import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PUBLIC_PROJECT_STATUSES } from "@/lib/projects";
import { shortName } from "@/lib/format";
import { getDict } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import { PublicPage } from "@/components/public-page";
import { Stamp } from "@/components/stamp";

const SOON_LINKS = ["/talent-map", "/community", "/mentorship"];

export default async function Home() {
  const [t, latest] = await Promise.all([
    getDict(),
    prisma.project.findMany({
      where: { status: { in: [...PUBLIC_PROJECT_STATUSES] } },
      orderBy: { createdAt: "desc" },
      take: 3,
      include: { owner: { select: { name: true, grade: true } } }
    })
  ]);
  const h = t.home;
  const s = h.sample;
  return (
    <PublicPage>
      <div className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <h1 id="hero-title">{h.title}</h1>
            <p className="lead">{h.lead}</p>
            <div className="hero-actions">
              <Link href="/register" className="btn btn-primary btn-lg">{h.ctaPrimary}</Link>
              <Link href="/projects" className="btn btn-secondary btn-lg">{h.ctaSecondary}</Link>
            </div>
            <p className="meta hero-note">{h.note}</p>
          </div>

          {/* The moment: what a student actually submits, and the teacher's check on it. */}
          <figure className="sheet" aria-label={s.label}>
            <p className="sheet-title">{s.title}</p>
            <p className="sheet-author">{s.author}</p>
            <dl>
              <div className="sheet-block"><dt>{s.problemLabel}</dt><dd>{s.problem}</dd></div>
              <div className="sheet-block"><dt>{s.solutionLabel}</dt><dd>{s.solution}</dd></div>
            </dl>
            <div className="sheet-foot">
              <span className="meta">{s.checked}</span>
              <Stamp status="APPROVED" t={t} large />
            </div>
          </figure>
        </section>

        <section className="section" id="how" aria-labelledby="how-title">
          <h2 id="how-title" className="section-title">{h.howTitle}</h2>
          <ol className="steps">
            {h.steps.map((step, i) => (
              <li key={step.t}>
                <span className="step-n">{i + 1}</span>
                <h3>{step.t}</h3>
                <p>{step.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {latest.length > 0 && (
          <section className="section" aria-labelledby="latest-title">
            <div className="section-head">
              <h2 id="latest-title" className="section-title">{h.latestTitle}</h2>
              <Link className="link-arrow" href="/projects">{h.latestAll} <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" /></Link>
            </div>
            <div className="cards">
              {latest.map((p) => (
                <Link key={p.id} href={`/projects/${p.id}`} className="card project-card">
                  <span className="meta">{t.categories[p.category as keyof typeof t.categories] ?? p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <span className="meta">{fmt(t.project.author, { name: shortName(p.owner.name), grade: p.owner.grade ?? "—" })}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="section" aria-labelledby="soon-title">
          <h2 id="soon-title" className="section-title">{h.soonTitle}</h2>
          <ul className="soon-rows">
            {h.soon.map((m, i) => (
              <li key={m.name}>
                <strong>{m.name}</strong>
                <span className="muted">{m.d}</span>
                <Link className="link-arrow" href={SOON_LINKS[i]}>{h.more}<span className="sr-only"> — {m.name}</span></Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="closing" aria-labelledby="closing-title">
          <div className="stack-sm">
            <h2 id="closing-title" className="title">{h.ctaTitle}</h2>
            <p className="muted">{h.ctaText}</p>
          </div>
          <Link className="btn btn-primary btn-lg" href="/register">{h.ctaButton}</Link>
        </section>
      </div>
    </PublicPage>
  );
}
