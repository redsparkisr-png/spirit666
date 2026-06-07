import type { Metadata } from "next";
import Accessibility from "@/views/Accessibility";

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he" ? 'הצהרת נגישות | ספיריט נדל"ן' : "Accessibility Statement | Spirit Real Estate";
  const description = l === "he" ? "המחויבות שלנו לנגישות דיגיטלית לפי תקן 5568 ו-WCAG 2.1 AA." : "Our commitment to digital accessibility — WCAG 2.1 AA and Israeli Standard 5568.";
  const url = `${SITE}/${l}/accessibility`;
  return { title, description, alternates: { canonical: url } };
}

export default function AccessibilityPage() {
  return <Accessibility />;
}
