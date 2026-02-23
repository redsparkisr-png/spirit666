import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const budgetRanges = [
  "Under $500,000",
  "$500,000 – $1,000,000",
  "$1,000,000 – $2,000,000",
  "Above $2,000,000",
];

const timelines = [
  "0–3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    budget: "",
    timeline: "",
    whatsapp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      toast.error("Please fill in at least your name and WhatsApp number.");
      return;
    }
    setIsSubmitting(true);

    // Compose extra fields into the message column to avoid schema changes
    const messageParts = [
      formData.country && `Country: ${formData.country}`,
      formData.budget && `Budget: ${formData.budget}`,
      formData.timeline && `Timeline: ${formData.timeline}`,
    ].filter(Boolean);

    const { error } = await supabase.from("leads").insert({
      full_name: formData.name.trim(),
      phone: formData.whatsapp.trim(),
      message: messageParts.length > 0 ? messageParts.join(" | ") : null,
      source: "landing_page",
    });

    if (error) {
      toast.error("Something went wrong. Please try again.");
    } else {
      toast.success("Thank you! We'll be in touch with matching opportunities soon.");
      setFormData({ name: "", country: "", budget: "", timeline: "", whatsapp: "" });
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact-form" className="py-16 md:py-24 lg:py-28 bg-background">
      <div className="container px-6">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-semibold text-foreground mb-4">
              Let's Find the Right Opportunity for You
            </h2>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              Tell us about your plans and we'll guide you personally.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              maxLength={100}
              className="w-full px-5 py-4 rounded-lg border border-border bg-card text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <input
              type="text"
              placeholder="Country of Residence"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              maxLength={100}
              className="w-full px-5 py-4 rounded-lg border border-border bg-card text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-5 py-4 rounded-lg border border-border bg-card text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none"
              style={{ color: formData.budget ? undefined : "hsl(var(--muted-foreground) / 0.6)" }}
            >
              <option value="" disabled>Budget Range</option>
              {budgetRanges.map((b) => (
                <option key={b} value={b} style={{ color: "hsl(var(--foreground))" }}>{b}</option>
              ))}
            </select>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-5 py-4 rounded-lg border border-border bg-card text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none"
              style={{ color: formData.timeline ? undefined : "hsl(var(--muted-foreground) / 0.6)" }}
            >
              <option value="" disabled>Timeline</option>
              {timelines.map((t) => (
                <option key={t} value={t} style={{ color: "hsl(var(--foreground))" }}>{t}</option>
              ))}
            </select>
            <input
              type="tel"
              placeholder="WhatsApp Number *"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              maxLength={20}
              className="w-full px-5 py-4 rounded-lg border border-border bg-card text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-4 rounded-lg font-body font-semibold transition-colors duration-300 disabled:opacity-60"
              style={{ fontSize: '17px' }}
            >
              {isSubmitting ? "Sending..." : "Get Personal Guidance"}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-5 space-y-2"
          >
            <p className="text-xs text-muted-foreground/70 font-body">
              We respond within 1–2 business hours.
            </p>
            <p className="text-xs text-muted-foreground/50 font-body italic">
              Discreet • No spam • Personal guidance
            </p>
            <p className="text-[11px] text-muted-foreground/60 font-body max-w-sm mx-auto leading-relaxed pt-2">
              By submitting this form, you agree to our{" "}
              <Link to="/privacy" className="underline hover:text-foreground transition-colors">
                Privacy Policy
              </Link>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
