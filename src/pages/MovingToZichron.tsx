import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import BuyerBlueprintBlock from "@/components/BuyerBlueprintBlock";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Users, Info, TrendingUp, Handshake, ArrowRight } from "lucide-react";

const MovingToZichron = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const prefix = `/${lang}`;

  const sections = isHe
    ? [
        {
          icon: Users,
          title: "למי זכרון יעקב מתאימה?",
          content: "זכרון יעקב מושכת משפחות צעירות, זוגות שמחפשים איכות חיים, עולים חדשים (במיוחד מצרפת, ארה\"ב ודרום אפריקה), וגם מי שרוצה בית שני בישראל. אם אתם מחפשים שילוב של טבע, תרבות וקהילה — זכרון יעקב היא המקום.",
        },
        {
          icon: Info,
          title: "מה חשוב לדעת לפני המעבר",
          content: "תכננו מראש: בדקו את מערכת החינוך, הכירו את השכונות, הבינו את מבנה הארנונה ותחבורה ציבורית. שיחה עם מומחה מקומי תחסוך לכם זמן יקר ותעזור לכם להתמקד ברלוונטי.",
        },
        {
          icon: TrendingUp,
          title: "הבנת שוק הדיור המקומי",
          content: "המחירים בזכרון יעקב עלו בעקביות בשנים האחרונות — ביקוש גבוה, היצע מוגבל ומיקום מעולה. הבנה של מגמות המחירים, אזורי הפיתוח ופוטנציאל ההשבחה חיונית לקבלת החלטה נכונה.",
        },
        {
          icon: Handshake,
          title: "איך Spirit Real Estate עוזרים לקונים לעבור",
          content: "אנחנו לא רק מוכרים נכסים — אנחנו מלווים אתכם בכל התהליך: מציאת נכס, משא ומתן, ליווי משפטי, ועזרה בהתאקלמות. הידע המקומי שלנו עושה את ההבדל.",
        },
      ]
    : [
        {
          icon: Users,
          title: "Who Zichron Yaakov Is Ideal For",
          content: "Zichron Yaakov attracts young families, couples seeking quality of life, new immigrants (especially from France, the US, and South Africa), and those looking for a second home in Israel. If you're looking for a blend of nature, culture, and community — Zichron Yaakov is the place.",
        },
        {
          icon: Info,
          title: "What to Know Before Moving",
          content: "Plan ahead: research the education system, explore neighborhoods, understand municipal taxes and public transport. A conversation with a local expert will save you valuable time and help you focus on what matters.",
        },
        {
          icon: TrendingUp,
          title: "Understanding the Local Housing Market",
          content: "Prices in Zichron Yaakov have risen consistently in recent years — high demand, limited supply, and an excellent location. Understanding pricing trends, development areas, and appreciation potential is essential for making the right decision.",
        },
        {
          icon: Handshake,
          title: "How Spirit Real Estate Helps Buyers Relocate",
          content: "We don't just sell properties — we guide you through the entire process: finding a property, negotiation, legal support, and helping you settle in. Our local knowledge makes all the difference.",
        },
      ];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: isHe ? "מעבר לזכרון יעקב" : "Moving to Zichron Yaakov" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6"
          >
            <h1 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "מעבר לזכרון יעקב" : "Moving to Zichron Yaakov"}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
              {isHe
                ? "כל מה שצריך לדעת לפני שעוברים לזכרון יעקב — מידע מקומי, טיפים והמלצות."
                : "Everything you need to know before moving to Zichron Yaakov — local insights, tips, and recommendations."}
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
              {isHe ? "מוכנים לשיחה אישית?" : "Ready for a Personal Consultation?"}
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
              {isHe
                ? "נשמח ללוות אתכם בתהליך המעבר — מהצעד הראשון ועד המפתח."
                : "We'd love to guide you through the relocation process — from the first step to the key."}
            </p>
            <Link
              to={`${prefix}/contact`}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-primary-foreground py-4 px-8 rounded-lg font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ fontSize: "17px" }}
            >
              {isHe ? "קבעו ייעוץ מקומי" : "Book a Local Consultation"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <BuyerBlueprintBlock />

      {/* Internal links */}
      <section className="py-12 bg-background">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-4">
            <Link to={`${prefix}/buying-property-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "מדריך רכישה" : "Buying Guide"}
            </Link>
            <Link to={`${prefix}/homes-for-sale-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "בתים למכירה" : "Homes for Sale"}
            </Link>
            <Link to={`${prefix}/properties`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "כל הנכסים" : "All Properties"}
            </Link>
          </div>
        </div>
      </section>

      <TrustSection />
    </main>
  );
};

export default MovingToZichron;
