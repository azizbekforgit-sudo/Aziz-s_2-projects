import type { Metadata } from "next";
import { Network } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";
import { getDict } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.community };
}

export default function Page() {
  return <ComingSoon module="community" accent="teal" icon={<Network size={20} aria-hidden="true" />} />;
}
