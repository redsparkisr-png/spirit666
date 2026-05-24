import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n";

const NotFound = () => {
  const location = useLocation();
  const { lang } = useLanguage();
  const isHe = lang === "he";

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const t = {
    code: "404",
    title: isHe ? "הדף שחיפשת לא נמצא" : "Page not found",
    sub: isHe
      ? "ייתכן שהקישור פג תוקף, או שהנכס כבר נמכר. אנחנו כאן בשבילך."
      : "The link may have expired, or the property has been sold. We're here to help.",
    home: isHe ? "חזרה לעמוד הבית" : "Back to home",
    whatsapp: isHe ? "דברו איתנו ב-WhatsApp" : "Chat with us on WhatsApp",
  };

  const homeHref = `/${lang}`;
  const waHref = "https://wa.me/972522820632";

  return (
    <main
      dir={isHe ? "rtl" : "ltr"}
      className="min-h-screen bg-background flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-xl text-center">
        <div className="font-display text-gold text-[120px] md:text-[160px] leading-none tracking-tight mb-2">
          {t.code}
        </div>
        <div className="w-16 h-px bg-gold/60 mx-auto mb-6" />
        <h1 className="font-display text-foreground mb-4">{t.title}</h1>
        <p className="font-body text-muted-foreground mb-10 text-balance">{t.sub}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={homeHref}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-body text-sm tracking-wide hover:bg-primary/90 transition-colors"
          >
            {t.home}
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gold/60 text-foreground font-body text-sm tracking-wide hover:bg-gold/10 transition-colors"
          >
            {t.whatsapp}
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
