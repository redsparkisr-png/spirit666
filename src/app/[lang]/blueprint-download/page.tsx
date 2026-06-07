import type { Metadata } from "next";
import BlueprintDownload from "@/views/BlueprintDownload";

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he" ? 'הורדת מדריך הרוכשים | ספיריט נדל"ן' : "Download Buyer Blueprint | Spirit Real Estate";
  const description = l === "he"
    ? "הורידו את המדריך המקיף לרוכשי דירות בזכרון יעקב — חינם."
    : "Download the complete Zichron Yaakov Buyer Blueprint — free.";
  return {
    title,
    description,
    robots: { index: false },
  };
}

export default function BlueprintDownloadPage() {
  return <BlueprintDownload />;
}
