import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import spiritLogo from "@/assets/spirit-logo.jpg";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const { lang, setLang } = useLanguage();
  const { t } = useSiteContent();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const switchLang = (newLang: "en" | "he") => {
    const path = location.pathname.replace(/^\/(en|he)/, "");
    setLang(newLang);
    navigate(`/${newLang}${path || "/"}`);
    setOpen(false);
  };

  const prefix = `/${lang}`;

  const navLinks = [
    { to: prefix + "/", label: t("header.nav.home") },
    { to: prefix + "/properties", label: t("header.nav.properties") },
    { to: prefix + "/sell", label: t("header.nav.sell") },
    { to: prefix + "/about", label: t("header.nav.about") },
    { to: prefix + "/contact", label: t("header.nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-charcoal border-b border-white/10">
      <div className="container px-6 py-3 flex items-center justify-between">
        {/* Left: hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="text-white/80 hover:text-white transition-colors" aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side={lang === "he" ? "right" : "left"} className="bg-charcoal border-white/10 w-72 p-0">
            <div className="flex flex-col h-full pt-16 px-8">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="text-white/70 hover:text-white font-body text-base py-3 border-b border-white/5 transition-colors"
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
                      lang === "he" ? "bg-white/15 text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    HE
                  </button>
                  <button
                    onClick={() => switchLang("en")}
                    className={`text-sm font-body font-medium px-3 py-1.5 rounded transition-colors ${
                      lang === "en" ? "bg-white/15 text-white" : "text-white/50 hover:text-white"
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
        <Link to={prefix + "/"} className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          <img src={spiritLogo} alt="Spirit Real Estate" className="w-9 h-9 rounded-lg" />
          <span className="hidden sm:block font-display font-semibold text-white text-sm tracking-wide">
            Spirit Real Estate
          </span>
        </Link>

        {/* Right: language toggle (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => switchLang("he")}
            className={`text-xs font-body font-medium px-2 py-1 rounded transition-colors ${
              lang === "he" ? "bg-white/15 text-white" : "text-white/40 hover:text-white"
            }`}
          >
            HE
          </button>
          <button
            onClick={() => switchLang("en")}
            className={`text-xs font-body font-medium px-2 py-1 rounded transition-colors ${
              lang === "en" ? "bg-white/15 text-white" : "text-white/40 hover:text-white"
            }`}
          >
            EN
          </button>
        </div>

        {/* Right: language toggle (mobile, visible when drawer is closed) */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={() => switchLang("he")}
            className={`text-xs font-body font-medium px-2 py-1 rounded transition-colors ${
              lang === "he" ? "bg-white/15 text-white" : "text-white/40 hover:text-white"
            }`}
          >
            HE
          </button>
          <button
            onClick={() => switchLang("en")}
            className={`text-xs font-body font-medium px-2 py-1 rounded transition-colors ${
              lang === "en" ? "bg-white/15 text-white" : "text-white/40 hover:text-white"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
