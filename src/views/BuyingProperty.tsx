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
import { ArrowRight, AlertTriangle, Home, Handshake, MapPin, CheckSquare } from "lucide-react";

const BuyingProperty = () => {
  const { lang } = useLanguage();
  const { t } = useSiteContent();
  const isHe = lang === "he";
  const prefix = `/${lang}`;

  const sectionIcons = [MapPin, Home, AlertTriangle, Handshake];
  const sections = sectionIcons.map((Icon, idx) => ({
    Icon,
    title: t(`buying.section_${idx + 1}_title`),
    body: t(`buying.section_${idx + 1}_body`),
  }));

  const checklist = [1, 2, 3, 4, 5, 6].map((i) => t(`buying.checklist.item_${i}`));
  const faq = [1, 2, 3, 4].map((i) => ({ q: t(`buying.faq.q_${i}`), a: t(`buying.faq.a_${i}`) }));

  return (
    <main className="min-h-screen bg-background">
      <PageMeta title={t("seo.buying.title")} description={t("seo.buying.description")} />
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: isHe ? "רכישת נכס בזכרון יעקב" : "Buying Property" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6"
          >
            <h1 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "רכישת נכס בזכרון יעקב" : "Buying Property in Zichron Yaakov"}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
              {isHe
                ? "מדריך מקיף לרכישת נכס בזכרון יעקב — מידע מקומי, שיקולים חשובים, וליווי מקצועי."
                : "A comprehensive guide to buying property in Zichron Yaakov — local insights, key considerations, and expert guidance."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
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

      {/* Checklist */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex w-12 h-12 rounded-full bg-gold/10 items-center justify-center mb-4">
                <CheckSquare className="w-5 h-5 text-gold" />
              </div>
              <h2 className="font-display font-semibold text-foreground">{t("buying.checklist.title")}</h2>
            </div>
            <ul className="space-y-3">
              {checklist.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: isHe ? 10 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-start gap-3 bg-card border border-border rounded-xl p-4"
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-display flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="font-body text-foreground text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "מוכנים להתחיל?" : "Ready to Start?"}
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
              {isHe
                ? "עיינו בנכסים הזמינים בזכרון יעקב ומצאו את הבית שלכם."
                : "Explore available homes in Zichron Yaakov and find your perfect property."}
            </p>
            <Link
              href={`${prefix}/properties`}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-primary-foreground py-4 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ fontSize: "17px" }}
            >
              {isHe ? "צפו בנכסים" : "Explore Homes in Zichron Yaakov"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <BuyerBlueprintBlock />

      <FAQSection title={t("buying.faq.title")} items={faq} />

      <RelatedGuides limit={3} />

      {/* Internal links */}
      <section className="py-12 bg-background">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-4">
            <Link href={`${prefix}/homes-for-sale-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "בתים למכירה בזכרון יעקב" : "Homes for Sale in Zichron Yaakov"}
            </Link>
            <Link href={`${prefix}/living-in-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "חיים בזכרון יעקב" : "Living in Zichron Yaakov"}
            </Link>
            <Link href={`${prefix}/moving-to-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "מעבר לזכרון יעקב" : "Moving to Zichron Yaakov"}
            </Link>
            <Link href={`${prefix}/contact`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "צור קשר" : "Contact Us"}
            </Link>
          </div>
        </div>
      </section>

      <TrustSection />
    </main>
  );
};

export default BuyingProperty;
