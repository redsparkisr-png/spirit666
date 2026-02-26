import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import spiritLogo from "@/assets/spirit-logo.jpg";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { lang, setLang } = useLanguage();
  const { t } = useSiteContent();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const switchLang = (newLang: "en" | "he") => {
    const path = location.pathname.replace(/^\/(en|he)/, "");
    setLang(newLang);
    navigate(`/${newLang}${path || "/"}`);
    setMenuOpen(false);
  };

  const prefix = `/${lang}`;

  const navLinks = [
    { to: prefix + "/", label: t("header.nav.home") },
    { to: prefix + "/#available-homes", label: t("header.nav.properties") },
    { to: prefix + "/privacy", label: t("header.nav.privacy") },
    { to: prefix + "/terms", label: t("header.nav.terms") },
    { to: prefix + "/accessibility", label: t("header.nav.accessibility") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container px-6 py-3 flex items-center justify-between">
        <Link to={prefix + "/"} className="flex items-center gap-3">
          <img src={spiritLogo} alt="Spirit Real Estate" className="w-10 h-10 rounded-lg" />
          <div className="hidden sm:block">
            <p className="font-display font-semibold text-foreground text-sm leading-tight">Spirit Real Estate</p>
            <p className="text-[11px] text-muted-foreground font-body">{t("header.tagline")}</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-1 border-s border-border ps-4">
            <button
              onClick={() => switchLang("he")}
              className={`text-xs font-body font-medium px-2 py-1 rounded transition-colors ${
                lang === "he" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              HE
            </button>
            <button
              onClick={() => switchLang("en")}
              className={`text-xs font-body font-medium px-2 py-1 rounded transition-colors ${
                lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <button
              onClick={() => switchLang("he")}
              className={`text-xs font-body font-medium px-3 py-1.5 rounded ${
                lang === "he" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              HE
            </button>
            <button
              onClick={() => switchLang("en")}
              className={`text-xs font-body font-medium px-3 py-1.5 rounded ${
                lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
