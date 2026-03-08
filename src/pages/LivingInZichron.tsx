import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Heart, Users, GraduationCap, Train, ArrowRight } from "lucide-react";

const LivingInZichron = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const prefix = `/${lang}`;

  const sections = isHe
    ? [
        {
          icon: Heart,
          title: "אורח חיים",
          content: "זכרון יעקב היא אחת מהערים היפות בישראל — מושבה היסטורית עם רחובות מקסימים, יקבים, גלריות ומסעדות. האוויר הצלול, הנוף לים ולכרמל, והקצב השלו הופכים אותה למקום מושלם לחיים איכותיים. תוססת מספיק בלי הרעש של העיר הגדולה.",
        },
        {
          icon: Users,
          title: "קהילה",
          content: "הקהילה בזכרון יעקב מגוונת ומחוברת — ותיקים, משפחות צעירות ועולים חדשים. יש חיי קהילה עשירים עם אירועי תרבות, שווקים, פסטיבלים ומפגשים שכונתיים. קל להיקלט ולהרגיש בבית.",
        },
        {
          icon: GraduationCap,
          title: "משפחות",
          content: "זכרון יעקב מציעה מערכת חינוך איכותית מגן ועד תיכון, חוגים מגוונים, ומרחבים ירוקים לילדים. סביבה בטוחה ושקטה שבה ילדים גדלים בחופש — בדיוק מה שמשפחות מחפשות.",
        },
        {
          icon: Train,
          title: "נגישות לתל אביב וחיפה",
          content: "זכרון יעקב ממוקמת במרכז הארץ — כ-30 דקות מחיפה וכשעה מתל אביב. תחנת רכבת בנימינה הסמוכה מחברת לכל הארץ, וכביש 2 ו-6 מספקים גישה מהירה לצפון ולמרכז.",
        },
      ]
    : [
        {
          icon: Heart,
          title: "Lifestyle",
          content: "Zichron Yaakov is one of Israel's most beautiful towns — a historic colony with charming streets, wineries, galleries, and restaurants. The fresh air, Mediterranean and Carmel views, and relaxed pace make it a perfect place for quality living. Vibrant enough without the noise of the big city.",
        },
        {
          icon: Users,
          title: "Community",
          content: "The community in Zichron Yaakov is diverse and connected — long-time residents, young families, and new immigrants. Rich community life with cultural events, markets, festivals, and neighborhood gatherings make it easy to settle in and feel at home.",
        },
        {
          icon: GraduationCap,
          title: "Families",
          content: "Zichron Yaakov offers quality education from preschool through high school, diverse extracurricular activities, and green spaces for children. A safe, quiet environment where children grow up with freedom — exactly what families are looking for.",
        },
        {
          icon: Train,
          title: "Accessibility to Tel Aviv and Haifa",
          content: "Zichron Yaakov is centrally located — about 30 minutes from Haifa and roughly an hour from Tel Aviv. The nearby Binyamina train station connects to the whole country, and Highways 2 and 6 provide fast access to the north and center.",
        },
      ];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: isHe ? "חיים בזכרון יעקב" : "Living in Zichron Yaakov" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6"
          >
            <h1 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "חיים בזכרון יעקב" : "Living in Zichron Yaakov"}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
              {isHe
                ? "גלו למה זכרון יעקב היא אחת הערים המבוקשות ביותר בישראל — אורח חיים, קהילה ואיכות חיים."
                : "Discover why Zichron Yaakov is one of Israel's most sought-after towns — lifestyle, community, and quality of life."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto space-y-16">
            {sections.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display font-semibold text-foreground text-xl md:text-2xl">{s.title}</h2>
                </div>
                <p className="text-muted-foreground font-body leading-relaxed ps-14">{s.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "מוכנים לגלות את הבית שלכם?" : "Ready to Find Your Home?"}
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
              {isHe
                ? "עיינו בנכסים הזמינים ומצאו את הבית המתאים לכם בזכרון יעקב."
                : "Browse available properties and find your ideal home in Zichron Yaakov."}
            </p>
            <Link
              to={`${prefix}/properties`}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-primary-foreground py-4 px-8 rounded-lg font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ fontSize: "17px" }}
            >
              {isHe ? "צפו בנכסים" : "View Properties"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-12 bg-card">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-4">
            <Link to={`${prefix}/buying-property-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "מדריך רכישה" : "Buying Guide"}
            </Link>
            <Link to={`${prefix}/moving-to-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "מעבר לזכרון יעקב" : "Moving to Zichron Yaakov"}
            </Link>
            <Link to={`${prefix}/contact`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "צור קשר" : "Contact Us"}
            </Link>
          </div>
        </div>
      </section>

      <TrustSection />
    </main>
  );
};

export default LivingInZichron;
