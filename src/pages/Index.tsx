import HeroSection from "@/components/HeroSection";
import MicroTrustLine from "@/components/MicroTrustLine";
import AvailableHomes from "@/components/AvailableHomes";
import ContactForm from "@/components/ContactForm";
import SoldHomes from "@/components/SoldHomes";
import WhyDifferent from "@/components/WhyDifferent";
import Testimonials from "@/components/Testimonials";
import TrustSection from "@/components/TrustSection";
import FloatingElements from "@/components/FloatingElements";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <MicroTrustLine />
      <AvailableHomes />
      <ContactForm />
      <SoldHomes />
      <WhyDifferent />
      <Testimonials />
      <TrustSection />
      <FloatingElements />
    </main>
  );
};

export default Index;
