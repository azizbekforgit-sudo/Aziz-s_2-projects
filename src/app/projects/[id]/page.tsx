import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PUBLIC_PROJECT_STATUSES } from "@/lib/projects";
import { ADMIN_ROLES, MODERATOR_ROLES, hasRole } from "@/lib/roles";
import { formatDate, shortName } from "@/lib/format";
import { getDict, getLocale } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import { PublicPage } from "@/components/public-page";
import { Stamp } from "@/components/stamp";
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
  // Staff see the full name and school to verify the author; the public sees "Aziza K.".
  const author = fmt(pt.author, { name: isStaff || isOwner ? p.owner.name : shortName(p.owner.name), grade: p.owner.grade ?? "—" });

  return (
    <PublicPage>
      <div className="container section">
        <Link href={isStaff ? "/admin" : isOwner ? "/dashboard" : "/projects"} className="back-link">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" /> {isStaff ? t.appNav.admin : isOwner ? t.appNav.myProjects : pt.back}
        </Link>
        <div className="doc">
          <article className="sheet">
            <p className="meta">{t.categories[p.category as keyof typeof t.categories] ?? p.category}</p>
            <h1 className="sheet-title">{p.title}</h1>
            <p className="sheet-author">{author}{isStaff && p.owner.schoolName ? ` · ${p.owner.schoolName}` : ""}</p>
            <dl>
              <div className="sheet-block"><dt>{pt.summary}</dt><dd>{p.summary}</dd></div>
              {p.problemStatement && <div className="sheet-block"><dt>{pt.problem}</dt><dd>{p.problemStatement}</dd></div>}
              {p.proposedSolution && <div className="sheet-block"><dt>{pt.solution}</dt><dd>{p.proposedSolution}</dd></div>}
            </dl>
            <div className="sheet-foot">
              <span className="meta">{fmt(pt.submitted, { date: formatDate(p.createdAt, locale) })}</span>
              <Stamp status={p.status} t={t} large />
            </div>
          </article>
          <aside className="doc-side">
            {!isPublic && <p className="alert">{pt.private}</p>}
            {p.reviewNote && (isOwner || isStaff) && <p className="note"><span className="note-label">{pt.note}</span>{p.reviewNote}</p>}
            {canModerate && p.status === "PENDING_REVIEW" && <ReviewForm projectId={p.id} />}
          </aside>
        </div>
      </div>
    </PublicPage>
  );
}
