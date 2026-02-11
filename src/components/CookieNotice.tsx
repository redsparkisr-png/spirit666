import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieConsent");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] bg-card border border-border rounded-xl shadow-lg px-6 py-4 flex items-center gap-4 max-w-md w-[calc(100%-2rem)]"
        >
          <p className="text-foreground font-body text-sm flex-1">
            This website uses cookies to improve user experience and marketing performance.{" "}
            <Link to="/privacy" className="text-primary underline underline-offset-2 hover:text-primary/80">
              Privacy Policy
            </Link>
          </p>
          <button
            onClick={dismiss}
            className="bg-gold hover:bg-gold-hover text-primary-foreground px-5 py-2 rounded-lg font-body font-medium text-sm transition-colors shrink-0"
          >
            Accept
          </button>
          <button
            onClick={dismiss}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            aria-label="Close cookie notice"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieNotice;
