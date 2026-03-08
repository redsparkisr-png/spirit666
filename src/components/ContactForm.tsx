import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/lib/i18n";
import PrivacyConsentCheckbox from "@/components/PrivacyConsentCheckbox";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useSiteContent();
  const { lang } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      toast.error(t("home.contact.validation_error"));
      return;
    }
    if (!privacyConsent) {
      toast.error(t("form.privacy_consent_required"));
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      full_name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      source: "landing_page",
    });
    if (error) {
      toast.error(t("home.contact.error"));
    } else {
      toast.success(t("home.contact.success"));
      setFormData({ name: "", phone: "", email: "" });
      setPrivacyConsent(false);
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact-form" className="py-20 md:py-28 lg:py-32 bg-background" aria-labelledby="contact-heading">
      <div className="container px-6">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 id="contact-heading" className="font-display font-semibold text-foreground mb-4 text-[22px] md:text-[28px] lg:text-[36px]">
              {t("home.contact.title")}
            </h2>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              {t("home.contact.subtitle")}
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
            <label htmlFor="contact-name" className="sr-only">{t("home.contact.placeholder_name")}</label>
            <input
              id="contact-name"
              type="text"
              placeholder={t("home.contact.placeholder_name")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              maxLength={100}
              className="w-full px-5 py-4 rounded-lg border border-border bg-card text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
            />
            <label htmlFor="contact-phone" className="sr-only">{t("home.contact.placeholder_phone")}</label>
            <input
              id="contact-phone"
              type="tel"
              placeholder={t("home.contact.placeholder_phone")}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              maxLength={20}
              className="w-full px-5 py-4 rounded-lg border border-border bg-card text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
            />
            <label htmlFor="contact-email" className="sr-only">{t("home.contact.placeholder_email")}</label>
            <input
              id="contact-email"
              type="email"
              placeholder={t("home.contact.placeholder_email")}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              maxLength={255}
              className="w-full px-5 py-4 rounded-lg border border-border bg-card text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
            />

            <PrivacyConsentCheckbox
              checked={privacyConsent}
              onCheckedChange={setPrivacyConsent}
              id="contact-privacy-consent"
            />
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-lg font-body font-semibold transition-all duration-300 disabled:opacity-60 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5 active:scale-[0.98] text-primary-foreground"
              style={{
                fontSize: '17px',
                background: 'linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-hover)) 100%)',
              }}
            >
              {isSubmitting ? t("home.contact.sending") : t("home.contact.button")}
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
              {t("home.contact.response_time")}
            </p>
            <p className="text-xs text-muted-foreground/50 font-body italic">
              {t("home.contact.trust_text")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
