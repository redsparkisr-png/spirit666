import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import spiritLogo from "@/assets/spirit-logo.jpg";

const HeroSection = () => {
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/972522820632?text=" +
        encodeURIComponent("Hi, I'm interested in homes for sale in Zichron Yaakov"),
      "_blank"
    );
  };

  const scrollToHomes = () => {
    document.getElementById("available-homes")?.scrollIntoView({ behavior: "smooth" });
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
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-[hsl(160,30%,8%,0.7)] via-[hsl(160,20%,12%,0.35)] to-transparent" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-6 left-6 z-20"
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
          Spirit Real Estate
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-primary-foreground mb-4 max-w-4xl mx-auto px-4"
          style={{
            fontSize: "clamp(28px, 6vw, 50px)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 20px rgba(0,0,0,0.45), 0 1px 6px rgba(0,0,0,0.3)",
            textWrap: "balance",
          }}
        >
          Homes for Sale in Zichron Yaakov
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-primary-foreground/90 font-display font-medium max-w-3xl mx-auto mb-3 text-balance"
          style={{
            fontSize: "clamp(17px, 3vw, 24px)",
            textShadow: "0 1px 12px rgba(0,0,0,0.35)",
          }}
        >
          Strategic Property Investments with Mediterranean Lifestyle
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-primary-foreground/75 font-body font-light max-w-2xl mx-auto mb-12 leading-relaxed text-balance"
          style={{
            fontSize: "clamp(14px, 2.5vw, 17px)",
            textShadow: "0 1px 10px rgba(0,0,0,0.3)",
          }}
        >
          Boutique local expertise. Full English guidance. Long-term value in one of Israel's most desirable coastal communities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-5"
        >
          <button
            onClick={openWhatsApp}
            className="bg-gold hover:bg-gold-hover text-primary-foreground px-8 py-4 rounded-lg font-body font-medium transition-all duration-300 min-w-[220px]"
            style={{ fontSize: '17px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', transform: 'translateY(0)' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; }}
          >
            Speak With a Local Expert
          </button>
          <button
            onClick={scrollToHomes}
            className="bg-transparent border-2 border-primary-foreground/40 hover:border-primary-foreground/70 hover:bg-primary-foreground/10 text-primary-foreground px-8 py-4 rounded-lg font-body font-medium transition-all duration-300 flex items-center gap-2 min-w-[220px] justify-center"
            style={{ fontSize: '17px' }}
          >
            Explore Available Homes
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-primary-foreground/45 font-body text-xs md:text-sm tracking-wide max-w-xl mx-auto"
        >
          <span>Discreet transactions</span>
          <span>·</span>
          <span>Local expertise</span>
          <span>·</span>
          <span>International clients</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
