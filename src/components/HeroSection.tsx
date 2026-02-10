import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToHomes = () => {
    document.getElementById("available-homes")?.scrollIntoView({ behavior: "smooth" });
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/972000000000?text=Hi, I'm interested in homes for sale in Zichron Yaakov", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Zichron Yaakov village overlooking the Mediterranean Sea"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
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
          className="text-lg md:text-xl text-primary-foreground/90 font-body font-light max-w-2xl mx-auto mb-4"
        >
          A clear and safe way to buy a home in Israel – even from abroad
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-sm md:text-base text-primary-foreground/70 font-body max-w-xl mx-auto mb-10"
        >
          Local expertise, personal guidance, and real opportunities you won't always find online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={scrollToHomes}
            className="bg-primary hover:bg-accent text-primary-foreground px-8 py-4 rounded-lg font-body font-medium text-base transition-all duration-300 hover:shadow-lg min-w-[220px]"
          >
            View Available Homes
          </button>
          <button
            onClick={openWhatsApp}
            className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/30 hover:bg-primary-foreground/20 text-primary-foreground px-8 py-4 rounded-lg font-body font-medium text-base transition-all duration-300 flex items-center gap-2 min-w-[220px] justify-center"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Us on WhatsApp
          </button>
        </motion.div>
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
