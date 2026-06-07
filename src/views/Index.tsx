"use client";

import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import AvailableHomes from "@/components/AvailableHomes";
import LifestyleSection from "@/components/LifestyleSection";
import BlueprintPromoSection from "@/components/BlueprintPromoSection";
import Testimonials from "@/components/Testimonials";
import TeamTrustSection from "@/components/TeamTrustSection";
import TrustSection from "@/components/TrustSection";
import FloatingElements from "@/components/FloatingElements";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ClosingCTA from "@/components/ClosingCTA";
import GoldDivider from "@/components/ui/gold-divider";

const Index = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  return (
    <main>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg font-body text-sm">
        {isHe ? "דלג לתוכן" : "Skip to content"}
      </a>
      <Header />
      <HeroSection />
      <div id="main-content" />
      <TrustBar />
      <GoldDivider />
      <AvailableHomes limit={6} />
      <GoldDivider />
      <div id="buyer-guide-section">
        <BlueprintPromoSection />
      </div>
      <LifestyleSection />
      <GoldDivider />
      <Testimonials />
      <GoldDivider />
      <TeamTrustSection />
      <ClosingCTA />
      <TrustSection />
      <FloatingElements />
      <ExitIntentPopup />
    </main>
  );
};

export default Index;
