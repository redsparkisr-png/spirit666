import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MicroTrustLine from "@/components/MicroTrustLine";
import { FeaturedTestimonial, BottomTestimonial } from "@/components/Testimonials";
import AvailableHomes from "@/components/AvailableHomes";
import ContactForm from "@/components/ContactForm";
import SoldHomes from "@/components/SoldHomes";
import WhyDifferent from "@/components/WhyDifferent";
import LifestyleSection from "@/components/LifestyleSection";
import Testimonials from "@/components/Testimonials";
import TrustSection from "@/components/TrustSection";
import FloatingElements from "@/components/FloatingElements";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import CookieNotice from "@/components/CookieNotice";
import BlueprintSection from "@/components/BlueprintSection";
import MarketSnapshot from "@/components/MarketSnapshot";
import SchemaOrg from "@/components/SchemaOrg";

const Index = () => {
  return (
    <main>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-charcoal focus:text-white focus:px-4 focus:py-2 focus:rounded-lg font-body text-sm">
        Skip to content
      </a>
      <SchemaOrg />
      <Header />
      <HeroSection />
      <div id="main-content" />
      <MicroTrustLine />
      <FeaturedTestimonial />
      <AvailableHomes />
      <MarketSnapshot />
      <ContactForm />
      <SoldHomes />
      <WhyDifferent />
      <BlueprintSection />
      <LifestyleSection />
      <Testimonials />
      <BottomTestimonial />
      <TrustSection />
      <FloatingElements />
      <ExitIntentPopup />
      <CookieNotice />
    </main>
  );
};

export default Index;
