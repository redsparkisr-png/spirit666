import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

const MicroTrustLine = () => {
  const { t } = useSiteContent();

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
          {t("home.trust_line.text")}
        </p>
      </div>
    </motion.div>
  );
};

export default MicroTrustLine;
