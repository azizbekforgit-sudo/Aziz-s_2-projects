import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import { AppShell, PageHeader } from "@/components/app-shell";
import { ProjectForm } from "./project-form";

export const metadata: Metadata = { title: "Submit a project" };

export default async function NewProject() {
  const user = await requireUser();
  return (
    <AppShell user={user}>
      <PageHeader eyebrow="School Hack · Create" title="Submit a project" description="Describe a real problem and how you would solve it. A moderator reviews every project before it is published." />
      <div className="card card-pad-lg">
        <ProjectForm />
      </div>
    </AppShell>
  );
}
