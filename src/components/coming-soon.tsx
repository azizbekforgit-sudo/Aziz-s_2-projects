import Link from "next/link";
import { requireUser } from "@/lib/session";
import { getDict } from "@/i18n/server";
import { AppShell, PageHeader } from "./app-shell";

/** Honest page for a module that is specified but not built yet. */
export async function ComingSoon({ module }: { module: "talentMap" | "community" | "mentorship" }) {
  const [user, t] = await Promise.all([requireUser(), getDict()]);
  const m = t.soon[module];
  return (
    <AppShell user={user}>
      <PageHeader title={m.title} lead={m.description} action={<span className="meta">{t.soon.badge}</span>} />
      <div className="soon">
        <section className="panel stack" aria-labelledby="soon-what">
          <h2 id="soon-what" className="h3">{t.soon.what}</h2>
          <ul className="soon-list">{m.features.map((f) => <li key={f}>{f}</li>)}</ul>
        </section>
        <aside className="card stack-sm">
          <h2 className="h3">{t.soon.why}</h2>
          <p className="muted">{m.blocker}</p>
          <Link className="link-arrow mt-16" href="/dashboard">{t.soon.back}</Link>
        </aside>
      </div>
    </AppShell>
  );
}
