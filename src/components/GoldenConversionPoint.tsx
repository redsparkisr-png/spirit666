import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";

const GoldenConversionPoint = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const { t } = useSiteContent();

  const phone = t("whatsapp.phone_number") || "972522820632";
  const msg = encodeURIComponent(t("whatsapp.guide_message") || "Hi, I'd like to receive the Zichron Yaakov Buyer Blueprint.");
  const blueprintUrl = `https://wa.me/${phone}?text=${msg}`;

  return (
    <section className="py-14 md:py-20 bg-card border-y border-border/40 relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--gold) / 0.06) 0%, transparent 70%)",
        }}
      />
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display font-semibold text-foreground text-[26px] md:text-[34px] leading-tight mb-4">
            {t("guide.home.title")}
          </h2>
          <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mb-4 max-w-xl mx-auto">
            {t("guide.home.hook")}
          </p>
          <p className="font-body text-muted-foreground/70 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            {t("guide.home.intro")}
          </p>
          <a
            href={blueprintUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2.5 bg-gold hover:bg-gold-hover text-white py-4 px-10 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5 active:scale-[0.98] ${isHe ? "flex-row-reverse" : ""}`}
            style={{ fontSize: "16px" }}
          >
            <MessageCircle className="w-5 h-5" />
            {t("guide.home.cta_secondary")}
          </a>
          <p className="mt-3 text-xs text-muted-foreground/50 font-body">
            {t("guide.home.trust_line")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GoldenConversionPoint;
