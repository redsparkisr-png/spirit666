import { motion } from "framer-motion";
import { Quote, Star, BadgeCheck } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const Testimonials = () => {
  const { t } = useSiteContent();

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const items = [
    { quoteKey: "home.testimonials.quote_2", authorKey: "home.testimonials.author_2", contextKey: "home.testimonials.context_2", initials: "MR" },
    { quoteKey: "home.testimonials.quote_3", authorKey: "home.testimonials.author_3", contextKey: "home.testimonials.context_3", initials: "JB", featured: true },
    { quoteKey: "home.testimonials.quote_4", authorKey: "home.testimonials.author_4", contextKey: "home.testimonials.context_4", initials: "RK" },
  ];

  const metrics = [
    { v: "home.testimonials.metric_1_value", l: "home.testimonials.metric_1_label" },
    { v: "home.testimonials.metric_2_value", l: "home.testimonials.metric_2_label" },
    { v: "home.testimonials.metric_3_value", l: "home.testimonials.metric_3_label" },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-card via-sand-light/40 to-card overflow-hidden">
      {/* subtle paper texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, hsl(var(--primary)) 1px, transparent 1px), radial-gradient(circle at 80% 70%, hsl(var(--gold)) 1px, transparent 1px)",
          backgroundSize: "32px 32px, 48px 48px",
        }}
      />

      <div className="container px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold/60" />
            <span className="text-[11px] md:text-xs font-body tracking-[0.18em] uppercase text-gold font-medium">
              {t("home.testimonials.eyebrow")}
            </span>
            <span className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="text-[28px] md:text-[36px] font-display font-semibold text-foreground leading-tight mb-4">
            {t("home.testimonials.title")}
          </h2>
          <p className="text-muted-foreground font-body text-sm md:text-base">
            {t("home.testimonials.subtitle")}
          </p>
        </motion.div>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 md:gap-10 max-w-2xl mx-auto mb-12 md:mb-16"
        >
          {metrics.map((m, i) => (
            <div
              key={m.v}
              className={`text-center ${i > 0 ? "border-s border-gold/20 ps-4 md:ps-10" : ""}`}
            >
              <div className="font-display text-2xl md:text-4xl font-semibold text-primary leading-none">
                {t(m.v)}
              </div>
              <div className="mt-1.5 text-[11px] md:text-xs font-body text-muted-foreground/80 leading-tight">
                {t(m.l)}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {items.map((item, index) => (
            <motion.article
              key={item.quoteKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className={`relative bg-card rounded-2xl p-7 md:p-8 flex flex-col h-full transition-shadow duration-300 ${
                item.featured
                  ? "border-2 border-gold/40 shadow-[0_8px_30px_-12px_hsl(var(--gold)/0.35)] md:-translate-y-3 hover:shadow-[0_16px_40px_-12px_hsl(var(--gold)/0.45)]"
                  : "border border-border/40 shadow-sm hover:shadow-lg"
              }`}
            >
              {item.featured && (
                <div className="absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-gold to-gold-hover text-primary-foreground text-[10px] font-body font-semibold tracking-wider uppercase shadow-md">
                  {t("home.testimonials.featured_badge")}
                </div>
              )}

              <Quote
                className="w-10 h-10 text-gold/10 absolute top-5 end-5"
                aria-hidden="true"
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star
                    key={s}
                    className="w-3.5 h-3.5 fill-gold text-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/90 font-body text-[15px] leading-relaxed mb-6 flex-1">
                "{t(item.quoteKey)}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-border/30">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 ring-1 ring-gold/30 shadow-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--gold)) 140%)",
                  }}
                  aria-hidden="true"
                >
                  <span className="text-xs font-display font-semibold text-primary-foreground">
                    {item.initials}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-body font-bold text-foreground leading-tight truncate">
                      {t(item.authorKey)}
                    </p>
                    <BadgeCheck
                      className="w-3.5 h-3.5 text-gold shrink-0"
                      aria-label={t("home.testimonials.verified_label")}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground/70 font-body mt-0.5 truncate">
                    {t(item.contextKey)}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-14 md:mt-16 space-y-5"
        >
          <p className="text-base md:text-lg font-display text-foreground/80 italic">
            {t("home.testimonials.cta_text")}
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body font-medium text-sm text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-gold/25 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-hover)) 100%)",
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
