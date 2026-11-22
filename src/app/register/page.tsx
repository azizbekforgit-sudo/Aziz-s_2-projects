import type { Metadata } from "next";
import { AuthPage } from "@/components/auth-page";
import { getDict } from "@/i18n/server";
import { RegisterForm } from "./register-form";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.register };
}

export default async function RegisterPage() {
  const t = await getDict();
  return (
    <AuthPage artTitle={t.register.asideTitle} artText={t.register.asideText}>
      <RegisterForm />
    </AuthPage>
  );
}
