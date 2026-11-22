import type { Metadata } from "next";
import { AuthPage } from "@/components/auth-page";
import { getDict } from "@/i18n/server";
import { RegisterForm } from "./register-form";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.register };
}

export default function RegisterPage() {
  return (
    <AuthPage>
      <RegisterForm />
    </AuthPage>
  );
}
