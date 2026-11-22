import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function PublicPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <SiteHeader />
      <main id="main" className="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
