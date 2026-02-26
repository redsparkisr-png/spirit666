import { useEffect } from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useLanguage, type Lang } from "@/lib/i18n";

const VALID_LANGS = ["en", "he"];

const LanguageLayout = () => {
  const { lang: urlLang } = useParams<{ lang: string }>();
  const { setLang, lang, dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (urlLang && VALID_LANGS.includes(urlLang)) {
      setLang(urlLang as Lang);
    }
  }, [urlLang, setLang]);

  // hreflang tags
  useEffect(() => {
    const path = location.pathname.replace(/^\/(en|he)/, "");
    const base = window.location.origin;

    const existing = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existing.forEach((el) => el.remove());

    const enLink = document.createElement("link");
    enLink.rel = "alternate";
    enLink.hreflang = "en";
    enLink.href = `${base}/en${path || "/"}`;
    document.head.appendChild(enLink);

    const heLink = document.createElement("link");
    heLink.rel = "alternate";
    heLink.hreflang = "he";
    heLink.href = `${base}/he${path || "/"}`;
    document.head.appendChild(heLink);

    return () => {
      enLink.remove();
      heLink.remove();
    };
  }, [location.pathname]);

  return (
    <div dir={dir} lang={lang}>
      <Outlet />
    </div>
  );
};

export default LanguageLayout;
