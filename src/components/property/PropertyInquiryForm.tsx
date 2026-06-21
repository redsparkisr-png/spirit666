"use client";

import React, { useState } from "react";
import { Calendar, CheckCircle, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSiteContent } from "@/hooks/useSiteContent";
import PrivacyConsentCheckbox from "@/components/PrivacyConsentCheckbox";
import type { Tables } from "@/integrations/supabase/types";

type Property = Tables<"properties_available">;

type Props = {
  property: Property;
  lang: string;
  variant: "mobile" | "sidebar";
};

const inputClasses =
  "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-charcoal/30";

const PropertyInquiryForm = ({ property, lang, variant }: Props) => {
  const isHe = lang === "he";
  const { t } = useSiteContent();

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openWhatsApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = isHe
      ? `היי, אני מתעניין/ת ב: ${property.title}\n${url}`
      : `Hi, I'm interested in: ${property.title}\n${url}`;
    window.open("https://wa.me/972522820632?text=" + encodeURIComponent(text), "_blank");
  };

  const scheduleViewing = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = isHe
      ? `היי חגית, אשמח לתאם סיור בנכס: ${property.title}\n${url}`
      : `Hi Hagit, I'd like to schedule a viewing for: ${property.title}\n${url}`;
    window.open("https://wa.me/972522820632?text=" + encodeURIComponent(text), "_blank");
  };

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: bots fill this hidden field, humans don't. Silently succeed without inserting.
    if (honeypot) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      return;
    }
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error(t("property.detail.validation_error"));
      return;
    }
    if (!privacyConsent) {
      toast.error(t("form.privacy_consent_required"));
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      full_name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || null,
      message: formData.message.trim() || null,
      source: `property:${property.slug || property.id || "detail"}`,
    });
    if (error) {
      console.error("Lead insert failed:", error.message);
      toast.error(isHe ? "שגיאה בשליחה, נסו שוב" : "Send failed, please try again");
      setSubmitting(false);
      return;
    }
    toast.success(t("property.detail.inquiry_success"));
    setFormData({ name: "", phone: "", email: "", message: "" });
    setPrivacyConsent(false);
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const successMessage = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center py-6 gap-3"
    >
      <CheckCircle className="w-10 h-10 text-green-600" />
      <p className="font-body text-foreground font-medium text-sm">{t("property.detail.inquiry_success")}</p>
    </motion.div>
  );

  const formFields = (
    <>
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
        type="text"
        placeholder={t("property.detail.name_placeholder")}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className={inputClasses}
        aria-label={t("property.detail.name_placeholder")}
        maxLength={100}
      />
      <input
        type="tel"
        placeholder={t("property.detail.phone_placeholder")}
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className={inputClasses}
        aria-label={t("property.detail.phone_placeholder")}
        maxLength={20}
      />
      <input
        type="email"
        placeholder={t("property.detail.email_placeholder")}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className={inputClasses}
        aria-label={t("property.detail.email_placeholder")}
        maxLength={254}
      />
      <textarea
        placeholder={t("property.detail.message_placeholder")}
        value={formData.message || `${isHe ? "מעוניין ב:" : "Interested in:"} ${property.title}`}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={2}
        className={`${inputClasses} resize-none`}
        aria-label={t("property.detail.message_placeholder")}
        maxLength={1000}
      />
      <PrivacyConsentCheckbox
        checked={privacyConsent}
        onCheckedChange={setPrivacyConsent}
        id={`property-privacy-consent-${variant}`}
      />
    </>
  );

  if (variant === "mobile") {
    return (
      <div className="space-y-3">
        {/* Quick-action buttons above the form */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={scheduleViewing}
            className="flex-1 flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-white py-3 px-5 rounded-lg font-body font-medium text-sm transition-all duration-300"
          >
            <Calendar className="w-4 h-4" />
            {isHe ? "תאמו סיור" : "Schedule a Viewing"}
          </button>
          <button
            type="button"
            onClick={openWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-lg font-body font-medium text-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
        </div>
        {submitted ? successMessage : (
          <form onSubmit={handleInquiry} className="space-y-3">
            {formFields}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-charcoal hover:bg-charcoal-hover text-white py-3 rounded-lg font-body font-medium text-sm btn-text transition-colors disabled:opacity-60"
            >
              {submitting ? "..." : t("property.detail.send_inquiry")}
            </button>
          </form>
        )}
      </div>
    );
  }

  // sidebar variant
  return submitted ? successMessage : (
    <form onSubmit={handleInquiry} className="space-y-3">
      {formFields}
      <div className="space-y-2">
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-charcoal hover:bg-charcoal-hover text-white py-3 rounded-lg font-body font-medium text-sm btn-text transition-colors disabled:opacity-60"
          >
            {submitting ? "..." : t("property.detail.send_inquiry")}
          </button>
          <button
            type="button"
            onClick={openWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-body font-medium text-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
        </div>
        <button
          type="button"
          onClick={scheduleViewing}
          className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-white py-3 rounded-lg font-body font-medium text-sm transition-all duration-300 hover:shadow-md"
        >
          <Calendar className="w-4 h-4" />
          {isHe ? "תאמו סיור בנכס" : "Schedule a Viewing"}
        </button>
      </div>
    </form>
  );
};

export default PropertyInquiryForm;
