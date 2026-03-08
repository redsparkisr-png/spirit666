import { motion } from "framer-motion";
import { MessageCircle, Download, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.webp";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/lib/i18n";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  const { t } = useSiteContent();
  const { lang } = useLanguage();
  const isHe = lang === "he";

  const headline = isHe
    ? "קנו בזכרון יעקב בביטחון"
    : "Buy in Zichron Yaakov with Confidence";

  const supportingLine = isHe
    ? "עם מומחים מקומיים מהשטח"
    : "With Trusted Local Experts on the Ground";

  const subheadline = isHe
    ? "נכסים נבחרים, מומחיות מקומית וליווי מלא לרוכשים מחו״ל."
    : "Curated homes, local expertise and full guidance for overseas buyers.";

  const guideCta = isHe
    ? "הורידו את המדריך החינמי לרכישה בזכרון יעקב"
    : "Get the Free Zichron Yaakov Home Buying Guide";

  const guideMicro = isHe
    ? "מדריך מעשי לשכונות, מחירים ותהליך הרכישה."
    : "A practical guide to neighborhoods, prices and the buying process.";

  const trustSignals = isHe
    ? [
        "מעל 70 משפחות בינלאומיות סומכות עלינו",
        "סוכני נדל\"ן מורשים",
        "מומחים מקומיים בזכרון יעקב",
      ]
    : [
        "Trusted by 70+ international families",
        "Licensed real estate professionals",
        "Local Zichron Yaakov experts",
      ];

  const searchLabel = isHe ? "חיפוש נכסים זמינים" : "Search Available Homes";

  return (
    <section className="relative flex flex-col items-center overflow-hidden">
      {/* Background image with subtle cinematic zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.02 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <img
          src={heroBg}
          alt="Aerial view of Zichron Yaakov with Mediterranean Sea views"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "50% 30%",
            filter: "contrast(1.06) saturate(1.08) brightness(0.95)",
          }}
          width={2000}
          height={1125}
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Directional gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isHe
            ? "linear-gradient(270deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.08) 65%, rgba(0,0,0,0.0) 100%)"
            : "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.08) 65%, rgba(0,0,0,0.0) 100%)",
        }}
      />

      {/* Additional top-to-bottom gradient for overall readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.20) 100%)",
        }}
      />

      {/* Content — left-aligned text */}
      <div
        className="relative z-10 w-full flex flex-col px-5"
        style={{
          paddingTop: "clamp(80px, 10vw, 130px)",
          paddingBottom: "clamp(28px, 4vw, 60px)",
        }}
      >
        <div
          className={`max-w-[700px] flex flex-col ${isHe ? "items-end text-right mr-auto md:mr-0 md:ml-auto md:pr-[6%]" : "items-start text-left ml-auto md:ml-0 md:pl-[6%]"}`}
        >
          {/* Brand label */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#F3F3F3] uppercase mb-3"
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
            className="text-white font-display font-semibold"
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

          {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="text-white/90 font-display font-medium mt-1"
            style={{
              fontSize: "clamp(18px, 2.5vw, 24px)",
              lineHeight: 1.3,
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            {supportingLine}
          </motion.p>

          {/* Subheadline - removed */}



          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
            className={`flex flex-col gap-4 sm:gap-5 mt-7 md:mt-9 ${isHe ? "items-end" : "items-start"}`}
          >
            {/* Primary CTA row */}
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isHe ? "sm:flex-row-reverse" : ""}`}>
              <Link
                to={`/${lang}/properties`}
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-white py-3.5 px-8 rounded-lg font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] min-h-[52px]"
                style={{ fontSize: "16px" }}
              >
                {isHe ? "צפו בנכסים זמינים" : "See Available Homes"}
              </Link>
              <a
                href={`https://wa.me/972522820632?text=${encodeURIComponent("Hi Hagit,\nI would love to receive the guide about buying property in Zichron Yaakov.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-lg font-body font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] min-h-[52px]"
                style={{
                  fontSize: "15px",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                }}
              >
                <Download className="w-4 h-4 flex-shrink-0" />
                {guideCta}
              </a>
            </div>

            {/* Micro description under guide CTA */}
            <p
              className="text-white/55 font-body"
              style={{
                fontSize: "clamp(11px, 1.2vw, 13px)",
                lineHeight: 1.4,
                marginTop: "-4px",
              }}
            >
              {guideMicro}
            </p>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`flex flex-col sm:flex-row flex-wrap gap-x-5 gap-y-1.5 mt-5 ${isHe ? "sm:flex-row-reverse" : ""}`}
          >
            {trustSignals.map((signal, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-white/70 font-body"
                style={{ fontSize: "clamp(11px, 1.1vw, 13px)" }}
              >
                <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                {signal}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Search bar — centered */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.8 }}
          className="w-full mt-6 md:mt-10"
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
            {/* Search label */}
            <p
              className="text-white/70 font-body font-medium px-4 md:px-6 pt-3 pb-0"
              style={{ fontSize: "clamp(11px, 1.2vw, 13px)", letterSpacing: "0.04em" }}
            >
              {searchLabel}
            </p>
            <div className="p-2 md:p-4 pt-1 md:pt-2">
              <SearchBar />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
