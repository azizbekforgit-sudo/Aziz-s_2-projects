import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, UserRound } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PUBLIC_PROJECT_STATUSES } from "@/lib/projects";
import { CATEGORY_ACCENT } from "@/lib/categories";
import { getDict } from "@/i18n/server";
import { PublicPage } from "@/components/public-page";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.projects };
}

export default async function Projects() {
  const [t, projects] = await Promise.all([
    getDict(),
    prisma.project.findMany({
      where: { status: { in: [...PUBLIC_PROJECT_STATUSES] } },
      include: { owner: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 30
    })
  ]);
  const p = t.projects;
  return (
    <PublicPage>
      <div className="container section">
        <div className="section-head">
          <div className="stack">
            <span className="eyebrow">{p.eyebrow}</span>
            <h1 className="h2">{p.title}</h1>
            <p className="muted">{p.lead}</p>
          </div>
          <Link className="btn btn-primary" href="/projects/new">{p.submit}</Link>
        </div>
        {projects.length === 0 ? (
          <div className="empty">
            <span className="icon-tile icon-tile-solid accent-pink"><Rocket size={20} aria-hidden="true" /></span>
            <h2 className="card-title">{p.emptyTitle}</h2>
            <p className="muted">{p.emptyText}</p>
            <Link className="btn btn-primary" href="/projects/new">{p.emptyCta}</Link>
          </div>
        ) : (
          <div className="grid-3">
            {projects.map((x) => (
              <article key={x.id} className={`card project-card accent-${CATEGORY_ACCENT[x.category] ?? "violet"}`}>
                <span className="chip">{t.categories[x.category as keyof typeof t.categories] ?? x.category}</span>
                <h2>{x.title}</h2>
                <p>{x.summary}</p>
                <div className="project-meta"><span className="row"><UserRound size={14} aria-hidden="true" /> {x.owner.name}</span></div>
              </article>
            ))}
          </div>
        )}
      </div>
    </PublicPage>
  );
}
