import type { Metadata } from "next";
import { getSeoPageContent, buildMetadata, buildSeoPageJsonLd } from "@/lib/seo";
import SeoLandingPage from "@/components/seo/SeoLandingPage";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const content = getSeoPageContent("homes-for-sale-zichron-yaakov", l);
  if (!content) return {};
  return buildMetadata(content);
}

export default async function HomesForSalePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const content = getSeoPageContent("homes-for-sale-zichron-yaakov", l);
  if (!content) return null;

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
