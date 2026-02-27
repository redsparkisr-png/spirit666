import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Spirit Real Estate",
  description: "Boutique real estate firm in Zichron Yaakov, Israel — strategic advisory, local expertise, and personal representation.",
  url: "https://spirit-homes-guide.lovable.app",
  areaServed: {
    "@type": "Place",
    name: "Zichron Yaakov, Israel",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zichron Yaakov",
    addressCountry: "IL",
  },
};

const BREADCRUMB_BASE = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
};

const ROUTE_NAMES: Record<string, string> = {
  "": "Home",
  properties: "Properties",
  sell: "Sell",
  about: "About",
  contact: "Contact",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  accessibility: "Accessibility",
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

    // Breadcrumb schema
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const lang = pathSegments[0] || "en";
    const page = pathSegments[1] || "";

    const breadcrumbItems = [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://spirit-homes-guide.lovable.app/${lang}/` },
    ];

    if (page && ROUTE_NAMES[page]) {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: ROUTE_NAMES[page],
        item: `https://spirit-homes-guide.lovable.app/${lang}/${page}`,
      });
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
