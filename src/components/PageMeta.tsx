import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

const SITE = "https://spirit666.lovable.app";

type Props = {
  title: string;
  description: string;
  ogType?: "website" | "article";
  ogImage?: string;
  jsonLd?: object | object[];
};

/**
 * Per-route head: title, description, canonical, hreflang (he/en), og:*, optional JSON-LD.
 * Mirrors current path under the alternate language for hreflang.
 */
const PageMeta = ({ title, description, ogType = "website", ogImage, jsonLd }: Props) => {
  const { lang } = useLanguage();
  const { pathname } = useLocation();

  // pathname starts with /he or /en
  const altLang = lang === "he" ? "en" : "he";
  const pathWithoutLang = pathname.replace(/^\/(he|en)/, "") || "/";
  const canonical = `${SITE}/${lang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;
  const altUrl = `${SITE}/${altLang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;

  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <html lang={lang} dir={lang === "he" ? "rtl" : "ltr"} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang={lang} href={canonical} />
      <link rel="alternate" hrefLang={altLang} href={altUrl} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE}/en${pathWithoutLang === "/" ? "" : pathWithoutLang}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={lang === "he" ? "he_IL" : "en_US"} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
};

export default PageMeta;