import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import Header from "@/components/Header";
import PageMeta from "@/components/PageMeta";

const SECTIONS = [
  { titleKey: "privacy.collection_title", bodyKey: "privacy.collection_body" },
  { titleKey: "privacy.usage_title", bodyKey: "privacy.usage_body" },
  { titleKey: "privacy.analytics_title", bodyKey: "privacy.analytics_body" },
  { titleKey: "privacy.marketing_title", bodyKey: "privacy.marketing_body" },
  { titleKey: "privacy.sharing_title", bodyKey: "privacy.sharing_body" },
  { titleKey: "privacy.retention_title", bodyKey: "privacy.retention_body" },
  { titleKey: "privacy.international_title", bodyKey: "privacy.international_body" },
  { titleKey: "privacy.rights_title", bodyKey: "privacy.rights_body" },
  { titleKey: "privacy.contact_title", bodyKey: "privacy.contact_body" },
];

const Privacy = () => {
  const { lang } = useLanguage();
  const { t } = useSiteContent();

  return (
    <>
      <PageMeta
        title={lang === "he" ? "מדיניות פרטיות | ספיריט נדל\"ן" : "Privacy Policy | Spirit Real Estate"}
        description={lang === "he" ? "כיצד אנו אוספים, משתמשים ומגינים על המידע האישי שלך באתר ספיריט נדל\"ן." : "How we collect, use and protect your personal information at Spirit Real Estate."}
      />
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container px-6 py-20 md:py-28 max-w-3xl mx-auto">
          <Link
            to={`/${lang}/`}
            className="text-primary font-body text-sm hover:underline mb-8 inline-block"
          >
            ← {lang === "he" ? "חזרה לדף הבית" : "Back to Home"}
          </Link>
          <h1 className="text-foreground mb-8">{t("privacy.page_title")}</h1>

          <div className="font-body space-y-8 text-foreground/80 text-[15px] leading-relaxed">
            <p>
              <strong>{lang === "he" ? "עדכון אחרון:" : "Last updated:"}</strong>{" "}
              {new Date().toLocaleDateString(lang === "he" ? "he-IL" : "en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>

            <p>{t("privacy.intro")}</p>

            {SECTIONS.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                  {i + 1}. {t(section.titleKey)}
                </h2>
                <p>{t(section.bodyKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Privacy;
