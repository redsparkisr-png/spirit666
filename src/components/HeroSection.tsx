import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  const { t } = useSiteContent();

  return (
    <section
      className="relative flex flex-col items-center justify-center"
      style={{
        minHeight: "100svh",
        paddingTop: "max(72px, env(safe-area-inset-top))",
        paddingBottom: "max(24px, env(safe-area-inset-bottom))",
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt="Zichron Yaakov village overlooking the Mediterranean Sea"
          className="w-full h-full object-cover object-[center_35%] scale-105"
          style={{ filter: "contrast(1.08) saturate(1.12) brightness(0.92)" }}
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center px-6 flex-1 flex flex-col items-center justify-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/60 font-body text-xs tracking-[0.25em] uppercase mb-8"
        >
          {t("home.hero.pre_title")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white max-w-4xl mx-auto px-4 mb-12"
          style={{
            fontSize: "clamp(28px, 5.5vw, 52px)",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            textShadow: "0 1px 8px rgba(0,0,0,0.3)",
            textWrap: "balance",
          }}
        >
          {t("home.hero.headline")}
        </motion.h1>
      </div>

      {/* Search bar at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative z-10 w-full px-4 pb-8 md:pb-12"
      >
        <SearchBar />
      </motion.div>
    </section>
  );
};

export default HeroSection;
