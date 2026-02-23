import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import aviImage from "@/assets/avi-suliman.png";
import hagitImage from "@/assets/hagit-cohen-morgan.png";
import eliranImage from "@/assets/eliran-amsalem.jpg";

const testimonials = [
  {
    quote: "The entire process was handled remotely. Clear communication at every step — we always knew exactly where things stood.",
    author: "David & Sarah M.",
    location: "New York",
    image: aviImage,
    context: "Family from New York · Purchased 2024",
  },
  {
    quote: "No pressure, no rush. They represented us professionally and made sure every document was explained in English before we signed.",
    author: "Michael R.",
    location: "Toronto",
    image: hagitImage,
    context: "Investor from Toronto · Purchased 2024",
  },
  {
    quote: "We bought remotely with full confidence. The local presence made all the difference — it felt like having family on the ground.",
    author: "Jonathan & Lisa B.",
    location: "London",
    image: eliranImage,
    context: "Retirees from London · Purchased 2024",
  },
];

export const FeaturedTestimonial = () => {
  const featured = testimonials[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-10 md:py-14 bg-primary/[0.03] border-y border-primary/5"
    >
      <div className="container px-6 max-w-2xl mx-auto text-center">
        <Quote className="w-6 h-6 mx-auto mb-4 text-gold/40" />
        <p className="font-body text-foreground text-sm md:text-base leading-relaxed italic mb-6">
          "{featured.quote}"
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/10 grayscale">
            <img src={featured.image} alt={featured.author} className="w-full h-full object-cover" />
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

const Testimonials = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-sand-light/30">
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
            Buyers from New York, Toronto and London share their experience working with Spirit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-xl p-8 shadow-sm border border-border/40 hover:shadow-md transition-all duration-300 relative group flex flex-col h-full"
            >
              <Quote className="w-8 h-8 text-gold/5 absolute top-6 right-8 group-hover:text-gold/10 transition-colors" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full border border-border overflow-hidden grayscale shrink-0">
                  <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-body font-bold text-foreground leading-tight">{t.author}</p>
                  <p className="text-xs text-muted-foreground font-body font-medium">{t.location}</p>
                  <p className="text-[11px] text-muted-foreground/60 font-body italic mt-0.5">{t.context}</p>
                </div>
              </div>
              <p className="text-foreground/90 font-body text-[15px] leading-relaxed italic mt-auto">
                "{t.quote}"
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
