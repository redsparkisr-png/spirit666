import type { Metadata } from "next";
import CookiePolicy from "@/views/CookiePolicy";

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he" ? 'מדיניות עוגיות | ספיריט נדל"ן' : "Cookie Policy | Spirit Real Estate";
  const url = `${SITE}/${l}/cookies`;
  return { title, alternates: { canonical: url } };
}

export default function CookiesPage() {
  return <CookiePolicy />;
}
