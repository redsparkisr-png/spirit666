import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import spiritLogo from "@/assets/spirit-logo.jpg";

const HeroSection = () => {
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
          className="w-full h-full object-cover object-[center_35%]"
          style={{ filter: "contrast(1.15) saturate(1.15) brightness(0.92)" }}
          width={1920}
          height={1080}
          loading="eager"
        />
        {/* Cinematic overlay: brand green top + warm mid + deep brand bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(160,62%,14%,0.65)] via-[hsl(30,18%,18%,0.25)] to-[hsl(160,62%,14%,0.92)]" />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 20%, hsl(160,62%,14%,0.65) 100%)" }} />
        {/* Strong bottom fade for guaranteed text readability */}
        <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
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
          className="text-primary-foreground mb-6 max-w-4xl mx-auto px-4"
          style={{
            fontSize: "clamp(32px, 7vw, 56px)",
            lineHeight: 1.1,
            textShadow: "0 4px 28px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)",
            textWrap: "balance",
          }}
        >
          Discover the Finest Homes in Zichron Yaakov
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-primary-foreground/90 font-body font-light max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
          style={{
            fontSize: "clamp(16px, 2.8vw, 20px)",
            textShadow: "0 2px 16px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.4)",
          }}
        >
          Buying from abroad shouldn't feel risky. We are your trusted eyes and voice on the ground in Zichron Yaakov.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4"
        >
          <button
            onClick={scrollToHomes}
            className="bg-gold hover:bg-gold-hover text-primary-foreground px-8 py-4 rounded-lg font-body font-medium transition-all duration-300 hover:shadow-lg min-w-[220px]"
            style={{ fontSize: '17px' }}
          >
            View Available Homes
          </button>
          <button
            onClick={scrollToForm}
            className="bg-transparent border-2 border-gold hover:bg-gold/15 text-primary-foreground px-8 py-4 rounded-lg font-body font-medium transition-all duration-300 flex items-center gap-2 min-w-[220px] justify-center"
            style={{ fontSize: '17px' }}
          >
            Get Private Access
          </button>
        </motion.div>

        {/* Secondary anchor text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="text-primary-foreground/50 font-body text-xs tracking-wide mb-8 cursor-pointer hover:text-primary-foreground/70 transition-colors"
          onClick={scrollToForm}
        >
          Access Off-Market Opportunities →
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-primary-foreground/55 font-body text-xs md:text-sm tracking-wide max-w-xl mx-auto"
        >
          <span>Discreet transactions</span>
          <span>·</span>
          <span>Local expertise</span>
          <span>·</span>
          <span>International clients</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
