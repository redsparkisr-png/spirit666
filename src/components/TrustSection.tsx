import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    { to: prefix + "/sell", label: t("header.nav.sell") },
    { to: prefix + "/about", label: t("header.nav.about") },
    { to: prefix + "/contact", label: t("header.nav.contact") },
  ];

  const legalLinks = [
    { to: `${prefix}/privacy`, label: t("header.nav.privacy") },
    { to: `${prefix}/terms`, label: t("header.nav.terms") },
    { to: `${prefix}/accessibility`, label: t("header.nav.accessibility") },
  ];

  return (
    <footer className="py-14 md:py-20 bg-primary">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Logo */}
          <Link to={prefix + "/"} className="inline-block mb-10">
            <img src={spiritLogo} alt="Spirit Real Estate" className="h-[50px] md:h-[68px] w-auto rounded-md mx-auto" style={{ objectFit: "contain", imageRendering: "-webkit-optimize-contrast" as any }} />
          </Link>

          <div className="w-12 h-px bg-gold mx-auto mb-8" />

          {/* Quick nav */}
          <nav className="flex justify-center gap-5 mb-8 flex-wrap" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-primary-foreground/70 hover:text-primary-foreground font-body text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Gold divider */}
          <div className="w-24 h-px bg-gold/30 mx-auto mb-8" />

          {/* Legal links */}
          <nav className="flex justify-center gap-6 mb-8 flex-wrap" aria-label="Legal links">
            {legalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-primary-foreground/50 hover:text-primary-foreground/80 font-body text-[13px] transition-colors">
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => window.dispatchEvent(new Event("cookie-reopen"))}
              className="text-primary-foreground/50 hover:text-primary-foreground/80 font-body text-[13px] transition-colors cursor-pointer"
            >
              {lang === "he" ? "העדפות עוגיות" : "Cookie Preferences"}
            </button>
          </nav>

          <p className="text-primary-foreground/50 font-body text-[13px] leading-relaxed max-w-lg mx-auto mb-4">
            {t("home.footer.disclaimer")}
          </p>

          <p className="text-primary-foreground/40 font-body text-[13px]">
            {t("home.footer.copyright").replace("{year}", new Date().getFullYear().toString())}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default TrustSection;
