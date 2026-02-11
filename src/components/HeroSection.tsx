import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToHomes = () => {
    document.getElementById("available-homes")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Zichron Yaakov village overlooking the Mediterranean Sea"
          className="w-full h-full object-cover object-[center_35%]"
          style={{ filter: 'contrast(1.1) saturate(1.15) brightness(1.02)' }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/25 to-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-primary-foreground/80 font-body text-sm tracking-[0.2em] uppercase mb-6"
        >
          Spirit Real Estate
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-primary-foreground leading-tight mb-6 max-w-3xl mx-auto"
        >
          Homes for Sale in Zichron Yaakov
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-primary-foreground/90 font-body font-light max-w-2xl mx-auto mb-10"
        >
          Exclusive Homes. Local Expertise. A Seamless Buying Experience from Anywhere in the World.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <button
            onClick={scrollToHomes}
            className="bg-primary hover:bg-accent text-primary-foreground px-8 py-4 rounded-lg font-body font-medium text-base transition-all duration-300 hover:shadow-lg min-w-[220px]"
          >
            View Available Homes
          </button>
          <button
            onClick={scrollToForm}
            className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/30 hover:bg-primary-foreground/20 text-primary-foreground px-8 py-4 rounded-lg font-body font-medium text-base transition-all duration-300 flex items-center gap-2 min-w-[220px] justify-center"
          >
            Get Off-Market Opportunities
          </button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-primary-foreground/50 font-body text-xs md:text-sm tracking-wide max-w-xl mx-auto"
        >
          Trusted by International Buyers · Discreet Off-Market Access · Personal Guidance from Start to Finish
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
