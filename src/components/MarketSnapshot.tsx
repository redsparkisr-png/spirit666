import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { TrendingUp } from "lucide-react";

const MarketSnapshot = () => {
  const { t } = useSiteContent();

  return (
    <section className="py-12 md:py-16 bg-primary/5">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="font-display font-semibold text-foreground text-xl md:text-2xl">
              {t("home.market.title")}
            </h2>
          </div>
          <p className="text-muted-foreground font-body leading-relaxed">
            {t("home.market.text")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketSnapshot;
