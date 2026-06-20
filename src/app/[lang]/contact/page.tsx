import type { Metadata } from "next";
import Contact from "@/views/Contact";

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he" ? 'צור קשר | ספיריט נדל"ן' : "Contact | Spirit Real Estate";
  const description = l === "he"
    ? 'פנו לספיריט נדל"ן לפניות בנושא נכסים בזכרון יעקב.'
    : "Get in touch with Spirit Real Estate for property inquiries in Zichron Yaakov.";
  const url = `${SITE}/${l}/contact`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/contact`, he: `${SITE}/he/contact`, "x-default": `${SITE}/en/contact` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

export default function ContactPage() {
  return <Contact />;
}
