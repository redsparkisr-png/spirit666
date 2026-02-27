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
    <footer className="py-12 md:py-16 bg-primary">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Logo */}
          <Link to={prefix + "/"} className="inline-block mb-6">
            <img
              src={spiritLogo}
              alt="Spirit Real Estate"
              className="w-12 h-12 rounded-lg mx-auto"
            />
          </Link>

          <div className="w-12 h-px bg-gold mx-auto mb-6" />

          {/* Quick nav */}
          <nav className="flex justify-center gap-5 mb-6 flex-wrap" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-primary-foreground/70 hover:text-primary-foreground font-body text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Legal links */}
          <nav className="flex justify-center gap-6 mb-6 flex-wrap" aria-label="Legal links">
            {legalLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-primary-foreground/50 hover:text-primary-foreground/80 font-body text-xs transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => window.dispatchEvent(new Event("cookie-reopen"))}
              className="text-primary-foreground/50 hover:text-primary-foreground/80 font-body text-xs transition-colors cursor-pointer"
            >
              {lang === "he" ? "העדפות עוגיות" : "Cookie Preferences"}
            </button>
          </nav>

          <p className="text-primary-foreground/50 font-body text-xs leading-relaxed max-w-lg mx-auto mb-4">
            {t("home.footer.disclaimer")}
          </p>

          <p className="text-primary-foreground/40 font-body text-xs">
            {t("home.footer.copyright").replace("{year}", new Date().getFullYear().toString())}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default TrustSection;
