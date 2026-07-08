"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building2, Plane, MessageCircle, Info } from "lucide-react";
import {
  calcPurchaseTax,
  TAX_AUTHORITY_SIMULATOR,
  PURCHASE_TAX_VALID_TO,
  type BuyerType,
} from "@/lib/purchase-tax";

const WA_PHONE = "972522820632";

// Copy lives inline (bilingual) rather than in site_content: the figures and
// their framing are tied to the verified tax logic in lib/purchase-tax.ts and
// should version together with it.
const S = {
  en: {
    typeLabel: "This purchase is…",
    types: {
      single: "My only home in Israel",
      additional: "An additional / investment home",
      oleh: "I'm a new immigrant (Oleh)",
    } as Record<BuyerType, string>,
    typeHints: {
      single: "You won't own another residential property in Israel.",
      additional: "You already own a home, it's an investment, or you're a foreign resident.",
      oleh: "You made — or are about to make — aliyah.",
    } as Record<BuyerType, string>,
    priceLabel: "Property price",
    pricePlaceholder: "e.g. 3,200,000",
    resultTax: "Estimated purchase tax",
    effective: "Effective rate",
    breakdownTitle: "How it breaks down",
    band: "On",
    at: "at",
    olehTitle: "You likely qualify for a reduced Oleh rate",
    olehBody:
      "New immigrants pay significantly less purchase tax — but the exact brackets depend on your aliyah date and personal status, and the rules changed in August 2024. We'll run your precise number with you.",
    ctaLead: "Get my full buying-cost breakdown",
    ctaSub: "Purchase tax is one cost of several. We'll map the full picture — legal, agent and financing — for your specific purchase.",
    waText: "Hi Spirit, I used the purchase-tax calculator and I'd like a full buying-cost breakdown. The property price is around ₪",
    waTextOleh: "Hi Spirit, I'm a new immigrant (Oleh) and I'd like a personal purchase-tax calculation. The property price is around ₪",
    disclaimer: `Estimate based on Israel Tax Authority brackets in effect through ${fmtDate(PURCHASE_TAX_VALID_TO, "en")}. This is not tax advice — confirm your exact liability with us or your lawyer.`,
    official: "Official Tax Authority simulator",
    enterPrice: "Enter a price to see the estimate.",
  },
  he: {
    typeLabel: "הרכישה הזו היא…",
    types: {
      single: "הדירה היחידה שלי בישראל",
      additional: "דירה נוספת / להשקעה",
      oleh: "אני עולה חדש/ה",
    } as Record<BuyerType, string>,
    typeHints: {
      single: "לא תהיה בבעלותכם דירת מגורים נוספת בישראל.",
      additional: "כבר יש בבעלותכם דירה, זו השקעה, או שאתם תושבי חוץ.",
      oleh: "עליתם — או עומדים לעלות — ארצה.",
    } as Record<BuyerType, string>,
    priceLabel: "מחיר הנכס",
    pricePlaceholder: "לדוגמה 3,200,000",
    resultTax: "מס רכישה משוער",
    effective: "שיעור אפקטיבי",
    breakdownTitle: "פירוט החישוב",
    band: "על",
    at: "בשיעור",
    olehTitle: "סביר שמגיע לכם שיעור עולה מופחת",
    olehBody:
      "עולים חדשים משלמים מס רכישה נמוך משמעותית — אך המדרגות המדויקות תלויות בתאריך העלייה ובמעמד האישי, והכללים השתנו באוגוסט 2024. נחשב איתכם את הסכום המדויק.",
    ctaLead: "קבלו פירוט מלא של עלויות הרכישה",
    ctaSub: "מס רכישה הוא רק אחת מכמה עלויות. נמפה עבורכם את התמונה המלאה — משפטי, תיווך ומימון — לרכישה הספציפית שלכם.",
    waText: "היי ספיריט, השתמשתי במחשבון מס הרכישה ואשמח לפירוט מלא של עלויות הרכישה. מחיר הנכס בסביבות ₪",
    waTextOleh: "היי ספיריט, אני עולה חדש/ה ואשמח לחישוב מס רכישה אישי. מחיר הנכס בסביבות ₪",
    disclaimer: `אומדן לפי מדרגות רשות המסים התקפות עד ${fmtDate(PURCHASE_TAX_VALID_TO, "he")}. אין באמור ייעוץ מס — יש לאמת את החבות המדויקת מולנו או מול עורך הדין שלכם.`,
    official: "סימולטור רשות המסים הרשמי",
    enterPrice: "הזינו מחיר כדי לראות את האומדן.",
  },
};

function fmtDate(iso: string, lang: "en" | "he") {
  const d = new Date(iso);
  return d.toLocaleDateString(lang === "he" ? "he-IL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function fmtShekel(n: number) {
  return "₪" + Math.round(n).toLocaleString("en-US");
}

const TYPE_ICONS = { single: Home, additional: Building2, oleh: Plane };

const PurchaseTaxWidget = ({ lang }: { lang: "en" | "he" }) => {
  const isHe = lang === "he";
  const t = S[lang];
  const [buyerType, setBuyerType] = useState<BuyerType>("single");
  const [raw, setRaw] = useState("");

  const price = useMemo(() => Number(raw.replace(/[^\d]/g, "")) || 0, [raw]);
  const result = useMemo(
    () => (buyerType === "oleh" ? null : calcPurchaseTax(price, buyerType)),
    [price, buyerType]
  );

  const waMessage = encodeURIComponent(
    (buyerType === "oleh" ? t.waTextOleh : t.waText) + (price ? price.toLocaleString("en-US") : "___")
  );
  const waHref = `https://wa.me/${WA_PHONE}?text=${waMessage}`;

  return (
    <div className="max-w-2xl mx-auto bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 space-y-6">
        {/* Buyer type */}
        <fieldset>
          <legend className="font-body text-sm font-semibold text-foreground mb-3">{t.typeLabel}</legend>
          <div className="grid sm:grid-cols-3 gap-3">
            {(Object.keys(t.types) as BuyerType[]).map((key) => {
              const Icon = TYPE_ICONS[key];
              const active = buyerType === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setBuyerType(key)}
                  aria-pressed={active}
                  className={`text-start rounded-xl border p-3.5 transition-all ${
                    active
                      ? "border-gold bg-gold/5 ring-1 ring-gold/30"
                      : "border-border bg-background hover:border-gold/40"
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${active ? "text-gold" : "text-muted-foreground"}`} />
                  <span className="block font-body text-sm font-semibold text-foreground leading-snug">
                    {t.types[key]}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-xs font-body text-muted-foreground mt-2">{t.typeHints[buyerType]}</p>
        </fieldset>

        {/* Price */}
        <div>
          <label htmlFor="ptax-price" className="block font-body text-sm font-semibold text-foreground mb-2">
            {t.priceLabel}
          </label>
          <div className="relative">
            <span className="absolute top-1/2 -translate-y-1/2 start-4 text-muted-foreground font-body">₪</span>
            <input
              id="ptax-price"
              inputMode="numeric"
              value={raw ? price.toLocaleString("en-US") : ""}
              onChange={(e) => setRaw(e.target.value)}
              placeholder={t.pricePlaceholder}
              className="w-full ps-9 pe-4 py-3.5 rounded-lg border border-border bg-background text-foreground font-body text-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
            />
          </div>
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {buyerType === "oleh" ? (
            <motion.div
              key="oleh"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl bg-primary/5 border border-primary/15 p-5"
            >
              <p className="font-display font-semibold text-foreground mb-1.5">{t.olehTitle}</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.olehBody}</p>
            </motion.div>
          ) : price > 0 && result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl bg-background border border-border p-5"
            >
              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-body uppercase tracking-wider text-muted-foreground mb-1">
                    {t.resultTax}
                  </p>
                  <p className="font-display font-bold text-3xl text-foreground">{fmtShekel(result.total)}</p>
                </div>
                <div className="text-end">
                  <p className="text-xs font-body uppercase tracking-wider text-muted-foreground mb-1">
                    {t.effective}
                  </p>
                  <p className="font-display font-semibold text-xl text-gold">
                    {(result.effectiveRate * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
              {result.breakdown.length > 0 && (
                <div className="border-t border-border pt-3">
                  <p className="text-xs font-body font-semibold text-muted-foreground mb-2">{t.breakdownTitle}</p>
                  <ul className="space-y-1">
                    {result.breakdown.map((b, i) => (
                      <li key={i} className="flex justify-between text-xs font-body text-muted-foreground">
                        <span>
                          {t.band} {fmtShekel(b.taxable)} {t.at} {(b.rate * 100).toFixed(b.rate === 0.035 ? 1 : 0)}%
                        </span>
                        <span className="font-semibold text-foreground">{fmtShekel(b.tax)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ) : (
            <p className="text-sm font-body text-muted-foreground text-center py-3">{t.enterPrice}</p>
          )}
        </AnimatePresence>

        {/* Conversion CTA */}
        <div className="rounded-xl bg-primary p-5 md:p-6 text-center">
          <p className="font-display font-semibold text-primary-foreground text-lg mb-1.5">{t.ctaLead}</p>
          <p className="font-body text-sm text-primary-foreground/80 mb-4 max-w-md mx-auto leading-relaxed">
            {t.ctaSub}
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-white py-3 px-7 rounded-full font-body font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>{isHe ? "דברו איתנו בוואטסאפ" : "Talk to us on WhatsApp"}</span>
          </a>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 text-[11px] font-body text-muted-foreground/80 leading-relaxed">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden />
          <p>
            {t.disclaimer}{" "}
            <a
              href={TAX_AUTHORITY_SIMULATOR}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-hover underline underline-offset-2"
            >
              {t.official}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTaxWidget;
