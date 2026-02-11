import HeroSection from "@/components/HeroSection";
import MicroTrustLine from "@/components/MicroTrustLine";
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

const Index = () => {
  return (
    <main>
      <HeroSection />
      <MicroTrustLine />
      <AvailableHomes />
      <ContactForm />
      <SoldHomes />
      <WhyDifferent />
      <LifestyleSection />
      <Testimonials />
      <TrustSection />
      <FloatingElements />
      <ExitIntentPopup />
      <CookieNotice />
    </main>
  );
};

export default Index;
