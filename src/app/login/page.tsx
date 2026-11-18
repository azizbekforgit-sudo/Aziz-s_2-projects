import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth-layout";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

const QUERY_MESSAGES: Record<string, string> = {
  inactive: "Your account isn’t active. If you just registered, wait for an administrator to approve it."
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; callbackUrl?: string; registered?: string }> }) {
  const sp = await searchParams;
  return (
    <AuthLayout>
      <div className="auth-card-head">
        <span className="eyebrow">Welcome back</span>
        <h1 className="h2">Sign in to your space</h1>
        <p className="muted">Continue your journey from potential to impact.</p>
      </div>
      {sp.error && QUERY_MESSAGES[sp.error] && <div className="alert alert-info" role="status">{QUERY_MESSAGES[sp.error]}</div>}
      <LoginForm callbackUrl={sp.callbackUrl} />
    </AuthLayout>
  );
}
