"use client";

import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import FloatingElements from "@/components/FloatingElements";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import eliranImg from "@/assets/eliran-amsalem.jpg";
import hagitImg from "@/assets/hagit-cohen-morgan.png";
import aviImg from "@/assets/avi-suliman.png";
import { Eye, MapPin, Heart, Award } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const About = () => {
  const { t } = useSiteContent();

  const values = [
    { icon: Eye, titleKey: "about.values.item_1_title", descKey: "about.values.item_1_desc" },
    { icon: MapPin, titleKey: "about.values.item_2_title", descKey: "about.values.item_2_desc" },
    { icon: Heart, titleKey: "about.values.item_3_title", descKey: "about.values.item_3_desc" },
  ];

  const team = [
    { img: eliranImg, nameKey: "home.why.eliran_name", roleKey: "home.why.eliran_role", bioKey: "about.team.eliran_bio" },
    { img: hagitImg, nameKey: "home.why.hagit_name", roleKey: "home.why.hagit_role", bioKey: "about.team.hagit_bio" },
    { img: aviImg, nameKey: "home.why.avi_name", roleKey: "home.why.avi_role", bioKey: "about.team.avi_bio" },
  ];

  const timeline = [1, 2, 3, 4].map((i) => ({
    year: t(`about.timeline.item_${i}_year`),
    title: t(`about.timeline.item_${i}_title`),
    desc: t(`about.timeline.item_${i}_desc`),
  }));

  const credentials = [1, 2, 3, 4].map((i) => ({
    label: t(`about.credentials.item_${i}_label`),
    value: t(`about.credentials.item_${i}_value`),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Spirit Real Estate",
    url: "https://spiritisraelhomes.com/",
    foundingDate: "2019",
    areaServed: "Zichron Yaakov, Israel",
  };

  return (
    <main>
      <PageMeta title={t("seo.about.title")} description={t("seo.about.description")} jsonLd={jsonLd} />
      <Header />
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: t("about.breadcrumb") }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6"
          >
            <h1 className="font-display font-semibold text-foreground mb-4">
              {t("about.hero.title")}
            </h1>
            <p className="text-muted-foreground font-body text-lg">
              {t("about.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display font-semibold text-foreground mb-6 text-center">
              {t("about.story.title")}
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed text-center">
              {t("about.story.text")}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-6">
          <h2 className="font-display font-semibold text-foreground text-center mb-12">
            {t("about.values.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 text-lg">
                  {t(v.titleKey)}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {t(v.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container px-6">
          <h2 className="font-display font-semibold text-foreground text-center mb-12">
            {t("about.team.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((m, i) => (
              <motion.div
                key={m.nameKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border shadow-sm mx-auto mb-4">
                  <img src={(m.img as any).src ?? (m.img as unknown as string)} alt={t(m.nameKey)} className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-base">{t(m.nameKey)}</h3>
                <p className="text-xs text-muted-foreground font-body mb-2">{t(m.roleKey)}</p>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{t(m.bioKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-6">
          <h2 className="font-display font-semibold text-foreground text-center mb-12">
            {t("about.timeline.title")}
          </h2>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute start-5 top-2 bottom-2 w-px bg-border" aria-hidden />
            <div className="space-y-8">
              {timeline.map((it, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative ps-16"
                >
                  <div className="absolute start-0 top-0 w-10 h-10 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center font-display font-semibold text-xs">
                    {it.year}
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-1">{it.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{it.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex w-12 h-12 rounded-full bg-gold/10 items-center justify-center mb-4">
                <Award className="w-5 h-5 text-gold" />
              </div>
              <h2 className="font-display font-semibold text-foreground">{t("about.credentials.title")}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {credentials.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-background rounded-2xl p-5 border border-border"
                >
                  <p className="text-xs font-body uppercase tracking-[0.18em] text-muted-foreground mb-1.5">{c.label}</p>
                  <p className="font-display text-foreground text-base">{c.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustSection />
      <FloatingElements />
    </main>
  );
};

export default About;
