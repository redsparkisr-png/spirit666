/**
 * Batch 1: Articles 2 & 3
 * - Zichron Yaakov Real Estate Prices 2026
 * - Buying Property as a Foreigner
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
function loadEnv() {
  const text = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}
loadEnv();
const sb = createClient(process.env.NEW_SUPABASE_URL, process.env.NEW_SUPABASE_SERVICE_ROLE_KEY);
const BASE = `${process.env.NEW_SUPABASE_URL}/storage/v1/object/public/images/lifestyle`;
const IMGS = [
  `${BASE}/1772909843704-wo8tl0jd0i.jpg`,
  `${BASE}/1772909844574-2rpafv8h63p.jpg`,
  `${BASE}/1772909845747-g5miuhwifef.jpg`,
  `${BASE}/1773610661361-6h6npztw6dj.jpg`,
  `${BASE}/1773610663288-9xauvgjllme.jpg`,
  `${BASE}/1773610664935-jbetl9qmjar.jpg`,
  `${BASE}/1773610665916-lafkkzqh94f.jpg`,
  `${BASE}/1773610666875-r9mv8se7ytg.jpg`,
  `${BASE}/1773610667760-itbp6zqufej.jpg`,
];

// ─── ARTICLE 2: PRICES 2026 ──────────────────────────────────────────────────
const prices_en = `
<p class="lead">Zichron Yaakov's real estate market has gone from a well-kept secret to one of Israel's fastest-appreciating residential markets. In Q1 2025, the average price per square meter crossed ₪27,400 — a 13.5% year-on-year jump. Yet prices here remain 60–70% below equivalent properties in Tel Aviv. This report breaks down exactly what you get for your money, neighborhood by neighborhood, and what the trajectory looks like heading into 2026.</p>

<div style="background:#f8f5ef;border-left:4px solid #c9a84c;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;">
  <p style="margin:0;font-size:14px;font-weight:600;">Key figures — Q1 2025 (latest verified data)</p>
  <ul style="margin:8px 0 0;font-size:13px;color:#555;padding-left:18px;">
    <li>Average price per m²: <strong>₪27,400</strong></li>
    <li>Average transaction value: <strong>₪3,670,000</strong></li>
    <li>Year-on-year appreciation: <strong>+13.5%</strong></li>
    <li>Foreign buyer share: <strong>22%</strong> of residential purchases</li>
    <li>Highest-priced area: Givat Zamarin / HaMoshava historic center</li>
    <li>Lowest-priced area: Neve Sharet / Ramat Zvi</li>
  </ul>
</div>

<figure style="margin:32px 0;">
  <img src="${IMGS[0]}" alt="Zichron Yaakov residential streets with Mediterranean light" style="width:100%;border-radius:12px;object-fit:cover;aspect-ratio:16/9;" loading="lazy" />
  <figcaption style="text-align:center;font-size:12px;color:#888;margin-top:8px;font-style:italic;">Zichron Yaakov — where historic character meets strong market fundamentals.</figcaption>
</figure>

<h2>Price by Neighborhood — 2025 Ranges</h2>
<div style="overflow-x:auto;margin:24px 0;">
<table style="width:100%;border-collapse:collapse;font-size:13px;">
  <thead><tr style="background:#1a1a1a;color:#fff;">
    <th style="padding:10px 12px;text-align:left;">Neighborhood</th>
    <th style="padding:10px 12px;text-align:left;">₪/m² Range</th>
    <th style="padding:10px 12px;text-align:left;">Typical Apartment (80m²)</th>
    <th style="padding:10px 12px;text-align:left;">YoY Trend</th>
  </tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">HaMoshava / Givat Zamarin</td><td style="padding:10px 12px;">₪28,000–40,000</td><td style="padding:10px 12px;">₪2.2M–3.2M</td><td style="padding:10px 12px;">↑ Strong</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Neve HaBaron</td><td style="padding:10px 12px;">₪24,000–30,000</td><td style="padding:10px 12px;">₪1.9M–2.4M</td><td style="padding:10px 12px;">↑ Steady</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Neve Remez</td><td style="padding:10px 12px;">₪23,000–28,000</td><td style="padding:10px 12px;">₪1.8M–2.2M</td><td style="padding:10px 12px;">↑ Steady</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Villot BaHoresh / Mordot HaBeer</td><td style="padding:10px 12px;">₪26,000–33,000</td><td style="padding:10px 12px;">₪2.1M–2.6M</td><td style="padding:10px 12px;">↑↑ Strong</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Halomot Zichron</td><td style="padding:10px 12px;">₪23,000–28,000</td><td style="padding:10px 12px;">₪1.8M–2.2M</td><td style="padding:10px 12px;">↑ Steady</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Givat Eden</td><td style="padding:10px 12px;">₪21,000–27,000</td><td style="padding:10px 12px;">₪1.7M–2.2M</td><td style="padding:10px 12px;">→ Stable</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Ramat Zvi</td><td style="padding:10px 12px;">₪19,000–24,000</td><td style="padding:10px 12px;">₪1.5M–1.9M</td><td style="padding:10px 12px;">↑↑ Strongest growth</td></tr>
    <tr style="background:#fafafa;"><td style="padding:10px 12px;font-weight:600;">Neve Sharet</td><td style="padding:10px 12px;">₪19,000–23,000</td><td style="padding:10px 12px;">₪1.5M–1.8M</td><td style="padding:10px 12px;">↑↑ Regeneration upside</td></tr>
  </tbody>
</table>
</div>
<p><em>Note: House prices in Neve HaBaron, Villot BaHoresh, and Neve HaBaron typically range ₪4M–10M depending on plot size and build quality. Tables above reflect apartment pricing.</em></p>

<h2>What's Driving Prices Up</h2>
<p>Three forces are converging on Zichron Yaakov simultaneously:</p>
<ol>
  <li><strong>Domestic demand from affluent buyers leaving Tel Aviv.</strong> With a 60–70% price gap versus equivalent Tel Aviv properties, Zichron offers a lifestyle upgrade for the same budget. The highway commute (Highway 2, 45–60 min to central Tel Aviv) makes permanent relocation viable for remote or hybrid workers.</li>
  <li><strong>Foreign investor acceleration.</strong> North American and French olim account for the majority of the 22% foreign-buyer share in Q1 2025. Dollar and euro purchasing power makes even premium Zichron properties feel inexpensive by Western standards. A ₪3.5M property is under $1M USD — a price point that's unthinkable for equivalent quality in North America.</li>
  <li><strong>Supply constraints.</strong> Zichron Yaakov is built on a ridge — there is finite land. The historic center cannot expand. New construction is concentrated in Mordot HaBeer, Halomot, and Neve Sharet, but even these are limited in scale by the municipal zoning plan.</li>
</ol>

<figure style="margin:32px 0;">
  <img src="${IMGS[1]}" alt="Mediterranean coast view from Zichron Yaakov hillside" style="width:100%;border-radius:12px;object-fit:cover;aspect-ratio:16/9;" loading="lazy" />
  <figcaption style="text-align:center;font-size:12px;color:#888;margin-top:8px;font-style:italic;">The ridge geography of Zichron Yaakov creates permanent supply constraints — a fundamental price floor.</figcaption>
</figure>

<h2>Zichron vs. Tel Aviv: The Price Gap in Numbers</h2>
<div style="overflow-x:auto;margin:24px 0;">
<table style="width:100%;border-collapse:collapse;font-size:13px;">
  <thead><tr style="background:#1a1a1a;color:#fff;">
    <th style="padding:10px 12px;text-align:left;">City</th>
    <th style="padding:10px 12px;text-align:left;">Avg ₪/m²</th>
    <th style="padding:10px 12px;text-align:left;">100m² apartment</th>
    <th style="padding:10px 12px;text-align:left;">Gap vs. Zichron</th>
  </tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Tel Aviv (center)</td><td style="padding:10px 12px;">~₪72,000</td><td style="padding:10px 12px;">~₪7.2M</td><td style="padding:10px 12px;">+163%</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Herzliya Pituah</td><td style="padding:10px 12px;">~₪55,000</td><td style="padding:10px 12px;">~₪5.5M</td><td style="padding:10px 12px;">+101%</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Caesarea</td><td style="padding:10px 12px;">~₪35,000</td><td style="padding:10px 12px;">~₪3.5M</td><td style="padding:10px 12px;">+28%</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;color:#c9a84c;">Zichron Yaakov</td><td style="padding:10px 12px;color:#c9a84c;">~₪27,400</td><td style="padding:10px 12px;color:#c9a84c;">~₪2.7M</td><td style="padding:10px 12px;">—</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Binyamina</td><td style="padding:10px 12px;">~₪21,000</td><td style="padding:10px 12px;">~₪2.1M</td><td style="padding:10px 12px;">-23%</td></tr>
  </tbody>
</table>
</div>

<h2>Rental Market Overview</h2>
<p>The rental market in Zichron is tight — vacancy rates are low and demand from both local renters and short-term visitors (Airbnb, etc.) is high. Typical rental yields run 3–4.5% annually, which is respectable for Israel's market. Key rental benchmarks:</p>
<ul>
  <li>2-room apartment (50–60m²): ₪4,500–6,500/month</li>
  <li>3-room apartment (70–85m²): ₪6,500–9,500/month</li>
  <li>4-room apartment (90–110m²): ₪8,000–13,000/month</li>
  <li>Private house / villa: ₪12,000–25,000/month depending on size and location</li>
</ul>
<p>Properties in and around HaMoshava command a premium in both sales and rentals, driven by Airbnb tourism demand on weekends. A well-positioned 3-room apartment near Hameyasdim can generate ₪8,000–12,000/month in short-term rental income during peak season.</p>

<h2>2026 Outlook</h2>
<p>Several factors suggest continued price appreciation through 2026:</p>
<ul>
  <li><strong>Interest rate trajectory:</strong> Bank of Israel rate cuts expected in 2025–2026 will reduce mortgage costs and stimulate demand.</li>
  <li><strong>Continued foreign buyer interest:</strong> Global uncertainty and dollar/euro strength vs. the shekel sustains foreign demand.</li>
  <li><strong>Limited new supply:</strong> No major new construction zones planned beyond Mordot HaBeer, which is nearly sold out.</li>
  <li><strong>Infrastructure investment:</strong> Planned improvements to Highway 2 and rail connectivity continue to shorten the practical commute to Tel Aviv.</li>
</ul>
<p>Our projection: <strong>+8–12% appreciation in 2026</strong>, with the affordable-tier neighborhoods (Ramat Zvi, Neve Sharet) outperforming the already-expensive historic center on a percentage basis.</p>

<div style="background:#1a1a1a;color:#fff;border-radius:16px;padding:32px;margin:40px 0;text-align:center;">
  <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">Want current listings at these prices?</p>
  <p style="font-size:22px;font-weight:700;margin-bottom:12px;">We know what's available before it hits the portals.</p>
  <p style="color:rgba(255,255,255,0.7);font-size:14px;margin-bottom:24px;">Off-market properties. Real prices. Local expertise.</p>
  <a href="https://wa.me/972522820632" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:100px;font-weight:600;text-decoration:none;font-size:15px;">Talk to Us on WhatsApp</a>
</div>
`.trim();

const prices_he = `
<p class="lead">שוק הנדל"ן של זכרון יעקב עבר מסוד שמור היטב לאחד השווקים שמתייקרים בקצב הגבוה ביותר בישראל. ברבעון הראשון של 2025, מחיר המ"ר הממוצע חצה את רף ה-₪27,400 — קפיצה של 13.5% לעומת השנה הקודמת. ובכל זאת, מחירים כאן נמוכים ב-60–70% ממקבילות בתל אביב. הדוח הזה מפרק בדיוק מה מקבלים בכסף, שכונה אחר שכונה.</p>

<div style="background:#f8f5ef;border-left:4px solid #c9a84c;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;">
  <p style="margin:0;font-size:14px;font-weight:600;">נתוני מפתח — רבעון ראשון 2025</p>
  <ul style="margin:8px 0 0;font-size:13px;color:#555;padding-right:18px;">
    <li>ממוצע מחיר מ"ר: <strong>₪27,400</strong></li>
    <li>ממוצע ערך עסקה: <strong>₪3,670,000</strong></li>
    <li>עליית מחיר שנתית: <strong>+13.5%</strong></li>
    <li>רוכשים זרים: <strong>22%</strong> מהרכישות הפרטיות</li>
    <li>אזור הכי יקר: גבעת זמרין / מרכז המושבה ההיסטורי</li>
    <li>אזור הכי נגיש: נווה שרת / רמת צבי</li>
  </ul>
</div>

<h2>מחירים לפי שכונה — טווחי 2025</h2>
<div style="overflow-x:auto;margin:24px 0;">
<table style="width:100%;border-collapse:collapse;font-size:13px;">
  <thead><tr style="background:#1a1a1a;color:#fff;">
    <th style="padding:10px 12px;text-align:right;">שכונה</th>
    <th style="padding:10px 12px;text-align:right;">טווח ₪/מ"ר</th>
    <th style="padding:10px 12px;text-align:right;">דירה טיפוסית (80מ"ר)</th>
    <th style="padding:10px 12px;text-align:right;">מגמה</th>
  </tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">המושבה / גבעת זמרין</td><td style="padding:10px 12px;">₪28,000–40,000</td><td style="padding:10px 12px;">₪2.2M–3.2M</td><td style="padding:10px 12px;">↑ חזק</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">נווה הבארון</td><td style="padding:10px 12px;">₪24,000–30,000</td><td style="padding:10px 12px;">₪1.9M–2.4M</td><td style="padding:10px 12px;">↑ יציב</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">נווה רמז</td><td style="padding:10px 12px;">₪23,000–28,000</td><td style="padding:10px 12px;">₪1.8M–2.2M</td><td style="padding:10px 12px;">↑ יציב</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">וילות בחורש / מורדות הבאר</td><td style="padding:10px 12px;">₪26,000–33,000</td><td style="padding:10px 12px;">₪2.1M–2.6M</td><td style="padding:10px 12px;">↑↑ חזק</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">חלומות זכרון</td><td style="padding:10px 12px;">₪23,000–28,000</td><td style="padding:10px 12px;">₪1.8M–2.2M</td><td style="padding:10px 12px;">↑ יציב</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">גבעת עדן</td><td style="padding:10px 12px;">₪21,000–27,000</td><td style="padding:10px 12px;">₪1.7M–2.2M</td><td style="padding:10px 12px;">→ יציב</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">רמת צבי</td><td style="padding:10px 12px;">₪19,000–24,000</td><td style="padding:10px 12px;">₪1.5M–1.9M</td><td style="padding:10px 12px;">↑↑ הכי חזק</td></tr>
    <tr style="background:#fafafa;"><td style="padding:10px 12px;font-weight:600;">נווה שרת</td><td style="padding:10px 12px;">₪19,000–23,000</td><td style="padding:10px 12px;">₪1.5M–1.8M</td><td style="padding:10px 12px;">↑↑ פוטנציאל</td></tr>
  </tbody>
</table>
</div>

<h2>מה מניע את המחירים למעלה</h2>
<ol>
  <li><strong>ביקוש מקומי מקונים אמידים שעוזבים את תל אביב.</strong> הפער של 60–70% לעומת נכסים מקבילים בתל אביב מציע שדרוג אורח חיים באותו תקציב. נסיעה בכביש 2 (45–60 דק' לתל אביב) הופכת מעבר קבוע לאפשרי לעובדים מהבית.</li>
  <li><strong>האצת משקיעים זרים.</strong> עולים מצפון אמריקה וצרפת מהווים את רוב ה-22% מרכישות זרות. כוח קנייה בדולר ואירו הופך אפילו נכסי פרמיום בזכרון לזולים בסטנדרטים מערביים.</li>
  <li><strong>אילוצי היצע.</strong> זכרון בנויה על רכס — אין קרקע אינסופית. המרכז ההיסטורי לא יכול להתרחב. בנייה חדשה מרוכזת במורדות הבאר, חלומות ונווה שרת — ואפילו היא מוגבלת.</li>
</ol>

<h2>זכרון מול תל אביב: פער המחירים במספרים</h2>
<div style="overflow-x:auto;margin:24px 0;">
<table style="width:100%;border-collapse:collapse;font-size:13px;">
  <thead><tr style="background:#1a1a1a;color:#fff;">
    <th style="padding:10px 12px;text-align:right;">עיר</th><th style="padding:10px 12px;text-align:right;">ממוצע ₪/מ"ר</th><th style="padding:10px 12px;text-align:right;">דירה 100מ"ר</th><th style="padding:10px 12px;text-align:right;">פער</th>
  </tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">תל אביב (מרכז)</td><td style="padding:10px 12px;">~₪72,000</td><td style="padding:10px 12px;">~₪7.2M</td><td style="padding:10px 12px;">+163%</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">הרצליה פיתוח</td><td style="padding:10px 12px;">~₪55,000</td><td style="padding:10px 12px;">~₪5.5M</td><td style="padding:10px 12px;">+101%</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">קיסריה</td><td style="padding:10px 12px;">~₪35,000</td><td style="padding:10px 12px;">~₪3.5M</td><td style="padding:10px 12px;">+28%</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;color:#c9a84c;">זכרון יעקב</td><td style="padding:10px 12px;color:#c9a84c;">~₪27,400</td><td style="padding:10px 12px;color:#c9a84c;">~₪2.7M</td><td style="padding:10px 12px;">—</td></tr>
    <tr><td style="padding:10px 12px;font-weight:600;">בנימינה</td><td style="padding:10px 12px;">~₪21,000</td><td style="padding:10px 12px;">~₪2.1M</td><td style="padding:10px 12px;">-23%</td></tr>
  </tbody>
</table>
</div>

<h2>שוק השכירות</h2>
<p>שוק השכירות בזכרון צפוף — שיעורי פנויות נמוכים וביקוש גבוה. תשואות שכירות שנתיות: 3–4.5%. אמות מידה עיקריות:</p>
<ul>
  <li>דירת 2 חדרים (50–60מ"ר): ₪4,500–6,500/חודש</li>
  <li>דירת 3 חדרים (70–85מ"ר): ₪6,500–9,500/חודש</li>
  <li>דירת 4 חדרים (90–110מ"ר): ₪8,000–13,000/חודש</li>
  <li>בית פרטי / וילה: ₪12,000–25,000/חודש</li>
</ul>

<h2>תחזית 2026</h2>
<p>גורמים המעידים על המשך עלייה: הפחתות ריבית של בנק ישראל הצפויות ב-2025–2026, ביקוש זר ממשיך, היצע חדש מוגבל ושיפורי תשתיות בכביש 2 ובקו הרכבת.</p>
<p>הערכתנו: <strong>+8–12% עלייה ב-2026</strong>, כשהשכונות המחיריות (רמת צבי, נווה שרת) יובילו בשיעורי אחוז על פני המרכז ההיסטורי היקר ממילא.</p>

<div style="background:#1a1a1a;color:#fff;border-radius:16px;padding:32px;margin:40px 0;text-align:center;">
  <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">רוצים לראות נכסים במחירים האלה?</p>
  <p style="font-size:22px;font-weight:700;margin-bottom:12px;">אנחנו יודעים מה זמין לפני שזה עולה לפורטלים.</p>
  <a href="https://wa.me/972522820632" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:100px;font-weight:600;text-decoration:none;font-size:15px;">דברו איתנו בוואטסאפ</a>
</div>
`.trim();

// ─── ARTICLE 3: FOREIGN BUYER GUIDE ─────────────────────────────────────────
const foreign_en = `
<p class="lead">Every year, thousands of foreigners buy property in Israel — and Zichron Yaakov consistently ranks among their top destinations. The process is entirely legal, well-regulated, and accessible. But there are taxes, financing rules, and legal steps that differ significantly from what most Western buyers are used to. This guide walks you through every stage, with verified figures for 2025.</p>

<div style="background:#f8f5ef;border-left:4px solid #c9a84c;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;">
  <p style="margin:0;font-size:14px;font-weight:600;">Quick Reference — Foreign Buyer in Israel</p>
  <ul style="margin:8px 0 0;font-size:13px;color:#555;padding-left:18px;">
    <li>Purchase tax (mas rechisha): <strong>8% on the full price</strong> (first or subsequent property)</li>
    <li>Max LTV mortgage: <strong>50%</strong> from Israeli banks</li>
    <li>Legal requirement: <strong>Licensed Israeli attorney</strong> (mandatory)</li>
    <li>Time to close: <strong>3–6 months</strong> from signed purchase contract</li>
    <li>No restrictions on foreign ownership: <strong>foreigners can freely buy and sell</strong></li>
    <li>New olim benefit: <strong>reduced purchase tax rates</strong> if buying within first year of aliyah</li>
  </ul>
</div>

<figure style="margin:32px 0;">
  <img src="${IMGS[2]}" alt="Zichron Yaakov property with garden and views" style="width:100%;border-radius:12px;object-fit:cover;aspect-ratio:16/9;" loading="lazy" />
  <figcaption style="text-align:center;font-size:12px;color:#888;margin-top:8px;font-style:italic;">Zichron Yaakov — a top destination for foreign buyers and new immigrants purchasing Israeli property.</figcaption>
</figure>

<h2>Step 1 — Can Foreigners Buy Property in Israel?</h2>
<p>Yes, with no restrictions. Israel has no laws limiting foreign ownership of residential real estate. Any individual — regardless of nationality or religion — can purchase, own, rent, and sell property in Israel. There is no requirement to reside in Israel, obtain residency, or make aliyah. You can buy as a non-resident and keep the property as a holiday home, investment, or future retirement base.</p>
<p>The primary difference versus Israeli citizens comes in two areas: purchase tax rates (higher for non-residents) and mortgage financing (lower LTV).</p>

<h2>Step 2 — Understanding Mas Rechisha (Purchase Tax)</h2>
<p>Mas rechisha is a one-time tax paid to the Israeli Tax Authority on every property purchase. The rate depends on your residency status and whether this is your first Israeli property.</p>
<h3>Foreign Buyer / Non-Resident Israeli</h3>
<p>If you are not an Israeli tax resident at the time of purchase: <strong>8% on the entire purchase price</strong>, from the first shekel. There are no brackets or exemptions.</p>
<p>Example: Buying a ₪3,000,000 apartment → mas rechisha = ₪240,000.</p>
<h3>New Olim (Within First Year of Aliyah)</h3>
<p>New immigrants purchasing their first Israeli property within the first 12 months of making aliyah receive significantly reduced purchase tax rates — similar to Israeli citizens buying a first home. This is one of the strongest financial incentives for timing your aliyah before your property purchase. Consult a tax advisor to plan this correctly.</p>
<h3>Israeli Citizens — First Home</h3>
<p>For reference: Israeli residents buying a first home pay 0% on the portion up to approximately ₪1,978,745 (2025 bracket), 3.5% on the next portion, and higher rates above that. Second-home Israeli buyers pay higher progressive rates.</p>

<div style="background:#fff3cd;border-left:4px solid #ffc107;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;">
  <p style="margin:0;font-size:13px;"><strong>Important:</strong> Tax brackets are updated by the Israeli Tax Authority periodically. Always verify current rates with a licensed Israeli tax attorney or accountant before signing a purchase contract. The figures above reflect 2025 guidelines.</p>
</div>

<h2>Step 3 — Getting a Mortgage in Israel as a Foreigner</h2>
<p>Israeli banks do lend to foreign buyers — but with tighter conditions than for residents.</p>
<ul>
  <li><strong>Maximum LTV: 50%</strong> — you must fund at least 50% of the purchase price from your own capital</li>
  <li><strong>Income documentation:</strong> Foreign income is accepted but must be documented (tax returns, payslips, bank statements — typically last 3 years)</li>
  <li><strong>Credit history:</strong> Israeli banks review your foreign credit profile; a clean history helps but is not always required</li>
  <li><strong>Currency:</strong> Mortgages are issued in NIS; if your income is in foreign currency, the bank assesses exchange rate risk</li>
  <li><strong>Interest rates (2025):</strong> Variable rate mortgages typically 4–6%; fixed rates slightly higher</li>
</ul>
<p>The major Israeli banks that actively work with foreign buyers include Bank Hapoalim, Bank Leumi, Mizrahi Tefahot, and Discount Bank. It's worth getting pre-approval before committing to a purchase agreement.</p>

<h2>Step 4 — The Purchase Process, Step by Step</h2>
<ol>
  <li><strong>Find the property</strong> — with a local licensed agent (recommended strongly; agents have access to off-market listings and protect your interests)</li>
  <li><strong>Appoint an attorney</strong> — mandatory in Israel. Your attorney reviews the title (tabu), checks for liens, encumbrances, planning permissions, and drafts the purchase contract</li>
  <li><strong>Sign the purchase agreement (chozeh mechar)</strong> — typically accompanied by a 10% deposit paid to your attorney's escrow account</li>
  <li><strong>Obtain mortgage approval</strong> — if financing, this is finalized after signing</li>
  <li><strong>Title search (tabu)</strong> — confirms clean ownership, no debts against the property</li>
  <li><strong>Pay the balance</strong> — typically at handover (mesira), 3–6 months after signing</li>
  <li><strong>Pay mas rechisha</strong> — within 60 days of signing the contract</li>
  <li><strong>Register ownership</strong> — your attorney registers the title transfer at the Land Registry (tabu)</li>
</ol>

<figure style="margin:32px 0;">
  <img src="${IMGS[3]}" alt="Zichron Yaakov stone building with arched windows" style="width:100%;border-radius:12px;object-fit:cover;aspect-ratio:16/9;" loading="lazy" />
  <figcaption style="text-align:center;font-size:12px;color:#888;margin-top:8px;font-style:italic;">Zichron Yaakov's historic stone buildings are particularly sought-after by foreign buyers.</figcaption>
</figure>

<h2>Step 5 — Additional Costs to Budget For</h2>
<div style="overflow-x:auto;margin:24px 0;">
<table style="width:100%;border-collapse:collapse;font-size:13px;">
  <thead><tr style="background:#1a1a1a;color:#fff;">
    <th style="padding:10px 12px;text-align:left;">Cost</th><th style="padding:10px 12px;text-align:left;">Typical Amount</th><th style="padding:10px 12px;text-align:left;">Notes</th>
  </tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;">Mas Rechisha (purchase tax)</td><td style="padding:10px 12px;">8% of price</td><td style="padding:10px 12px;">Non-resident rate; paid within 60 days</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;">Attorney fees</td><td style="padding:10px 12px;">0.5–1.5% of price</td><td style="padding:10px 12px;">Negotiable; mandatory for purchase</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;">Agent commission</td><td style="padding:10px 12px;">2% + VAT (each side)</td><td style="padding:10px 12px;">Standard in Israel; both buyer and seller pay</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;">Mortgage arrangement fee</td><td style="padding:10px 12px;">₪3,000–8,000</td><td style="padding:10px 12px;">Bank fee; if financing</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;">Property inspection</td><td style="padding:10px 12px;">₪1,500–3,000</td><td style="padding:10px 12px;">Recommended; not legally required</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;">Tabu registration</td><td style="padding:10px 12px;">₪500–1,500</td><td style="padding:10px 12px;">Land registry fee</td></tr>
    <tr><td style="padding:10px 12px;font-weight:600;">Total transaction costs</td><td style="padding:10px 12px;font-weight:600;">~10–12% of price</td><td style="padding:10px 12px;">Budget conservatively</td></tr>
  </tbody>
</table>
</div>

<h2>Common Mistakes Foreign Buyers Make</h2>
<ul>
  <li><strong>Skipping the attorney.</strong> Unlike some countries, you cannot complete an Israeli property purchase without one. And you need your own attorney — not the seller's.</li>
  <li><strong>Not checking the tabu (title registry) for debts.</strong> Some properties have mortgages, liens, or planning disputes attached. Your attorney must check this before you sign.</li>
  <li><strong>Underestimating transaction costs.</strong> The 8% mas rechisha alone can surprise buyers used to countries with lower stamp duties. Budget 10–12% on top of the purchase price for all costs.</li>
  <li><strong>Converting currency at the wrong time.</strong> The NIS/USD or NIS/EUR rate can shift 10–15% over the course of a transaction. Consider a currency forward contract to lock in your rate.</li>
  <li><strong>Not having the property inspected.</strong> Especially in older Zichron buildings — plumbing, electrical, and structural issues are not disclosed by law as they are in some countries.</li>
</ul>

<div style="background:#1a1a1a;color:#fff;border-radius:16px;padding:32px;margin:40px 0;text-align:center;">
  <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">Buying from abroad?</p>
  <p style="font-size:22px;font-weight:700;margin-bottom:12px;">We've guided dozens of overseas buyers through every step.</p>
  <p style="color:rgba(255,255,255,0.7);font-size:14px;margin-bottom:24px;">From WhatsApp property tours to remote signing — we make it work.</p>
  <a href="https://wa.me/972522820632" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:100px;font-weight:600;text-decoration:none;font-size:15px;">Start a Conversation</a>
</div>
`.trim();

const foreign_he = `
<p class="lead">מדי שנה אלפי זרים רוכשים נכסים בישראל — וזכרון יעקב מדורגת באופן עקבי בין היעדים המבוקשים ביותר. התהליך חוקי לחלוטין, מוסדר היטב ונגיש. אבל יש מיסים, כללי מימון וצעדים משפטיים שנבדלים משמעותית ממה שרוכשים מערביים רגילים אליו. המדריך הזה מוביל אתכם דרך כל שלב עם נתונים מאומתים ל-2025.</p>

<div style="background:#f8f5ef;border-left:4px solid #c9a84c;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;">
  <p style="margin:0;font-size:14px;font-weight:600;">עובדות מהירות — רוכש זר בישראל</p>
  <ul style="margin:8px 0 0;font-size:13px;color:#555;padding-right:18px;">
    <li>מס רכישה: <strong>8% על מלוא המחיר</strong> (נכס ראשון או כל נכס נוסף)</li>
    <li>מימון מקסימלי (LTV): <strong>50%</strong> מבנקים ישראלים</li>
    <li>חובה חוקית: <strong>עורך דין ישראלי מורשה</strong></li>
    <li>זמן סגירה: <strong>3–6 חודשים</strong> מחתימת חוזה</li>
    <li>אין הגבלות על בעלות זרה: <strong>זרים יכולים לקנות ולמכור בחופשיות</strong></li>
    <li>הטבת עולים חדשים: <strong>שיעורי מס מופחתים</strong> בשנה הראשונה לעלייה</li>
  </ul>
</div>

<h2>שלב 1 — האם זרים יכולים לקנות נדל"ן בישראל?</h2>
<p>כן, ללא הגבלה. לישראל אין חוקים המגבילים בעלות זרה על נדל"ן מגורים. כל אדם — ללא קשר לאזרחות או דת — יכול לרכוש, להחזיק, להשכיר ולמכור נכס בישראל. אין צורך לגור בישראל, לקבל מעמד תושב או לעלות לארץ. ניתן לקנות כתושב חוץ ולשמור על הנכס כבית נופש, השקעה או בסיס לפרישה עתידית.</p>
<p>ההבדל העיקרי לעומת אזרחים ישראלים מגיע בשני תחומים: שיעורי מס רכישה (גבוהים יותר לתושבי חוץ) ומימון משכנתה (LTV נמוך יותר).</p>

<h2>שלב 2 — הבנת מס רכישה</h2>
<p>מס רכישה הוא מס חד-פעמי המשולם לרשות המיסים הישראלית בכל רכישת נכס. השיעור תלוי במעמד המס שלכם.</p>
<h3>רוכש זר / תושב חוץ</h3>
<p>אם אינכם תושבי מס ישראל בעת הרכישה: <strong>8% על מלוא מחיר הרכישה</strong>, מהשקל הראשון. אין מדרגות או פטורים.</p>
<p>דוגמה: רכישת דירה ב-₪3,000,000 → מס רכישה = ₪240,000.</p>
<h3>עולים חדשים (בשנה הראשונה לעלייה)</h3>
<p>עולים חדשים הרוכשים נכס ראשון תוך 12 חודשים מיום העלייה זכאים לשיעורי מס רכישה מופחתים משמעותית — דומים לאלה של אזרח ישראלי הרוכש דירה ראשונה. זוהי אחת ההטבות הכספיות החזקות ביותר לתזמון העלייה לפני רכישת הנכס. היוועצו ביועץ מס.</p>

<div style="background:#fff3cd;border-left:4px solid #ffc107;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;">
  <p style="margin:0;font-size:13px;"><strong>חשוב:</strong> מדרגות המס מתעדכנות מעת לעת על ידי רשות המיסים. תמיד אמתו את השיעורים הנוכחיים עם עורך דין מס ישראלי מורשה לפני חתימת חוזה. הנתונים לעיל משקפים הנחיות 2025.</p>
</div>

<h2>שלב 3 — משכנתה ישראלית לרוכש זר</h2>
<ul>
  <li><strong>LTV מקסימלי: 50%</strong> — עליכם לממן לפחות 50% ממחיר הרכישה מהון עצמי</li>
  <li><strong>תיעוד הכנסה:</strong> הכנסה זרה מתקבלת אך חייבת להיות מתועדת (3 שנים אחרונות)</li>
  <li><strong>ריביות (2025):</strong> ריבית משתנה ~4–6%; קבועה גבוהה מעט יותר</li>
</ul>
<p>הבנקים הישראלים העיקריים הפועלים עם רוכשים זרים: בנק הפועלים, בנק לאומי, מזרחי טפחות ובנק דיסקונט. מומלץ לקבל אישור עקרוני לפני חתימת הסכם רכישה.</p>

<h2>שלב 4 — תהליך הרכישה שלב אחר שלב</h2>
<ol>
  <li><strong>מציאת הנכס</strong> — עם סוכן מקומי מורשה</li>
  <li><strong>מינוי עורך דין</strong> — חובה בישראל. עורך הדין בודק טאבו, שעבודים, היתרים וניסוח חוזה</li>
  <li><strong>חתימת הסכם רכישה (חוזה מכר)</strong> — בד"כ עם מקדמה של 10% לנאמנות עורך הדין</li>
  <li><strong>קבלת אישור משכנתה</strong> — אם מממנים</li>
  <li><strong>בדיקת טאבו</strong> — מאשרת בעלות נקייה, ללא חובות על הנכס</li>
  <li><strong>תשלום יתרה</strong> — בד"כ במסירה, 3–6 חודשים לאחר החתימה</li>
  <li><strong>תשלום מס רכישה</strong> — תוך 60 יום מחתימת החוזה</li>
  <li><strong>רישום בעלות</strong> — עורך הדין מבצע העברת בעלות בטאבו</li>
</ol>

<h2>עלויות נוספות לתקצוב</h2>
<div style="overflow-x:auto;margin:24px 0;">
<table style="width:100%;border-collapse:collapse;font-size:13px;">
  <thead><tr style="background:#1a1a1a;color:#fff;">
    <th style="padding:10px 12px;text-align:right;">עלות</th><th style="padding:10px 12px;text-align:right;">סכום טיפוסי</th>
  </tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;">מס רכישה</td><td style="padding:10px 12px;">8% מהמחיר</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;">שכר טרחת עורך דין</td><td style="padding:10px 12px;">0.5–1.5% מהמחיר</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;">עמלת תיווך</td><td style="padding:10px 12px;">2% + מע"מ (כל צד)</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;">דמי פתיחת משכנתה</td><td style="padding:10px 12px;">₪3,000–8,000</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;">בדיקת נכס</td><td style="padding:10px 12px;">₪1,500–3,000</td></tr>
    <tr style="background:#fafafa;"><td style="padding:10px 12px;font-weight:600;">סה"כ עלויות עסקה</td><td style="padding:10px 12px;font-weight:600;">~10–12% מהמחיר</td></tr>
  </tbody>
</table>
</div>

<div style="background:#1a1a1a;color:#fff;border-radius:16px;padding:32px;margin:40px 0;text-align:center;">
  <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">קונים מחו"ל?</p>
  <p style="font-size:22px;font-weight:700;margin-bottom:12px;">ליווינו עשרות רוכשים מחו"ל בכל שלב בתהליך.</p>
  <a href="https://wa.me/972522820632" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:100px;font-weight:600;text-decoration:none;font-size:15px;">התחילו שיחה בוואטסאפ</a>
</div>
`.trim();

const ARTICLES = [
  {
    slug: "zichron-yaakov-real-estate-prices-2026",
    status: "published",
    title_en: "Zichron Yaakov Real Estate Prices 2026: Complete Market Report",
    title_he: "מחירי נדל\"ן זכרון יעקב 2026: דוח שוק מקיף",
    excerpt_en: "Q1 2025 data, neighborhood price breakdowns, rental yields, the Tel Aviv price gap, and 2026 outlook — everything you need to understand the Zichron Yaakov property market.",
    excerpt_he: "נתוני רבעון ראשון 2025, פירוט מחירים לפי שכונה, תשואות שכירות, פער המחירים מול תל אביב ותחזית ל-2026.",
    body_en: prices_en,
    body_he: prices_he,
    featured_image: IMGS[0],
    og_image: IMGS[0],
    category: "market-insights",
    tags: ["prices", "market report", "zichron yaakov", "real estate", "2026", "investment"],
    author: "Spirit Real Estate",
    publish_date: new Date().toISOString().split("T")[0],
    reading_time_minutes: 10,
    seo_title_en: "Zichron Yaakov Real Estate Prices 2026 — Complete Market Report | Spirit",
    seo_title_he: 'מחירי נדל"ן זכרון יעקב 2026 — דוח שוק מקיף | ספיריט',
    meta_description_en: "Average ₪27,400/m², +13.5% YoY, 22% foreign buyers. Complete breakdown of Zichron Yaakov real estate prices by neighborhood, rental yields and 2026 market outlook.",
    meta_description_he: "ממוצע ₪27,400 למ\"ר, +13.5% לעומת אשתקד, 22% רוכשים זרים. פירוט מחירי נדל\"ן זכרון יעקב לפי שכונה, תשואות שכירות ותחזית לשוק 2026.",
    noindex: false,
  },
  {
    slug: "buying-property-zichron-yaakov-foreign-buyer-guide",
    status: "published",
    title_en: "Buying Property in Zichron Yaakov as a Foreigner: The Complete 2026 Guide",
    title_he: "רכישת נכס בזכרון יעקב כאזרח זר: המדריך המלא 2026",
    excerpt_en: "Purchase tax (mas rechisha), mortgages, the buying process step-by-step, and common mistakes to avoid — everything a foreign buyer needs to know before purchasing in Zichron Yaakov.",
    excerpt_he: "מס רכישה, משכנתאות, תהליך הרכישה שלב אחר שלב וטעויות נפוצות להימנע מהן — כל מה שרוכש זר צריך לדעת לפני קנייה בזכרון יעקב.",
    body_en: foreign_en,
    body_he: foreign_he,
    featured_image: IMGS[2],
    og_image: IMGS[2],
    category: "buying",
    tags: ["foreign buyer", "mas rechisha", "purchase tax", "mortgage", "legal process", "olim"],
    author: "Spirit Real Estate",
    publish_date: new Date().toISOString().split("T")[0],
    reading_time_minutes: 11,
    seo_title_en: "Buying Property in Zichron Yaakov as a Foreigner — 2026 Guide | Spirit",
    seo_title_he: 'רכישת נכס בזכרון יעקב כאזרח זר — מדריך 2026 | ספיריט נדל"ן',
    meta_description_en: "Foreign buyer's guide to purchasing property in Zichron Yaakov: 8% purchase tax, 50% LTV mortgage, step-by-step process, costs table and common mistakes to avoid.",
    meta_description_he: "מדריך רוכש זר לרכישת נכס בזכרון יעקב: 8% מס רכישה, 50% LTV משכנתה, תהליך שלב אחר שלב, טבלת עלויות וטעויות נפוצות להימנע מהן.",
    noindex: false,
  },
];

async function main() {
  for (const article of ARTICLES) {
    const { data, error } = await sb.from("blog_posts").insert(article).select("id, slug");
    if (error) { console.error(`ERROR on ${article.slug}:`, error.message); continue; }
    console.log(`✓ Inserted: ${data[0].slug}`);
  }
  console.log("Batch 1 done.");
}
main();
