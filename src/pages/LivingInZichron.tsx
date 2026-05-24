import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import PageMeta from "@/components/PageMeta";
import FAQSection from "@/components/FAQSection";
import RelatedGuides from "@/components/RelatedGuides";
import { Heart, Users, GraduationCap, Train, ArrowRight, Sparkles } from "lucide-react";

const LivingInZichron = () => {
  const { lang } = useLanguage();
  const { t } = useSiteContent();
  const isHe = lang === "he";
  const prefix = `/${lang}`;

  const sectionIcons = [Heart, Users, GraduationCap, Train];
  const sections = sectionIcons.map((Icon, idx) => ({
    Icon,
    title: t(`living.section_${idx + 1}_title`),
    body: t(`living.section_${idx + 1}_body`),
  }));

  const highlights = [1, 2, 3, 4].map((i) => t(`living.highlights.item_${i}`));
  const faq = [1, 2, 3, 4].map((i) => ({ q: t(`living.faq.q_${i}`), a: t(`living.faq.a_${i}`) }));

  return (
    <main className="min-h-screen bg-background">
      <PageMeta title={t("seo.living.title")} description={t("seo.living.description")} />
      <Header />

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: isHe ? "חיים בזכרון יעקב" : "Living in Zichron Yaakov" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6"
          >
            <h1 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "חיים בזכרון יעקב" : "Living in Zichron Yaakov"}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
              {isHe
                ? "גלו למה זכרון יעקב היא אחת הערים המבוקשות ביותר בישראל — אורח חיים, קהילה ואיכות חיים."
                : "Discover why Zichron Yaakov is one of Israel's most sought-after towns — lifestyle, community, and quality of life."}
            </p>
          </motion.div>
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

      {/* Local highlights */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex w-12 h-12 rounded-full bg-gold/10 items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <h2 className="font-display font-semibold text-foreground">{t("living.highlights.title")}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-card border border-border rounded-2xl p-5 font-body text-foreground"
                >
                  {h}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "מוכנים לגלות את הבית שלכם?" : "Ready to Find Your Home?"}
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
              {isHe
                ? "עיינו בנכסים הזמינים ומצאו את הבית המתאים לכם בזכרון יעקב."
                : "Browse available properties and find your ideal home in Zichron Yaakov."}
            </p>
            <Link
              to={`${prefix}/properties`}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-primary-foreground py-4 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ fontSize: "17px" }}
            >
              {isHe ? "צפו בנכסים" : "View Properties"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <FAQSection title={t("living.faq.title")} items={faq} />

      <RelatedGuides limit={3} />

      {/* Internal links */}
      <section className="py-12 bg-card">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-4">
            <Link to={`${prefix}/buying-property-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "מדריך רכישה" : "Buying Guide"}
            </Link>
            <Link to={`${prefix}/moving-to-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "מעבר לזכרון יעקב" : "Moving to Zichron Yaakov"}
            </Link>
            <Link to={`${prefix}/contact`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "צור קשר" : "Contact Us"}
            </Link>
          </div>
        </div>
      </section>

      <TrustSection />
    </main>
  );
};

export default LivingInZichron;
