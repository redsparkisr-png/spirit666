import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export type CookieConsentState = "visible" | "dismissed";

const STORAGE_KEY = "cookieConsentV1";

const emitCookieEvent = (state: CookieConsentState) => {
  window.dispatchEvent(new CustomEvent("cookie-banner", { detail: state }));
};

const CookieNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const timer = setTimeout(() => {
        setVisible(true);
        emitCookieEvent("visible");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = (choice: "accepted" | "declined") => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, ts: Date.now() }));
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
          className="fixed bottom-0 inset-x-0 z-[90] p-3"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto max-w-lg w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            <div className="px-4 py-3">
              <p className="text-foreground font-body text-xs leading-snug mb-3">
                We use cookies to improve performance, personalize content, and analyze traffic.{" "}
                <Link to="/privacy" className="text-primary underline underline-offset-2 hover:text-primary/80">
                  Privacy Policy
                </Link>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dismiss("accepted")}
                  className="flex-1 bg-gold hover:bg-gold-hover text-primary-foreground py-2.5 rounded-lg font-body font-medium text-xs transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => dismiss("declined")}
                  className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-2.5 rounded-lg font-body font-medium text-xs transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieNotice;
