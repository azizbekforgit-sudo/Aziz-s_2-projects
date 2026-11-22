import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { ADMIN_ROLES, hasRole } from "@/lib/roles";
import { formatDate } from "@/lib/format";
import { getDict, getLocale } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import { AppShell, PageHead } from "@/components/app-shell";
import { Stamp } from "@/components/stamp";
import { Illo } from "@/components/graphics";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.dashboard };
}

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ submitted?: string }> }) {
  const user = await requireUser();
  // Moderators have no student projects; their home is the moderation queue.
  if (hasRole(user.role, ADMIN_ROLES)) redirect("/admin");
  const [{ submitted }, t, locale, projects] = await Promise.all([
    searchParams,
    getDict(),
    getLocale(),
    prisma.project.findMany({ where: { ownerId: user.id }, orderBy: { createdAt: "desc" } })
  ]);
  const d = t.dashboard;

  return (
    <AppShell user={user}>
      <PageHead title={d.title} lead={d.lead} action={<Link href="/projects/new" className="btn btn-primary btn-lg">{t.appNav.submit}</Link>} />
      {submitted === "project" && (
        <p className="notice notice-success mt-8" role="status">
          <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
          <span><strong>{d.submittedTitle}</strong> {d.submittedText}</span>
        </p>
      )}
      {projects.length === 0 ? (
        <div className="empty mt-24">
          <Illo name="sheet" />
          <div className="stack-sm">
            <h2 className="h3">{d.emptyTitle}</h2>
            <p className="muted">{d.emptyText}</p>
            <div className="mt-8"><Link href="/projects/new" className="btn btn-primary">{d.emptyCta}</Link></div>
          </div>
        </div>
      ) : (
        <ul className="list mt-24" aria-label={d.title}>
          {projects.map((p) => (
            <li key={p.id} className="myp">
              <div className="stack-sm">
                <h2 className="myp-title"><Link href={`/projects/${p.id}`}>{p.title}</Link></h2>
                <p className="caption">{fmt(d.submittedOn, { category: t.categories[p.category as keyof typeof t.categories] ?? p.category, date: formatDate(p.createdAt, locale) })}</p>
                <p className="muted">{p.summary}</p>
                {p.status === "REJECTED" && p.reviewNote && <p className="comment mt-8"><span className="comment-label">{d.note}</span>{p.reviewNote}</p>}
              </div>
              <div className="myp-status">
                <Stamp status={p.status} t={t} large />
                {p.status === "PENDING_REVIEW" && <span className="caption">{d.pendingHint}</span>}
                {p.status === "APPROVED" && <Link className="arrow-link" href={`/projects/${p.id}`}>{d.approvedLink}<ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" /></Link>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
