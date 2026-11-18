import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Talent Map" };

export default function TalentMap() {
  return (
    <ComingSoon
      eyebrow="Discover"
      title="Talent Map"
      description="Find out what you are good at and where you want to grow."
      accent="purple"
      icon={<Compass size={20} aria-hidden="true" />}
      features={[
        "A short questionnaire across eight competency areas: leadership, critical thinking, creativity, communication, entrepreneurship, technology, research and social impact.",
        "A personal profile showing your strongest areas.",
        "A development roadmap with projects and opportunities that match you."
      ]}
      blocker="The questions, scoring and interpretation must be approved by the programme’s methodology team first. We won’t show invented scores."
    />
  );
}
