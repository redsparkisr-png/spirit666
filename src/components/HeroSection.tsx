import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import spiritLogo from "@/assets/spirit-logo.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection = () => {
  const { t } = useSiteContent();

  const scrollToHomes = () => {
    document.getElementById("available-homes")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100svh",
        paddingTop: "max(72px, env(safe-area-inset-top))",
        paddingBottom: "max(24px, env(safe-area-inset-bottom))",
      }}
    >
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Zichron Yaakov village overlooking the Mediterranean Sea"
          className="w-full h-full object-cover object-[center_35%] scale-105"
          style={{ filter: "contrast(1.08) saturate(1.12) brightness(1.05) sepia(0.03)" }}
          width={1920}
          height={1080}
          loading="eager"
        />
        <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[hsl(35,40%,85%,0.3)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[hsl(160,30%,8%,0.55)] via-[hsl(160,20%,12%,0.28)] to-transparent" />
        <div className="absolute inset-x-0 bottom-[5%] h-[45%] bg-gradient-to-t from-[hsl(0,0%,0%,0.3)] via-[hsl(0,0%,0%,0.15)] to-transparent" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-6 left-6 z-20 rtl:left-auto rtl:right-6"
      >
        <img
          src={spiritLogo}
          alt="Spirit Real Estate"
          className="w-16 md:w-20 rounded-lg"
        />
      </motion.div>

      <div className="relative z-10 container text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-primary-foreground/80 font-body text-sm tracking-[0.2em] uppercase mb-6"
        >
          {t("home.hero.pre_title")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-primary-foreground mb-8 max-w-4xl mx-auto px-4"
          style={{
            fontSize: "clamp(30px, 6.5vw, 54px)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 20px rgba(0,0,0,0.45), 0 1px 6px rgba(0,0,0,0.3)",
            textWrap: "balance",
          }}
        >
          {t("home.hero.headline")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-primary-foreground/85 font-body font-light max-w-2xl mx-auto mb-12 leading-relaxed text-balance"
          style={{
            fontSize: "clamp(16px, 2.8vw, 20px)",
            textShadow: "0 1px 12px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.2)",
          }}
        >
          {t("home.hero.subline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-5"
        >
          <button
            onClick={scrollToHomes}
            className="bg-gold hover:bg-gold-hover text-primary-foreground px-8 py-4 rounded-lg font-body font-medium transition-all duration-300 min-w-[220px]"
            style={{ fontSize: '17px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', transform: 'translateY(0)' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; }}
          >
            {t("home.hero.cta_primary")}
          </button>
          <button
            onClick={scrollToForm}
            className="bg-transparent border-2 border-primary-foreground/40 hover:border-primary-foreground/70 hover:bg-primary-foreground/10 text-primary-foreground px-8 py-4 rounded-lg font-body font-medium transition-all duration-300 flex items-center gap-2 min-w-[220px] justify-center"
            style={{ fontSize: '17px' }}
          >
            {t("home.hero.cta_secondary")}
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="text-primary-foreground/45 font-body text-xs tracking-wide mb-8 cursor-pointer hover:text-primary-foreground/65 transition-colors"
          onClick={scrollToForm}
        >
          {t("home.hero.anchor_text")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-primary-foreground/45 font-body text-xs md:text-sm tracking-wide max-w-xl mx-auto"
        >
          <span>{t("home.hero.trust_1")}</span>
          <span>·</span>
          <span>{t("home.hero.trust_2")}</span>
          <span>·</span>
          <span>{t("home.hero.trust_3")}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
