import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/lib/i18n";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  const { t } = useSiteContent();
  const { lang } = useLanguage();

  // Premium copy with fallbacks
  const subline =
    lang === "he"
      ? "בוטיק נדל״ן לתושבי חוץ. דיסקרטי, אסטרטגי ומחובר לשטח."
      : "Boutique representation for international buyers. Discreet, strategic, and locally connected.";

  return (
    <section className="relative flex flex-col items-center overflow-visible">
      {/* Background image — positioned absolute so it doesn't affect flow */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt="Zichron Yaakov village overlooking the Mediterranean Sea"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center 72%",
            filter: "contrast(1.06) saturate(1.1) brightness(0.92)",
          }}
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
        />
        {/* Subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/55" />
      </div>

      {/* Content — in normal flow, NOT absolute */}
      <div
        className="relative z-10 w-full flex flex-col items-center text-center px-5"
        style={{
          paddingTop: "clamp(110px, 16vw, 150px)",
          paddingBottom: "24px",
        }}
      >
        {/* Localized scrim behind text only */}
        <div
          className="absolute rounded-3xl pointer-events-none"
          style={{
            width: "min(90%, 52rem)",
            top: "clamp(70px, 10vw, 110px)",
            left: "50%",
            transform: "translateX(-50%)",
            height: "auto",
            minHeight: "160px",
            bottom: "auto",
            padding: "60px 40px 80px",
            background:
              "radial-gradient(ellipse at center top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.0) 72%)",
          }}
        />

        {/* Brand line */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative z-10 font-body"
          style={{
            fontSize: "clamp(12px, 1.8vw, 15px)",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#F3F3F3",
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            marginBottom: "12px",
          }}
        >
          SPIRIT REAL ESTATE
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-white max-w-3xl mx-auto relative z-10 font-display font-semibold"
          style={{
            fontSize: "clamp(24px, 4.5vw, 44px)",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            textShadow:
              "0 2px 20px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.35)",
            textWrap: "balance" as any,
          }}
        >
          {t("home.hero.headline")}
        </motion.h1>

        {/* Supporting line */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="relative z-10 font-body max-w-xl mx-auto"
          style={{
            fontSize: "clamp(13px, 1.6vw, 16px)",
            color: "rgba(255,255,255,0.82)",
            textShadow: "0 1px 10px rgba(0,0,0,0.4)",
            marginTop: "14px",
            lineHeight: 1.6,
          }}
        >
          {subline}
        </motion.p>
      </div>

      {/* Search bar — in normal document flow, BELOW text content */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.7 }}
        className="relative z-10 w-full px-4"
        style={{
          paddingBottom: "clamp(28px, 5vw, 48px)",
          paddingTop: "16px",
        }}
      >
        <div
          className="max-w-4xl mx-auto rounded-2xl border border-white/20"
          style={{
            background: "rgba(15,15,15,0.62)",
            backdropFilter: "blur(12px) saturate(1.3)",
            WebkitBackdropFilter: "blur(12px) saturate(1.3)",
            boxShadow:
              "0 12px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="p-4 md:p-6">
            <SearchBar />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
