import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { ADMIN_ROLES, hasRole } from "@/lib/roles";
import { formatDate } from "@/lib/format";
import { getDict, getLocale } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Stamp } from "@/components/stamp";

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
      <PageHeader title={d.title} lead={d.lead} action={<Link href="/projects/new" className="btn btn-primary">{t.appNav.submit}</Link>} />
      <div className="stack-lg">
        {submitted === "project" && (
          <p className="alert alert-ok" role="status">
            <CheckCircle2 size={16} strokeWidth={1.5} aria-hidden="true" />
            <span><strong>{d.submittedTitle}</strong> {d.submittedText}</span>
          </p>
        )}
        {projects.length === 0 ? (
          <div className="empty">
            <h2 className="h3">{d.emptyTitle}</h2>
            <p className="muted">{d.emptyText}</p>
            <Link href="/projects/new" className="btn btn-primary mt-16">{d.emptyCta}</Link>
          </div>
        ) : (
          <section className="panel">
            <ul className="list">
              {projects.map((p) => (
                <li key={p.id} className="list-item">
                  <div className="list-main">
                    <Link href={`/projects/${p.id}`} className="list-title">{p.title}</Link>
                    <span className="meta">{fmt(d.submittedOn, { category: t.categories[p.category as keyof typeof t.categories] ?? p.category, date: formatDate(p.createdAt, locale) })}</span>
                    {p.reviewNote && <p className="note"><span className="note-label">{d.note}</span>{p.reviewNote}</p>}
                  </div>
                  <Stamp status={p.status} t={t} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </AppShell>
  );
}
