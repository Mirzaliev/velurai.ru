import type { Metadata } from "next";
import {
  AnimatedBackground,
  FAQ,
  Features,
  FinalCTA,
  Footer,
  Hero,
  HowItWorks,
  Navbar,
  Pricing,
  Testimonials,
  VpnSection,
  WhyUs,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "Nebula AI — Единая платформа искусственного интеллекта",
  description:
    "AI-агенты для преподавателей, бизнеса и частных пользователей. Автоматизируйте работу, экономьте часы и масштабируйтесь быстрее.",
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white antialiased">
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <WhyUs />
        <VpnSection />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
