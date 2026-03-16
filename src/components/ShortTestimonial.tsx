import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const ShortTestimonial = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 md:py-10 bg-card border-y border-border/30"
    >
      <div className="container px-6 max-w-2xl mx-auto text-center">
        <Quote className="w-5 h-5 mx-auto mb-3 text-gold/30" />
        <p className="font-body text-foreground text-sm md:text-base leading-relaxed italic mb-4">
          {isHe
            ? "״חיפשנו בית בזכרון יעקב וספיריט ליוותה אותנו מהרגע הראשון. ההיכרות שלהם עם השוק המקומי עשתה את כל ההבדל.״"
            : '"Buying in Zichron Yaakov from abroad felt simple with Spirit Real Estate guiding us. Their local knowledge made all the difference."'}
        </p>
        <p className="text-xs font-body text-muted-foreground font-medium">
          {isHe ? "דניאל ונעמה לוי, תל אביב" : "David & Rachel Cohen, London"}
        </p>
      </div>
    </motion.div>
  );
};

export default ShortTestimonial;
