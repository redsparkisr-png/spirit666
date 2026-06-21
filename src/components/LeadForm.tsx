"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import PrivacyConsentCheckbox from "@/components/PrivacyConsentCheckbox";
import {
  trackLeadForm,
  trackLeadFormStart,
  trackLeadFormSubmit,
  trackLeadFormSuccess,
  trackLeadFormError,
} from "@/components/GoogleAnalyticsConsent";
import { readAttribution } from "@/lib/attribution";

type Variant = "contact" | "sell" | "valuation" | "guide";

type Props = {
  source: string;
  variant?: Variant;
  includeMessage?: boolean;
  includeAddress?: boolean;
  idPrefix?: string;
  buttonLabel?: string;
  /** Optional override for the address-field placeholder (presentational only). */
  addressPlaceholder?: string;
  onSuccess?: () => void;
  className?: string;
};

/**
 * Shared lead-capture form. Inserts into `leads` table with given source.
 * Set includeMessage for free-text comments. Set includeAddress for the
 * free-valuation variant (asks for property address line).
 */
const LeadForm = ({
  source,
  variant = "contact",
  includeMessage = false,
  includeAddress = false,
  idPrefix = "lead",
  buttonLabel,
  addressPlaceholder,
  onSuccess,
  className = "",
}: Props) => {
  const { t } = useSiteContent();
  const [data, setData] = useState({ name: "", phone: "", email: "", message: "", address: "" });
  const [honeypot, setHoneypot] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const hasStarted = useRef(false);

  const onFirstFocus = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    trackLeadFormStart(`lead_form_${variant}`, { lang: undefined });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      toast.success(t("contact.form.success"));
      setData({ name: "", phone: "", email: "", message: "", address: "" });
      setConsent(false);
      onSuccess?.();
      return;
    }
    if (!data.name.trim() || !data.phone.trim() || !data.email.trim()) {
      toast.error(t("home.contact.validation_error"));
      return;
    }
    if (!consent) {
      toast.error(t("form.privacy_consent_required"));
      return;
    }
    setBusy(true);
    const messageParts: string[] = [];
    if (includeAddress && data.address.trim()) messageParts.push(`Address: ${data.address.trim()}`);
    if (data.message.trim()) messageParts.push(data.message.trim());

    trackLeadFormSubmit(`lead_form_${variant}`, { source });
    const attribution = readAttribution();
    const { error } = await supabase.from("leads").insert({
      full_name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      message: messageParts.length ? messageParts.join("\n") : null,
      source,
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
      ...attribution,
    });
    if (error) {
      toast.error(t("contact.form.error"));
      trackLeadFormError(`lead_form_${variant}`, error.message);
    } else {
      toast.success(t("contact.form.success"));
      trackLeadForm(source);
      trackLeadFormSuccess(`lead_form_${variant}`, { source });
      setData({ name: "", phone: "", email: "", message: "", address: "" });
      setHoneypot("");
      hasStarted.current = false;
      setConsent(false);
      onSuccess?.();
    }
    setBusy(false);
  };

  const inputClass =
    "w-full px-5 py-4 rounded-lg border border-border bg-card text-foreground font-body placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`space-y-4 ${className}`}
    >
      {/* Honeypot: visually hidden, tab-skipped. Bots fill it; real users never see it. */}
      <input
        type="text"
        name="website_url"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />
      <input
        id={`${idPrefix}-name`}
        type="text"
        aria-label={t("contact.form.placeholder_name")}
        placeholder={t("contact.form.placeholder_name")}
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        onFocus={onFirstFocus}
        maxLength={100}
        className={inputClass}
      />
      <input
        id={`${idPrefix}-phone`}
        type="tel"
        aria-label={t("contact.form.placeholder_phone")}
        placeholder={t("contact.form.placeholder_phone")}
        value={data.phone}
        onChange={(e) => setData({ ...data, phone: e.target.value })}
        maxLength={20}
        className={inputClass}
      />
      <input
        id={`${idPrefix}-email`}
        type="email"
        aria-label={t("contact.form.placeholder_email")}
        placeholder={t("contact.form.placeholder_email")}
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        maxLength={255}
        className={inputClass}
      />
      {includeAddress && (
        <input
          id={`${idPrefix}-address`}
          type="text"
          aria-label={addressPlaceholder ?? t("sell.valuation.address_placeholder")}
          placeholder={addressPlaceholder ?? t("sell.valuation.address_placeholder")}
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
          maxLength={200}
          className={inputClass}
        />
      )}
      {includeMessage && (
        <textarea
          id={`${idPrefix}-message`}
          aria-label={t("contact.form.placeholder_message")}
          placeholder={t("contact.form.placeholder_message")}
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          maxLength={1000}
          rows={4}
          className={`${inputClass} resize-none`}
        />
      )}
      <PrivacyConsentCheckbox checked={consent} onCheckedChange={setConsent} id={`${idPrefix}-consent`} />
      <button
        type="submit"
        disabled={busy}
        className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-4 rounded-full font-body font-semibold transition-colors duration-300 disabled:opacity-60"
        style={{ fontSize: "17px" }}
      >
        {busy ? t("contact.form.sending") : buttonLabel ?? t("contact.form.button")}
      </button>
    </motion.form>
  );
};

export default LeadForm;
