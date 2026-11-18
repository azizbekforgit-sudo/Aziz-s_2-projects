import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Mentorship" };

export default function Mentorship() {
  return (
    <ComingSoon
      eyebrow="Learn with guidance"
      title="Mentorship"
      description="Get guidance from verified mentors."
      accent="gold"
      icon={<GraduationCap size={20} aria-hidden="true" />}
      features={[
        "Verified mentors from universities, companies and NGOs.",
        "Safe matching based on your interests and projects.",
        "Moderated communication that protects students under 18."
      ]}
      blocker="Mentor verification and child-safe communication rules must be in place first, because most students are minors."
    />
  );
}
