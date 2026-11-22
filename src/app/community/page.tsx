import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";
import { getDict } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getDict()).meta.community };
}

export default function Page() {
  return <ComingSoon module="community" />;
}
