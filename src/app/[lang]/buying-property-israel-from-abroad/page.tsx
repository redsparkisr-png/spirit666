import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeoPageContent, buildMetadata, buildSeoPageJsonLd } from "@/lib/seo";
import SeoLandingPage from "@/components/seo/SeoLandingPage";

export const revalidate = 3600;

const SLUG = "buying-property-israel-from-abroad";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const content = getSeoPageContent(SLUG, lang === "he" ? "he" : "en");
  if (!content) return {};
  return buildMetadata(content);
}

export default async function BuyingPropertyAbroadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = getSeoPageContent(SLUG, lang === "he" ? "he" : "en");
  if (!content) notFound();

  const jsonLd = buildSeoPageJsonLd(content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeoLandingPage content={content} />
    </>
  );
}
