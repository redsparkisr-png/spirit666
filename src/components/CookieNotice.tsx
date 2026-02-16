import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Settings } from "lucide-react";

export type CookieConsentState = "visible" | "dismissed";

const STORAGE_KEY = "cookieConsentV1";

const emitCookieEvent = (state: CookieConsentState) => {
  window.dispatchEvent(new CustomEvent("cookie-banner", { detail: state }));
};

interface ConsentChoices {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieNotice = () => {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<ConsentChoices>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

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

  const dismiss = (choices: ConsentChoices) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choices));
    setVisible(false);
    setShowPrefs(false);
    emitCookieEvent("dismissed");
  };

  const acceptAll = () => dismiss({ necessary: true, analytics: true, marketing: true });
  const rejectNonEssential = () => dismiss({ necessary: true, analytics: false, marketing: false });
  const savePrefs = () => dismiss(prefs);

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
            {/* Preferences modal */}
            <AnimatePresence>
              {showPrefs && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pt-4 pb-3 border-b border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-body font-semibold text-foreground text-sm">Cookie Preferences</p>
                      <button
                        onClick={() => setShowPrefs(false)}
                        className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Close preferences"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Necessary */}
                    <label className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-body font-medium text-foreground">Necessary</p>
                        <p className="text-[11px] font-body text-muted-foreground">Required for the site to function.</p>
                      </div>
                      <input type="checkbox" checked disabled className="w-4 h-4 accent-primary rounded" />
                    </label>

                    {/* Analytics */}
                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                      <div>
                        <p className="text-xs font-body font-medium text-foreground">Analytics</p>
                        <p className="text-[11px] font-body text-muted-foreground">Help us understand site usage.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={prefs.analytics}
                        onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                        className="w-4 h-4 accent-primary rounded"
                      />
                    </label>

                    {/* Marketing */}
                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                      <div>
                        <p className="text-xs font-body font-medium text-foreground">Marketing</p>
                        <p className="text-[11px] font-body text-muted-foreground">Personalized ads and content.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={prefs.marketing}
                        onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                        className="w-4 h-4 accent-primary rounded"
                      />
                    </label>

                    <button
                      onClick={savePrefs}
                      className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-2.5 rounded-lg font-body font-medium text-xs transition-colors"
                    >
                      Save Preferences
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main banner */}
            <div className="px-4 py-3">
              <p className="text-foreground font-body text-xs leading-snug mb-3">
                We use cookies to improve site performance, measure marketing results, and enhance your experience.{" "}
                <Link to="/privacy" className="text-primary underline underline-offset-2 hover:text-primary/80">
                  Privacy Policy
                </Link>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={acceptAll}
                  className="flex-1 bg-gold hover:bg-gold-hover text-primary-foreground py-2.5 rounded-lg font-body font-medium text-xs transition-colors"
                >
                  Accept all
                </button>
                <button
                  onClick={rejectNonEssential}
                  className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-2.5 rounded-lg font-body font-medium text-xs transition-colors"
                >
                  Reject non-essential
                </button>
                <button
                  onClick={() => setShowPrefs(!showPrefs)}
                  className="w-10 h-10 shrink-0 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Cookie preferences"
                >
                  <Settings className="w-4 h-4" />
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
