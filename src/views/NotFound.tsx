"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import PageMeta from "@/components/PageMeta";

const NotFound = () => {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const { t } = useSiteContent();
  const isHe = lang === "he";

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  const homeHref = `/${lang}`;
  const waHref = "https://wa.me/972522820632";

  const popular = [
    { label: isHe ? "בתים למכירה" : "Homes for sale", to: `/${lang}/properties` },
    { label: isHe ? "מדריך רכישה" : "Buying guide", to: `/${lang}/buying-property-zichron-yaakov` },
    { label: isHe ? "מדריכים" : "Guides", to: `/${lang}/guides` },
    { label: isHe ? "צור קשר" : "Contact", to: `/${lang}/contact` },
  ];

  return (
    <main
      dir={isHe ? "rtl" : "ltr"}
      className="min-h-screen bg-background flex items-center justify-center px-6 py-20"
    >
      <PageMeta title={t("seo.notfound.title")} description={t("seo.notfound.description")} />
      <div className="max-w-xl text-center">
        <div className="font-display text-gold text-[120px] md:text-[160px] leading-none tracking-tight mb-2">
          404
        </div>
        <div className="w-16 h-px bg-gold/60 mx-auto mb-6" />
        <h1 className="font-display text-foreground mb-4">{t("notfound.title")}</h1>
        <p className="font-body text-muted-foreground mb-10 text-balance">{t("notfound.subtitle")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={homeHref}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-body text-sm tracking-wide hover:bg-primary/90 transition-colors"
          >
            {t("notfound.home_cta")}
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gold/60 text-foreground font-body text-sm tracking-wide hover:bg-gold/10 transition-colors"
          >
            {t("notfound.whatsapp_cta")}
          </a>
        </div>
        <div className="mt-12">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            {t("notfound.popular_title")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {popular.map((p) => (
              <Link
                key={p.to}
                href={p.to}
                className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
