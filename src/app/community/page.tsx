import type { Metadata } from "next";
import { Network } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Knowledge Bridge" };

export default function Community() {
  return (
    <ComingSoon
      eyebrow="Connect"
      title="Knowledge Bridge"
      description="Learn from peers and share what you know."
      accent="cyan"
      icon={<Network size={20} aria-hidden="true" />}
      features={[
        "Regional communities that connect students across Uzbekistan.",
        "Peer-to-peer learning sessions led by students.",
        "A moderated library of guides and materials."
      ]}
      blocker="Posts and file uploads need moderation and safety scanning before they can be opened to students."
    />
  );
}
