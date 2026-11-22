import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PUBLIC_PROJECT_STATUSES } from "@/lib/projects";
import { shortName } from "@/lib/format";
import { getDict } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import { PublicPage } from "@/components/public-page";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.projects };
}

export default async function Projects() {
  const [t, projects] = await Promise.all([
    getDict(),
    prisma.project.findMany({
      where: { status: { in: [...PUBLIC_PROJECT_STATUSES] } },
      include: { owner: { select: { name: true, grade: true } } },
      orderBy: { createdAt: "desc" },
      take: 60
    })
  ]);
  const p = t.projects;
  return (
    <PublicPage>
      <div className="container section">
        <div className="page-header">
          <div className="stack-sm">
            <h1 className="title">{p.title}</h1>
            <p className="muted">{p.lead}</p>
          </div>
          <Link className="btn btn-secondary" href="/projects/new">{p.submit}</Link>
        </div>
        {projects.length === 0 ? (
          <div className="empty">
            <h2 className="h3">{p.emptyTitle}</h2>
            <p className="muted">{p.emptyText}</p>
          </div>
        ) : (
          <div className="cards">
            {projects.map((x) => (
              <Link key={x.id} href={`/projects/${x.id}`} className="card project-card">
                <span className="meta">{t.categories[x.category as keyof typeof t.categories] ?? x.category}</span>
                <h2>{x.title}</h2>
                <p>{x.summary}</p>
                <span className="meta">{fmt(t.project.author, { name: shortName(x.owner.name), grade: x.owner.grade ?? "—" })}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PublicPage>
  );
}
