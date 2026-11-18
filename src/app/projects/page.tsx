import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PUBLIC_PROJECT_STATUSES } from "@/lib/projects";
import { PublicPage } from "@/components/public-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Student projects" };

const CATEGORY_ACCENT: Record<string, string> = {
  Technology: "cyan", Engineering: "cyan", Business: "gold", Education: "purple", Ecology: "pink", "Social Innovation": "pink"
};

export default async function Projects() {
  const projects = await prisma.project.findMany({
    where: { status: { in: [...PUBLIC_PROJECT_STATUSES] } },
    include: { owner: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 30
  });
  return (
    <PublicPage>
      <div className="container section">
        <div className="section-head">
          <div className="stack">
            <span className="eyebrow">Build something meaningful</span>
            <h1 className="h2">Student projects</h1>
            <p className="muted">Ideas and initiatives from students across Uzbekistan. Every project here was reviewed by a moderator.</p>
          </div>
          <Link className="btn btn-primary" href="/projects/new">Submit a project</Link>
        </div>
        {projects.length === 0 ? (
          <div className="empty">
            <span className="icon-tile accent-pink"><Rocket size={20} aria-hidden="true" /></span>
            <h2 className="card-title">No published projects yet</h2>
            <p className="muted">Approved projects will appear here. Be the first — submit yours and a moderator will review it.</p>
            <Link className="btn btn-primary" href="/projects/new">Submit the first project</Link>
          </div>
        ) : (
          <div className="grid-3">
            {projects.map((p) => (
              <article key={p.id} className={`card project-card accent-${CATEGORY_ACCENT[p.category] ?? "purple"}`}>
                <span className="mechanism-tag">{p.category}</span>
                <h2 className="card-title">{p.title}</h2>
                <p>{p.summary}</p>
                <div className="project-meta"><User size={14} aria-hidden="true" /> {p.owner.name}</div>
              </article>
            ))}
          </div>
        )}
      </div>
    </PublicPage>
  );
}
