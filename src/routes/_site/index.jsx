import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/hero/HeroSection";
import ImageGallery from "@/components/home/ImageGallery";
import PracticeVerticals from "@/components/PracticeVerticals";
import ApproachSection from "@/components/home/ApproachSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ExpertiseSection from "@/components/home/ExpertiseSection";
import TeamSection from "@/components/home/TeamSection";
import PersonaPortal from "@/components/PersonaPortal";
import ProcessTimeline from "@/components/ProcessTimeline";
import CtaBand from "@/components/CtaBand";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Money Setu — Connecting You to Financial Solutions" },
      {
        name: "description",
        content:
          "Single-window debt syndication, taxation, business setup, virtual CFO and valuation advisory for Indian MSMEs, startups and professionals.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <ImageGallery />
      <PracticeVerticals />
      <ApproachSection />
      <WhyChooseUs />
      <ExpertiseSection />
      <TeamSection />
      <PersonaPortal />
      <ProcessTimeline />
      <CtaBand />
    </>
  );
}