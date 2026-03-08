import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
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
          alt="Aerial view of Zichron Yaakov red-roofed homes overlooking the Mediterranean Sea"
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

      {/* Left-side gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isHe
            ? "linear-gradient(270deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.08) 65%, rgba(0,0,0,0.0) 100%)"
            : "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.08) 65%, rgba(0,0,0,0.0) 100%)",
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

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className={`flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mt-6 md:mt-8 ${isHe ? "sm:flex-row-reverse" : ""}`}
          >
            <Link
              to={`/${lang}/properties`}
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-white py-3.5 px-8 rounded-lg font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
              style={{ fontSize: "16px" }}
            >
              {isHe ? "צפו בנכסים זמינים" : "See Available Homes"}
            </Link>
            <a
              href={`https://wa.me/972522820632?text=${encodeURIComponent("Hi Hagit,\nI would love to receive the guide about buying property in Zichron Yaakov.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-lg font-body font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
              style={{
                fontSize: "16px",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
              }}
            >
              <MessageCircle className="w-4 h-4" />
              {isHe ? "קבלו את מדריך הרכישה" : "Get the Buying Guide"}
            </a>
          </motion.div>
        </div>

        {/* Search bar — centered */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.6 }}
          className="w-full mt-5 md:mt-8"
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
            <div className="p-2 md:p-4">
              <SearchBar />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
