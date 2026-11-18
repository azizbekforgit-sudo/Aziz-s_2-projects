import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Talent to Impact — Every talent deserves an opportunity",
  description: "Discover talent. Develop skills. Create impact. Share opportunities."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="uz"><body>{children}</body></html>;
}
