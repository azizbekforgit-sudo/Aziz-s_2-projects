import type { Metadata } from "next";
import { Info } from "lucide-react";
import { AuthPage } from "@/components/auth-page";
import { getDict } from "@/i18n/server";
import { LoginForm } from "./login-form";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.login };
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; callbackUrl?: string }> }) {
  const [sp, t] = await Promise.all([searchParams, getDict()]);
  return (
    <AuthPage artTitle={t.login.asideTitle} artText={t.login.asideText}>
      <div className="stack-sm">
        <h1 className="h1">{t.login.title}</h1>
        <p className="muted">{t.login.lead}</p>
      </div>
      {sp.error === "inactive" && <p className="notice notice-info" role="status"><Info size={18} strokeWidth={1.8} aria-hidden="true" />{t.login.inactiveQuery}</p>}
      <LoginForm callbackUrl={sp.callbackUrl} />
    </AuthPage>
  );
}
