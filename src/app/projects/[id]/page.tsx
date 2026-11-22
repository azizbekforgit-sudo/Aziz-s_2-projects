import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PUBLIC_PROJECT_STATUSES } from "@/lib/projects";
import { ADMIN_ROLES, MODERATOR_ROLES, hasRole } from "@/lib/roles";
import { formatDate, shortName } from "@/lib/format";
import { getDict, getLocale } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import { PublicPage } from "@/components/public-page";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Stamp } from "@/components/stamp";
import { ProjectBody } from "@/components/project-body";
import { ReviewForm } from "./review-form";

/**
 * Who can see a project:
 * - approved ones: everyone;
 * - anything else: only the owner and admin roles (unknown → 404, so we don't reveal that it exists).
 */
async function loadProject(id: string) {
  const [project, session] = await Promise.all([
    prisma.project.findUnique({ where: { id }, include: { owner: { select: { name: true, grade: true, schoolName: true } } } }),
    auth()
  ]);
  if (!project) return null;
  const viewer = session?.user?.id ? await prisma.user.findUnique({ where: { id: session.user.id }, select: { id: true, role: true, status: true } }) : null;
  const active = viewer?.status === "ACTIVE" ? viewer : null;
  const isOwner = active?.id === project.ownerId;
  const isStaff = hasRole(active?.role, ADMIN_ROLES);
  const isPublic = (PUBLIC_PROJECT_STATUSES as readonly string[]).includes(project.status);
  if (!isPublic && !isOwner && !isStaff) return null;
  return { project, isOwner, isStaff, isPublic, canModerate: hasRole(active?.role, MODERATOR_ROLES) };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const data = await loadProject((await params).id);
  return { title: data?.project.title };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const [data, t, locale] = await Promise.all([loadProject((await params).id), getDict(), getLocale()]);
  if (!data) notFound();
  const { project: p, isOwner, isStaff, isPublic, canModerate } = data;
  const pt = t.project;
  // Staff and the owner see the full name (and staff the school) to verify the author; the public sees "Aziza K.".
  const author = fmt(pt.author, { name: isStaff || isOwner ? p.owner.name : shortName(p.owner.name), grade: p.owner.grade ?? "—" }) + (isStaff && p.owner.schoolName ? ` · ${p.owner.schoolName}` : "");
  const crumbs = isStaff ? { href: "/admin", label: t.nav.moderation } : isOwner && !isPublic ? { href: "/dashboard", label: t.nav.myProjects } : { href: "/projects", label: t.nav.projects };
  const toc = [
    { id: "summary", label: pt.summary },
    ...(p.problemStatement ? [{ id: "problem", label: pt.problem }] : []),
    ...(p.proposedSolution ? [{ id: "solution", label: pt.solution }] : [])
  ];

  return (
    <PublicPage>
      <div className="container page-top">
        <Breadcrumbs label={t.common.breadcrumbs} items={[{ href: "/", label: t.common.home }, crumbs, { label: p.title }]} />
        <div className="doc">
          <article>
            <header className="doc-head">
              <span className="tag">{t.categories[p.category as keyof typeof t.categories] ?? p.category}</span>
              <h1 className="h1">{p.title}</h1>
              <div className="doc-meta">
                <span>{author}</span>
                <span className="caption">{fmt(pt.submitted, { date: formatDate(p.createdAt, locale) })}</span>
                <Stamp status={p.status} t={t} large animate />
              </div>
            </header>
            <ProjectBody t={t} summary={p.summary} problem={p.problemStatement} solution={p.proposedSolution} />
          </article>
          <aside className="doc-side">
            {!isPublic && <p className="notice notice-info">{pt.private}</p>}
            {p.reviewNote && (isOwner || isStaff) && <p className="comment"><span className="comment-label">{pt.note}</span>{p.reviewNote}</p>}
            {canModerate && p.status === "PENDING_REVIEW" ? (
              <ReviewForm projectId={p.id} />
            ) : (
              toc.length > 1 && (
                <nav className="card toc" aria-labelledby="toc-title">
                  <h2 id="toc-title" className="caption">{pt.contents}</h2>
                  <ol>{toc.map((x, i) => <li key={x.id}><a href={`#${x.id}`}><span className="idx">{String(i).padStart(2, "0")}</span>{x.label}</a></li>)}</ol>
                </nav>
              )
            )}
          </aside>
        </div>
      </div>
    </PublicPage>
  );
}
