import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

/* ── Compact featured testimonial for under-hero placement ── */
export const FeaturedTestimonial = () => {
  const { t } = useSiteContent();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 md:py-12 bg-primary/[0.03] border-y border-primary/5"
    >
      <div className="container px-6 max-w-2xl mx-auto text-center">
        <Quote className="w-5 h-5 mx-auto mb-3 text-gold/40" />
        <p className="font-body text-foreground text-sm md:text-base leading-relaxed italic mb-5">
          "{t("home.testimonials.quote_1")}"
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border border-gold/30">
            <span className="text-xs font-body font-bold text-primary">DS</span>
          </div>
          <div className="text-start">
            <p className="text-xs font-body font-bold text-foreground leading-tight">{t("home.testimonials.author_1")}</p>
            <p className="text-[11px] text-muted-foreground font-body">{t("home.testimonials.context_1")}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Bottom testimonial for placement near final form ── */
export const BottomTestimonial = () => {
  const { t } = useSiteContent();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 md:py-12 bg-primary/[0.03] border-y border-primary/5"
    >
      <div className="container px-6 max-w-2xl mx-auto text-center">
        <Quote className="w-5 h-5 mx-auto mb-3 text-gold/40" />
        <p className="font-body text-foreground text-sm md:text-base leading-relaxed italic mb-5">
          "{t("home.testimonials.quote_5")}"
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border border-gold/30">
            <span className="text-xs font-body font-bold text-primary">YM</span>
          </div>
          <div className="text-start">
            <p className="text-xs font-body font-bold text-foreground leading-tight">{t("home.testimonials.author_5")}</p>
            <p className="text-[11px] text-muted-foreground font-body">{t("home.testimonials.context_5")}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const { t } = useSiteContent();

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const testimonials = [
    { quoteKey: "home.testimonials.quote_2", authorKey: "home.testimonials.author_2", contextKey: "home.testimonials.context_2", initials: "MR" },
    { quoteKey: "home.testimonials.quote_3", authorKey: "home.testimonials.author_3", contextKey: "home.testimonials.context_3", initials: "JL" },
    { quoteKey: "home.testimonials.quote_4", authorKey: "home.testimonials.author_4", contextKey: "home.testimonials.context_4", initials: "RD" },
  ];

  return (
    <section className="py-12 md:py-20 bg-sand-light/30">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-[30px] font-display font-semibold text-foreground mb-3">
            {t("home.testimonials.title")}
          </h2>
          <p className="text-muted-foreground font-body text-sm max-w-md mx-auto">
            {t("home.testimonials.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.quoteKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-xl p-7 shadow-sm border border-border/40 hover:shadow-md transition-all duration-300 relative group flex flex-col h-full"
            >
              <Quote className="w-7 h-7 text-gold/5 absolute top-5 right-6 group-hover:text-gold/10 transition-colors rtl:right-auto rtl:left-6" />
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-gold/30">
                  <span className="text-xs font-body font-bold text-primary">{item.initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-body font-bold text-foreground leading-tight">{t(item.authorKey)}</p>
                  <p className="text-[11px] text-muted-foreground/60 font-body italic mt-0.5">{t(item.contextKey)}</p>
                </div>
              </div>
              <p className="text-foreground/90 font-body text-[15px] leading-relaxed italic mt-auto">
                "{t(item.quoteKey)}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12 space-y-4"
        >
          <p className="text-sm text-muted-foreground/70 font-body italic">
            {t("home.testimonials.cta_text")}
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-body font-medium text-sm text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-hover)) 100%)',
            }}
          >
            {t("home.testimonials.cta_button")}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
