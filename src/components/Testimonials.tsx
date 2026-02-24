import { motion } from "framer-motion";
import { Quote } from "lucide-react";
const testimonials = [
  {
    quote: "Buying from the US felt overwhelming at first. Spirit Real Estate made the entire process clear, calm, and well managed from start to finish.",
    author: "David & Sarah M.",
    context: "Family from New York · 2024",
    initials: "DS",
  },
  {
    quote: "We felt someone was truly representing us locally. Communication was transparent, and we always knew what was happening.",
    author: "Michael R.",
    context: "Investor from Toronto · 2024",
    initials: "MR",
  },
  {
    quote: "The local presence made all the difference. Even from abroad, we felt confident making the right decision.",
    author: "Jonathan & Lisa B.",
    context: "Retirees from London · 2024",
    initials: "JL",
  },
  {
    quote: "Spirit guided us through every legal and logistical step. We never felt alone in the process.",
    author: "Rachel & Daniel K.",
    context: "Family from Los Angeles · 2023",
    initials: "RD",
  },
  {
    quote: "Professional, discreet, and genuinely invested in finding the right home for our family. Highly recommend.",
    author: "Yael & Marc S.",
    context: "Family from Paris · 2024",
    initials: "YM",
  },
];

/* ── Compact featured testimonial for under-hero placement ── */
export const FeaturedTestimonial = () => {
  const featured = testimonials[0];
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
          "{featured.quote}"
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-body font-bold text-primary">{featured.initials}</span>
          </div>
          <div className="text-left">
            <p className="text-xs font-body font-bold text-foreground leading-tight">{featured.author}</p>
            <p className="text-[11px] text-muted-foreground font-body">{featured.context}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Bottom testimonial for placement near final form ── */
export const BottomTestimonial = () => {
  const bottom = testimonials[4];
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
          "{bottom.quote}"
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-body font-bold text-primary">{bottom.initials}</span>
          </div>
          <div className="text-left">
            <p className="text-xs font-body font-bold text-foreground leading-tight">{bottom.author}</p>
            <p className="text-[11px] text-muted-foreground font-body">{bottom.context}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-sand-light/30">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Trusted by International Clients
          </h2>
          <p className="text-muted-foreground font-body text-sm max-w-md mx-auto">
            Recent buyers from New York, Toronto and London shared their experience moving to Zichron.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.slice(1, 4).map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-xl p-7 shadow-sm border border-border/40 hover:shadow-md transition-all duration-300 relative group flex flex-col h-full"
            >
              <Quote className="w-7 h-7 text-gold/5 absolute top-5 right-6 group-hover:text-gold/10 transition-colors" />
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-body font-bold text-primary">{t.initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-body font-bold text-foreground leading-tight">{t.author}</p>
                  <p className="text-[11px] text-muted-foreground/60 font-body italic mt-0.5">{t.context}</p>
                </div>
              </div>
              <p className="text-foreground/90 font-body text-[15px] leading-relaxed italic mt-auto">
                "{t.quote}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Soft CTA below testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12 space-y-4"
        >
          <p className="text-sm text-muted-foreground/70 font-body italic">
            Private opportunities are rarely advertised publicly.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-gold hover:bg-gold-hover text-primary-foreground px-8 py-3.5 rounded-lg font-body font-medium text-sm transition-all duration-300 hover:shadow-md active:scale-95"
          >
            Request Private Access
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;