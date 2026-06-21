import React from "react";
import Link from "next/link";
import { BedDouble, Ruler, LandPlot, Bath, Car, Shield, MapPin, ChevronRight } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import Header from "@/components/Header";
import { optimizedImageUrl } from "@/lib/image";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyInquiryForm from "@/components/property/PropertyInquiryForm";
import PropertyStickyBar from "@/components/property/PropertyStickyBar";
import PropertyViewTracker from "@/components/property/PropertyViewTracker";

type Property = Tables<"properties_available">;

type Props = {
  property: Property | null;
  similar: Property[];
  lang: string;
};

const TAG_STYLES: Record<string, string> = {
  "Sea View": "bg-sky-100 text-sky-700 border-sky-200",
  "Garden": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Renovated": "bg-amber-100 text-amber-700 border-amber-200",
  "New Listing": "bg-rose-100 text-rose-700 border-rose-200",
  "Exclusive Listing": "bg-violet-100 text-violet-700 border-violet-200",
  "Balcony": "bg-blue-100 text-blue-700 border-blue-200",
  "Pool": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Parking": "bg-slate-100 text-slate-700 border-slate-200",
};
const getTagStyle = (tag: string) => TAG_STYLES[tag] || "bg-muted text-muted-foreground border-border";

const t = (en: string, he: string, isHe: boolean) => (isHe ? he : en);

const PropertyDetail = ({ property, similar, lang }: Props) => {
  const isHe = lang === "he";

  if (!property) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container px-6 py-20 text-center">
          <h1 className="text-2xl font-display font-semibold text-foreground mb-4">
            {t("Property not found", "הנכס לא נמצא", isHe)}
          </h1>
          <Link href={`/${lang}/properties`} className="text-charcoal underline font-body text-sm">
            {t("Back to listings", "חזרה לנכסים", isHe)}
          </Link>
        </div>
      </main>
    );
  }

  const tags = property.tags || [];

  type StatItem = { icon: React.ElementType; value: string | number; label: string };
  const detailStats = (
    [
      property.bedrooms ? { icon: BedDouble, value: property.bedrooms, label: t("Rooms", "חדרים", isHe) } : null,
      property.bathrooms ? { icon: Bath, value: property.bathrooms, label: t("Bathrooms", "חדרי רחצה", isHe) } : null,
      property.built_sqm ? { icon: Ruler, value: `${property.built_sqm} m²`, label: t("Built", 'מ"ר בנוי', isHe) } : null,
      property.lot_sqm ? { icon: LandPlot, value: `${property.lot_sqm} m²`, label: t("Lot", 'מ"ר מגרש', isHe) } : null,
      property.parking ? { icon: Car, value: property.parking, label: t("Parking", "חניה", isHe) } : null,
      property.mamad ? { icon: Shield, value: t("Yes", "כן", isHe), label: t('Mamad', 'ממ"ד', isHe) } : null,
    ] as (StatItem | null)[]
  ).filter((s): s is StatItem => s !== null);

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />

      {/* Invisible tracker — fires property_view GA4 event once per page load */}
      <PropertyViewTracker slug={property.slug || property.id} title={property.title} lang={lang} />

      {/* Gallery — client island (carousel, thumbnails, lightbox) */}
      <PropertyGallery property={property} lang={lang} />

      <div className="container px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Main content column */}
          <article className="lg:col-span-2 space-y-8">

            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm font-body text-muted-foreground flex-wrap mb-4">
                <li>
                  <Link href={`/${lang}/`} className="hover:text-foreground transition-colors">
                    {t("Home", "דף הבית", isHe)}
                  </Link>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 rtl:rotate-180" aria-hidden="true" />
                  <Link href={`/${lang}/properties`} className="hover:text-foreground transition-colors">
                    {t("Properties", "נכסים", isHe)}
                  </Link>
                </li>
                <li className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 rtl:rotate-180" aria-hidden="true" />
                  <span className="text-foreground font-medium">{property.title}</span>
                </li>
              </ol>
            </nav>

            {/* H1, location, tags, price */}
            <section aria-label={t("Property overview", "סקירת נכס", isHe)}>
              <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">
                {property.title}
              </h1>
              {property.location && (
                <p className="flex items-center gap-1.5 text-muted-foreground font-body text-sm mb-4">
                  <MapPin className="w-4 h-4 text-gold" aria-hidden="true" />
                  {property.location}
                  {property.neighborhood_note ? ` — ${property.neighborhood_note}` : ""}
                </p>
              )}
              {tags.length > 0 && (
                <ul className="flex flex-wrap gap-2 list-none p-0 mb-4" aria-label={t("Property features", "מאפייני הנכס", isHe)}>
                  {tags.map((tag) => (
                    <li key={tag}>
                      <span className={`text-xs font-body font-semibold px-3 py-1 rounded-full border ${getTagStyle(tag)}`}>
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {property.price_label ? (
                <p className="text-2xl font-display font-semibold bg-gradient-to-r from-gold to-gold-hover bg-clip-text text-transparent">
                  {property.price_label}
                </p>
              ) : (
                <p className="text-lg font-body text-muted-foreground italic">
                  {t("Price upon request", "מחיר לפי בקשה", isHe)}
                </p>
              )}
            </section>

            {/* Stats grid */}
            {detailStats.length > 0 && (
              <section aria-label={t("Property details", "פרטי הנכס", isHe)}>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {detailStats.map((stat, idx) => (
                    <div key={idx} className="bg-card rounded-xl p-3 md:p-4 text-center border border-border">
                      <stat.icon className="w-5 h-5 mx-auto mb-1.5 text-charcoal" aria-hidden="true" />
                      <p className="font-display font-semibold text-foreground text-sm">{stat.value}</p>
                      <p className="text-[10px] text-muted-foreground font-body">{stat.label}</p>
                    </div>
                  ))}
                </div>
                {!!property.bedrooms && (
                  <p className="text-[11px] text-muted-foreground/60 font-body mt-2">
                    {t(
                      "In Israel, room count usually includes the living room.",
                      "ספירת חדרים כוללת בדרך כלל את הסלון, כנהוג בישראל.",
                      isHe
                    )}
                  </p>
                )}
              </section>
            )}

            {/* Descriptions */}
            {(property.short_description || property.full_description) && (
              <section aria-label={t("Property description", "תיאור הנכס", isHe)}>
                {property.short_description && (
                  <div className="mb-6">
                    <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                      {t("Overview", "סקירה", isHe)}
                    </h2>
                    <p className="text-muted-foreground font-body leading-relaxed">{property.short_description}</p>
                  </div>
                )}
                {property.full_description && (
                  <div>
                    <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                      {t("Full Description", "תיאור מלא", isHe)}
                    </h2>
                    <div className="text-muted-foreground font-body leading-relaxed whitespace-pre-line">
                      {property.full_description}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Neighborhood */}
            {(property.location || property.neighborhood_note) && (
              <section
                aria-label={t("About the neighborhood", "על השכונה", isHe)}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="text-xl font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold" aria-hidden="true" />
                  {t("About the Neighborhood", "על השכונה", isHe)}
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {property.neighborhood_note || t(
                    `${property.location} is a sought-after area in Zichron Yaakov with a warm community and excellent accessibility.`,
                    `${property.location} הוא אזור מבוקש בזכרון יעקב עם קהילה חמה ונגישות מצוינת.`,
                    isHe
                  )}
                </p>
                {property.google_maps_url && (
                  <a
                    href={property.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-gold hover:text-gold-hover font-body text-sm mt-3 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {t("View on Map", "הצג במפה", isHe)}
                  </a>
                )}
              </section>
            )}

            {/* FOMO banner */}
            <div className="bg-bronze/10 border border-bronze/20 rounded-lg px-5 py-3">
              <p className="text-sm text-bronze font-body italic">
                {t(
                  "Premium properties in this area don't stay available long.",
                  "נכסי פרימיום באזור הזה לא נשארים זמינים לאורך זמן.",
                  isHe
                )}
              </p>
            </div>

            {/* Mobile inquiry section — client island */}
            <section id="inquiry-form-mobile" className="bg-card rounded-2xl border border-border p-6 space-y-5 shadow-sm">
              <h3 className="font-display font-semibold text-foreground text-lg">
                {t("Interested in this home?", "מתעניינים בנכס הזה?", isHe)}
              </h3>
              <PropertyInquiryForm property={property} lang={lang} variant="mobile" />
            </section>

            {/* Similar properties */}
            {similar.length > 0 && (
              <section aria-label={t("Similar properties", "נכסים דומים", isHe)} className="pt-4">
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                  {t("Similar Properties", "נכסים דומים", isHe)}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similar.map((sp) => {
                    const alt = isHe
                      ? `${sp.title}${sp.location ? ` ב${sp.location}` : ""}, זכרון יעקב`
                      : `${sp.title}${sp.location ? ` in ${sp.location}` : ""}, Zichron Yaakov`;
                    return (
                      <Link
                        key={sp.id}
                        href={`/${lang}/property/${sp.slug || sp.id}`}
                        className="group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <div className="aspect-[4/3] bg-muted overflow-hidden">
                          {sp.images?.[0] ? (
                            <img
                              src={optimizedImageUrl(sp.images[0], { width: 600, quality: 75 })}
                              alt={alt}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted" />
                          )}
                        </div>
                        <div className="p-3">
                          <p className="font-display font-semibold text-foreground text-sm truncate">{sp.title}</p>
                          {sp.price_label && (
                            <p className="text-xs text-gold font-body mt-1">{sp.price_label}</p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Internal links */}
            <nav aria-label={t("Explore more", "עמודים נוספים", isHe)} className="pt-2 border-t border-border">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none p-0">
                <li>
                  <Link
                    href={`/${lang}/properties`}
                    className="text-sm font-body text-gold hover:text-gold-hover transition-colors underline-offset-2 hover:underline"
                  >
                    {t("All properties for sale", "כל הנכסים למכירה", isHe)}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${lang}/homes-for-sale-zichron-yaakov`}
                    className="text-sm font-body text-gold hover:text-gold-hover transition-colors underline-offset-2 hover:underline"
                  >
                    {t("Homes for sale – Zichron Yaakov", "דירות למכירה – זכרון יעקב", isHe)}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${lang}/contact`}
                    className="text-sm font-body text-gold hover:text-gold-hover transition-colors underline-offset-2 hover:underline"
                  >
                    {t("Contact us", "צרו קשר", isHe)}
                  </Link>
                </li>
              </ul>
            </nav>
          </article>

          {/* Sidebar — desktop only */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-20 space-y-4">
              <div id="inquiry-form" className="bg-card rounded-2xl border border-border p-5 md:p-6 space-y-4 shadow-sm">
                <h3 className="font-display font-semibold text-foreground text-lg">
                  {t("Request Private Details", "בקשת פרטים", isHe)}
                </h3>
                {/* Client island — sidebar inquiry form */}
                <PropertyInquiryForm property={property} lang={lang} variant="sidebar" />
              </div>

              {/* Trust reassurance block */}
              <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
                <p className="font-display font-semibold text-foreground text-sm">
                  {t("What happens after you contact us?", "מה קורה אחרי שמשאירים פרטים?", isHe)}
                </p>
                <ul className="space-y-2 list-none p-0">
                  {(isHe ? [
                    "אנחנו בודקים את הפנייה באופן אישי.",
                    "נוודא אם הנכס עדיין רלוונטי וזמין.",
                    "נוכל לשלוח כתובת מדויקת, סיור וידאו או פרטים נוספים כשמתאים.",
                    "אם הנכס לא מדויק, נציע חלופות רלוונטיות.",
                  ] : [
                    "We review your request personally.",
                    "We confirm whether the property is still available.",
                    "We can share the exact address, video tour, or private details when appropriate.",
                    "We can suggest similar homes if this one is not the right fit.",
                  ]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs font-body text-muted-foreground leading-relaxed">
                      <span className="text-gold mt-0.5 shrink-0" aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[11px] text-muted-foreground/60 font-body text-center">
                {t("Your details are kept confidential.", "פרטיכם נשמרים בסודיות.", isHe)}
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky bar — client island */}
      <PropertyStickyBar property={property} lang={lang} />
    </main>
  );
};

export default PropertyDetail;
