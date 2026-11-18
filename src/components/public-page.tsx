import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

/** Layout for public pages: header + content + footer. */
export function PublicPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="page page-public">
      <SiteHeader />
      <main id="main" className="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
