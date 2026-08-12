"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Checkbox } from "@/components/ui/checkbox";

interface PrivacyConsentCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
}

const PrivacyConsentCheckbox = ({ checked, onCheckedChange, id = "privacy-consent" }: PrivacyConsentCheckboxProps) => {
  const { lang } = useLanguage();
  const { t } = useSiteContent();

  return (
    <label className="flex items-start gap-3 py-1.5 cursor-pointer select-none">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(val) => onCheckedChange(val === true)}
        className="mt-0.5 h-5 w-5 border-border data-[state=checked]:bg-gold data-[state=checked]:border-gold"
        aria-required="true"
      />
      <span
        className="text-sm font-body text-foreground/70 leading-snug"
        onClick={(e) => {
          // The Checkbox is nested in the same <label>, so a click anywhere in
          // the label (including this span) also triggers the browser's native
          // label→control activation on it — preventDefault stops that so only
          // this explicit toggle applies, avoiding a conflicting double-update.
          e.preventDefault();
          onCheckedChange(!checked);
        }}
      >
        {t("form.privacy_consent")}{" "}
        <Link
          href={`/${lang}/privacy`}
          className="underline text-gold hover:text-gold-hover transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {t("header.nav.privacy")}
        </Link>
      </span>
    </label>
  );
};

export default PrivacyConsentCheckbox;
