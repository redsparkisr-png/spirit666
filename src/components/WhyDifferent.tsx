import { motion } from "framer-motion";

const WhyDifferent = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-6">
            Real People. Local Presence.
          </h2>

          {/* Placeholder for team images */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-sand-light border border-border" />
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-sand-light border border-border" />
          </div>

          <p className="text-foreground font-body leading-relaxed text-base md:text-lg mb-4">
            Spirit Real Estate is a boutique real estate team based in Zichron Yaakov.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed text-base md:text-lg mb-4">
            We work closely with clients on the ground, providing real local presence, clear communication, and personal guidance — especially for buyers purchasing from abroad.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed text-base md:text-lg">
            Our approach is human, calm, and focused on doing things right.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyDifferent;
