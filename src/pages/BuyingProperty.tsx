import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import BuyerBlueprintBlock from "@/components/BuyerBlueprintBlock";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { ArrowRight, AlertTriangle, Home, Handshake, MapPin } from "lucide-react";

const BuyingProperty = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const prefix = `/${lang}`;

  const sections = isHe
    ? [
        {
          icon: MapPin,
          title: "סקירת שוק הנדל\"ן המקומי",
          content: "זכרון יעקב מציעה שוק נדל\"ן ייחודי — שילוב של שכונות ותיקות עם פיתוח חדש, נופים מרהיבים לים ולכרמל, וקהילה חמה. המחירים משתנים בהתאם למיקום, גודל המגרש וקרבה למרכז ההיסטורי. הבנת הדינמיקה המקומית היא צעד ראשון חיוני לרכישה חכמה.",
        },
        {
          icon: Home,
          title: "סוגי נכסים בזכרון יעקב",
          content: "בין אם אתם מחפשים וילה עם גינה, קוטג' משפחתי, דירת גן או דירה במרכז — זכרון יעקב מציעה מגוון רחב. שכונות כמו אלון, מורדות הכרמל, גבעת עדן ומרכז ההיסטורי מתאימות לצרכים שונים ולתקציבים מגוונים.",
        },
        {
          icon: AlertTriangle,
          title: "טעויות נפוצות של קונים",
          content: "רכישה ללא בדיקת תב\"ע, הסתמכות על מחירים ישנים, אי בדיקת היטלי השבחה, או ויתור על ייעוץ מקומי — אלו טעויות שעלולות לעלות ביוקר. ליווי מקצועי מקומי יכול לחסוך לכם כסף רב ולהבטיח שהעסקה שלכם מוגנת.",
        },
        {
          icon: Handshake,
          title: "שיקולים במשא ומתן",
          content: "משא ומתן על נכס בזכרון יעקב דורש הבנה של השוק המקומי, מגמות המחירים, והמוטיבציה של המוכר. מומחה מקומי יודע מתי להתקדם ומתי לחכות — וזה ההבדל בין עסקה טובה לעסקה מצוינת.",
        },
      ]
    : [
        {
          icon: MapPin,
          title: "Overview of the Local Property Market",
          content: "Zichron Yaakov offers a unique real estate market — a blend of historic neighborhoods and new developments, stunning Mediterranean and Carmel views, and a warm community. Prices vary by location, lot size, and proximity to the historic center. Understanding local dynamics is the essential first step to a smart purchase.",
        },
        {
          icon: Home,
          title: "Property Types in Zichron Yaakov",
          content: "Whether you're looking for a villa with a garden, a family townhouse, a garden apartment, or a centrally located flat — Zichron Yaakov offers a diverse range. Neighborhoods like Alon, Mordot HaCarmel, Givat Eden, and the Historic Center cater to different needs and budgets.",
        },
        {
          icon: AlertTriangle,
          title: "Common Mistakes Buyers Make",
          content: "Buying without checking zoning plans, relying on outdated prices, ignoring betterment levies, or skipping local guidance — these are costly mistakes. Professional local guidance can save you significant money and ensure your transaction is protected.",
        },
        {
          icon: Handshake,
          title: "Negotiation Considerations",
          content: "Negotiating a property in Zichron Yaakov requires understanding the local market, pricing trends, and seller motivation. A local expert knows when to move forward and when to wait — and that's the difference between a good deal and a great one.",
        },
      ];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: isHe ? "רכישת נכס בזכרון יעקב" : "Buying Property" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6"
          >
            <h1 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "רכישת נכס בזכרון יעקב" : "Buying Property in Zichron Yaakov"}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
              {isHe
                ? "מדריך מקיף לרכישת נכס בזכרון יעקב — מידע מקומי, שיקולים חשובים, וליווי מקצועי."
                : "A comprehensive guide to buying property in Zichron Yaakov — local insights, key considerations, and expert guidance."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
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
              {isHe ? "מוכנים להתחיל?" : "Ready to Start?"}
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
              {isHe
                ? "עיינו בנכסים הזמינים בזכרון יעקב ומצאו את הבית שלכם."
                : "Explore available homes in Zichron Yaakov and find your perfect property."}
            </p>
            <Link
              to={`${prefix}/properties`}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-primary-foreground py-4 px-8 rounded-lg font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ fontSize: "17px" }}
            >
              {isHe ? "צפו בנכסים" : "Explore Homes in Zichron Yaakov"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Blueprint Lead Magnet */}
      <BuyerBlueprintBlock />

      {/* Internal links */}
      <section className="py-12 bg-background">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-4">
            <Link to={`${prefix}/homes-for-sale-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "בתים למכירה בזכרון יעקב" : "Homes for Sale in Zichron Yaakov"}
            </Link>
            <Link to={`${prefix}/living-in-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "חיים בזכרון יעקב" : "Living in Zichron Yaakov"}
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

export default BuyingProperty;
