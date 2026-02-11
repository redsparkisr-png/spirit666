import { motion } from "framer-motion";

const MicroTrustLine = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="py-6 bg-primary"
    >
      <div className="container px-6">
        <p className="text-center text-sm text-primary-foreground/70 font-body tracking-wide">
          Local presence · Personal guidance · Clear process · Trusted by international buyers
        </p>
      </div>
    </motion.div>
  );
};

export default MicroTrustLine;
