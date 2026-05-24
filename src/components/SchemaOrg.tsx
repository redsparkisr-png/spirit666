import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://spirit666.lovable.app";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness"],
  name: "Spirit Real Estate",
  description: "Boutique real estate firm in Zichron Yaakov, Israel — strategic advisory, local expertise, and personal representation.",
  url: SITE_URL,
  telephone: "+972-52-282-0632",
  email: "info@spiritrealestate.co.il",
  areaServed: {
    "@type": "Place",
    name: "Zichron Yaakov, Israel",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zichron Yaakov",
    addressRegion: "Haifa District",
    addressCountry: "IL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.5714,
    longitude: 34.9533,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$$$",
  image: `${SITE_URL}/favicon.ico`,
  sameAs: [
    "https://wa.me/972522820632",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Spirit Real Estate",
  url: SITE_URL,
  inLanguage: ["en", "he"],
  publisher: { "@type": "Organization", name: "Spirit Real Estate" },
};

const BREADCRUMB_BASE = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
};

const ROUTE_NAMES: Record<string, { en: string; he: string }> = {
  "": { en: "Home", he: "דף הבית" },
  properties: { en: "Properties", he: "נכסים" },
  sell: { en: "Sell", he: "מכירה" },
  about: { en: "About", he: "אודות" },
  contact: { en: "Contact", he: "צור קשר" },
  privacy: { en: "Privacy Policy", he: "מדיניות פרטיות" },
  terms: { en: "Terms of Use", he: "תנאי שימוש" },
  accessibility: { en: "Accessibility", he: "נגישות" },
  cookies: { en: "Cookie Policy", he: "מדיניות עוגיות" },
};

interface PropertySchemaProps {
  title?: string;
  description?: string;
  price?: number;
  currency?: string;
  images?: string[];
  location?: string;
  bedrooms?: number;
  builtSqm?: number;
  lotSqm?: number;
  slug?: string;
}

export const injectPropertySchema = (property: PropertySchemaProps) => {
  // Remove old property schema
  document.querySelectorAll('script[data-schema-org="property"]').forEach((el) => el.remove());

  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description || property.title,
    url: `${SITE_URL}/en/property/${property.slug}`,
    datePosted: new Date().toISOString().split("T")[0],
  };

  if (property.images?.length) {
    schema.image = property.images;
  }

  if (property.price && property.currency) {
    schema.offers = {
      "@type": "Offer",
      price: property.price,
      priceCurrency: property.currency,
      availability: "https://schema.org/InStock",
    };
  }

  if (property.location) {
    schema.contentLocation = {
      "@type": "Place",
      name: property.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: property.location,
        addressRegion: "Haifa District",
        addressCountry: "IL",
      },
    };
  }

  const floorSize: Record<string, any>[] = [];
  if (property.builtSqm) {
    floorSize.push({ "@type": "QuantitativeValue", value: property.builtSqm, unitCode: "MTK", name: "Built area" });
  }
  if (property.lotSqm) {
    floorSize.push({ "@type": "QuantitativeValue", value: property.lotSqm, unitCode: "MTK", name: "Lot area" });
  }

  if (property.bedrooms) {
    schema.numberOfRooms = property.bedrooms;
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-schema-org", "property");
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

const SchemaOrg = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove old schema scripts
    document.querySelectorAll('script[data-schema-org]').forEach((el) => el.remove());

    // Organization schema (always present)
    const orgScript = document.createElement("script");
    orgScript.type = "application/ld+json";
    orgScript.setAttribute("data-schema-org", "organization");
    orgScript.textContent = JSON.stringify(ORGANIZATION_SCHEMA);
    document.head.appendChild(orgScript);

    // WebSite schema (always present)
    const siteScript = document.createElement("script");
    siteScript.type = "application/ld+json";
    siteScript.setAttribute("data-schema-org", "website");
    siteScript.textContent = JSON.stringify(WEBSITE_SCHEMA);
    document.head.appendChild(siteScript);

    // Breadcrumb schema
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const lang = pathSegments[0] || "en";
    const page = pathSegments[1] || "";

    const routeInfo = ROUTE_NAMES[page];
    const pageName = routeInfo ? (lang === "he" ? routeInfo.he : routeInfo.en) : page;

    const breadcrumbItems = [
      { "@type": "ListItem", position: 1, name: lang === "he" ? "דף הבית" : "Home", item: `${SITE_URL}/${lang}/` },
    ];

    if (page && routeInfo) {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: `${SITE_URL}/${lang}/${page}`,
      });
    }

    // Handle property detail breadcrumbs
    if (pathSegments[1] === "property" && pathSegments[2]) {
      breadcrumbItems.push(
        { "@type": "ListItem", position: 2, name: lang === "he" ? "נכסים" : "Properties", item: `${SITE_URL}/${lang}/properties` },
        { "@type": "ListItem", position: 3, name: pathSegments[2].replace(/-/g, " "), item: `${SITE_URL}${location.pathname}` },
      );
    }

    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.setAttribute("data-schema-org", "breadcrumb");
    breadcrumbScript.textContent = JSON.stringify({
      ...BREADCRUMB_BASE,
      itemListElement: breadcrumbItems,
    });
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.querySelectorAll('script[data-schema-org]').forEach((el) => el.remove());
    };
  }, [location.pathname]);

  return null;
};

export default SchemaOrg;
