import { motion } from "framer-motion";

const TrustSection = () => {
  return (
    <section className="py-20 md:py-24 bg-secondary">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-12 h-px bg-primary mx-auto mb-8" />
          <p className="text-foreground font-body leading-relaxed text-base md:text-lg">
            Spirit Real Estate is a boutique real estate agency based in Zichron Yaakov.
            We specialize in guiding foreign buyers and Israelis living abroad through a clear,
            transparent, and calm buying process.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed text-base md:text-lg mt-4">
            Our focus is not volume, but fit, trust, and long-term relationships.
          </p>
          <div className="w-12 h-px bg-primary mx-auto mt-8" />
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
