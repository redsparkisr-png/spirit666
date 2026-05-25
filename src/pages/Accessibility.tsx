import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import PageMeta from "@/components/PageMeta";
import TrustSection from "@/components/TrustSection";

const Accessibility = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  const title = isHe ? "הצהרת נגישות" : "Accessibility Statement";

  const sections = isHe
    ? [
        {
          title: "מחויבות לנגישות",
          body: "ספיריט נדל\"ן מקפידה על הנגשת האתר לכלל המשתמשים, כולל אנשים עם מוגבלויות. אנו פועלים לשפר את חוויית השימוש באתר ולהפוך אותו לנגיש ונוח ככל האפשר.",
        },
        {
          title: "תקנים ומסגרת עבודה",
          body: "האתר מותאם בהתאם לדרישות הנגישות הישראליות (תקן ישראלי 5568) ועקרונות הנגישות של WCAG 2.1 ברמה AA. אנו פועלים באופן שוטף לשיפור הנגישות.",
        },
        {
          title: "התאמות נגישות שבוצעו",
          body: `באתר בוצעו התאמות נגישות הכוללות, בין היתר:
• תמיכה בניווט מקלדת מלא
• מבנה כותרות לוגי ונכון (H1 → H2 → H3)
• כלי נגישות מובנים באתר (ווידג'ט נגישות)
• שיפור קריאות הטקסט והתאמת גדלי גופנים
• התאמות ניגודיות צבעים
• תמיכה בתוכנות קריאת מסך
• תוויות ARIA מתאימות לרכיבים אינטראקטיביים
• תמיכה מלאה בשפות עברית (RTL) ואנגלית (LTR)`,
        },
        {
          title: "מגבלות",
          body: "על אף מאמצינו, ייתכן כי חלקים מסוימים באתר עדיין אינם נגישים באופן מלא. אנו ממשיכים לעבוד על שיפור הנגישות ומזמינים אתכם לדווח לנו על כל בעיה שתמצאו.",
        },
        {
          title: "יצירת קשר בנושאי נגישות",
          body: `אם נתקלתם בבעיית נגישות או שיש לכם הצעות לשיפור, נשמח לשמוע מכם:

• רכזת נגישות: חגית כהן מורגן
• טלפון: 052-282-0632
• אימייל: spiritisraelhomes@gmail.com
• כתובת: החוחית 15, זכרון יעקב 3091668`,
        },
      ]
    : [
        {
          title: "Our Commitment",
          body: "Spirit Real Estate is committed to making our website accessible to all users, including people with disabilities. We strive to improve the browsing experience and make it as accessible and user-friendly as possible.",
        },
        {
          title: "Standards & Framework",
          body: "This website is being adapted with accessibility in mind in accordance with Israeli accessibility requirements (IS 5568) and WCAG 2.1 Level AA principles. We work continuously to improve accessibility.",
        },
        {
          title: "Accessibility Adjustments",
          body: `The following accessibility adjustments have been implemented on this website:
• Full keyboard navigation support
• Logical heading structure (H1 → H2 → H3)
• Built-in accessibility tools (accessibility widget)
• Improved text readability and font size adjustments
• Color contrast improvements
• Screen reader compatibility
• Appropriate ARIA labels on interactive elements
• Full bilingual support for Hebrew (RTL) and English (LTR)`,
        },
        {
          title: "Limitations",
          body: "Despite our efforts, some parts of the website may not yet be fully accessible. We are working to improve accessibility on an ongoing basis and welcome your feedback on any issues you encounter.",
        },
        {
          title: "Contact for Accessibility",
          body: `If you encounter an accessibility issue or have suggestions for improvement, we would love to hear from you:

• Accessibility coordinator: Hagit Cohen Morgan
• Phone: +972-52-282-0632
• Email: spiritisraelhomes@gmail.com
• Address: HaChochit 15, Zichron Yaakov 3091668, Israel`,
        },
      ];

  return (
    <>
      <PageMeta
        title={isHe ? "הצהרת נגישות | ספיריט נדל\"ן" : "Accessibility Statement | Spirit Real Estate"}
        description={isHe ? "האתר עומד בתקן הישראלי 5568 ובדרישות WCAG 2.1 AA." : "Our site complies with Israeli Standard 5568 and WCAG 2.1 AA."}
      />
      <Header />
      <main className="min-h-screen bg-background" id="main-content">
        <div className="container px-6 py-20 md:py-28 max-w-3xl mx-auto">
          <Link
            to={`/${lang}/`}
            className="text-primary font-body text-sm hover:underline mb-8 inline-block"
          >
            ← {isHe ? "חזרה לדף הבית" : "Back to Home"}
          </Link>
          <h1 className="text-foreground mb-8">{title}</h1>

          <div className="font-body space-y-8 text-foreground/80 text-[15px] leading-relaxed">
            <p>
              <strong>{isHe ? "עדכון אחרון:" : "Last updated:"}</strong>{" "}
              {new Date().toLocaleDateString(isHe ? "he-IL" : "en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>

            {sections.map((section, i) => (
              <section key={i} aria-labelledby={`a11y-section-${i}`}>
                <h2
                  id={`a11y-section-${i}`}
                  className="text-xl font-display font-semibold text-foreground mb-2"
                >
                  {section.title}
                </h2>
                <p className="whitespace-pre-line">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <TrustSection />
    </>
  );
};

export default Accessibility;
