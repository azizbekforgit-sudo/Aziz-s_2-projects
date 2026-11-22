import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PUBLIC_PROJECT_STATUSES } from "@/lib/projects";
import { shortName } from "@/lib/format";
import { getDict } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import { PublicPage } from "@/components/public-page";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Illo } from "@/components/graphics";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.projects };
}

export default async function Projects() {
  const [t, projects] = await Promise.all([
    getDict(),
    prisma.project.findMany({
      where: { status: { in: [...PUBLIC_PROJECT_STATUSES] } },
      select: { id: true, title: true, summary: true, category: true, owner: { select: { name: true, grade: true } } },
      orderBy: { createdAt: "desc" },
      take: 60
    })
  ]);
  const p = t.projects;
  // Long titles read better in two columns.
  const wide = projects.some((x) => x.title.length > 60);
  return (
    <PublicPage>
      <div className="container page-top">
        <Breadcrumbs label={t.common.breadcrumbs} items={[{ href: "/", label: t.common.home }, { label: t.nav.projects }]} />
        <div className="page-head">
          <div className="stack-sm">
            <h1 className="h1">{p.title}</h1>
            <p className="lead">{p.lead}</p>
            {projects.length > 0 && <p className="caption count num">{fmt(p.count, { n: projects.length })}</p>}
          </div>
          <Link className="btn btn-secondary" href="/projects/new">{p.submit}</Link>
        </div>
        {projects.length === 0 ? (
          <div className="empty">
            <Illo name="sheet" />
            <div><h2 className="h3">{p.emptyTitle}</h2><p className="muted">{p.emptyText}</p></div>
          </div>
        ) : (
          <div className={`cards reveal-stagger${wide ? " cards-2" : ""}`}>
            {projects.map((x) => (
              <Link key={x.id} href={`/projects/${x.id}`} className="pcard">
                <div className="pcard-top">
                  <span className="tag">{t.categories[x.category as keyof typeof t.categories] ?? x.category}</span>
                  <span className="badge-ok"><Check size={14} strokeWidth={2} aria-hidden="true" />{t.status.APPROVED}</span>
                </div>
                <h2>{x.title}</h2>
                <p>{x.summary}</p>
                <div className="pcard-foot">
                  <span>{fmt(t.project.author, { name: shortName(x.owner.name), grade: x.owner.grade ?? "—" })}</span>
                  <span className="arrow-link">{t.home.openProject}<ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PublicPage>
  );
}
