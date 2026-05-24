import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import { optimizedImageUrl } from "@/lib/image";

import fallbackImg1 from "@/assets/guide-img-12.jpg";
import fallbackImg2 from "@/assets/guide-img-8.jpg";
import fallbackImg3 from "@/assets/guide-img-11.jpg";
import fallbackImg4 from "@/assets/guide-img-13.jpg";
import fallbackImg5 from "@/assets/guide-img-5.jpg";
import fallbackImg6 from "@/assets/guide-img-19.jpg";

interface GalleryItem {
  id: string;
  image_url: string;
  display_order: number;
  title_en: string;
  title_he: string;
  description_en: string;
  description_he: string;
  alt_en: string;
  alt_he: string;
}

const FALLBACK_ITEMS: GalleryItem[] = [
  { id: "f1", image_url: fallbackImg1, display_order: 1, title_en: "Mediterranean Sea Views", title_he: "נוף לים התיכון", description_en: "Golden sunsets just minutes from home", description_he: "שקיעות מרהיבות מעל הים", alt_en: "Mediterranean sea view from Zichron Yaakov", alt_he: "נוף ים תיכוני מזכרון יעקב" },
  { id: "f2", image_url: fallbackImg2, display_order: 2, title_en: "Historic Stone Houses", title_he: "בתי אבן היסטוריים", description_en: "Timeless architecture with modern charm", description_he: "אדריכלות נצחית עם קסם מודרני", alt_en: "Historic stone houses in Zichron Yaakov", alt_he: "בתי אבן היסטוריים בזכרון יעקב" },
  { id: "f3", image_url: fallbackImg3, display_order: 3, title_en: "Pedestrian Street Life", title_he: "חיי רחוב מדרחוב", description_en: "Boutiques, cafés and vibrant culture", description_he: "בוטיקים, בתי קפה ותרבות תוססת", alt_en: "Pedestrian street in Zichron Yaakov", alt_he: "מדרחוב זכרון יעקב" },
  { id: "f4", image_url: fallbackImg4, display_order: 4, title_en: "Nature & Gardens", title_he: "טבע וגנים", description_en: "Green spaces and scenic walking trails", description_he: "שטחים ירוקים ושבילי הליכה", alt_en: "Nature and gardens in Zichron Yaakov", alt_he: "טבע וגנים בזכרון יעקב" },
  { id: "f5", image_url: fallbackImg5, display_order: 5, title_en: "Vineyards & Wine", title_he: "כרמים ויין", description_en: "Israel's original wine country heritage", description_he: "מורשת היין המקורית של ישראל", alt_en: "Vineyards in Zichron Yaakov", alt_he: "כרמים בזכרון יעקב" },
  { id: "f6", image_url: fallbackImg6, display_order: 6, title_en: "Family-Friendly Living", title_he: "חיים משפחתיים", description_en: "Safe neighborhoods, warm community", description_he: "שכונות בטוחות, קהילה חמה", alt_en: "Family life in Zichron Yaakov", alt_he: "חיי משפחה בזכרון יעקב" },
];

const LIFESTYLE_MARKETING_ORDER = [
  "184f68b7-36f0-401a-91e6-21a5e3eb0f1c",
  "5e68ca40-3c97-4e91-8901-b4d5c9b8f162",
  "a75a7324-d15f-4069-9cbe-b62322176952",
  "c910c395-5569-4607-8521-0c0aa653661e",
  "6a2233fa-f4b8-4d89-a77b-74a06bf5ea56",
  "ae1d7141-3cb0-4c9a-bc9d-85941424cb3d",
  "1dea5d5b-c020-451d-a5f2-07cbb7e36db3",
  "11ab24d9-4bc4-4575-ab09-9cec24d42abf",
  "2d7c8962-8fca-4066-b5d6-1df437da0aa1",
  "2fdcc354-8319-4bfd-b595-f258cfacfab3",
  "b63a100c-0f7c-4d5c-b3d3-ec0dd1eaaf5f",
  "37ce202a-af77-472c-a36b-613d623514f1",
  "c019de16-cb99-4bd6-83c6-f563fb8dcc6a",
  "178c6527-a7c7-4977-a6e4-76b2f5fe7a1b",
  "65f6b758-ddeb-447b-ab61-0af3216786cd",
  "d5c167ea-cced-4f2d-9639-706bea4c1d88",
  "3f2b8475-e9f0-4b52-8d62-195a11cc8a9b",
  "ca0ef46b-8c7f-403b-aa4b-86b178b1b642",
  "dd760ad7-20c8-49f9-bca3-8617a3ce0096",
  "2191104f-b9b1-4d5e-b329-dc026ef4c4de",
];

const lifestyleOrderIndex = new Map(LIFESTYLE_MARKETING_ORDER.map((id, index) => [id, index]));

const LifestyleSection = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const { t } = useSiteContent();

  useEffect(() => {
    supabase
      .from("lifestyle_gallery")
      .select("*")
      .order("display_order")
      .then(({ data }) => {
        if (data && data.length > 0) {
          setItems(
            data
              .map((d: any) => ({
                id: d.id,
                image_url: d.image_url,
                display_order: d.display_order,
                title_en: d.title_en || "",
                title_he: d.title_he || "",
                description_en: d.description_en || "",
                description_he: d.description_he || "",
                alt_en: d.alt_en || "",
                alt_he: d.alt_he || "",
              }))
              .sort((a, b) => {
                const aIndex = lifestyleOrderIndex.get(a.id) ?? Number.MAX_SAFE_INTEGER;
                const bIndex = lifestyleOrderIndex.get(b.id) ?? Number.MAX_SAFE_INTEGER;
                if (aIndex !== bIndex) return aIndex - bIndex;
                return a.display_order - b.display_order;
              })
          );
        }
      });
  }, []);

  const display = items.length > 0 ? items : FALLBACK_ITEMS;

  const renderCard = (item: GalleryItem, idx: number) => {
    const title = isHe ? item.title_he : item.title_en;
    const desc = isHe ? item.description_he : item.description_en;
    const alt = (isHe ? item.alt_he : item.alt_en) || title || `Zichron Yaakov lifestyle ${idx + 1}`;

    return (
      <div
        key={item.id}
        className="relative overflow-hidden rounded-2xl shadow-md"
        role="figure"
        aria-label={title || alt}
      >
        <div className="aspect-[4/3] overflow-hidden bg-sand-light">
          <img
            src={optimizedImageUrl(item.image_url, { width: 1200, quality: 78, resize: "contain", format: "webp" })}
            alt={alt}
            className="w-full h-full object-contain object-center"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute bottom-0 inset-x-0" dir={isHe ? "rtl" : "ltr"}>
          <div className="bg-gradient-to-t from-foreground/70 via-foreground/40 to-transparent pt-10 pb-4 px-4">
            {title && (
              <p className="text-primary-foreground font-display text-base font-semibold drop-shadow-md">
                {title}
              </p>
            )}
            {desc && (
              <p className="text-primary-foreground/85 font-body text-xs mt-0.5 drop-shadow-sm">
                {desc}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-14 md:py-20 bg-sand-light">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-[26px] md:text-[30px] font-display font-semibold text-foreground mb-3">
            {isHe ? "למה כל כך הרבה אנשים מגיעים לזכרון יעקב — ובסוף מחליטים להישאר" : "Why Overseas Families Choose Zichron Yaakov"}
          </h2>

          {/* Framing line */}
          <p className="font-display italic text-muted-foreground text-base md:text-lg mb-5">
            {isHe ? "הבתים של זכרון הם רק חלק מהסיפור." : "The homes are only part of the story."}
          </p>

          <div className={`text-muted-foreground font-body max-w-lg mx-auto text-sm md:text-base mb-5 space-y-2 text-start`}>
            {isHe ? (
              <>
                <p>יש מקומות שנוח לגור בהם.</p>
                <p>ויש מקומות שמרגישים כמו בית מהרגע הראשון.</p>
                <p>זכרון יעקב היא בדיוק כזה מקום.</p>
                <p>מושבה היסטורית על רכס הכרמל עם נוף פתוח לים, אוכלוסייה חזקה, קהילה איכותית ואיכות חיים שקשה למצוא במקומות אחרים בארץ.</p>
              </>
            ) : (
              <p className="text-center">A rare blend of Mediterranean lifestyle, strong community and long-term value.</p>
            )}
          </div>
          <ul className={`max-w-xl mx-auto text-muted-foreground font-body text-sm space-y-3 text-start`}>
            {isHe ? (
              <>
                <li className="flex items-start gap-2"><span className="text-gold mt-1 shrink-0">•</span><span><strong>נוף פתוח לים התיכון</strong> — מהרבה בתים במושבה ניתן לראות את <strong>האופק הכחול</strong> עד קו החוף.</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1 shrink-0">•</span><span><strong>טבע ושמורות טבע</strong> — <strong>שבילי הליכה</strong>, חורשות ושמורות טבע דקות מהבית, ו<strong>חופי ים מהיפים בארץ</strong> ממש מתחת לגבעה.</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1 shrink-0">•</span><span><strong>חינוך איכותי</strong> — משפחות רבות מגיעות לזכרון בזכות <strong>מערכת החינוך החזקה</strong> והסביבה המשפחתית.</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1 shrink-0">•</span><span><strong>המדרחוב ההיסטורי</strong> — <strong>בתי אבן</strong>, <strong>יקבים</strong>, <strong>גלריות</strong> ו<strong>בתי קפה קטנים</strong> לאורך המדרחוב יוצרים מרכז חיים ייחודי.</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1 shrink-0">•</span><span><strong>קהילה איכותית</strong> — זכרון מושכת משפחות שמחפשות <strong>איכות חיים</strong>, סביבה חזקה וקהילה טובה לגדל בה ילדים.</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1 shrink-0">•</span><span><strong>קרבה למרכז</strong> — כשעה מ<strong>תל אביב</strong> וכחצי שעה מ<strong>חיפה</strong> — אבל האוויר והקצב כאן שונים לגמרי.</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1 shrink-0">•</span><span><strong>ביקוש גבוה לנכסים</strong> — זכרון נשארת אחת <strong>המושבות המבוקשות בישראל</strong> ושומרת על ערך הנדל״ן לאורך שנים.</span></li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-2"><span className="text-gold mt-1 shrink-0">•</span><span><strong>Coastal Mediterranean lifestyle</strong> — <strong>Sea views</strong>, golden sunsets, just 60 minutes from Tel Aviv.</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1 shrink-0">•</span><span><strong>Strong English-speaking community</strong> — International, welcoming and well-connected.</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1 shrink-0">•</span><span><strong>Excellent schools and nature</strong> — A <strong>family-friendly</strong> atmosphere surrounded by greenery.</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1 shrink-0">•</span><span><strong>Historic charm and vineyards</strong> — <strong>Stone houses</strong>, <strong>boutique wineries</strong>, <strong>cozy cafés</strong> and a uniquely walkable town center.</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1 shrink-0">•</span><span><strong>Limited housing supply</strong> — Supporting <strong>long-term value</strong> in one of Israel's most sought-after towns.</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1 shrink-0">•</span><span><strong>Easy access</strong> — To both <strong>Tel Aviv</strong> and <strong>Haifa</strong>, yet a completely different pace of life.</span></li>
              </>
            )}
          </ul>

          {/* Nature & Sea Highlight Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 max-w-2xl mx-auto rounded-2xl bg-gradient-to-br from-primary/5 via-card to-accent/10 border border-border/60 p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🌊</span>
              <h3 className="font-display text-lg md:text-xl font-semibold text-foreground">
                {isHe ? "הים ושמורות הטבע — במרחק נגיעה" : "Sea & Nature Reserves — Minutes Away"}
              </h3>
            </div>
            <div className={`font-body text-sm md:text-base text-muted-foreground space-y-3 text-start`}>
              {isHe ? (
                <>
                  <p>
                    אחד הדברים שהופכים את זכרון יעקב למיוחדת במיוחד הוא הקרבה לטבע ולים. תוך דקות ספורות מהבית אפשר להגיע לאתרים מדהימים:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    <div className="flex items-start gap-2 bg-background/60 rounded-xl p-3">
                      <span className="text-gold text-lg mt-0.5">🏖️</span>
                      <div>
                        <p className="font-display font-semibold text-foreground text-sm">חוף דור</p>
                        <p className="text-xs text-muted-foreground mt-0.5">מפרצון טורקיז מוקף סלעים טבעיים, אחד החופים היפים בישראל. מושלם למשפחות ולשחייה בים צלול.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-background/60 rounded-xl p-3">
                      <span className="text-gold text-lg mt-0.5">🌿</span>
                      <div>
                        <p className="font-display font-semibold text-foreground text-sm">רמת הנדיב</p>
                        <p className="text-xs text-muted-foreground mt-0.5">גני הנדיב וגן הזיכרון של הברון רוטשילד — פארק מרהיב עם שבילי הליכה, גנים מעוצבים ונוף פנורמי.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-background/60 rounded-xl p-3">
                      <span className="text-gold text-lg mt-0.5">🥾</span>
                      <div>
                        <p className="font-display font-semibold text-foreground text-sm">שמורת נחל תנינים</p>
                        <p className="text-xs text-muted-foreground mt-0.5">שמורת טבע עתיקה עם סכר מתקופת הצלבנים, בריכות מים ומסלולי הליכה בין צמחייה ירוקה.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-background/60 rounded-xl p-3">
                      <span className="text-gold text-lg mt-0.5">🌅</span>
                      <div>
                        <p className="font-display font-semibold text-foreground text-sm">חוף הכרמל ועין חוד</p>
                        <p className="text-xs text-muted-foreground mt-0.5">רצועת חופים לאורך הכרמל והכפר האמנים עין חוד — תרבות, אומנות וטבע במרחק דקות.</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    What makes Zichron Yaakov truly special is its proximity to world-class nature and coastline. Within minutes you can reach:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    <div className="flex items-start gap-2 bg-background/60 rounded-xl p-3">
                      <span className="text-gold text-lg mt-0.5">🏖️</span>
                      <div>
                        <p className="font-display font-semibold text-foreground text-sm">Dor Beach (HaBukhta)</p>
                        <p className="text-xs text-muted-foreground mt-0.5">A stunning turquoise lagoon surrounded by natural rock formations — one of Israel's most beautiful beaches.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-background/60 rounded-xl p-3">
                      <span className="text-gold text-lg mt-0.5">🌿</span>
                      <div>
                        <p className="font-display font-semibold text-foreground text-sm">Ramat Hanadiv</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Baron Rothschild's memorial gardens — a breathtaking park with walking trails, landscaped gardens and panoramic views.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-background/60 rounded-xl p-3">
                      <span className="text-gold text-lg mt-0.5">🥾</span>
                      <div>
                        <p className="font-display font-semibold text-foreground text-sm">Nahal Taninim Reserve</p>
                        <p className="text-xs text-muted-foreground mt-0.5">An ancient nature reserve with a Crusader-era dam, natural pools and scenic walking paths through lush greenery.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-background/60 rounded-xl p-3">
                      <span className="text-gold text-lg mt-0.5">🌅</span>
                      <div>
                        <p className="font-display font-semibold text-foreground text-sm">Carmel Coast & Ein Hod</p>
                        <p className="text-xs text-muted-foreground mt-0.5">A strip of pristine beaches along the Carmel ridge and the artists' village of Ein Hod — culture, art and nature combined.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:block md:columns-2 lg:columns-3 gap-5 md:gap-7 max-w-5xl mx-auto [column-fill:_balance]">
          {display.map((item, idx) => {
            const title = isHe ? item.title_he : item.title_en;
            const desc = isHe ? item.description_he : item.description_en;
            const alt = (isHe ? item.alt_he : item.alt_en) || title || `Zichron Yaakov lifestyle ${idx + 1}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 mb-5 md:mb-7 break-inside-avoid block"
                tabIndex={0}
                role="figure"
                aria-label={title || alt}
              >
                <img
                  src={optimizedImageUrl(item.image_url, { width: 1200, quality: 78, resize: "contain", format: "webp" })}
                  alt={alt}
                  className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105 group-focus-within:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
                >
                  <div className="absolute inset-0 bg-foreground/45" />
                  <div className="relative z-10" dir={isHe ? "rtl" : "ltr"}>
                    {title && (
                      <p className="text-primary-foreground font-display text-lg font-semibold drop-shadow-md">
                        {title}
                      </p>
                    )}
                    {desc && (
                      <p className="text-primary-foreground/90 font-body text-sm mt-1 drop-shadow-sm">
                        {desc}
                      </p>
                    )}
                    <div className={`h-[2px] w-10 bg-gold mt-3 scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-500 delay-100 ${isHe ? "origin-right" : "origin-left"}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: Mosaic gallery in a dark green frame (single visual "breather") */}
        <div className="md:hidden -mx-6">
          <div className="bg-primary px-4 py-8 rounded-none">
            <p className="text-primary-foreground/85 font-body uppercase tracking-[0.18em] text-[11px] text-center mb-1">
              {isHe ? "גלריה" : "Gallery"}
            </p>
            <h3 className="text-primary-foreground font-display font-semibold text-xl text-center mb-5">
              {isHe ? "זכרון יעקב — במבט אחד" : "Zichron Yaakov — At a Glance"}
            </h3>

            <div className="columns-2 gap-2 [column-fill:_balance]">
              {display.map((item, idx) => {
                const title = isHe ? item.title_he : item.title_en;
                const desc = isHe ? item.description_he : item.description_en;
                const alt = (isHe ? item.alt_he : item.alt_en) || title || `Zichron Yaakov lifestyle ${idx + 1}`;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                    className="relative overflow-hidden rounded-xl shadow-sm mb-2 break-inside-avoid block bg-primary/30"
                  >
                    <img
                      src={optimizedImageUrl(item.image_url, { width: 700, quality: 78, resize: "contain", format: "webp" })}
                      alt={alt}
                      className="block w-full h-auto"
                      loading={idx < 3 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    {title && (
                      <div className="absolute inset-x-0 bottom-0" dir={isHe ? "rtl" : "ltr"}>
                        <div className="bg-gradient-to-t from-foreground/80 via-foreground/35 to-transparent pt-8 pb-2 px-3">
                          <p className="text-primary-foreground font-display text-[13px] font-semibold drop-shadow-md leading-tight line-clamp-2">
                            {title}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-muted-foreground font-body text-sm italic mt-10"
        >
          {isHe
            ? "מעל 288 משפחות כבר נעזרו ב-Spirit Real Estate כדי למצוא את הבית שלהן בזכרון יעקב."
            : t("home.lifestyle.bottom_line")}
        </motion.p>
      </div>
    </section>
  );
};

export default LifestyleSection;
