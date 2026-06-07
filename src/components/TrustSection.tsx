"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/lib/i18n";
import spiritLogo from "@/assets/spirit-logo.jpg";

const TrustSection = () => {
  const { t } = useSiteContent();
  const { lang } = useLanguage();
  const prefix = `/${lang}`;

  const navLinks = [
    { to: prefix + "/", label: t("header.nav.home") },
    { to: prefix + "/properties", label: t("header.nav.properties") },
    { to: prefix + "/guides", label: lang === "he" ? "בלוג" : "Blog" },
    { to: prefix + "/sell", label: t("header.nav.sell") },
    { to: prefix + "/about", label: t("header.nav.about") },
    { to: prefix + "/contact", label: t("header.nav.contact") },
  ];

  const legalLinks = [
    { to: `${prefix}/privacy`, label: t("header.nav.privacy") },
    { to: `${prefix}/terms`, label: t("header.nav.terms") },
    { to: `${prefix}/accessibility`, label: t("header.nav.accessibility") },
    { to: `${prefix}/cookies`, label: t("header.nav.cookies") },
  ];

  const guideLinks = [
    { to: `${prefix}/buying-property-zichron-yaakov`, label: lang === "he" ? "רכישת נכס בזכרון יעקב" : "Buying Property in Zichron Yaakov" },
    { to: `${prefix}/homes-for-sale-zichron-yaakov`, label: lang === "he" ? "בתים למכירה בזכרון יעקב" : "Homes for Sale in Zichron Yaakov" },
    { to: `${prefix}/living-in-zichron-yaakov`, label: lang === "he" ? "חיים בזכרון יעקב" : "Living in Zichron Yaakov" },
    { to: `${prefix}/moving-to-zichron-yaakov`, label: lang === "he" ? "מעבר לזכרון יעקב" : "Moving to Zichron Yaakov" },
  ];

  return (
    <footer
      className="py-14 md:py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(160 62% 8%) 100%)",
      }}
    >
      {/* Subtle gold glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--gold) / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Logo */}
          <Link href={prefix + "/"} className="inline-block mb-10 group">
            <img
              src={(spiritLogo as any).src ?? (spiritLogo as unknown as string)}
              alt="Spirit Real Estate"
              className="h-[50px] md:h-[68px] w-auto rounded-md mx-auto transition-transform duration-500 group-hover:scale-105"
              style={{ objectFit: "contain", imageRendering: "-webkit-optimize-contrast" as any }}
             loading="lazy" decoding="async" />
          </Link>

          {/* Gold accent divider */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </div>

          {/* Quick nav */}
          <nav className="flex justify-center gap-6 mb-10 flex-wrap" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                className="text-primary-foreground/60 hover:text-primary-foreground font-body text-sm transition-all duration-300 hover:tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Guides section */}
          <div className="mb-8">
            <p className="text-primary-foreground/50 font-body text-xs uppercase tracking-widest mb-4">
              {lang === "he" ? "מדריכי זכרון יעקב" : "Zichron Yaakov Guides"}
            </p>
            <nav className="flex justify-center gap-x-6 gap-y-2 flex-wrap" aria-label="Guide links">
              {guideLinks.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  className="text-primary-foreground/50 hover:text-primary-foreground/80 font-body text-[13px] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Thin separator */}
          <div className="w-32 h-px bg-primary-foreground/10 mx-auto mb-10" />

          {/* Legal links */}
          <nav className="flex justify-center gap-6 mb-10 flex-wrap" aria-label="Legal links">
            {legalLinks.map((link) => (
              <Link key={link.to} href={link.to} className="text-primary-foreground/40 hover:text-primary-foreground/70 font-body text-[13px] transition-colors duration-300">
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => window.dispatchEvent(new Event("cookie-reopen"))}
              className="text-primary-foreground/40 hover:text-primary-foreground/70 font-body text-[13px] transition-colors duration-300 cursor-pointer"
            >
              {lang === "he" ? "העדפות עוגיות" : "Cookie Preferences"}
            </button>
          </nav>

          <p className="text-primary-foreground/40 font-body text-[13px] leading-relaxed max-w-lg mx-auto mb-4">
            {t("home.footer.disclaimer")}
          </p>

          <p className="text-primary-foreground/30 font-body text-[13px]">
            © {new Date().getFullYear()} Spirit Real Estate. {lang === "he" ? "כל הזכויות שמורות." : "All rights reserved."}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default TrustSection;
