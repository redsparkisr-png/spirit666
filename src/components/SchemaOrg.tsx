"use client";

const SITE_URL = "https://spiritisraelhomes.com";

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
  document.querySelectorAll('script[data-schema-org="property"]').forEach((el) => el.remove());

  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description || property.title,
    url: `${SITE_URL}/en/property/${property.slug}`,
    datePosted: new Date().toISOString().split("T")[0],
  };

  if (property.images?.length) schema.image = property.images;

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
  if (property.builtSqm) floorSize.push({ "@type": "QuantitativeValue", value: property.builtSqm, unitCode: "MTK", name: "Built area" });
  if (property.lotSqm) floorSize.push({ "@type": "QuantitativeValue", value: property.lotSqm, unitCode: "MTK", name: "Lot area" });
  if (floorSize.length) schema.floorSize = floorSize;

  if (property.bedrooms) schema.numberOfRooms = property.bedrooms;

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-schema-org", "property");
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

export default function SchemaOrg() {
  return null;
}
