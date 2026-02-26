import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/lib/i18n";

const TrustSection = () => {
  const { t } = useSiteContent();
  const { lang } = useLanguage();
  const prefix = `/${lang}`;

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
          <div className="w-12 h-px bg-gold mx-auto mb-8" />

          <nav className="flex justify-center gap-6 mb-6 flex-wrap">
            <Link
              to={`${prefix}/privacy`}
              className="text-primary-foreground/60 hover:text-primary-foreground/90 font-body text-sm transition-colors"
            >
              {t("header.nav.privacy")}
            </Link>
            <Link
              to={`${prefix}/terms`}
              className="text-primary-foreground/60 hover:text-primary-foreground/90 font-body text-sm transition-colors"
            >
              {t("header.nav.terms")}
            </Link>
            <Link
              to={`${prefix}/accessibility`}
              className="text-primary-foreground/60 hover:text-primary-foreground/90 font-body text-sm transition-colors"
            >
              {t("header.nav.accessibility")}
            </Link>
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
