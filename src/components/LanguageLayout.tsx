import { useEffect } from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useLanguage, type Lang } from "@/lib/i18n";
import CookieNotice from "@/components/CookieNotice";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const VALID_LANGS = ["en", "he"];

const ROUTE_META: Record<string, { en: { title: string; desc: string }; he: { title: string; desc: string } }> = {
  "": {
    en: { title: "Spirit Real Estate — Zichron Yaakov Property Experts", desc: "Boutique real estate firm in Zichron Yaakov. Local guidance, smarter decisions." },
    he: { title: "ספיריט נדל\"ן — מומחי נדל\"ן בזכרון יעקב", desc: "משרד נדל\"ן בוטיק בזכרון יעקב. ליווי מקומי, החלטות חכמות יותר." },
  },
  properties: {
    en: { title: "Properties — Spirit Real Estate", desc: "Browse available properties in Zichron Yaakov and surrounding communities." },
    he: { title: "נכסים — ספיריט נדל\"ן", desc: "עיינו בנכסים זמינים בזכרון יעקב והקהילות הסובבות." },
  },
  sell: {
    en: { title: "Sell Your Property — Spirit Real Estate", desc: "Get strategic guidance to sell your property at the right price." },
    he: { title: "מכירת נכס — ספיריט נדל\"ן", desc: "קבלו ליווי אסטרטגי למכירת הנכס שלכם במחיר הנכון." },
  },
  about: {
    en: { title: "About — Spirit Real Estate", desc: "Meet the team behind Spirit Real Estate in Zichron Yaakov." },
    he: { title: "אודות — ספיריט נדל\"ן", desc: "הכירו את הצוות מאחורי ספיריט נדל\"ן בזכרון יעקב." },
  },
  contact: {
    en: { title: "Contact — Spirit Real Estate", desc: "Get in touch with Spirit Real Estate for property inquiries." },
    he: { title: "צור קשר — ספיריט נדל\"ן", desc: "פנו לספיריט נדל\"ן לפניות בנושא נכסים." },
  },
  privacy: {
    en: { title: "Privacy Policy — Spirit Real Estate", desc: "Our privacy policy and data handling practices." },
    he: { title: "מדיניות פרטיות — ספיריט נדל\"ן", desc: "מדיניות הפרטיות ונוהלי הטיפול בנתונים שלנו." },
  },
  accessibility: {
    en: { title: "Accessibility — Spirit Real Estate", desc: "Our commitment to digital accessibility." },
    he: { title: "הצהרת נגישות — ספיריט נדל\"ן", desc: "המחויבות שלנו לנגישות דיגיטלית." },
  },
  "buying-property-zichron-yaakov": {
    en: { title: "Buying Property in Zichron Yaakov — Spirit Real Estate", desc: "Expert guide to buying property in Zichron Yaakov. Local market overview, property types, negotiation tips, and common mistakes to avoid." },
    he: { title: "רכישת נכס בזכרון יעקב — ספיריט נדל\"ן", desc: "מדריך מקיף לרכישת נכס בזכרון יעקב. סקירת שוק, סוגי נכסים, טיפים למשא ומתן וטעויות שכדאי להימנע מהן." },
  },
  "homes-for-sale-zichron-yaakov": {
    en: { title: "Homes for Sale in Zichron Yaakov — Spirit Real Estate", desc: "Browse homes for sale in Zichron Yaakov. Explore neighborhoods, property types, and available listings in one of Israel's most beautiful towns." },
    he: { title: "בתים למכירה בזכרון יעקב — ספיריט נדל\"ן", desc: "גלו בתים למכירה בזכרון יעקב. שכונות, סוגי נכסים ומגוון הצעות באחת הערים היפות בישראל." },
  },
  "living-in-zichron-yaakov": {
    en: { title: "Living in Zichron Yaakov — Spirit Real Estate", desc: "Discover what it's like to live in Zichron Yaakov — lifestyle, community, families, and accessibility to Tel Aviv and Haifa." },
    he: { title: "חיים בזכרון יעקב — ספיריט נדל\"ן", desc: "גלו איך זה לחיות בזכרון יעקב — אורח חיים, קהילה, משפחות ונגישות לתל אביב ולחיפה." },
  },
  "moving-to-zichron-yaakov": {
    en: { title: "Moving to Zichron Yaakov — Spirit Real Estate", desc: "Planning to move to Zichron Yaakov? Everything you need to know about relocating, the housing market, and how we help buyers settle in." },
    he: { title: "מעבר לזכרון יעקב — ספיריט נדל\"ן", desc: "מתכננים לעבור לזכרון יעקב? כל מה שצריך לדעת על המעבר, שוק הדיור ואיך אנחנו עוזרים לקונים להתאקלם." },
  },
};

const LanguageLayout = () => {
  const { lang: urlLang } = useParams<{ lang: string }>();
  const { setLang, lang, dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (urlLang && VALID_LANGS.includes(urlLang)) {
      setLang(urlLang as Lang);
    }
  }, [urlLang, setLang]);

  // Sync <html> lang & dir for accessibility and SEO
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // Dynamic meta tags + canonical
  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const page = pathSegments[1] || "";
    const meta = ROUTE_META[page]?.[lang as "en" | "he"];

    if (meta) {
      document.title = meta.title;
      let descTag = document.querySelector('meta[name="description"]');
      if (!descTag) {
        descTag = document.createElement("meta");
        descTag.setAttribute("name", "description");
        document.head.appendChild(descTag);
      }
      descTag.setAttribute("content", meta.desc);

      // Canonical tag
      const canonicalUrl = `https://spirit666.lovable.app${location.pathname}`;
      let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.rel = "canonical";
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.href = canonicalUrl;

      // Open Graph
      const ogTags: Record<string, string> = {
        "og:title": meta.title,
        "og:description": meta.desc,
        "og:type": "website",
        "og:url": canonicalUrl,
        "og:locale": lang === "he" ? "he_IL" : "en_US",
      };
      Object.entries(ogTags).forEach(([property, content]) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("property", property);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
      });
    }
  }, [location.pathname, lang]);

  // hreflang tags
  useEffect(() => {
    const path = location.pathname.replace(/^\/(en|he)/, "");
    const base = window.location.origin;

    const existing = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existing.forEach((el) => el.remove());

    const enLink = document.createElement("link");
    enLink.rel = "alternate";
    enLink.hreflang = "en";
    enLink.href = `${base}/en${path || "/"}`;
    document.head.appendChild(enLink);

    const heLink = document.createElement("link");
    heLink.rel = "alternate";
    heLink.hreflang = "he";
    heLink.href = `${base}/he${path || "/"}`;
    document.head.appendChild(heLink);

    return () => {
      enLink.remove();
      heLink.remove();
    };
  }, [location.pathname]);

  return (
    <div dir={dir} lang={lang}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg font-body text-sm">
        {lang === "he" ? "דלג לתוכן" : "Skip to content"}
      </a>
      <Outlet />
      <CookieNotice />
      <AccessibilityWidget />
    </div>
  );
};

export default LanguageLayout;
