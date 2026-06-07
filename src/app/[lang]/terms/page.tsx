import type { Metadata } from "next";
import Terms from "@/views/Terms";

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he" ? 'תנאי שימוש | ספיריט נדל"ן' : "Terms of Use | Spirit Real Estate";
  const url = `${SITE}/${l}/terms`;
  return { title, alternates: { canonical: url } };
}

export default function TermsPage() {
  return <Terms />;
}
