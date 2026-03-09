import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.webp";
import { useLanguage } from "@/lib/i18n";
import SearchBar from "./SearchBar";

const BLUEPRINT_MSG = encodeURIComponent(
  "Hi, I'd like to receive the Zichron Yaakov Buyer Blueprint."
);
const BLUEPRINT_URL = `https://wa.me/972522820632?text=${BLUEPRINT_MSG}`;

const HeroSection = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  const headline = isHe
    ? "מחפשים בית בזכרון יעקב?"
    : "The Smart Way to Buy in Zichron Yaakov";

  const subtitle = isHe
    ? "יש בתים שמגיעים ליד2 — ויש כאלה שנמכרים עוד לפני שהם מופיעים שם."
    : "Trusted Local Experts on the Ground.";

  const supportingLine = isHe
    ? "אנחנו עובדים בתוך השוק המקומי ומקבלים גישה לבתים, פנטהאוזים ודירות מיוחדות במושבה — לעיתים עוד לפני הפרסום."
    : "Exclusive access to premium homes and trusted guidance through the Israeli buying process.";

  const guideCta = isHe
    ? "שלחו הודעה בוואטסאפ"
    : "Get the Zichron Buyer Blueprint";

  const guideMicro = isHe
    ? "הנכסים כאן מתעדכנים כל הזמן — חלקם נמכרים תוך ימים."
    : "Free guide covering neighborhoods, prices and the buying process.";

  return (
    <section className="relative flex flex-col items-center">
      {/* Background image with subtle cinematic zoom */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ scale: 1.02 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <img
          src={heroBg}
          alt="Aerial view of Zichron Yaakov with Mediterranean Sea views"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "50% 35%",
            filter: "contrast(1.06) saturate(1.08) brightness(0.92)",
          }}
          width={2000}
          height={1125}
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Top-heavy gradient for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isHe
            ? "linear-gradient(270deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.0) 100%)"
            : "linear-gradient(90deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.0) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.20) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 w-full flex flex-col px-5"
        style={{
          paddingTop: "clamp(80px, 10vw, 130px)",
          paddingBottom: "clamp(28px, 4vw, 60px)",
        }}
      >
        <div
          className={`max-w-[600px] flex flex-col ${isHe ? "items-end text-right mr-auto md:mr-0 md:ml-auto md:pr-[6%]" : "items-start text-left ml-auto md:ml-0 md:pl-[6%]"}`}
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
              textShadow: "0 2px 14px rgba(0,0,0,0.5)",
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
              textShadow: "0 3px 24px rgba(0,0,0,0.6), 0 1px 6px rgba(0,0,0,0.4)",
              textWrap: "balance" as any,
            }}
          >
            {headline}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="text-white/90 font-display font-medium mt-1"
            style={{
              fontSize: "clamp(18px, 2.5vw, 24px)",
              lineHeight: 1.3,
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            }}
          >
            {subtitle}
          </motion.p>

          {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42 }}
            className="text-white/75 font-body mt-3"
            style={{
              fontSize: "clamp(14px, 1.6vw, 17px)",
              lineHeight: 1.5,
              textShadow: "0 1px 10px rgba(0,0,0,0.5)",
              maxWidth: "520px",
            }}
          >
            {supportingLine}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
            className={`flex flex-col gap-4 mt-8 md:mt-10 ${isHe ? "items-end" : "items-start"}`}
          >
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isHe ? "sm:flex-row-reverse" : ""}`}>
              <Link
                to={`/${lang}/properties`}
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-white py-3.5 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] min-h-[52px]"
                style={{ fontSize: "16px" }}
              >
                {isHe ? "צפו בנכסים בזכרון יעקב" : "See Available Homes"}
              </Link>
              <a
                href={BLUEPRINT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] min-h-[52px]"
                style={{
                  fontSize: "15px",
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px) saturate(1.2)",
                  WebkitBackdropFilter: "blur(12px) saturate(1.2)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <Download className="w-4 h-4 flex-shrink-0" />
                {guideCta}
              </a>
            </div>

            {/* Helper text */}
            <p
              className="text-white font-body"
              style={{
                fontSize: "clamp(12px, 1.3vw, 14px)",
                lineHeight: 1.5,
                marginTop: "-2px",
                textShadow: "0 2px 12px rgba(0,0,0,0.7), 0 0 4px rgba(0,0,0,0.5)",
                opacity: 0.85,
              }}
            >
              {guideMicro}
            </p>
          </motion.div>
        </div>

        {/* Search bar */}
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
              boxShadow: "0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="pt-2" />
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
