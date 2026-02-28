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
            objectPosition: "center 62%",
            filter: "contrast(1.06) saturate(1.1) brightness(0.92)",
          }}
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30" />
      </div>

      {/* Content — normal flow */}
      <div
        className="relative z-10 w-full flex flex-col items-center text-center px-5"
        style={{
          paddingTop: "clamp(104px, 14vw, 140px)",
          paddingBottom: "clamp(80px, 10vw, 120px)",
        }}
      >
        {/* Localized scrim behind text group */}
        <div
          className="absolute rounded-3xl pointer-events-none"
          style={{
            width: "min(92%, 54rem)",
            top: "clamp(70px, 9vw, 110px)",
            left: "50%",
            transform: "translateX(-50%)",
            minHeight: "140px",
            padding: "50px 40px 80px",
            background:
              "radial-gradient(ellipse at center top, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.0) 75%)",
          }}
        />

        {/* Brand label */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 text-[#F3F3F3] uppercase text-center mb-3"
          style={{
            fontSize: "clamp(12px, 1.4vw, 15px)",
            fontWeight: 450,
            letterSpacing: "0.18em",
            opacity: 0.82,
            textShadow: "0 2px 14px rgba(0,0,0,0.35)",
          }}
        >
          SPIRIT REAL ESTATE
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
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

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="w-full mt-8 md:mt-10"
        >
          <div
            className="max-w-4xl mx-auto rounded-2xl"
            style={{
              background: "rgba(0,0,0,0.52)",
              backdropFilter: "blur(4px) saturate(1.15)",
              WebkitBackdropFilter: "blur(4px) saturate(1.15)",
              border: "1px solid hsl(39 37% 55% / 0.3)",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="p-4 md:p-6">
              <SearchBar />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
