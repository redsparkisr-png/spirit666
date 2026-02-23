import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TrustSection = () => {
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
              to="/privacy"
              className="text-primary-foreground/60 hover:text-primary-foreground/90 font-body text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-primary-foreground/60 hover:text-primary-foreground/90 font-body text-sm transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              to="/accessibility"
              className="text-primary-foreground/60 hover:text-primary-foreground/90 font-body text-sm transition-colors"
            >
              Accessibility Statement
            </Link>
          </nav>

          <p className="text-primary-foreground/50 font-body text-xs leading-relaxed max-w-lg mx-auto mb-3">
            Spirit Real Estate is a licensed real estate brokerage in Israel. All property information is subject to change and availability.
          </p>

          <p className="text-primary-foreground/40 font-body text-[11px] leading-relaxed max-w-lg mx-auto mb-4">
            Information presented is for marketing purposes only and does not constitute legal, tax, or investment advice. Spirit Real Estate provides equal service regardless of race, color, religion, sex, national origin, disability, or familial status.
          </p>

          <p className="text-primary-foreground/40 font-body text-xs">
            © {new Date().getFullYear()} Spirit Real Estate · Zichron Yaakov, Israel
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default TrustSection;
