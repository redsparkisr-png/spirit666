"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useIsMobile } from "@/hooks/use-mobile";
import PrivacyConsentCheckbox from "@/components/PrivacyConsentCheckbox";

const COOLDOWN_KEY = "exit_popup_last_shown";
const COOLDOWN_DAYS = 7;

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasFired, setHasFired] = useState(false);
  const { t } = useSiteContent();
  const isMobile = useIsMobile();
  const lastScrollY = useRef(0);
  const hasScrolledPast50 = useRef(false);

  const isInCooldown = () => {
    const last = localStorage.getItem(COOLDOWN_KEY);
    if (!last) return false;
    const diff = Date.now() - parseInt(last, 10);
    return diff < COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
  };

  const showPopup = useCallback(() => {
    if (hasFired || isInCooldown()) return;
    setIsVisible(true);
    setHasFired(true);
    localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
  }, [hasFired]);

  // Desktop: exit intent (mouse leaves top)
  useEffect(() => {
    if (isMobile) return;
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 5) showPopup();
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, [isMobile, showPopup]);

  // Mobile: scroll >50% + upward scroll
  useEffect(() => {
    if (!isMobile) return;
    const handler = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollY / docHeight : 0;

      if (scrollPercent > 0.5) hasScrolledPast50.current = true;

      if (hasScrolledPast50.current && scrollY < lastScrollY.current - 50) {
        showPopup();
      }
      lastScrollY.current = scrollY;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [isMobile, showPopup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      toast.error(t("home.contact.validation_error"));
      return;
    }
    if (!privacyConsent) {
      toast.error(t("form.privacy_consent_required"));
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      full_name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      source: "under_radar_popup",
    });
    if (error) {
      toast.error(t("home.contact.error"));
    } else {
      toast.success(t("home.contact.success"));
      setFormData({ name: "", phone: "", email: "" });
      setPrivacyConsent(false);
      setIsVisible(false);
    }
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-popup-title"
        >
          <div
            className="absolute inset-0 bg-primary/50 backdrop-blur-sm"
            onClick={() => setIsVisible(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full p-8 z-10 border border-gold/20"
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 id="exit-popup-title" className="text-2xl font-display font-semibold text-foreground mb-3 text-center">
              {t("home.exit.headline")}
            </h3>
            <p className="text-muted-foreground font-body text-sm text-center mb-6">
              {t("home.exit.subline")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder={t("home.contact.placeholder_name")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={100}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
              />
              <input
                type="tel"
                placeholder={t("home.contact.placeholder_phone")}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                maxLength={20}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
              />
              <input
                type="email"
                placeholder={t("home.contact.placeholder_email")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                maxLength={255}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
              />
              <PrivacyConsentCheckbox
                checked={privacyConsent}
                onCheckedChange={setPrivacyConsent}
                id="exit-privacy-consent"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-3.5 rounded-full font-body font-semibold text-sm transition-colors duration-300 disabled:opacity-60"
              >
                {isSubmitting ? t("home.contact.sending") : t("home.exit.button")}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
