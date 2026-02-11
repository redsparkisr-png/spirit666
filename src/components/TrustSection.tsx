import { motion } from "framer-motion";

const TrustSection = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-12 h-px bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground font-body leading-relaxed text-sm">
            © {new Date().getFullYear()} Spirit Real Estate · Zichron Yaakov, Israel
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
