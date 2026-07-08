"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Target, Users, CheckCircle2, ShieldCheck, FileText, LineChart } from "lucide-react";
import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import FloatingElements from "@/components/FloatingElements";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import PageMeta from "@/components/PageMeta";
import LeadForm from "@/components/LeadForm";
import FAQSection from "@/components/FAQSection";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/lib/i18n";
import RecentlySold, { useRecentlySold } from "@/components/RecentlySold";
import { sellEnContent } from "@/content/sell-en";

// ─── English Sell page (approved conversion content) ─────────────────────────
const SellEnglish = () => {
  const { t } = useSiteContent();
  const c = sellEnContent;
  const sold = useRecentlySold();

  const s1Icons = [Target, Users, ShieldCheck];
  const s6Icons = [FileText, LineChart, CheckCircle2];

  const Bullets = ({ items }: { items: string[] }) => (
    <ul className="space-y-3 max-w-2xl mx-auto">
      {items.map((b) => (
        <li key={b} className="flex gap-3 text-muted-foreground font-body leading-relaxed">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <main>
      <PageMeta title={c.seoTitle} description={c.metaDescription} />
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: t("sell.breadcrumb") }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mt-6"
          >
            <span className="inline-block text-xs font-body uppercase tracking-[0.2em] text-gold mb-4">
              {c.heroBadge}
            </span>
            <h1 className="font-display font-semibold text-foreground mb-5">{c.h1}</h1>
            <div className="space-y-4">
              {c.heroSubtitle.map((p, i) => (
                <p key={i} className="text-muted-foreground font-body text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={c.primaryCta.href}
                className="inline-flex items-center justify-center bg-gold hover:bg-gold-hover text-primary-foreground py-3 px-7 rounded-full font-body font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                {c.primaryCta.label}
              </a>
              <a
                href={c.secondaryCta.href}
                className="inline-flex items-center justify-center border border-border hover:border-primary text-foreground py-3 px-7 rounded-full font-body font-semibold transition-all"
              >
                {c.secondaryCta.label}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1 — Local strategy */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="font-display font-semibold text-foreground mb-5">{c.section1.h2}</h2>
            <div className="space-y-4 text-start">
              {c.section1.body.map((p, i) => (
                <p key={i} className="text-muted-foreground font-body leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {c.section1.cards.map((card, i) => {
              const Icon = s1Icons[i] ?? Home;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-background rounded-2xl p-6 border border-border"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2 text-lg">{card.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{card.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display font-semibold text-foreground mb-4">{c.process.h2}</h2>
            <p className="text-muted-foreground font-body leading-relaxed">{c.process.intro}</p>
          </div>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute start-5 top-2 bottom-2 w-px bg-border" aria-hidden />
            <div className="space-y-8">
              {c.process.steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative ps-16"
                >
                  <div className="absolute start-0 top-0 w-10 h-10 rounded-full bg-gold text-primary-foreground flex items-center justify-center font-display font-semibold shadow-md">
                    {i + 1}
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-1">{s.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recently sold proof */}
      <RecentlySold sold={sold} title={t("sell.sold.title")} subtitle={t("sell.sold.subtitle")} />

      {/* Section 3 — Quietly or publicly */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-semibold text-foreground text-center mb-6">{c.section3.h2}</h2>
            <div className="space-y-4 mb-8">
              {c.section3.body.map((p, i) => (
                <p key={i} className="text-muted-foreground font-body leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <Bullets items={c.section3.bullets} />
          </div>
        </div>
      </section>

      {/* Section 4 — Overseas buyers */}
      <section className="py-14 md:py-20 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-semibold text-foreground text-center mb-6">{c.section4.h2}</h2>
            <div className="space-y-4 mb-8">
              {c.section4.body.map((p, i) => (
                <p key={i} className="text-muted-foreground font-body leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <Bullets items={c.section4.bullets} />
          </div>
        </div>
      </section>

      {/* Section 5 — Prepare before market */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-semibold text-foreground text-center mb-6">{c.section5.h2}</h2>
            <div className="space-y-4 mb-8">
              {c.section5.body.map((p, i) => (
                <p key={i} className="text-muted-foreground font-body leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <Bullets items={c.section5.bullets} />
            <p className="text-muted-foreground font-body leading-relaxed mt-8 text-sm italic max-w-2xl mx-auto">
              {c.section5.bodyAfter}
            </p>
          </div>
        </div>
      </section>

      {/* Section 6 — Transparency */}
      <section className="py-14 md:py-20 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="font-display font-semibold text-foreground mb-5">{c.section6.h2}</h2>
            <div className="space-y-4 text-start">
              {c.section6.body.map((p, i) => (
                <p key={i} className="text-muted-foreground font-body leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {c.section6.cards.map((card, i) => {
              const Icon = s6Icons[i] ?? CheckCircle2;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-background rounded-2xl p-6 border border-border"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2 text-lg">{card.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{card.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 7 + valuation form */}
      <section id="valuation" className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="font-display font-semibold text-foreground mb-5">{c.section7.h2}</h2>
            <p className="text-muted-foreground font-body leading-relaxed text-start">{c.section7.body}</p>
          </div>
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-[0.2em] text-gold mb-3">
                <CheckCircle2 className="w-4 h-4" />
                No obligation
              </span>
              <h3 className="font-display font-semibold text-foreground mb-3 text-xl">{c.form.heading}</h3>
              <p className="text-muted-foreground font-body">{c.form.intro}</p>
            </motion.div>
            <LeadForm
              source="sell_page_valuation"
              idPrefix="sell-val"
              includeAddress
              includeMessage
              addressPlaceholder={c.form.addressPlaceholder}
              buttonLabel={c.form.button}
            />
          </div>
        </div>
      </section>

      <FAQSection title="Frequently Asked Questions" items={c.faq} emitSchema={false} />

      {/* Internal links */}
      <section className="py-10 bg-background border-t border-border">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-3">
            {c.internalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TrustSection />
      <FloatingElements />
    </main>
  );
};

// ─── Hebrew Sell page (existing content, unchanged) ──────────────────────────
const SellHebrew = () => {
  const { t } = useSiteContent();
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const prefix = `/${lang}`;

  const features = [
    { icon: Target, titleKey: "sell.why.item_1_title", descKey: "sell.why.item_1_desc" },
    { icon: Home, titleKey: "sell.why.item_2_title", descKey: "sell.why.item_2_desc" },
    { icon: Users, titleKey: "sell.why.item_3_title", descKey: "sell.why.item_3_desc" },
  ];

  const steps = [
    { key: "step_1" },
    { key: "step_2" },
    { key: "step_3" },
    { key: "step_4" },
    { key: "step_5" },
  ];

  const transparency = [
    { icon: FileText, key: "item_1" },
    { icon: LineChart, key: "item_2" },
    { icon: ShieldCheck, key: "item_3" },
  ];

  const faq = [1, 2, 3, 4].map((i) => ({
    q: t(`sell.faq.q_${i}`),
    a: t(`sell.faq.a_${i}`),
  }));

  const sold = useRecentlySold();

  return (
    <main>
      <PageMeta title={t("seo.sell.title")} description={t("seo.sell.description")} />
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: t("sell.breadcrumb") }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6"
          >
            <span className="inline-block text-xs font-body uppercase tracking-[0.2em] text-gold mb-4">
              {t("sell.hero.badge")}
            </span>
            <h1 className="font-display font-semibold text-foreground mb-4">{t("sell.hero.title")}</h1>
            <p className="text-muted-foreground font-body text-lg">{t("sell.hero.subtitle")}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#valuation"
                className="inline-flex items-center justify-center bg-gold hover:bg-gold-hover text-primary-foreground py-3 px-7 rounded-full font-body font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                {t("sell.valuation.button")}
              </a>
              <a
                href="#process"
                className="inline-flex items-center justify-center border border-border hover:border-primary text-foreground py-3 px-7 rounded-full font-body font-semibold transition-all"
              >
                {isHe ? "איך זה עובד" : "How it works"}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container px-6">
          <h2 className="font-display font-semibold text-foreground text-center mb-12">{t("sell.why.title")}</h2>
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
                <h3 className="font-display font-semibold text-foreground mb-2 text-lg">{t(f.titleKey)}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{t(f.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section id="process" className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-semibold text-foreground mb-3">{t("sell.process.title")}</h2>
            <p className="text-muted-foreground font-body">{t("sell.process.subtitle")}</p>
          </div>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute start-5 top-2 bottom-2 w-px bg-border" aria-hidden />
            <div className="space-y-8">
              {steps.map((s, i) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, x: isHe ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative ps-16"
                >
                  <div className="absolute start-0 top-0 w-10 h-10 rounded-full bg-gold text-primary-foreground flex items-center justify-center font-display font-semibold shadow-md">
                    {i + 1}
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-1">
                    {t(`sell.process.${s.key}_title`)}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {t(`sell.process.${s.key}_desc`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recently sold proof */}
      <RecentlySold sold={sold} title={t("sell.sold.title")} subtitle={t("sell.sold.subtitle")} />

      {/* Transparency */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container px-6">
          <h2 className="font-display font-semibold text-foreground text-center mb-12">
            {t("sell.transparency.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {transparency.map((it, i) => (
              <motion.div
                key={it.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <it.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 text-lg">
                  {t(`sell.transparency.${it.key}_title`)}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {t(`sell.transparency.${it.key}_desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free valuation form */}
      <section id="valuation" className="py-16 md:py-24 bg-card">
        <div className="container px-6">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-[0.2em] text-gold mb-3">
                <CheckCircle2 className="w-4 h-4" />
                {isHe ? "ללא התחייבות" : "No obligation"}
              </span>
              <h2 className="font-display font-semibold text-foreground mb-3">{t("sell.valuation.title")}</h2>
              <p className="text-muted-foreground font-body">{t("sell.valuation.subtitle")}</p>
            </motion.div>
            <LeadForm
              source="sell_page_valuation"
              idPrefix="sell-val"
              includeAddress
              includeMessage
              buttonLabel={t("sell.valuation.button")}
            />
          </div>
        </div>
      </section>

      <FAQSection title={t("sell.faq.title")} items={faq} />

      {/* Internal links */}
      <section className="py-10 bg-background border-t border-border">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-4">
            <Link
              href={`${prefix}/buying-property-zichron-yaakov`}
              className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors"
            >
              {isHe ? "מדריך רכישה" : "Buying Guide"}
            </Link>
            <Link
              href={`${prefix}/homes-for-sale-zichron-yaakov`}
              className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors"
            >
              {isHe ? "בתים למכירה" : "Homes for Sale"}
            </Link>
            <Link
              href={`${prefix}/about`}
              className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors"
            >
              {isHe ? "אודות הצוות" : "About the team"}
            </Link>
          </div>
        </div>
      </section>

      <TrustSection />
      <FloatingElements />
    </main>
  );
};

const Sell = () => {
  const { lang } = useLanguage();
  return lang === "he" ? <SellHebrew /> : <SellEnglish />;
};

export default Sell;
