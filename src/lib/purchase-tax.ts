/**
 * Israel purchase-tax (mas rechisha) brackets and calculator.
 *
 * Figures verified against the Israel Tax Authority schedule in effect
 * 16 Jan 2025 – 15 Jan 2028. The brackets are FROZEN over this window
 * (no annual CPI indexation, per the 2025–2027 budget), so the numbers
 * below are stable until 15 Jan 2028 and do not shift mid-year.
 *
 * The investor / additional-home schedule (8% / 10%) runs under a temporary
 * order through 31 Dec 2026; re-verify before that date.
 *
 * This is an estimate tool, not tax advice. The Oleh (new-immigrant) track is
 * intentionally NOT computed here: its thresholds and eligibility depend on
 * aliyah date and personal status (reformed 15 Aug 2024) and must be assessed
 * case by case — we route those users to a personal calculation instead.
 */

export const PURCHASE_TAX_VERIFIED_ON = "2026-07-06";
export const PURCHASE_TAX_VALID_FROM = "2025-01-16";
export const PURCHASE_TAX_VALID_TO = "2028-01-15";
export const TAX_AUTHORITY_SIMULATOR =
  "https://www.gov.il/he/service/real_eatate_taxsimulator";

export type BuyerType = "single" | "additional" | "oleh";

type Bracket = { upTo: number | null; rate: number };

// Track A — buyer's only / single residential home (Israeli resident).
const SINGLE_HOME: Bracket[] = [
  { upTo: 1978745, rate: 0 },
  { upTo: 2347040, rate: 0.035 },
  { upTo: 6055070, rate: 0.05 },
  { upTo: 20183565, rate: 0.08 },
  { upTo: null, rate: 0.1 },
];

// Track B — additional home / investor / foreign resident (default schedule).
const ADDITIONAL_HOME: Bracket[] = [
  { upTo: 6055070, rate: 0.08 },
  { upTo: null, rate: 0.1 },
];

export type BracketLine = {
  from: number;
  to: number | null;
  rate: number;
  taxable: number;
  tax: number;
};

export type PurchaseTaxResult = {
  total: number;
  effectiveRate: number;
  breakdown: BracketLine[];
};

export function calcPurchaseTax(
  price: number,
  type: "single" | "additional"
): PurchaseTaxResult {
  const brackets = type === "single" ? SINGLE_HOME : ADDITIONAL_HOME;
  let total = 0;
  let prev = 0;
  const breakdown: BracketLine[] = [];

  for (const b of brackets) {
    if (price <= prev) break;
    const ceil = b.upTo ?? Infinity;
    const taxable = Math.min(price, ceil) - prev;
    const tax = taxable * b.rate;
    if (taxable > 0) {
      total += tax;
      breakdown.push({ from: prev, to: b.upTo, rate: b.rate, taxable, tax });
    }
    prev = ceil;
    if (price <= ceil) break;
  }

  return { total, effectiveRate: price > 0 ? total / price : 0, breakdown };
}
