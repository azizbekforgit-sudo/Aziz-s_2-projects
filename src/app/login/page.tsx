import type { Metadata } from "next";
import { Info } from "lucide-react";
import { AuthLayout } from "@/components/auth-layout";
import { getDict } from "@/i18n/server";
import { LoginForm } from "./login-form";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.login };
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; callbackUrl?: string }> }) {
  const [sp, t] = await Promise.all([searchParams, getDict()]);
  return (
    <AuthLayout>
      <div className="auth-card-head">
        <span className="eyebrow">{t.login.eyebrow}</span>
        <h1 className="h2">{t.login.title}</h1>
        <p className="muted">{t.login.lead}</p>
      </div>
      {sp.error === "inactive" && <div className="alert alert-info" role="status"><Info size={18} aria-hidden="true" /><span>{t.login.inactiveQuery}</span></div>}
      <LoginForm callbackUrl={sp.callbackUrl} />
    </AuthLayout>
  );
}
