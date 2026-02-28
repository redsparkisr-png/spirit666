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
        height: "clamp(54vh, 58vw, 60vh)",
        paddingTop: "max(72px, env(safe-area-inset-top))",
        paddingBottom: "max(16px, env(safe-area-inset-bottom))",
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt="Zichron Yaakov village overlooking the Mediterranean Sea"
          className="w-full h-full object-cover scale-105"
          style={{ objectPosition: "center 75%", filter: "contrast(1.08) saturate(1.12) brightness(0.88)" }}
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
        />
        {/* Light overall gradient — NOT heavy */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center px-6 flex-1 flex flex-col items-center justify-center"
        style={{ paddingTop: "clamp(104px, 14vw, 140px)" }}
      >
        {/* Localized scrim behind text group only */}
        <div
          className="absolute rounded-2xl"
          style={{
            inset: "auto",
            width: "100%",
            maxWidth: "56rem",
            height: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -55%)",
            padding: "48px 32px 56px",
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.0) 75%)",
            pointerEvents: "none",
          }}
        />

        {/* Brand line — always visible */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: "clamp(14px, 2vw, 16px)",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#F3F3F3",
            textShadow: "0 2px 14px rgba(0,0,0,0.35)",
            marginBottom: "10px",
          }}
          className="font-body relative z-10"
        >
          SPIRIT REAL ESTATE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white max-w-4xl mx-auto px-4 mb-12 relative z-10"
          style={{
            fontSize: "clamp(26px, 5vw, 48px)",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 16px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3)",
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
        <div className="max-w-4xl mx-auto rounded-2xl p-4 md:p-6 border border-white/[0.18]" style={{ background: "rgba(0,0,0,0.5)", boxShadow: "0 10px 40px rgba(0,0,0,0.35)" }}>
          <SearchBar />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
