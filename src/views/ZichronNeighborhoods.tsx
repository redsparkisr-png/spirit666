"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import FAQSection from "@/components/FAQSection";
import {
  MapPin,
  Home,
  Users,
  TreePine,
  Building2,
  Landmark,
  Grape,
  Trees,
  Building,
  Train,
  Mountain,
} from "lucide-react";
import { neighborhoodsEnContent } from "@/content/neighborhoods-en";
import { neighborhoodsHeContent } from "@/content/neighborhoods-he";

// ─── Hebrew pillar (approved upgraded content — 10 areas, non-numeric) ───────
const HE_ICONS: Record<string, React.ElementType> = {
  "hamoshava-historic-center": Landmark,
  "givat-zamarin": Building2,
  "neve-habaron": Trees,
  "neve-remez": Users,
  "ramat-zvi": Home,
  "halomot-zichron": Building,
  "villot-bahoresh": TreePine,
  "mordot-habeer": Mountain,
  "neve-sharett": MapPin,
  "givat-eden": Mountain,
};

const ZichronNeighborhoodsHebrew = () => {
  const c = neighborhoodsHeContent;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: "שכונות זכרון יעקב" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-4 py-1.5 rounded-full mb-6">
              <MapPin className="w-3.5 h-3.5" />
              מדריך שכונות
            </div>
            <h1 className="font-display font-semibold text-foreground mb-4 text-3xl md:text-4xl lg:text-5xl">
              {c.h1}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto leading-relaxed">
              {c.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="pb-4">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {c.intro.map((p, i) => (
              <p key={i} className="text-muted-foreground font-body leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="py-10">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-semibold text-2xl text-foreground mb-5 text-center">
              {c.positioning.heading}
            </h2>
            <div className="space-y-4">
              {c.positioning.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground font-body leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jump Links */}
      <section className="bg-card border-y border-border py-4 mt-4">
        <div className="container px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {c.neighborhoods.map((n) => (
              <a
                key={n.slug}
                href={`#${n.slug}`}
                className="text-sm font-body text-muted-foreground hover:text-foreground border border-border hover:border-gold/50 rounded-full px-4 py-1.5 transition-colors"
              >
                {n.anchorLabel}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhood cards */}
      <section className="py-12 md:py-16">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {c.neighborhoods.map((n) => {
              const Icon = HE_ICONS[n.slug] ?? Home;
              return (
                <motion.div
                  key={n.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  id={n.slug}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-5 h-5 text-gold" />
                      <h2 className="font-display font-semibold text-xl text-foreground">{n.name}</h2>
                    </div>
                    <span className="inline-block text-xs font-body text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full mb-4">
                      {n.tag}
                    </span>

                    <p className="text-muted-foreground font-body leading-relaxed mb-4 text-sm md:text-base">
                      {n.summary}
                    </p>
                    <div className="space-y-3 mb-5">
                      {n.locationAndFeel.map((p, i) => (
                        <p key={i} className="text-muted-foreground font-body leading-relaxed text-sm md:text-base">
                          {p}
                        </p>
                      ))}
                    </div>

                    <div className="mb-5">
                      <p className="text-xs font-body font-semibold text-foreground/60 uppercase tracking-wide mb-1">
                        אופי הנכסים
                      </p>
                      <p className="text-sm font-body text-foreground/80">{n.propertyFeel}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      <div>
                        <p className="text-xs font-body font-semibold text-foreground/60 uppercase tracking-wide mb-2">
                          מתאים ל
                        </p>
                        <ul className="space-y-1">
                          {n.bestFor.map((p, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                              <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-body font-semibold text-foreground/60 uppercase tracking-wide mb-2">
                          פחות מתאים ל
                        </p>
                        <ul className="space-y-1">
                          {n.lessSuitedFor.map((p, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                              <span className="text-muted-foreground shrink-0 mt-0.5">–</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      <div>
                        <p className="text-xs font-body font-semibold text-foreground/60 uppercase tracking-wide mb-2">
                          יתרונות עיקריים
                        </p>
                        <ul className="space-y-1">
                          {n.mainAdvantages.map((p, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                              <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-body font-semibold text-foreground/60 uppercase tracking-wide mb-2">
                          שיקולים
                        </p>
                        <ul className="space-y-1">
                          {n.buyerConsiderations.map((p, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                              <span className="text-muted-foreground shrink-0 mt-0.5">–</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <p className="text-xs font-body font-semibold text-foreground/60 uppercase tracking-wide mb-2">
                        מה חשוב לבדוק
                      </p>
                      <ul className="space-y-1">
                        {n.whatToCheck.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                            <span className="text-gold shrink-0 mt-0.5">•</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Comparison Table (non-numeric) */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display font-semibold text-2xl text-foreground mb-3 text-center">
              {c.comparison.heading}
            </h2>
            <p className="text-muted-foreground font-body text-sm text-center max-w-2xl mx-auto mb-6">
              {c.comparison.intro}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-border">
                    {c.comparison.columns.map((col, i) => (
                      <th
                        key={i}
                        className={`text-start py-3 text-muted-foreground font-semibold ${i < c.comparison.columns.length - 1 ? "pe-4" : ""}`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {c.comparison.rows.map((row) => (
                    <tr key={row.area}>
                      <td className="py-3 pe-4 font-medium text-foreground align-top">{row.area}</td>
                      <td className="py-3 pe-4 text-muted-foreground align-top">{row.feel}</td>
                      <td className="py-3 pe-4 text-muted-foreground align-top">{row.fits}</td>
                      <td className="py-3 text-muted-foreground align-top">{row.check}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Important checks */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-semibold text-2xl text-foreground mb-4 text-center">
              {c.importantChecks.heading}
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-8 text-center">
              {c.importantChecks.intro}
            </p>
            <div className="space-y-5">
              {c.importantChecks.items.map((item) => (
                <div key={item.title} className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-display font-semibold text-foreground text-base mb-1">{item.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection title="שאלות נפוצות על שכונות זכרון יעקב" items={c.faq} emitSchema={false} />

      {/* Internal links */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-semibold text-xl text-foreground mb-6 text-center">
              {c.internalLinks.heading}
            </h2>
            <div className="space-y-3">
              {c.internalLinks.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block bg-background border border-border rounded-xl p-4 hover:border-gold/40 hover:shadow-sm transition-all"
                >
                  <span className="font-display font-semibold text-foreground text-sm group-hover:text-gold">
                    {l.label}
                  </span>
                  <p className="text-muted-foreground font-body text-xs mt-1">{l.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal text-white">
        <div className="container px-6 text-center">
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-gold mb-3">
            {c.cta.eyebrow}
          </p>
          <h2 className="font-display font-semibold text-2xl md:text-3xl mb-3">{c.cta.heading}</h2>
          <p className="text-white/70 font-body mb-8 max-w-lg mx-auto">{c.cta.body}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={c.cta.primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-white px-6 py-3 rounded-full font-body font-semibold text-sm transition-colors"
            >
              {c.cta.primaryLabel}
            </a>
            <Link
              href={c.cta.secondaryHref}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full font-body font-semibold text-sm transition-colors"
            >
              {c.cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// ─── English pillar (approved content — 10 areas, non-numeric) ───────────────
const EN_ICONS: Record<string, React.ElementType> = {
  hamoshava: Landmark,
  "givat-zamarin": Grape,
  "neve-habaron": Trees,
  "neve-remez": Users,
  "ramat-zvi": Home,
  "halomot-zichron": Building2,
  "villot-bahoresh": TreePine,
  "mordot-habeer": Building,
  "neve-sharet": Train,
  "givat-eden": Mountain,
};

const ZichronNeighborhoodsEnglish = () => {
  const c = neighborhoodsEnContent;
  const waUrl = `https://wa.me/972522820632?text=${encodeURIComponent(c.cta.secondary.whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: "Zichron Yaakov Neighborhoods" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-4 py-1.5 rounded-full mb-6">
              <MapPin className="w-3.5 h-3.5" />
              Neighborhood Guide
            </div>
            <h1 className="font-display font-semibold text-foreground mb-4 text-3xl md:text-4xl lg:text-5xl">
              {c.h1}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto leading-relaxed">
              {c.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="pb-4">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {c.intro.map((p, i) => (
              <p key={i} className="text-muted-foreground font-body leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Jump Links */}
      <section className="bg-card border-y border-border py-4 mt-8">
        <div className="container px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {c.neighborhoods.map((n) => (
              <a
                key={n.slug}
                href={`#${n.slug}`}
                className="text-sm font-body text-muted-foreground hover:text-foreground border border-border hover:border-gold/50 rounded-full px-4 py-1.5 transition-colors"
              >
                {n.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhood cards */}
      <section className="py-12 md:py-16">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {c.neighborhoods.map((n) => {
              const Icon = EN_ICONS[n.slug] ?? Home;
              return (
                <motion.div
                  key={n.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  id={n.slug}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-5 h-5 text-gold" />
                      <h2 className="font-display font-semibold text-xl text-foreground">{n.name}</h2>
                    </div>
                    <span className="inline-block text-xs font-body text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full mb-4">
                      {n.tag}
                    </span>

                    <p className="text-muted-foreground font-body leading-relaxed mb-5 text-sm md:text-base">
                      {n.description}
                    </p>

                    <div className="mb-5">
                      <p className="text-xs font-body font-semibold text-foreground/60 uppercase tracking-wide mb-1">
                        Property types
                      </p>
                      <p className="text-sm font-body text-foreground/80">{n.propertyTypes}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      <div>
                        <p className="text-xs font-body font-semibold text-foreground/60 uppercase tracking-wide mb-2">
                          Pros
                        </p>
                        <ul className="space-y-1">
                          {n.pros.map((p, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                              <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-body font-semibold text-foreground/60 uppercase tracking-wide mb-2">
                          Considerations
                        </p>
                        <ul className="space-y-1">
                          {n.considerations.map((c2, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                              <span className="text-muted-foreground shrink-0 mt-0.5">–</span>
                              {c2}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
                      <p className="text-xs font-body text-muted-foreground mb-0.5">Best for:</p>
                      <p className="text-sm font-body text-foreground font-medium">{n.bestFor}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Comparison Table (non-numeric) */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display font-semibold text-2xl text-foreground mb-6 text-center">Quick Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-start py-3 pe-4 text-muted-foreground font-semibold">Area</th>
                    <th className="text-start py-3 pe-4 text-muted-foreground font-semibold">Best For</th>
                    <th className="text-start py-3 pe-4 text-muted-foreground font-semibold">Property Feel</th>
                    <th className="text-start py-3 text-muted-foreground font-semibold">Main Trade-Off</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {c.comparison.map((row) => (
                    <tr key={row.area}>
                      <td className="py-3 pe-4 font-medium text-foreground align-top">{row.area}</td>
                      <td className="py-3 pe-4 text-muted-foreground align-top">{row.bestFor}</td>
                      <td className="py-3 pe-4 text-muted-foreground align-top">{row.propertyFeel}</td>
                      <td className="py-3 text-muted-foreground align-top">{row.mainTradeOff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How to choose */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-semibold text-2xl text-foreground mb-6 text-center">
              {c.howToChoose.h2}
            </h2>
            <div className="space-y-4 mb-6">
              {c.howToChoose.body.map((p, i) => (
                <p key={i} className="text-muted-foreground font-body leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <ul className="space-y-3">
              {c.howToChoose.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-muted-foreground font-body leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Important checks */}
      <section className="py-14 md:py-20 bg-card border-y border-border">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-semibold text-2xl text-foreground mb-6 text-center">
              {c.importantChecks.h2}
            </h2>
            <div className="space-y-4 mb-6">
              {c.importantChecks.body.map((p, i) => (
                <p key={i} className="text-muted-foreground font-body leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <ul className="space-y-3 mb-6">
              {c.importantChecks.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-muted-foreground font-body leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground font-body leading-relaxed text-sm italic">
              {c.importantChecks.bodyAfter}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
      <section className="py-16 bg-charcoal text-white">
        <div className="container px-6 text-center">
          <h2 className="font-display font-semibold text-2xl md:text-3xl mb-3">{c.cta.title}</h2>
          <p className="text-white/70 font-body mb-8 max-w-lg mx-auto">{c.cta.body}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={c.cta.primary.href}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-white px-6 py-3 rounded-full font-body font-semibold text-sm transition-colors"
            >
              {c.cta.primary.label}
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full font-body font-semibold text-sm transition-colors"
            >
              {c.cta.secondary.label}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

const ZichronNeighborhoods = () => {
  const { lang } = useLanguage();
  return lang === "he" ? <ZichronNeighborhoodsHebrew /> : <ZichronNeighborhoodsEnglish />;
};

export default ZichronNeighborhoods;
