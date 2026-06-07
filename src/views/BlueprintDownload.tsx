"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import { Download, ArrowRight } from "lucide-react";

const BlueprintDownload = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const prefix = `/${lang}`;

  // Set noindex
  useEffect(() => {
    let tag = document.querySelector('meta[name="robots"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", "noindex, nofollow");
    document.title = isHe ? "מדריך הקונה — ספיריט נדל\"ן" : "Buyer Blueprint — Spirit Real Estate";

    return () => {
      tag?.setAttribute("content", "index, follow");
    };
  }, [isHe]);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-20 md:py-32 bg-background">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Download className="w-7 h-7 text-primary" />
            </div>

            <h1 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "מדריך הקונה לזכרון יעקב" : "Your Zichron Yaakov Buyer Blueprint"}
            </h1>

            <p className="text-muted-foreground font-body text-lg mb-10 max-w-md mx-auto">
              {isHe
                ? "תודה שביקשתם את המדריך. המדריך הקצר הזה יעזור לכם להבין איך רוכשים נכס בזכרון יעקב לפני שמקבלים החלטה."
                : "Thanks for requesting the guide. This short blueprint will help you understand how property buying works in Zichron Yaakov before making a decision."}
            </p>

            {/* Download button — PDF to be uploaded later via admin */}
            <button
              disabled
              className="inline-flex items-center gap-2 bg-charcoal text-white py-4 px-8 rounded-lg font-body font-semibold transition-all duration-300 opacity-60 cursor-not-allowed mb-4"
              style={{ fontSize: "17px" }}
              title={isHe ? "המדריך יהיה זמין בקרוב" : "Blueprint coming soon"}
            >
              <Download className="w-5 h-5" />
              {isHe ? "הורידו את המדריך" : "Download the Blueprint"}
            </button>
            <p className="text-xs text-muted-foreground font-body italic mb-16">
              {isHe ? "המדריך יהיה זמין בקרוב" : "PDF will be available soon"}
            </p>

            {/* Secondary CTA */}
            <div className="border-t border-border pt-10">
              <h2 className="font-display font-semibold text-foreground mb-4 text-xl">
                {isHe ? "מחפשים בתים בזכרון יעקב?" : "Looking for Homes in Zichron Yaakov?"}
              </h2>
              <Link
                href={`${prefix}/properties`}
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-primary-foreground py-4 px-8 rounded-lg font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{ fontSize: "17px" }}
              >
                {isHe ? "צפו בנכסים זמינים" : "View Available Properties"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default BlueprintDownload;
