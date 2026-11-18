import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import { getDict } from "@/i18n/server";
import { AppShell, PageHeader } from "@/components/app-shell";
import { ProjectForm } from "./project-form";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.newProject };
}

export default async function NewProject() {
  const [user, t] = await Promise.all([requireUser(), getDict()]);
  return (
    <AppShell user={user}>
      <div className="accent-pink">
        <PageHeader eyebrow={t.newProject.eyebrow} title={t.newProject.title} description={t.newProject.lead} />
      </div>
      <div className="card card-pad-lg">
        <ProjectForm />
      </div>
    </AppShell>
  );
}
