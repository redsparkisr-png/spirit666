import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/lib/i18n";
import { Switch } from "@/components/ui/switch";

const STORAGE_KEY = "cookieConsentV1";

export interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
  ts: number;
}

const getStoredPreferences = (): CookiePreferences | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

const emitConsentEvent = (prefs: CookiePreferences) => {
  window.dispatchEvent(new CustomEvent("cookie-consent", { detail: prefs }));
};

const CookieNotice = () => {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const { t } = useSiteContent();
  const { lang } = useLanguage();

  useEffect(() => {
    const stored = getStoredPreferences();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      emitConsentEvent(stored);
    }
  }, []);

  const saveAndClose = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    emitConsentEvent(prefs);
    setVisible(false);
  };

  const acceptAll = () => saveAndClose({ analytics: true, marketing: true, ts: Date.now() });
  const rejectAll = () => saveAndClose({ analytics: false, marketing: false, ts: Date.now() });
  const savePreferences = () => saveAndClose({ analytics, marketing, ts: Date.now() });

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
          role="dialog"
          aria-label={lang === "he" ? "הסכמה לעוגיות" : "Cookie consent"}
        >
          <div className="mx-auto max-w-lg w-full bg-charcoal border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            <div className="px-5 py-4">
              <p className="text-white/80 font-body text-xs leading-snug mb-4">
                {t("home.cookie.text")}{" "}
                <Link
                  to={`/${lang}/privacy`}
                  className="text-gold underline underline-offset-2 hover:text-gold-hover"
                >
                  {t("header.nav.privacy")}
                </Link>
              </p>

              <AnimatePresence>
                {showPrefs && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="space-y-3 py-3 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <label htmlFor="analytics-toggle" className="text-white/70 font-body text-xs">
                          {t("home.cookie.analytics_label")}
                        </label>
                        <Switch
                          id="analytics-toggle"
                          checked={analytics}
                          onCheckedChange={setAnalytics}
                          className="data-[state=checked]:bg-gold"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="marketing-toggle" className="text-white/70 font-body text-xs">
                          {t("home.cookie.marketing_label")}
                        </label>
                        <Switch
                          id="marketing-toggle"
                          checked={marketing}
                          onCheckedChange={setMarketing}
                          className="data-[state=checked]:bg-gold"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-2">
                {showPrefs ? (
                  <button
                    onClick={savePreferences}
                    className="flex-1 bg-gold hover:bg-gold-hover text-primary-foreground py-2.5 rounded-lg font-body font-medium text-xs transition-colors"
                  >
                    {t("home.cookie.save_preferences")}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={acceptAll}
                      className="flex-1 bg-gold hover:bg-gold-hover text-primary-foreground py-2.5 rounded-lg font-body font-medium text-xs transition-colors"
                    >
                      {t("home.cookie.accept")}
                    </button>
                    <button
                      onClick={rejectAll}
                      className="flex-1 bg-white/10 hover:bg-white/15 text-white py-2.5 rounded-lg font-body font-medium text-xs transition-colors"
                    >
                      {t("home.cookie.reject_all")}
                    </button>
                    <button
                      onClick={() => setShowPrefs(true)}
                      className="flex-1 border border-white/20 hover:border-white/30 text-white/70 hover:text-white py-2.5 rounded-lg font-body font-medium text-xs transition-colors"
                    >
                      {t("home.cookie.manage_preferences")}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieNotice;
