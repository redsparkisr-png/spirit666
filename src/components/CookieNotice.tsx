"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

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
  const { lang } = useLanguage();
  const isHe = lang === "he";

  useEffect(() => {
    const stored = getStoredPreferences();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      emitConsentEvent(stored);
    }
  }, []);

  useEffect(() => {
    const handleReopen = () => {
      localStorage.removeItem(STORAGE_KEY);
      setVisible(true);
    };
    window.addEventListener("cookie-reopen", handleReopen);
    return () => window.removeEventListener("cookie-reopen", handleReopen);
  }, []);

  const accept = () => {
    const prefs: CookiePreferences = { analytics: true, marketing: true, ts: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    emitConsentEvent(prefs);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-0 inset-x-0 z-[90] p-3"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          role="dialog"
          aria-label={isHe ? "הסכמה לעוגיות" : "Cookie consent"}
        >
          <div className="mx-auto max-w-lg w-full bg-charcoal border border-white/10 rounded-xl shadow-2xl">
            <div className="px-5 py-4 flex items-center gap-4">
              <p className="flex-1 text-white/70 font-body text-xs leading-snug">
                {isHe
                  ? "המשך הגלישה באתר מהווה הסכמה לשימוש בעוגיות לשיפור חוויית המשתמש. "
                  : "By continuing to browse, you agree to our use of cookies to enhance your experience. "}
                <Link href={`/${lang}/privacy`} className="text-gold underline underline-offset-2 hover:text-gold-hover whitespace-nowrap">
                  {isHe ? "מדיניות פרטיות" : "Privacy Policy"}
                </Link>
              </p>
              <button
                onClick={accept}
                className="shrink-0 bg-gold hover:bg-gold-hover text-primary-foreground px-5 py-2 rounded-lg font-body font-semibold text-sm transition-colors"
              >
                {isHe ? "אישור" : "OK"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieNotice;
