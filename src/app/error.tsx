"use client";
import { useI18n } from "@/i18n/client";

/** Shown when a page throws. Offers a retry instead of a blank screen. */
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const { t } = useI18n();
  return (
    <main id="main" className="container page-top">
      <div className="empty">
        <div className="stack-sm">
          <h1 className="h2">{t.states.errorTitle}</h1>
          <p className="muted">{t.states.errorText}</p>
          <div className="row mt-8"><button type="button" className="btn btn-primary" onClick={reset}>{t.states.retry}</button></div>
        </div>
      </div>
    </main>
  );
}
