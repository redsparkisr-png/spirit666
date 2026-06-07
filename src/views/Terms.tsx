"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import PageMeta from "@/components/PageMeta";

const Terms = () => {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={lang === "he" ? "תנאי שימוש | ספיריט נדל\"ן" : "Terms of Use | Spirit Real Estate"}
        description={lang === "he" ? "תנאי השימוש באתר ספיריט נדל\"ן בזכרון יעקב." : "Terms of use for the Spirit Real Estate website in Zichron Yaakov."}
      />
      <div className="container px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <Link href={`/${lang}/`} className="text-primary font-body text-sm hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-foreground mb-8">Terms of Use</h1>

        <div className="prose prose-neutral font-body space-y-6 text-foreground/80 text-[15px] leading-relaxed">
          <p><strong>Last updated:</strong> {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>

          <h2 className="text-xl font-display font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by these Terms of Use. If you do not agree, please do not use this website.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">2. Website Purpose</h2>
          <p>This website is operated by Spirit Real Estate for informational purposes. Property listings, descriptions, and images are provided for general guidance only and do not constitute a binding offer.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">3. Accuracy of Information</h2>
          <p>While we strive to ensure all information on this website is accurate and up-to-date, Spirit Real Estate makes no warranties or guarantees regarding the completeness, accuracy, or reliability of any content. Property details, availability, and pricing are subject to change without notice.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">4. Intellectual Property</h2>
          <p>All content on this website, including text, images, logos, and design elements, is the property of Spirit Real Estate and is protected by applicable intellectual property laws. Unauthorized reproduction or distribution is prohibited.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">5. Limitation of Liability</h2>
          <p>Spirit Real Estate shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or reliance on its content.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">6. Governing Law</h2>
          <p>These terms are governed by the laws of the State of Israel. Any disputes shall be subject to the exclusive jurisdiction of the courts in Israel.</p>

          <h2 className="text-xl font-display font-semibold text-foreground">7. Contact</h2>
          <p>For questions regarding these terms, please contact Spirit Real Estate at <a href="mailto:spiritisraelhomes@gmail.com" className="text-primary hover:underline">spiritisraelhomes@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
