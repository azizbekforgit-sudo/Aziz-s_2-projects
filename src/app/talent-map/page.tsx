import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";
import { getDict } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.talentMap };
}

export default function Page() {
  return <ComingSoon module="talentMap" accent="violet" icon={<Compass size={20} aria-hidden="true" />} />;
}
