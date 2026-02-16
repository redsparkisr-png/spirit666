import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";
import { Link } from "react-router-dom";

export type CookieConsentState = "visible" | "dismissed";

/**
 * Fires a custom event so other components (e.g. FloatingElements) can
 * reposition when the cookie banner appears / disappears.
 */
const emitCookieEvent = (state: CookieConsentState) => {
  window.dispatchEvent(new CustomEvent("cookie-banner", { detail: state }));
};

const CookieNotice = () => {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);

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

  const dismiss = (choice: "all" | "essential" | "custom") => {
    localStorage.setItem("cookieConsent", choice);
    setVisible(false);
    emitCookieEvent("dismissed");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 inset-x-0 z-[90] pb-[env(safe-area-inset-bottom,0px)]"
        >
          <div className="mx-auto max-w-lg w-[calc(100%-1rem)] mb-20 md:mb-4 bg-card border border-border rounded-xl shadow-lg">
            {/* Main compact bar */}
            <div className="px-4 py-3 flex items-start gap-3">
              <Cookie className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-foreground font-body text-xs leading-snug flex-1">
                We use cookies for a better experience.{" "}
                <Link to="/privacy" className="text-primary underline underline-offset-2 hover:text-primary/80">
                  Privacy Policy
                </Link>
              </p>
              <button
                onClick={() => dismiss("all")}
                aria-label="Close cookie notice"
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            {/* Action buttons */}
            <div className="px-4 pb-3 flex items-center gap-2">
              <button
                onClick={() => dismiss("all")}
                className="flex-1 bg-gold hover:bg-gold-hover text-primary-foreground px-3 py-2 rounded-lg font-body font-medium text-xs transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={() => dismiss("essential")}
                className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-3 py-2 rounded-lg font-body font-medium text-xs transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={() => setShowPrefs(!showPrefs)}
                className="px-3 py-2 text-muted-foreground hover:text-foreground font-body text-xs transition-colors underline underline-offset-2"
              >
                Settings
              </button>
            </div>

            {/* Expandable preferences */}
            <AnimatePresence>
              {showPrefs && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-2 border-t border-border pt-3">
                    <label className="flex items-center gap-2 text-xs font-body text-foreground">
                      <input type="checkbox" checked disabled className="accent-primary" />
                      Essential (always on)
                    </label>
                    <label className="flex items-center gap-2 text-xs font-body text-muted-foreground">
                      <input type="checkbox" defaultChecked className="accent-primary" />
                      Analytics &amp; performance
                    </label>
                    <button
                      onClick={() => dismiss("custom")}
                      className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-2 rounded-lg font-body font-medium text-xs transition-colors mt-2"
                    >
                      Save Preferences
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieNotice;
