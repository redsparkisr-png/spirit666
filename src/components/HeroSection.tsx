import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/lib/i18n";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  const { t } = useSiteContent();
  const { lang } = useLanguage();

  const headline =
    lang === "he"
      ? "קנו בזכרון יעקב בביטחון"
      : "Buy in Zichron Yaakov with Confidence";

  return (
    <section className="relative flex flex-col items-center overflow-visible">
      {/* Background image */}
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
        {/* Subtle bottom gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Content — in normal flow */}
      <div
        className="relative z-10 w-full flex flex-col items-center text-center px-5"
        style={{
          paddingTop: "clamp(100px, 14vw, 140px)",
          paddingBottom: "16px",
        }}
      >
        {/* Localized scrim behind text only */}
        <div
          className="absolute rounded-3xl pointer-events-none"
          style={{
            width: "min(92%, 54rem)",
            top: "clamp(60px, 9vw, 100px)",
            left: "50%",
            transform: "translateX(-50%)",
            minHeight: "120px",
            padding: "50px 40px 70px",
            background:
              "radial-gradient(ellipse at center top, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.0) 75%)",
          }}
        />

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white max-w-[900px] mx-auto relative z-10 font-display font-semibold"
          style={{
            fontSize: "clamp(30px, 5vw, 50px)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            textShadow:
              "0 2px 20px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3)",
            textWrap: "balance" as any,
          }}
        >
          {headline}
        </motion.h1>
      </div>

      {/* Search bar — in normal document flow, BELOW headline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.5 }}
        className="relative z-10 w-full px-4"
        style={{
          paddingTop: "clamp(28px, 4vw, 40px)",
          paddingBottom: "clamp(80px, 10vw, 120px)",
        }}
      >
        <div
          className="max-w-4xl mx-auto rounded-2xl"
          style={{
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px) saturate(1.2)",
            WebkitBackdropFilter: "blur(6px) saturate(1.2)",
            border: "1px solid hsl(39 37% 55% / 0.3)",
            boxShadow:
              "0 12px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
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
