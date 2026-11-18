import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth-layout";
import { getDict, getLocale } from "@/i18n/server";
import { RegisterForm } from "./register-form";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.register };
}

export default async function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm defaultLang={await getLocale()} />
    </AuthLayout>
  );
}
