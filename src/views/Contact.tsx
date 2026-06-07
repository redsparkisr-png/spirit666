"use client";

import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import FloatingElements from "@/components/FloatingElements";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import LeadForm from "@/components/LeadForm";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Contact = () => {
  const { t } = useSiteContent();
  const phoneRaw = t("contact.info.phone_value").replace(/[^\d+]/g, "");
  const emailRaw = t("contact.info.email_value");
  const waUrl = `https://wa.me/${t("whatsapp.phone_number")}?text=${encodeURIComponent(t("whatsapp.default_message"))}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Spirit Real Estate",
    telephone: t("contact.info.phone_value"),
    email: emailRaw,
    address: {
      "@type": "PostalAddress",
      streetAddress: t("contact.map.address"),
      addressLocality: "Zichron Yaakov",
        postalCode: "3091668",
      addressCountry: "IL",
    },
    openingHours: ["Su-Th 09:00-18:00", "Fr 09:00-13:00"],
    url: "https://spiritisraelhomes.com/",
  };

  return (
    <main>
      <PageMeta title={t("seo.contact.title")} description={t("seo.contact.description")} jsonLd={jsonLd} />
      <Header />
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: t("contact.breadcrumb") }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6"
          >
            <h1 className="font-display font-semibold text-foreground mb-4">
              {t("contact.hero.title")}
            </h1>
            <p className="text-muted-foreground font-body text-lg">
              {t("contact.hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-primary-foreground py-3 px-6 rounded-full font-body font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                {t("contact.whatsapp.cta")}
              </a>
              <a
                href={`tel:${phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 border border-border hover:border-primary text-foreground py-3 px-6 rounded-full font-body font-semibold transition-all"
              >
                <Phone className="w-4 h-4" />
                {t("contact.cta.call")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-card">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display font-semibold text-foreground mb-6">
                {t("contact.form.title")}
              </h2>
              <LeadForm source="contact_page" idPrefix="contact-page" includeMessage />
            </div>

            <div>
              <h2 className="font-display font-semibold text-foreground mb-6">
                {t("contact.info.title")}
              </h2>
              <div className="space-y-5">
                <a href={`tel:${phoneRaw}`} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-body font-medium text-foreground">{t("contact.info.phone_hagit_label")}</p>
                    <p className="text-sm font-body text-muted-foreground group-hover:text-gold transition-colors">{t("contact.info.phone_hagit_value")}</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-body font-medium text-foreground">{t("contact.info.phone_avi_label")}</p>
                    <p className="text-sm font-body text-muted-foreground">{t("contact.info.phone_avi_value")}</p>
                  </div>
                </div>
                <a href={`mailto:${emailRaw}`} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-body font-medium text-foreground">{t("contact.info.email_label")}</p>
                    <p className="text-sm font-body text-muted-foreground group-hover:text-gold transition-colors">{emailRaw}</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-body font-medium text-foreground">{t("contact.info.address_label")}</p>
                    <p className="text-sm font-body text-muted-foreground">{t("contact.info.address_value")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-body font-medium text-foreground">{t("contact.hours.title")}</p>
                    <p className="text-xs font-body text-muted-foreground">{t("contact.hours.weekdays")}</p>
                    <p className="text-xs font-body text-muted-foreground">{t("contact.hours.friday")}</p>
                    <p className="text-xs font-body text-muted-foreground">{t("contact.hours.saturday")}</p>
                    <p className="text-xs font-body text-muted-foreground/80 mt-2 italic">{t("contact.hours.response")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-6">
          <h2 className="font-display font-semibold text-foreground text-center mb-8">
            {t("contact.map.title")}
          </h2>
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border shadow-md aspect-[16/9]">
            <iframe
              title={t("contact.map.title")}
              src="https://www.google.com/maps?q=HaChochit+15,+Zichron+Yaakov,+Israel&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <TrustSection />
      <FloatingElements />
    </main>
  );
};

export default Contact;
