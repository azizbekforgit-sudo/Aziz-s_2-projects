import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { getDict, getLocale } from "@/i18n/server";
import { fmt } from "@/i18n/fmt";
import { PublicPage } from "@/components/public-page";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.opportunities };
}

export default async function Opportunities() {
  const [t, locale] = await Promise.all([getDict(), getLocale()]);
  const items = await prisma.opportunity.findMany({
    // expired ones are hidden; open-ended (no deadline) stay
    where: { status: "APPROVED", OR: [{ deadline: null }, { deadline: { gte: new Date() } }] },
    orderBy: [{ deadline: { sort: "asc", nulls: "last" } }, { createdAt: "desc" }],
    take: 60
  });
  const o = t.opportunities;
  return (
    <PublicPage>
      <div className="container section">
        <div className="page-header">
          <div className="stack-sm">
            <h1 className="title">{o.title}</h1>
            <p className="muted">{o.lead}</p>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="empty">
            <h2 className="h3">{o.emptyTitle}</h2>
            <p className="muted">{o.emptyText}</p>
          </div>
        ) : (
          <div className="cards">
            {items.map((x) => (
              <article key={x.id} className="card project-card">
                <span className="meta">{t.oppCategories[x.category as keyof typeof t.oppCategories] ?? x.category} · {x.deadline ? fmt(o.deadline, { date: formatDate(x.deadline, locale) }) : o.open}</span>
                <h2>{x.title}</h2>
                <p>{x.description}</p>
                <span className="meta">{x.organizer}</span>
                {x.officialUrl && (
                  <a className="link-arrow mt-16" href={x.officialUrl} target="_blank" rel="noopener noreferrer">
                    {o.official} <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" /><span className="sr-only"> {t.common.newTab}</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </PublicPage>
  );
}
