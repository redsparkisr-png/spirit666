import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export type CookieConsentState = "visible" | "dismissed";

const emitCookieEvent = (state: CookieConsentState) => {
  window.dispatchEvent(new CustomEvent("cookie-banner", { detail: state }));
};

const CookieNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieConsent");
    if (!accepted) {
      const timer = setTimeout(() => {
        setVisible(true);
        emitCookieEvent("visible");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = (choice: "all" | "essential") => {
    localStorage.setItem("cookieConsent", choice);
    setVisible(false);
    emitCookieEvent("dismissed");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 inset-x-0 z-[90] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="mx-auto max-w-md w-full bg-card border border-border rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 mb-20 md:mb-4">
            <p className="text-foreground font-body text-xs leading-snug flex-1 min-w-0">
              We use cookies.{" "}
              <Link to="/privacy" className="text-primary underline underline-offset-2 hover:text-primary/80">
                Learn more
              </Link>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => dismiss("essential")}
                className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg font-body font-medium text-xs transition-colors min-w-[70px]"
              >
                Decline
              </button>
              <button
                onClick={() => dismiss("all")}
                className="bg-gold hover:bg-gold-hover text-primary-foreground px-4 py-2 rounded-lg font-body font-medium text-xs transition-colors min-w-[70px]"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieNotice;
