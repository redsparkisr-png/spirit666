import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import Header from "@/components/Header";

const SECTIONS = [
  { titleKey: "cookies.what_title", bodyKey: "cookies.what_body" },
  { titleKey: "cookies.essential_title", bodyKey: "cookies.essential_body" },
  { titleKey: "cookies.analytics_title", bodyKey: "cookies.analytics_body" },
  { titleKey: "cookies.marketing_title", bodyKey: "cookies.marketing_body" },
  { titleKey: "cookies.manage_title", bodyKey: "cookies.manage_body" },
  { titleKey: "cookies.updates_title", bodyKey: "cookies.updates_body" },
];

const CookiePolicy = () => {
  const { lang } = useLanguage();
  const { t } = useSiteContent();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container px-6 py-20 md:py-28 max-w-3xl mx-auto">
          <Link
            to={`/${lang}/`}
            className="text-primary font-body text-sm hover:underline mb-8 inline-block"
          >
            ← {lang === "he" ? "חזרה לדף הבית" : "Back to Home"}
          </Link>
          <h1 className="text-foreground mb-8">{t("cookies.page_title")}</h1>

          <div className="font-body space-y-8 text-foreground/80 text-[15px] leading-relaxed">
            <p>
              <strong>{lang === "he" ? "עדכון אחרון:" : "Last updated:"}</strong>{" "}
              {new Date().toLocaleDateString(lang === "he" ? "he-IL" : "en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>

            <p>{t("cookies.intro")}</p>

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

export default CookiePolicy;
