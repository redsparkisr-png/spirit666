"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import FAQSection from "@/components/FAQSection";
import { MapPin, CheckCircle2, Clock, ArrowLeft, ArrowRight, Home, TrendingUp, Eye } from "lucide-react";

// ── Form state ───────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  phone: string;
  address: string;
  type: string;
  notes: string;
}

const EMPTY: FormData = { name: "", phone: "", address: "", type: "", notes: "" };

// ── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ_EN = [
  { q: "How much does a valuation cost?", a: "Nothing. Our initial property assessment is completely free and without any obligation. We believe the right price starts with a conversation — not a signed listing agreement." },
  { q: "How long does it take?", a: "We respond within 24 hours to arrange a property visit. The valuation itself is delivered within 48 hours of seeing the property in person." },
  { q: "Agent valuation vs. certified appraiser — what's the difference?", a: "A certified appraiser (shama'i) is required for mortgages and legal proceedings. An agent's valuation reflects what a real buyer will pay today — based on recent comparable sales, current demand, and local market feel. For pricing your home correctly, local market knowledge is often more precise than a formal appraisal." },
  { q: "What specifically affects value in Zichron Yaakov?", a: "Sea view is the single largest premium factor — adding 10–20% depending on the degree and unobstructed nature. Neighborhood matters enormously: the spread between Neve Remez and Ramat Zvi on comparable square footage can exceed 40%. Plot size, building rights, proximity to HaMeyasdim, building age, and parking all play significant roles in the final number." },
  { q: "Do I have to sell through you if I get a valuation?", a: "Absolutely not. The valuation is yours to keep regardless of what you decide. Many sellers use our assessment to get clarity before making any decision. We'd rather earn your trust than your signature." },
];

const FAQ_HE = [
  { q: "כמה עולה הערכת שווי?", a: "כלום. הערכת הנכס הראשונית שלנו היא ללא עלות וללא כל התחייבות. אנחנו מאמינים שהמחיר הנכון מתחיל בשיחה — לא בחתימה על הסכם תיווך." },
  { q: "כמה זמן לוקח התהליך?", a: "אנחנו חוזרים תוך 24 שעות לתיאום ביקור בנכס. ההערכה עצמה מועברת תוך 48 שעות מהביקור." },
  { q: "מה ההבדל בין הערכת סוכן להערכת שמאי?", a: "שמאי מוסמך נדרש למשכנתאות והליכים משפטיים. הערכת סוכן משקפת את הסכום שקונה אמיתי ישלם היום — מבוסס על עסקאות השוואתיות אחרונות, ביקוש נוכחי והיכרות אמיתית עם השוק. לצורך תמחור נכון, ידע שוק מקומי מדויק לרוב יותר מהערכה פורמלית." },
  { q: "מה משפיע על שווי הנכס בזכרון יעקב ספציפית?", a: "נוף לים הוא גורם הפרמיום הגדול ביותר — מוסיף 10–20% בהתאם לרמת הנוף ומידת החסימה. השכונה משפיעה אנושות: הפרש המחירים בין נווה רמז לרמת צבי על מ\"ר דומה יכול לעלות על 40%. גודל מגרש, זכויות בנייה, קרבה לרחוב המייסדים, גיל הבניין וחנייה — כולם משפיעים משמעותית על המחיר הסופי." },
  { q: "האם אני חייב למכור דרככם אם קיבלתי הערכה?", a: "בהחלט לא. ההערכה שייכת לכם ללא קשר להחלטה שתקבלו. רבים משתמשים בה כדי לקבל בהירות לפני שמחליטים משהו. אנחנו מעדיפים לזכות באמון שלכם לפני שנזכה בחתימה." },
];

// ── Types ────────────────────────────────────────────────────────────────────
const TYPES_EN = ["Villa / Standalone home", "Semi-detached (Cottage)", "Apartment", "Penthouse", "Land / Plot", "Other"];
const TYPES_HE = ["וילה / בית עצמאי", "קוטג' / דו-משפחתי", "דירה", "פנטהאוז", "מגרש / קרקע", "אחר"];

// ── Main component ───────────────────────────────────────────────────────────
const PropertyValuation = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const Arrow = isHe ? ArrowLeft : ArrowRight;

  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const types = isHe ? TYPES_HE : TYPES_EN;

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError(isHe ? "אנא מלאו שם, טלפון וכתובת הנכס" : "Please fill in name, phone and property address");
      return;
    }
    setError("");
    setSubmitting(true);

    // Strip newlines to prevent message injection
    const safeName = form.name.trim().replace(/[\r\n]+/g, " ");
    const safePhone = form.phone.trim().replace(/[\r\n]+/g, " ");
    const safeAddress = form.address.trim().replace(/[\r\n]+/g, " ");
    const safeType = form.type.replace(/[\r\n]+/g, " ");
    const safeNotes = form.notes.replace(/[\r\n]+/g, " ");

    // Save lead to database so admin panel captures valuation inquiries
    await supabase.from("leads").insert({
      full_name: safeName,
      phone: safePhone,
      email: null,
      message: [safeAddress, safeType, safeNotes].filter(Boolean).join(" — ") || null,
      source: "valuation",
    });

    const waMessage = isHe
      ? `היי, אני מעוניין/ת בהערכת שווי לנכסי בזכרון יעקב.\n\nשם: ${safeName}\nטלפון: ${safePhone}\nכתובת הנכס: ${safeAddress}\nסוג נכס: ${safeType || "לא צוין"}\nהערות: ${safeNotes || "אין"}`
      : `Hi, I'd like a property valuation in Zichron Yaakov.\n\nName: ${safeName}\nPhone: ${safePhone}\nProperty address: ${safeAddress}\nProperty type: ${safeType || "Not specified"}\nNotes: ${safeNotes || "None"}`;

    window.open(`https://wa.me/972522820632?text=${encodeURIComponent(waMessage)}`, "_blank");

    setSubmitting(false);
    setSubmitted(true);
  };

  const inputBase = "w-full bg-background border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60 transition-all";

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-0 md:pt-24 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold/3 via-transparent to-transparent pointer-events-none" />

        <div className="container px-6 relative">
          <BreadcrumbNav items={[{ label: isHe ? "הערכת שווי נכס" : "Property Valuation" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-8">

            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: isHe ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-4 py-1.5 rounded-full mb-6">
                <MapPin className="w-3.5 h-3.5" />
                {isHe ? "זכרון יעקב · ספיריט נדל\"ן" : "Zichron Yaakov · Spirit Real Estate"}
              </div>

              <h1 className="font-display font-semibold text-foreground mb-5 text-3xl md:text-4xl lg:text-5xl leading-tight">
                {isHe
                  ? <>כמה שווה הנכס שלכם<br className="hidden md:block" /> במושבה?</>
                  : <>What is your property<br className="hidden md:block" /> worth in Zichron?</>}
              </h1>

              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8 max-w-lg">
                {isHe
                  ? "זכרון יעקב היא שוק בפני עצמו. נכס עם נוף לכרמל ברחוב מוצל מייסדים שווה סכום שונה לחלוטין מנכס דומה ברחוב מקביל. אנחנו מכירים את ההבדלים — ויודעים בדיוק מה השוק ישלם עליכם היום."
                  : "Zichron Yaakov is a market unto itself. A property with Carmel views on a shaded Hameyasdim side-street commands a fundamentally different price than a comparable unit one block away. We know those differences — and we know exactly what the market will pay for yours today."}
              </p>

              {/* Trust pillars */}
              <div className="space-y-4 mb-10">
                {[
                  {
                    icon: Home,
                    titleHe: "היכרות עם כל שכונה",
                    titleEn: "Deep neighborhood knowledge",
                    bodyHe: "נווה רמז, המושבה, גבעת עדן, נווה הברון — אנחנו מכירים כל פינה ויודעים מה כל שכונה שווה היום.",
                    bodyEn: "Neve Remez, HaMoshava, Givat Eden, Neve HaBaron — we know every corner and what each neighborhood commands today.",
                  },
                  {
                    icon: TrendingUp,
                    titleHe: "מבוסס על עסקאות אמיתיות",
                    titleEn: "Based on real transactions",
                    bodyHe: "לא אלגוריתם, לא ממוצע ארצי. הערכה שמבוססת על מה שנמכר בזכרון יעקב בחודשים האחרונים.",
                    bodyEn: "Not an algorithm, not a national average. An assessment based on what actually sold in Zichron Yaakov in recent months.",
                  },
                  {
                    icon: Eye,
                    titleHe: "ביקור פיזי בנכס",
                    titleEn: "In-person property visit",
                    bodyHe: "שום הערכה אמיתית לא נעשית מרחוק. אנחנו באים אליכם ורואים את הנכס בעיניים.",
                    bodyEn: "No real valuation is done remotely. We come to you and see the property with our own eyes.",
                  },
                ].map(({ icon: Icon, titleHe, titleEn, bodyHe, bodyEn }) => (
                  <div key={titleEn} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-foreground text-sm mb-0.5">{isHe ? titleHe : titleEn}</p>
                      <p className="font-body text-muted-foreground text-sm leading-snug">{isHe ? bodyHe : bodyEn}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  {isHe ? "מה קורה אחרי שמשאירים פרטים" : "What happens next"}
                </p>
                <div className="space-y-3">
                  {[
                    { step: "01", he: "חוזרים אליכם תוך 24 שעות לתיאום ביקור", en: "We respond within 24 hours to schedule a visit" },
                    { step: "02", he: "ביקור בנכס — רואים אותו בעיניים, שואלים שאלות", en: "Property visit — we see it firsthand and ask questions" },
                    { step: "03", he: "הערכת שווי כתובה תוך 48 שעות — מה השוק ישלם היום", en: "Written valuation within 48 hours — what the market pays today" },
                    { step: "04", he: "אתם מחליטים מה לעשות עם המידע — אנחנו ממשיכים לתמוך", en: "You decide what to do with the information — we stay available" },
                  ].map(({ step, he, en }) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-xs font-body font-semibold text-gold shrink-0">{step}</span>
                      <p className="text-sm font-body text-muted-foreground pt-0.5">{isHe ? he : en}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: isHe ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:sticky lg:top-6"
            >
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-[0_24px_64px_-16px_hsl(var(--primary)/0.12)]">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground text-xl">
                      {isHe ? "הפניה נשלחה בהצלחה" : "Request sent"}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm max-w-xs mx-auto">
                      {isHe
                        ? "נציג יצור איתכם קשר תוך 24 שעות לתיאום ביקור בנכס."
                        : "We'll be in touch within 24 hours to arrange a property visit."}
                    </p>
                    <div className="flex items-center justify-center gap-1.5 text-xs font-body text-muted-foreground/60 pt-2">
                      <Clock className="w-3.5 h-3.5" />
                      {isHe ? "זמן תגובה ממוצע: פחות מ-3 שעות בשעות פעילות" : "Average response: under 3 hours during business hours"}
                    </div>
                    <button onClick={() => { setSubmitted(false); setForm(EMPTY); }} className="text-xs text-gold underline underline-offset-2 font-body mt-2">
                      {isHe ? "שליחת בקשה נוספת" : "Submit another request"}
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="font-display font-semibold text-foreground text-xl mb-1">
                        {isHe ? "קבלו הערכת שווי — ללא עלות" : "Get your valuation — free"}
                      </h2>
                      <p className="text-muted-foreground font-body text-sm">
                        {isHe ? "ללא התחייבות. הפרטים עוברים ישירות אלינו בוואטסאפ." : "No obligation. Details go directly to us via WhatsApp."}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-body font-semibold text-muted-foreground mb-1.5">
                            {isHe ? "שם מלא *" : "Full name *"}
                          </label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={set("name")}
                            placeholder={isHe ? "ישראל ישראלי" : "John Smith"}
                            className={inputBase}
                            autoComplete="name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-body font-semibold text-muted-foreground mb-1.5">
                            {isHe ? "טלפון *" : "Phone *"}
                          </label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={set("phone")}
                            placeholder="050-000-0000"
                            className={inputBase}
                            autoComplete="tel"
                            dir="ltr"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-body font-semibold text-muted-foreground mb-1.5">
                          {isHe ? "כתובת הנכס *" : "Property address *"}
                        </label>
                        <input
                          type="text"
                          value={form.address}
                          onChange={set("address")}
                          placeholder={isHe ? "רחוב המייסדים 12, זכרון יעקב" : "12 HaMeyasdim St, Zichron Yaakov"}
                          className={inputBase}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-body font-semibold text-muted-foreground mb-1.5">
                          {isHe ? "סוג הנכס" : "Property type"}
                        </label>
                        <select value={form.type} onChange={set("type")} className={inputBase}>
                          <option value="">{isHe ? "בחרו סוג..." : "Select type..."}</option>
                          {types.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-body font-semibold text-muted-foreground mb-1.5">
                          {isHe ? "פרטים נוספים (אופציונלי)" : "Additional notes (optional)"}
                        </label>
                        <textarea
                          value={form.notes}
                          onChange={set("notes")}
                          rows={2}
                          placeholder={isHe ? "גודל הנכס, שנת בנייה, נוף, שיפוצים..." : "Size, build year, view, renovations..."}
                          className={`${inputBase} resize-none`}
                        />
                      </div>

                      {error && (
                        <p className="text-sm text-destructive font-body">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-charcoal hover:bg-charcoal-hover text-white py-4 rounded-xl font-body font-semibold text-sm transition-all hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {submitting
                          ? (isHe ? "שולח..." : "Sending...")
                          : (isHe ? "קבלו הערכת שווי חינם" : "Get free valuation")}
                        {!submitting && <Arrow className="w-4 h-4" />}
                      </button>

                      <p className="text-xs text-muted-foreground font-body text-center leading-relaxed">
                        {isHe
                          ? "הפרטים ישלחו ישירות אלינו בוואטסאפ. ללא תשלום, ללא התחייבות, ללא ספאם."
                          : "Details sent directly to us via WhatsApp. No payment, no commitment, no spam."}
                      </p>
                    </form>
                  </>
                )}
              </div>

              {/* Social proof beneath form */}
              <div className="mt-4 flex items-center justify-center gap-6 text-xs font-body text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{isHe ? "ללא עלות" : "Free"}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{isHe ? "ללא התחייבות" : "No obligation"}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-muted-foreground/50" />{isHe ? "תגובה תוך 24 שעות" : "24h response"}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Market context strip ──────────────────────────────────────────── */}
      <section className="mt-20 py-12 bg-card border-y border-border">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground text-center mb-8">
              {isHe ? "למה מחיר בזכרון יעקב הוא לא מספר — הוא ידע" : "Why pricing in Zichron Yaakov is knowledge, not a number"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  he: "נוף לים מוסיף 10–20% לשווי הנכס",
                  en: "Sea view adds 10–20% to a property's value",
                  noteHe: "הבדל בין שני נכסים זהים באותה שכונה",
                  noteEn: "The gap between two identical units in the same neighborhood",
                },
                {
                  he: "הפרש עד 40% בין שכונות על מ\"ר זהה",
                  en: "Up to 40% price gap between neighborhoods per m²",
                  noteHe: "נווה רמז מול רמת צבי, שטח ומצב שווה",
                  noteEn: "Neve Remez vs. Ramat Zvi, same size and condition",
                },
                {
                  he: "נכסים מבוקשים לא מגיעים ליד2",
                  en: "The best properties never reach Yad2",
                  noteHe: "נמכרים שקטות דרך קשרים מקומיים",
                  noteEn: "Sold quietly through local relationships",
                },
              ].map(({ he, en, noteHe, noteEn }) => (
                <div key={en} className="text-center">
                  <p className="font-display font-semibold text-foreground text-lg mb-1">{isHe ? he : en}</p>
                  <p className="text-xs font-body text-muted-foreground">{isHe ? noteHe : noteEn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FAQSection
        title={isHe ? "שאלות נפוצות על הערכת שווי" : "Frequently Asked Questions"}
        items={isHe ? FAQ_HE : FAQ_EN}
        emitSchema={false}
      />

      {/* ── Related links ─────────────────────────────────────────────────── */}
      <section className="py-10 border-t border-border">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-body text-muted-foreground mb-4">
              {isHe ? "מידע נוסף שיעזור לכם" : "More information"}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm font-body">
              <Link href={`/${lang}/zichron-yaakov-neighborhoods`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "מדריך שכונות זכרון יעקב" : "Zichron Yaakov Neighborhood Guide"}
              </Link>
              <span className="text-border">·</span>
              <Link href={`/${lang}/zichron-yaakov-real-estate-market-2026`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "דוח שוק 2026" : "Market Report 2026"}
              </Link>
              <span className="text-border">·</span>
              <Link href={`/${lang}/properties`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "נכסים למכירה" : "Properties for Sale"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PropertyValuation;
