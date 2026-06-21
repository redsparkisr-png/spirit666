const STORAGE_KEY = "spirit_attribution_v1";
const MAX_PARAM_LEN = 500;

interface TouchPoint {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
  ts?: string;
}

interface Attribution {
  first: TouchPoint;
  last: TouchPoint;
}

function cap(v: string | null | undefined): string | undefined {
  if (!v) return undefined;
  const s = v.slice(0, MAX_PARAM_LEN);
  return s || undefined;
}

function currentTouchPoint(): TouchPoint {
  const p = new URLSearchParams(window.location.search);
  const tp: TouchPoint = {};
  const set = (key: keyof TouchPoint, val: string | null | undefined) => {
    const c = cap(val);
    if (c) (tp as Record<string, string>)[key] = c;
  };
  set("utm_source", p.get("utm_source"));
  set("utm_medium", p.get("utm_medium"));
  set("utm_campaign", p.get("utm_campaign"));
  set("utm_content", p.get("utm_content"));
  set("utm_term", p.get("utm_term"));
  set("gclid", p.get("gclid"));
  set("fbclid", p.get("fbclid"));
  set("landing_page", window.location.href);
  set("referrer", document.referrer || undefined);
  tp.ts = new Date().toISOString();
  return tp;
}

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const tp = currentTouchPoint();
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored: Attribution = raw ? (JSON.parse(raw) as Attribution) : { first: {}, last: {} };
    const next: Attribution = {
      first: stored.first.ts ? stored.first : tp,
      last: tp,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage blocked (private mode, storage full) — proceed without attribution
  }
}

export interface AttributionPayload {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
}

export function readAttribution(): AttributionPayload {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const stored = JSON.parse(raw) as Attribution;
    // Last-touch UTMs/click IDs; first-touch landing_page (the page that originally brought the user)
    const { utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, fbclid, referrer } = stored.last;
    const landing_page = stored.first.landing_page;
    return { utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, fbclid, referrer, landing_page };
  } catch {
    return {};
  }
}
