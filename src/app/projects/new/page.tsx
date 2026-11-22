import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import { getDict } from "@/i18n/server";
import { AppShell, PageHead } from "@/components/app-shell";
import { ProjectForm } from "./project-form";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.newProject };
}

export default async function NewProject() {
  const [user, t] = await Promise.all([requireUser(), getDict()]);
  return (
    <AppShell user={user}>
      <PageHead title={t.newProject.title} lead={t.newProject.lead} />
      <ProjectForm author={user.name} grade={user.grade} />
    </AppShell>
  );
}
