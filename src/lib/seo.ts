/**
 * SEO JSON-LD helpers — pure data builders, no React.
 */

const SITE = "https://spirit666.lovable.app";

export interface Crumb {
  name: string;
  path: string; // e.g. "/en/properties"
}

/**
 * Build a BreadcrumbList JSON-LD object ready to pass to <PageMeta jsonLd>.
 */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path}`,
    })),
  };
}