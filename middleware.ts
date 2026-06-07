import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_LANGS = ["en", "he"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through CRM — it lives outside the lang prefix
  if (pathname.startsWith("/crm")) {
    return NextResponse.next();
  }

  // If path already starts with a valid lang prefix, pass through
  const firstSegment = pathname.split("/")[1];
  if (VALID_LANGS.includes(firstSegment)) {
    // Set x-lang header so root layout can read it for <html lang>
    const response = NextResponse.next();
    response.headers.set("x-lang", firstSegment);
    return response;
  }

  // Detect preferred language from cookie → Accept-Language header
  const cookieLang = request.cookies.get("preferred_lang")?.value;
  let lang = "en";
  if (cookieLang === "he" || cookieLang === "en") {
    lang = cookieLang;
  } else {
    const acceptLang = request.headers.get("accept-language") || "";
    if (acceptLang.toLowerCase().startsWith("he") || acceptLang.includes(",he")) {
      lang = "he";
    }
  }

  const suffix = pathname === "/" ? "" : pathname;
  return NextResponse.redirect(new URL(`/${lang}${suffix}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|.*\\..*).*)"],
};
