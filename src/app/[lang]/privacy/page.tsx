import type { Metadata } from "next";
import Privacy from "@/views/Privacy";

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he" ? 'מדיניות פרטיות | ספיריט נדל"ן' : "Privacy Policy | Spirit Real Estate";
  const url = `${SITE}/${l}/privacy`;
  return { title, alternates: { canonical: url } };
}

export default function PrivacyPage() {
  return <Privacy />;
}
