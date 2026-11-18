import type { Metadata } from "next";
import { Award, CalendarClock, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { getDict, getLocale } from "@/i18n/server";
import { PublicPage } from "@/components/public-page";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.opportunities };
}

export default async function Opportunities() {
  const [t, locale] = await Promise.all([getDict(), getLocale()]);
  const items = await prisma.opportunity.findMany({
    // hide expired ones; open-ended (no deadline) stay visible
    where: { status: "APPROVED", OR: [{ deadline: null }, { deadline: { gte: new Date() } }] },
    orderBy: [{ deadline: { sort: "asc", nulls: "last" } }, { createdAt: "desc" }],
    take: 40
  });
  const o = t.opportunities;
  return (
    <PublicPage>
      <div className="container section accent-amber">
        <div className="section-head">
          <div className="stack">
            <span className="eyebrow">{o.eyebrow}</span>
            <h1 className="h2">{o.title}</h1>
            <p className="muted">{o.lead}</p>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="empty">
            <span className="icon-tile icon-tile-solid"><Award size={20} aria-hidden="true" /></span>
            <h2 className="card-title">{o.emptyTitle}</h2>
            <p className="muted">{o.emptyText}</p>
          </div>
        ) : (
          <div className="grid-3">
            {items.map((x) => (
              <article key={x.id} className="card project-card">
                <span className="chip">{x.category}</span>
                <h2>{x.title}</h2>
                <p>{x.description}</p>
                <div className="project-meta">
                  <span>{x.organizer}</span>
                  {x.deadline && <span className="row"><CalendarClock size={14} aria-hidden="true" /> {formatDate(x.deadline, locale)}</span>}
                </div>
                {x.officialUrl && (
                  <a className="btn btn-secondary btn-sm" href={x.officialUrl} target="_blank" rel="noopener noreferrer">
                    {o.official} <ExternalLink size={14} aria-hidden="true" /><span className="sr-only"> {t.common.newTab}</span>
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
