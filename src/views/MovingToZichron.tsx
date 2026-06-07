"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import BuyerBlueprintBlock from "@/components/BuyerBlueprintBlock";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import PageMeta from "@/components/PageMeta";
import FAQSection from "@/components/FAQSection";
import RelatedGuides from "@/components/RelatedGuides";
import { Users, Info, TrendingUp, Handshake, ArrowRight } from "lucide-react";

const MovingToZichron = () => {
  const { lang } = useLanguage();
  const { t } = useSiteContent();
  const isHe = lang === "he";
  const prefix = `/${lang}`;

  const sectionIcons = [Users, Info, TrendingUp, Handshake];
  const sections = sectionIcons.map((Icon, idx) => ({
    Icon,
    title: t(`moving.section_${idx + 1}_title`),
    body: t(`moving.section_${idx + 1}_body`),
  }));

  const stats = [1, 2, 3, 4].map((i) => ({
    value: t(`moving.stats.item_${i}_value`),
    label: t(`moving.stats.item_${i}_label`),
  }));

  const faq = [1, 2, 3, 4].map((i) => ({ q: t(`moving.faq.q_${i}`), a: t(`moving.faq.a_${i}`) }));

  return (
    <main className="min-h-screen bg-background">
      <PageMeta title={t("seo.moving.title")} description={t("seo.moving.description")} />
      <Header />

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: isHe ? "מעבר לזכרון יעקב" : "Moving to Zichron Yaakov" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6"
          >
            <h1 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "מעבר לזכרון יעקב" : "Moving to Zichron Yaakov"}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
              {isHe
                ? "כל מה שצריך לדעת לפני שעוברים לזכרון יעקב — מידע מקומי, טיפים והמלצות."
                : "Everything you need to know before moving to Zichron Yaakov — local insights, tips, and recommendations."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats infographic */}
      <section className="py-10 md:py-14 bg-primary text-primary-foreground">
        <div className="container px-6">
          <p className="text-center font-display text-primary-foreground/70 text-xs uppercase tracking-[0.25em] mb-6">
            {t("moving.stats.title")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="text-center"
              >
                <p className="font-display text-2xl md:text-3xl text-gold mb-1">{s.value}</p>
                <p className="font-body text-xs md:text-sm text-primary-foreground/80">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto space-y-16">
            {sections.map(({ Icon, title, body }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display font-semibold text-foreground text-xl md:text-2xl">{title}</h2>
                </div>
                <p className="text-muted-foreground font-body leading-relaxed ps-14">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "מוכנים לשיחה אישית?" : "Ready for a Personal Consultation?"}
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
              {isHe
                ? "נשמח ללוות אתכם בתהליך המעבר — מהצעד הראשון ועד המפתח."
                : "We'd love to guide you through the relocation process — from the first step to the key."}
            </p>
            <Link
              href={`${prefix}/contact`}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-primary-foreground py-4 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ fontSize: "17px" }}
            >
              {isHe ? "קבעו ייעוץ מקומי" : "Book a Local Consultation"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <BuyerBlueprintBlock />

      <FAQSection title={t("moving.faq.title")} items={faq} />

      <RelatedGuides limit={3} />

      {/* Internal links */}
      <section className="py-12 bg-background">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-4">
            <Link href={`${prefix}/buying-property-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "מדריך רכישה" : "Buying Guide"}
            </Link>
            <Link href={`${prefix}/homes-for-sale-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "בתים למכירה" : "Homes for Sale"}
            </Link>
            <Link href={`${prefix}/properties`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "כל הנכסים" : "All Properties"}
            </Link>
          </div>
        </div>
      </section>

      <TrustSection />
    </main>
  );
};

export default MovingToZichron;
