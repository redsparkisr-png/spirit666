import { Link } from "react-router-dom";
import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import FloatingElements from "@/components/FloatingElements";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Home, Target, Users } from "lucide-react";
import PrivacyConsentCheckbox from "@/components/PrivacyConsentCheckbox";
import { useLanguage } from "@/lib/i18n";

const Sell = () => {
  const { t } = useSiteContent();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
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
      source: "sell_page",
    });
    if (error) {
      toast.error(t("contact.form.error"));
    } else {
      toast.success(t("contact.form.success"));
      setFormData({ name: "", phone: "", email: "" });
      setPrivacyConsent(false);
    }
    setIsSubmitting(false);
  };

  const features = [
    { icon: Target, titleKey: "sell.why.item_1_title", descKey: "sell.why.item_1_desc" },
    { icon: Home, titleKey: "sell.why.item_2_title", descKey: "sell.why.item_2_desc" },
    { icon: Users, titleKey: "sell.why.item_3_title", descKey: "sell.why.item_3_desc" },
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
              {t("sell.hero.title")}
            </h1>
            <p className="text-muted-foreground font-body text-lg">
              {t("sell.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Sell With Us */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container px-6">
          <h2 className="font-display font-semibold text-foreground text-center mb-12">
            {t("sell.why.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 text-lg">
                  {t(f.titleKey)}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {t(f.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-6">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="font-display font-semibold text-foreground mb-4">
                {t("sell.cta.title")}
              </h2>
              <p className="text-muted-foreground font-body">
                {t("sell.cta.subtitle")}
              </p>
            </motion.div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder={t("sell.cta.placeholder_name")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={100}
                className="w-full px-5 py-4 rounded-lg border border-border bg-card text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <input
                type="tel"
                placeholder={t("sell.cta.placeholder_phone")}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                maxLength={20}
                className="w-full px-5 py-4 rounded-lg border border-border bg-card text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <input
                type="email"
                placeholder={t("sell.cta.placeholder_email")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                maxLength={255}
                className="w-full px-5 py-4 rounded-lg border border-border bg-card text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <PrivacyConsentCheckbox
                checked={privacyConsent}
                onCheckedChange={setPrivacyConsent}
                id="sell-privacy-consent"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-4 rounded-lg font-body font-semibold transition-colors duration-300 disabled:opacity-60"
                style={{ fontSize: "17px" }}
              >
                {isSubmitting ? t("contact.form.sending") : t("sell.cta.button")}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-10 bg-card">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-4">
            <Link to={`/${lang}/buying-property-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {lang === "he" ? "מדריך רכישה" : "Buying Guide"}
            </Link>
            <Link to={`/${lang}/homes-for-sale-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {lang === "he" ? "בתים למכירה" : "Homes for Sale"}
            </Link>
          </div>
        </div>
      </section>

      <TrustSection />
      <FloatingElements />
    </main>
  );
};

export default Sell;
