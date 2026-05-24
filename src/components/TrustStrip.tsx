import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

const TrustStrip = () => {
  const { t } = useSiteContent();
  const metrics = [
    { v: "home.trust_strip.metric_1_value", l: "home.trust_strip.metric_1_label" },
    { v: "home.trust_strip.metric_2_value", l: "home.trust_strip.metric_2_label" },
    { v: "home.trust_strip.metric_3_value", l: "home.trust_strip.metric_3_label" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-7 md:py-9 bg-card border-y border-border/40"
      aria-label="Spirit Real Estate trust indicators"
    >
      <div className="container px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-3 md:gap-8 items-start">
          {metrics.map((m, i) => (
            <div
              key={m.v}
              className={`text-center ${i > 0 ? "border-s border-border/40 ps-3 md:ps-8" : ""}`}
            >
              <div className="font-display text-2xl md:text-4xl font-semibold text-primary leading-none">
                {t(m.v)}
              </div>
              <div className="mt-1.5 text-[11px] md:text-xs font-body text-muted-foreground leading-tight">
                {t(m.l)}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 md:mt-6 text-center text-xs md:text-[13px] font-body text-muted-foreground/80 italic">
          {t("home.trust_strip.tagline")}
        </p>
      </div>
    </motion.section>
  );
};

export default TrustStrip;
