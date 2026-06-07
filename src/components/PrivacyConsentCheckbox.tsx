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
    <div className="flex items-start gap-3">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(val) => onCheckedChange(val === true)}
        className="mt-0.5 border-border data-[state=checked]:bg-gold data-[state=checked]:border-gold"
        aria-required="true"
      />
      <label htmlFor={id} className="text-sm font-body text-foreground/70 cursor-pointer leading-snug select-none">
        {t("form.privacy_consent")}{" "}
        <Link
          href={`/${lang}/privacy`}
          className="underline text-gold hover:text-gold-hover transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("header.nav.privacy")}
        </Link>
      </label>
    </div>
  );
};

export default PrivacyConsentCheckbox;
