import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import FloatingElements from "@/components/FloatingElements";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, MapPin } from "lucide-react";
import PrivacyConsentCheckbox from "@/components/PrivacyConsentCheckbox";

const Contact = () => {
  const { t } = useSiteContent();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      message: formData.message.trim() || null,
      source: "contact_page",
    });
    if (error) {
      toast.error(t("contact.form.error"));
    } else {
      toast.success(t("contact.form.success"));
      setFormData({ name: "", phone: "", email: "", message: "" });
      setPrivacyConsent(false);
    }
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Phone, labelKey: "contact.info.phone_label", valueKey: "contact.info.phone_value" },
    { icon: Mail, labelKey: "contact.info.email_label", valueKey: "contact.info.email_value" },
    { icon: MapPin, labelKey: "contact.info.address_label", valueKey: "contact.info.address_value" },
  ];

  return (
    <main>
      <Header />
      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="font-display font-semibold text-foreground mb-4">
              {t("contact.hero.title")}
            </h1>
            <p className="text-muted-foreground font-body text-lg">
              {t("contact.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-card">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="font-display font-semibold text-foreground mb-6">
                {t("contact.form.title")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder={t("contact.form.placeholder_name")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  maxLength={100}
                  className="w-full px-5 py-4 rounded-lg border border-border bg-background text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <input
                  type="tel"
                  placeholder={t("contact.form.placeholder_phone")}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  maxLength={20}
                  className="w-full px-5 py-4 rounded-lg border border-border bg-background text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <input
                  type="email"
                  placeholder={t("contact.form.placeholder_email")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  maxLength={255}
                  className="w-full px-5 py-4 rounded-lg border border-border bg-background text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <textarea
                  placeholder={t("contact.form.placeholder_message")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  maxLength={1000}
                  rows={4}
                  className="w-full px-5 py-4 rounded-lg border border-border bg-background text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
                <PrivacyConsentCheckbox
                  checked={privacyConsent}
                  onCheckedChange={setPrivacyConsent}
                  id="contact-page-privacy-consent"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-4 rounded-lg font-body font-semibold transition-colors duration-300 disabled:opacity-60"
                  style={{ fontSize: "17px" }}
                >
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.button")}
                </button>
              </form>
            </div>

            {/* Info */}
            <div>
              <h2 className="font-display font-semibold text-foreground mb-6">
                {t("contact.info.title")}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((c) => (
                  <div key={c.labelKey} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">{t(c.labelKey)}</p>
                      <p className="text-sm font-body text-muted-foreground">{t(c.valueKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustSection />
      <FloatingElements />
    </main>
  );
};

export default Contact;
