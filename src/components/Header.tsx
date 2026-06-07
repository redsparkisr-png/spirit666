"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import spiritLogo from "@/assets/spirit-logo.jpg";
import React, { useState, forwardRef } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const Header = forwardRef<HTMLElement, Record<string, never>>((_props, ref) => {
  const { lang, setLang } = useLanguage();
  const { t } = useSiteContent();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const switchLang = (newLang: "en" | "he") => {
    const path = (pathname || "").replace(/^\/(en|he)/, "");
    setLang(newLang);
    router.push(`/${newLang}${path || "/"}`);
    setOpen(false);
  };

  const prefix = `/${lang}`;

  const isHe = lang === "he";
  const navLinks = [
    { href: prefix + "/", label: t("header.nav.home") },
    { href: prefix + "/properties", label: t("header.nav.properties") },
    { href: prefix + "/guides", label: isHe ? "בלוג" : "Blog" },
    { href: prefix + "/sell", label: t("header.nav.sell") },
    { href: prefix + "/about", label: t("header.nav.about") },
    { href: prefix + "/contact", label: t("header.nav.contact") },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== prefix + "/" && (pathname || "").startsWith(href));

  return (
    <header ref={ref} className="sticky top-0 z-50 bg-primary border-b border-white/10">
      <div className="container px-5 flex items-center justify-between" style={{ minHeight: 72, paddingTop: 8, paddingBottom: 8 }}>
        {/* Left: hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="text-white/80 hover:text-white transition-colors"
              aria-label={lang === "he" ? "פתח תפריט" : "Open menu"}
            >
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side={lang === "he" ? "right" : "left"}
            className="bg-primary border-white/10 w-[85%] max-w-sm p-0"
          >
            <SheetTitle className="sr-only">{lang === "he" ? "תפריט ניווט" : "Navigation menu"}</SheetTitle>
            <SheetDescription className="sr-only">{lang === "he" ? "ניווט ראשי ובחירת שפה" : "Main navigation and language selection"}</SheetDescription>
            <div className="flex flex-col h-full pt-16 px-8">
              <nav className="flex flex-col gap-1" role="navigation" aria-label="Main navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-white/70 hover:text-white font-body text-base py-4 border-b border-white/5 transition-colors relative ${
                      isActive(link.href) ? "text-white" : ""
                    }`}
                    style={
                      isActive(link.href)
                        ? {
                            borderInlineStartColor: "hsl(var(--gold))",
                            borderInlineStartWidth: 3,
                            paddingInlineStart: 12,
                          }
                        : undefined
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pb-8">
                <div className="flex items-center gap-2 pt-6 border-t border-white/10">
                  <button
                    onClick={() => switchLang("he")}
                    className={`text-sm font-body font-medium px-3 py-1.5 rounded transition-colors ${
                      lang === "he" ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    HE
                  </button>
                  <button
                    onClick={() => switchLang("en")}
                    className={`text-sm font-body font-medium px-3 py-1.5 rounded transition-colors ${
                      lang === "en" ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Center: logo */}
        <Link href={prefix + "/"} className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <img
            src={spiritLogo.src ?? (spiritLogo as unknown as string)}
            alt="Spirit Real Estate"
            className="w-auto h-[52px] md:h-[60px] rounded-md"
            style={{
              imageRendering: "-webkit-optimize-contrast" as React.CSSProperties["imageRendering"],
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Right: language toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => switchLang("he")}
            className={`text-xs font-body font-medium px-2.5 py-1.5 rounded transition-colors ${
              lang === "he" ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
            }`}
          >
            HE
          </button>
          <span className="text-white/20 text-xs">|</span>
          <button
            onClick={() => switchLang("en")}
            className={`text-xs font-body font-medium px-2.5 py-1.5 rounded transition-colors ${
              lang === "en" ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
