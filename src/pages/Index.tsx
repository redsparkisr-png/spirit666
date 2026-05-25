import { Link } from "react-router-dom";
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
import SchemaOrg from "@/components/SchemaOrg";
import ClosingCTA from "@/components/ClosingCTA";
import SocialProofStrip from "@/components/SocialProofStrip";
import GoldDivider from "@/components/ui/gold-divider";

const Index = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const prefix = `/${lang}`;

  return (
    <main>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg font-body text-sm">
        {isHe ? "דלג לתוכן" : "Skip to content"}
      </a>
      <SchemaOrg />
      <Header />

      {/* 1. Hero */}
      <HeroSection />
      <div id="main-content" />

      {/* 2. Trust Bar */}
      <TrustBar />

      <GoldDivider />

      {/* 4. Featured Homes */}
      <AvailableHomes limit={6} />

      <GoldDivider />

      {/* 5. Buyer Guide section */}
      <div id="buyer-guide-section">
        <BlueprintPromoSection />
      </div>

      {/* 6. Lifestyle */}
      <LifestyleSection />

      <GoldDivider />

      {/* 7. Testimonials */}
      <Testimonials />

      <GoldDivider />

      {/* 9. Team Trust Section */}
      <TeamTrustSection />

      {/* Social proof strip */}
      <SocialProofStrip />

      {/* 9. Closing CTA */}
      <ClosingCTA />

      <TrustSection />
      <FloatingElements />
      <ExitIntentPopup />
    </main>
  );
};

export default Index;
