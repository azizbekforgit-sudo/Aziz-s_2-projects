import Link from "next/link";
import { requireUser } from "@/lib/session";
import { getDict } from "@/i18n/server";
import { AppShell, PageHead } from "./app-shell";
import { Illo } from "./graphics";

const ILLO = { talentMap: "talent", community: "bridge", mentorship: "mentor" } as const;

/** A roadmap page for a module that is specified but not built yet. Never imitates working features. */
export async function ComingSoon({ module }: { module: "talentMap" | "community" | "mentorship" }) {
  const [user, t] = await Promise.all([requireUser(), getDict()]);
  const m = t.soon[module];
  return (
    <AppShell user={user}>
      <PageHead eyebrow={t.soon.badge} title={m.title} lead={m.description} />
      <div className="soon-page">
        <section className="panel grid-paper soon-hero" aria-labelledby="soon-what">
          <Illo name={ILLO[module]} />
          <h2 id="soon-what" className="h3">{t.soon.what}</h2>
          <ul className="soon-list">{m.features.map((f) => <li key={f}>{f}</li>)}</ul>
        </section>
        <aside className="card stack-sm">
          <h2 className="h3">{t.soon.why}</h2>
          <p className="muted">{m.blocker}</p>
          <Link className="arrow-link mt-16" href="/dashboard">{t.soon.back}</Link>
        </aside>
      </div>
    </AppShell>
  );
}
