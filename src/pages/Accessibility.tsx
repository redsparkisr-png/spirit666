import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import Header from "@/components/Header";

const SECTIONS = [
  { titleKey: "accessibility.commitment_title", bodyKey: "accessibility.commitment_body" },
  { titleKey: "accessibility.standards_title", bodyKey: "accessibility.standards_body" },
  { titleKey: "accessibility.measures_title", bodyKey: "accessibility.measures_body" },
  { titleKey: "accessibility.feedback_title", bodyKey: "accessibility.feedback_body" },
];

const Accessibility = () => {
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
          <h1 className="text-foreground mb-8">{t("accessibility.page_title")}</h1>

          <div className="font-body space-y-8 text-foreground/80 text-[15px] leading-relaxed">
            <p>
              <strong>{lang === "he" ? "עדכון אחרון:" : "Last updated:"}</strong>{" "}
              {new Date().toLocaleDateString(lang === "he" ? "he-IL" : "en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>

            {SECTIONS.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                  {t(section.titleKey)}
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

export default Accessibility;
