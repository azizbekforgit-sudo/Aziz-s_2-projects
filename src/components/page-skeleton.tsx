import { getDict } from "@/i18n/server";

/** Skeleton for list pages while data loads. Not used at the root: a root loading.tsx stops server actions (moderation) from refreshing the page. */
export async function PageSkeleton() {
  const t = await getDict();
  return (
    <div className="container page-top" role="status" aria-label={t.common.loading}>
      <div className="stack">
        <div className="skeleton sk-line" />
        <div className="skeleton sk-title" />
        <div className="skeleton sk-line" />
      </div>
      <div className="cards mt-32">
        <div className="skeleton sk-card" /><div className="skeleton sk-card" /><div className="skeleton sk-card" />
      </div>
    </div>
  );
}
