import { notFound } from "next/navigation";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import CookieNotice from "@/components/CookieNotice";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import Providers from "@/providers/Providers";
import { fetchSiteContentServer } from "@/lib/site-content-server";

const VALID_LANGS = ["en", "he"];

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!VALID_LANGS.includes(lang)) notFound();

  const validLang = lang as "en" | "he";

  // Prefetch the CMS-driven site copy on the server so translated text
  // (headings, nav, footer, etc.) is present in the initial HTML for SEO,
  // instead of showing raw translation keys before the client query resolves.
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["site_content"],
    queryFn: fetchSiteContentServer,
  });

  return (
    <Providers initialLang={validLang} dehydratedState={dehydrate(queryClient)}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg font-body text-sm"
      >
        {validLang === "he" ? "דלג לתוכן" : "Skip to content"}
      </a>
      <div id="main-content">{children}</div>
      <CookieNotice />
      <AccessibilityWidget />
    </Providers>
  );
}
