import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/lib/i18n";
import { FileText } from "lucide-react";

const BlueprintSection = () => {
  const { t } = useSiteContent();
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error(t("home.contact.validation_error"));
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      full_name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      source: "blueprint_guide",
    });
    if (error) {
      toast.error(t("home.blueprint.error"));
    } else {
      toast.success(t("home.blueprint.success"));
      setFormData({ name: "", email: "", phone: "" });
    }
    setIsSubmitting(false);
  };

  const inputClasses =
    "w-full px-5 py-4 rounded-lg border border-border bg-background text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal transition-all";

  return (
    <section id="blueprint" className="py-20 md:py-28 lg:py-32 bg-card relative overflow-hidden" aria-labelledby="blueprint-heading">
      {/* Subtle decorative accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-bronze/[0.03] blur-3xl pointer-events-none" />

      <div className="container px-6 relative z-10">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="w-14 h-14 rounded-full bg-charcoal/10 flex items-center justify-center mx-auto mb-5">
              <FileText className="w-6 h-6 text-charcoal" />
            </div>
            <h2 id="blueprint-heading" className="font-display font-semibold text-foreground mb-4 text-2xl md:text-[34px]">
              {t("home.blueprint.title")}
            </h2>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              {t("home.blueprint.subtitle")}
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
            <label htmlFor="bp-name" className="sr-only">{t("home.blueprint.placeholder_name")}</label>
            <input
              id="bp-name"
              type="text"
              placeholder={t("home.blueprint.placeholder_name")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              maxLength={100}
              className={inputClasses}
            />
            <label htmlFor="bp-email" className="sr-only">{t("home.blueprint.placeholder_email")}</label>
            <input
              id="bp-email"
              type="email"
              placeholder={t("home.blueprint.placeholder_email")}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              maxLength={255}
              className={inputClasses}
            />
            <label htmlFor="bp-phone" className="sr-only">{t("home.blueprint.placeholder_phone")}</label>
            <input
              id="bp-phone"
              type="tel"
              placeholder={t("home.blueprint.placeholder_phone")}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              maxLength={20}
              className={inputClasses}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-charcoal hover:bg-charcoal-hover text-white py-4 rounded-full font-body font-semibold transition-all duration-300 disabled:opacity-60 text-[17px] hover:shadow-lg hover:shadow-charcoal/20 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {isSubmitting ? t("home.blueprint.sending") : t("home.blueprint.button")}
            </button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-5 text-xs text-muted-foreground/70 font-body italic"
          >
            {t("home.blueprint.trust_text")}
          </motion.p>

          <div className="mt-6 text-center">
            <Link
              to={`/${lang}/buying-property-zichron-yaakov`}
              className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors"
            >
              {lang === "he" ? "קראו את מדריך הרכישה המלא" : "Read the full Buying Guide"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlueprintSection;
