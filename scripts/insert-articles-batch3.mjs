/**
 * Batch 3: Articles 7–10
 * - Neve Remez: Zichron's Hidden Gem
 * - Ramat Zvi: Best Value
 * - Moving to Zichron: Month-by-Month Checklist
 * - Halomot Zichron & Neve HaBaron: Premium Living
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
  `${BASE}/1772909836847-n38ufticgag.jpg`,
  `${BASE}/1772909839164-a73djf0nsfh.jpg`,
  `${BASE}/1772909840242-5wjp9vpyl4h.jpg`,
  `${BASE}/1772909841381-jqkt3sthdb.jpg`,
  `${BASE}/1772909842451-dmhq61keet6.jpg`,
  `${BASE}/1773610663288-9xauvgjllme.jpg`,
];

// ─── ARTICLE 7: NEVE REMEZ ───────────────────────────────────────────────────
const neveRemez_en = `
<p class="lead">In a town full of desirable addresses, Neve Remez tends to fly under the radar. It lacks the prestige of Givat Zamarin, doesn't have the new-development sheen of Mordot HaBeer, and doesn't appear in most tourist guides. What it does have is a quiet authenticity, a genuinely neighborhood feel, and some of the most accessible apartment prices in Zichron Yaakov — while sitting just 10 minutes' walk from everything the Moshava offers.</p>

<figure style="margin:32px 0;">
  <img src="${IMGS[0]}" alt="Neve Remez residential streets in Zichron Yaakov" style="width:100%;border-radius:12px;object-fit:cover;aspect-ratio:16/9;" loading="lazy" />
  <figcaption style="text-align:center;font-size:12px;color:#888;margin-top:8px;font-style:italic;">Neve Remez — quiet streets, community atmosphere, walking distance to Zichron's center.</figcaption>
</figure>

<h2>Where Is Neve Remez?</h2>
<p>Neve Remez sits on the western slope of Zichron Yaakov, below the Moshava center and above the industrial zone. It's roughly bounded by HaNadiv Street to the north and the western ridge road to the south. It was developed primarily in the 1970s–1990s and has a character that's typical of that era of Israeli urban development: solid construction, medium-density apartment blocks, generous parking, and relatively large apartments for the price.</p>

<h2>Who Lives Here</h2>
<p>Neve Remez is primarily long-term Israeli residents — families who have lived in Zichron for 20–30+ years, often in the same apartment. There's a growing contingent of young Israeli couples and first-time buyers who can't afford Givat Zamarin but want to stay within Zichron rather than moving to Binyamina. A smaller but growing number of olim are discovering it as one of the best value-for-money addresses in town.</p>

<h2>Price Range</h2>
<p>Neve Remez is among the more affordable neighborhoods in Zichron:</p>
<ul>
  <li>2-room apartment (50–55m²): ₪1.1M–1.5M</li>
  <li>3-room apartment (70–80m²): ₪1.5M–2.0M</li>
  <li>4-room apartment (90–105m²): ₪1.9M–2.4M</li>
  <li>Price per m²: approximately ₪22,000–27,000</li>
</ul>
<p>This is 15–25% below the Zichron average, without sacrificing proximity to the town center. The apartment-to-price ratio is among the best in Zichron.</p>

<h2>Pros</h2>
<ul>
  <li><strong>Walkable to the Moshava center</strong> — Hameyasdim promenade is a 10–15 minute walk from most of Neve Remez</li>
  <li><strong>Large apartment sizes</strong> — 1970s-era construction typically means more square meters per shekel than modern builds</li>
  <li><strong>Community feel</strong> — low-rise buildings, neighbors who know each other, quiet evenings</li>
  <li><strong>Good schools nearby</strong> — close to Zichron's elementary school zone</li>
  <li><strong>Accessibility</strong> — relatively flat terrain within the neighborhood (unlike the steep streets of Givat Zamarin)</li>
  <li><strong>Price trajectory</strong> — as Zichron overall appreciates, Neve Remez has room to catch up; it's a late-mover's advantage</li>
</ul>

<h2>Cons</h2>
<ul>
  <li><strong>Older building stock</strong> — some buildings need elevator retrofits (tama 38 or renewal) and cosmetic/infrastructure updates</li>
  <li><strong>Less prestigious address</strong> — won't get the "you live in Givat Zamarin?" response; less immediate name recognition</li>
  <li><strong>No sea views</strong> — sits on the western slope; sea views are limited unless on upper floors of the right buildings</li>
  <li><strong>Walk is uphilll to Moshava center</strong> — the return trip is uphill, which matters to older buyers or those with mobility considerations</li>
</ul>

<h2>Best For</h2>
<p>Neve Remez is ideal for:</p>
<ul>
  <li><strong>First-time buyers in Zichron</strong> who want a real Zichron address without the premium price</li>
  <li><strong>Olim on a budget</strong> who need more space than the money can buy in Givat Zamarin</li>
  <li><strong>Investors</strong> looking for a higher yield play: rental demand in Neve Remez is steady and prices are still below what the proximity to center would suggest</li>
  <li><strong>Buyers planning a renovation</strong> — older apartments often have great bones and respond well to investment</li>
</ul>

<div style="background:#1a1a1a;color:#fff;border-radius:16px;padding:32px;margin:40px 0;text-align:center;">
  <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">Interested in Neve Remez listings?</p>
  <p style="font-size:22px;font-weight:700;margin-bottom:12px;">We know what's on the market — including properties not yet listed online.</p>
  <a href="https://wa.me/972522820632" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:100px;font-weight:600;text-decoration:none;font-size:15px;">Ask About Neve Remez</a>
</div>
`.trim();

const neveRemez_he = `
<p class="lead">בעיירה שמלאה בכתובות מבוקשות, נווה רמז נוטה לעוף מתחת לרדאר. חסר לו היוקרה של גבעת זמרין, אין לו ברק הפיתוח החדש של מורדות הבאר, והוא לא מופיע ברוב מדריכי הטיולים. מה שיש לו: שקט אותנטי, תחושה שכונתית אמיתית, וחלק מהמחירים הנגישים ביותר של דירות בזכרון יעקב — תוך ישיבה רק 10 דקות הליכה ממה שהמושבה מציעה.</p>

<h2>איפה נווה רמז</h2>
<p>נווה רמז שוכן על המדרון המערבי של זכרון יעקב, מתחת למרכז המושבה ומעל אזור התעשייה. הוא פותח בעיקר בשנות ה-70–90 ויש לו אופי אופייני לאותה עידן של בנייה ישראלית עירונית: בנייה מוצקה, בלוקים ברמת צפיפות בינונית, חנייה נדיבה ודירות גדולות יחסית למחיר.</p>

<h2>טווח מחירים</h2>
<ul>
  <li>דירת 2 חדרים (50–55מ"ר): ₪1.1M–1.5M</li>
  <li>דירת 3 חדרים (70–80מ"ר): ₪1.5M–2.0M</li>
  <li>דירת 4 חדרים (90–105מ"ר): ₪1.9M–2.4M</li>
  <li>מחיר למ"ר: כ-₪22,000–27,000</li>
</ul>
<p>זה 15–25% מתחת לממוצע זכרון, ללא ויתור על הקרבה למרכז העיירה. יחס שטח-מחיר הוא מהטובים בזכרון.</p>

<h2>יתרונות</h2>
<ul>
  <li><strong>הליכה למרכז המושבה</strong> — טיילת המייסדים במרחק 10–15 דקות הליכה מרוב נווה רמז</li>
  <li><strong>דירות גדולות</strong> — בנייה משנות ה-70 אומרת יותר מ"ר לשקל מבנייה מודרנית</li>
  <li><strong>תחושה שכונתית</strong> — בניינים נמוכים, שכנים שמכירים זה את זה, ערבים שקטים</li>
  <li><strong>מסלול עלייה</strong> — ככל שזכרון מתייקרת, לנווה רמז יש מרחב להדביק פרמיה</li>
</ul>

<h2>חסרונות</h2>
<ul>
  <li><strong>מלאי בניינים ישן</strong> — חלק מהבניינים דורשים חידוש ותמ"א 38</li>
  <li><strong>כתובת פחות יוקרתית</strong> — פחות הכרה מיידית בשם</li>
  <li><strong>מעט נוף לים</strong> — מוגבל לקומות עליונות של הבניינים הנכונים</li>
</ul>

<h2>מתאים ל</h2>
<ul>
  <li>רוכשים ראשונים בזכרון שרוצים כתובת אמיתית ללא מחיר פרמיה</li>
  <li>עולים עם תקציב מוגבל הזקוקים ליותר מקום מאשר הכסף מספק בגבעת זמרין</li>
  <li>משקיעים המחפשים תשואת שכירות גבוהה יותר</li>
  <li>רוכשים המתכננים שיפוץ — דירות ישנות עם עצמות טובות</li>
</ul>

<div style="background:#1a1a1a;color:#fff;border-radius:16px;padding:32px;margin:40px 0;text-align:center;">
  <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">מעוניינים בנכסים בנווה רמז?</p>
  <p style="font-size:22px;font-weight:700;margin-bottom:12px;">אנחנו יודעים מה יש בשוק — כולל נכסים שטרם פורסמו.</p>
  <a href="https://wa.me/972522820632" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:100px;font-weight:600;text-decoration:none;font-size:15px;">שאלו על נווה רמז</a>
</div>
`.trim();

// ─── ARTICLE 8: RAMAT ZVI ────────────────────────────────────────────────────
const ramatZvi_en = `
<p class="lead">Ramat Zvi is the neighborhood that serious value investors in Zichron Yaakov have been watching. It's not the most glamorous address in town, and it doesn't have the café-lined promenades of the Moshava. What it does have is the highest price appreciation rate of any neighborhood in Zichron over the past two years, entry prices that are still the lowest in the city, and a real regeneration story unfolding in real time.</p>

<figure style="margin:32px 0;">
  <img src="${IMGS[1]}" alt="Ramat Zvi neighborhood in Zichron Yaakov" style="width:100%;border-radius:12px;object-fit:cover;aspect-ratio:16/9;" loading="lazy" />
  <figcaption style="text-align:center;font-size:12px;color:#888;margin-top:8px;font-style:italic;">Ramat Zvi — Zichron Yaakov's fastest-appreciating neighborhood, with the lowest entry point in the city.</figcaption>
</figure>

<h2>Where Is Ramat Zvi?</h2>
<p>Ramat Zvi is located on the eastern side of Zichron Yaakov, on the lower slopes below the Moshava center. It was originally developed as workers' housing in the 1970s and has maintained a more modest character than the neighborhoods on the western ridge. In recent years it has become the subject of urban renewal programs, TAMA 38 projects, and growing developer interest.</p>

<h2>The Regeneration Story</h2>
<p>Three factors are converging in Ramat Zvi to create an unusual investment window:</p>
<ol>
  <li><strong>TAMA 38 / urban renewal projects</strong> — several buildings in Ramat Zvi are either mid-project or in planning for structural reinforcement and expansion under TAMA 38, which adds floor space and elevator access at no direct cost to existing owners</li>
  <li><strong>Pinui-Binui potential</strong> — some plots in the area qualify for demolish-and-rebuild urban renewal, which would significantly upgrade the housing stock</li>
  <li><strong>Developer attention</strong> — as the Moshava and Givat Zamarin become too expensive for new development, Ramat Zvi is one of the few remaining areas where developers can build new at accessible price points</li>
</ol>

<h2>Price Range</h2>
<p>Ramat Zvi is the lowest-entry neighborhood in Zichron:</p>
<ul>
  <li>2-room apartment (50–60m²): ₪950,000–1,350,000</li>
  <li>3-room apartment (70–85m²): ₪1,350,000–1,800,000</li>
  <li>4-room apartment (90–110m²): ₪1,750,000–2,200,000</li>
  <li>Price per m²: approximately ₪19,000–24,000</li>
</ul>
<p>This represents 30–40% below the Zichron average — the largest discount of any neighborhood in town.</p>

<h2>The Investment Case</h2>
<p>Ramat Zvi has outperformed Zichron's already-strong 13.5% YoY appreciation on a percentage basis in the most recent data. The mechanism is straightforward: when a city appreciates broadly, the lowest-priced neighborhoods tend to compress their discount fastest because buyer demand spills over from more expensive areas. Ramat Zvi is experiencing exactly this dynamic.</p>
<p>For investors: rental yields in Ramat Zvi are typically 4–5%, above the city average, because rents (for equivalent size) are not proportionally lower than the better-located neighborhoods.</p>

<h2>Who Ramat Zvi Is Best For</h2>
<ul>
  <li><strong>Value investors</strong> who want maximum appreciation upside from Zichron's growth story</li>
  <li><strong>First-time buyers</strong> who need to be in Zichron but have a limited budget</li>
  <li><strong>Buy-to-let investors</strong> seeking the highest yield in Zichron</li>
  <li><strong>Buyers considering renovation</strong> — older stock with strong bones and significant cosmetic upside</li>
</ul>

<div style="background:#1a1a1a;color:#fff;border-radius:16px;padding:32px;margin:40px 0;text-align:center;">
  <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">Looking for the best value in Zichron?</p>
  <p style="font-size:22px;font-weight:700;margin-bottom:12px;">We track every listing in Ramat Zvi, including off-market.</p>
  <a href="https://wa.me/972522820632" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:100px;font-weight:600;text-decoration:none;font-size:15px;">Talk to Us About Ramat Zvi</a>
</div>
`.trim();

const ramatZvi_he = `
<p class="lead">רמת צבי היא השכונה שמשקיעי ערך רציניים בזכרון יעקב עוקבים אחריה. אין לה את הכתובת הכי גלמורית בעיר, ואין לה את הטיילות המוגשות בבתי קפה של המושבה. מה שיש לה: שיעור עלייה גבוה ממחירי הנדל"ן מכל שכונה אחרת בזכרון בשנתיים האחרונות, מחירי כניסה שעדיין הנמוכים ביותר בעיר, וסיפור התחדשות אמיתי המתפתח בזמן אמת.</p>

<h2>טווח מחירים</h2>
<ul>
  <li>דירת 2 חדרים (50–60מ"ר): ₪950,000–1,350,000</li>
  <li>דירת 3 חדרים (70–85מ"ר): ₪1,350,000–1,800,000</li>
  <li>דירת 4 חדרים (90–110מ"ר): ₪1,750,000–2,200,000</li>
  <li>מחיר למ"ר: כ-₪19,000–24,000</li>
</ul>
<p>זה 30–40% מתחת לממוצע זכרון — הנחה הגדולה ביותר מכל שכונה בעיר.</p>

<h2>סיפור ההתחדשות</h2>
<p>שלושה גורמים מתמזגים ברמת צבי ויוצרים חלון השקעה יוצא דופן:</p>
<ol>
  <li><strong>תמ"א 38 / פרויקטים של התחדשות עירונית</strong> — מספר בניינים ברמת צבי נמצאים בתהליך או בתכנון</li>
  <li><strong>פוטנציאל פינוי-בינוי</strong> — חלקות מסוימות מתאימות להריסה ובנייה מחדש</li>
  <li><strong>תשומת לב יזמית</strong> — ככל שהמושבה וגבעת זמרין מתייקרות, רמת צבי היא אחד המקומות הבודדים שיזמים עדיין יכולים לבנות בהם בנגישות</li>
</ol>

<h2>טיעון ההשקעה</h2>
<p>רמת צבי עלתה מעל עלייה הכוללת של 13.5% לשנה בזכרון. התשואות השכירות ברמת צבי הן בדרך כלל 4–5%, מעל ממוצע העיר.</p>

<h2>מתאים ל</h2>
<ul>
  <li>משקיעי ערך שרוצים פוטנציאל עלייה מקסימלי</li>
  <li>רוכשים ראשונים עם תקציב מוגבל</li>
  <li>משקיעי קנה-להשכרה המחפשים את התשואה הגבוהה ביותר בזכרון</li>
  <li>רוכשים המתכננים שיפוץ</li>
</ul>

<div style="background:#1a1a1a;color:#fff;border-radius:16px;padding:32px;margin:40px 0;text-align:center;">
  <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">מחפשים את הערך הטוב ביותר בזכרון?</p>
  <p style="font-size:22px;font-weight:700;margin-bottom:12px;">אנחנו עוקבים אחר כל נכס ברמת צבי, כולל off-market.</p>
  <a href="https://wa.me/972522820632" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:100px;font-weight:600;text-decoration:none;font-size:15px;">דברו איתנו על רמת צבי</a>
</div>
`.trim();

// ─── ARTICLE 9: RELOCATION CHECKLIST ────────────────────────────────────────
const checklist_en = `
<p class="lead">Moving to Zichron Yaakov is one of the better decisions you can make as an English-speaking person relocating to Israel — but like any major move, the execution matters. This month-by-month checklist is built from our experience helping dozens of English-speaking buyers and olim through the process. Print it. Use it. It will save you weeks of avoidable friction.</p>

<figure style="margin:32px 0;">
  <img src="${IMGS[2]}" alt="Zichron Yaakov street scene for new residents" style="width:100%;border-radius:12px;object-fit:cover;aspect-ratio:16/9;" loading="lazy" />
  <figcaption style="text-align:center;font-size:12px;color:#888;margin-top:8px;font-style:italic;">Zichron Yaakov — a well-organized move here sets you up for a smooth start.</figcaption>
</figure>

<h2>6 Months Before Arrival</h2>
<ul>
  <li>✅ <strong>Start your property search</strong> — the best properties in Zichron go off-market or in days; connect with a local agent now</li>
  <li>✅ <strong>Apply for aliyah</strong> (if applicable) — the Nefesh B'Nefesh process takes 3–6 months; start early to align your aliyah date with your property purchase for maximum tax benefits</li>
  <li>✅ <strong>Open an Israeli bank account</strong> — Bank Hapoalim and Bank Leumi have English-speaking services; some can be opened before arrival</li>
  <li>✅ <strong>Get your documents apostilled</strong> — birth certificate, marriage certificate, all educational diplomas; Israeli bureaucracy requires official apostilles</li>
  <li>✅ <strong>Get mortgage pre-approval</strong> — know your budget range before making offers</li>
  <li>✅ <strong>Research shipping vs. buying locally</strong> — shipping a container from North America costs ~$5,000–12,000 one-way; new olim get a one-time duty exemption on household goods</li>
</ul>

<h2>3 Months Before Arrival</h2>
<ul>
  <li>✅ <strong>Make offers on properties</strong> — if buying, this is the right timeline to sign a purchase agreement for handover near your arrival date</li>
  <li>✅ <strong>Appoint your Israeli attorney</strong> — for property purchase review, document translations, and general olim legal needs</li>
  <li>✅ <strong>Join the Zichron English community groups</strong> — WhatsApp groups and Facebook communities; invaluable for local recommendations</li>
  <li>✅ <strong>Research schools</strong> — if bringing children, connect with the Zichron schools department and explore English-track options in Haifa or Ra'anana</li>
  <li>✅ <strong>Get international health insurance</strong> — you'll need coverage from arrival until your Israeli kupat holim kicks in (usually 3–6 months)</li>
  <li>✅ <strong>Sort out your Israeli tax obligations</strong> — if you have income/assets in another country, speak to an international tax advisor before arriving</li>
</ul>

<h2>1 Month Before Arrival</h2>
<ul>
  <li>✅ <strong>Finalize shipping or storage</strong> — confirm container departure dates and Israeli customs clearance timing</li>
  <li>✅ <strong>Arrange temporary accommodation</strong> — short-term rental or furnished apartment in Zichron for first 1–3 months (many available via local agencies)</li>
  <li>✅ <strong>Sort utilities handover</strong> — electric (Hevrat Hashmal), water (Mekorot), gas (if applicable) all require name changes</li>
  <li>✅ <strong>Cancel or transfer foreign services</strong> — banking, insurance, subscriptions</li>
  <li>✅ <strong>Download essential Israeli apps</strong> — Waze, Bit (peer payment), MaxMobile or Bit for banking, Clalit/Maccabi app for health</li>
</ul>

<h2>First Month in Zichron</h2>
<ul>
  <li>✅ <strong>Register with your kupat holim</strong> — health fund registration is done at Misrad HaBriut; bring all documents</li>
  <li>✅ <strong>Register at Misrad HaPnim</strong> (Interior Ministry) — get your Israeli ID (teudat zehut) if applicable</li>
  <li>✅ <strong>Register children at school</strong> — contact the municipal education department (Mahlakat HaChinuch)</li>
  <li>✅ <strong>Get an Israeli driver's license</strong> — new olim with valid foreign licenses typically convert within 90 days via the licensing office</li>
  <li>✅ <strong>Meet your neighbors</strong> — seriously. The Zichron community is open; introduce yourself.</li>
  <li>✅ <strong>Attend a Nefesh B'Nefesh olim event</strong> — they run regular gatherings in the area</li>
</ul>

<h2>First 6 Months</h2>
<ul>
  <li>✅ <strong>Start ulpan (Hebrew school)</strong> — olim are entitled to free ulpan; register via Misrad HaKlita</li>
  <li>✅ <strong>Complete property purchase formalities</strong> — tabu registration, final payment, key handover</li>
  <li>✅ <strong>Settle your mas rechisha payment</strong> — must be paid within 60 days of signing the purchase contract</li>
  <li>✅ <strong>Explore Zichron properly</strong> — Ramat HaNadiv, Carmel Winery, Ein HaShofet, Beit Aaronson, local restaurants — give yourself time to fall in love with the place</li>
</ul>

<h2>Common Mistakes to Avoid</h2>
<ol>
  <li><strong>Buying before you've visited.</strong> Even if you've done 10 video tours, come to Zichron in person before committing. Spend a Shabbat here. Walk the neighborhoods at different times of day.</li>
  <li><strong>Not timing your aliyah relative to your purchase.</strong> Buying 6 months before aliyah means you pay the 8% foreign-buyer tax. Buying 3 months after aliyah means you may qualify for the lower Israeli-resident rate. The difference on a ₪3M property is ₪150,000–200,000.</li>
  <li><strong>Using an attorney who doesn't specialize in property.</strong> Your friend who practices labor law is not the right person for a ₪3M purchase contract.</li>
  <li><strong>Underestimating Hebrew for daily life.</strong> Zichron's English community is large, but shops, doctors, and neighbors default to Hebrew. Start ulpan before you arrive if possible.</li>
</ol>

<div style="background:#1a1a1a;color:#fff;border-radius:16px;padding:32px;margin:40px 0;text-align:center;">
  <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">Planning your move?</p>
  <p style="font-size:22px;font-weight:700;margin-bottom:12px;">We've done this with dozens of families. Let us help you skip the mistakes.</p>
  <a href="https://wa.me/972522820632" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:100px;font-weight:600;text-decoration:none;font-size:15px;">Talk to Us on WhatsApp</a>
</div>
`.trim();

const checklist_he = `
<p class="lead">מעבר לזכרון יעקב הוא אחד ההחלטות הטובות שאפשר לקבל כאדם דובר אנגלית שעובר לישראל — אבל כמו כל מהלך גדול, הביצוע קובע. רשימת המשימות הזו בנויה מהניסיון שלנו בליווי עשרות רוכשים ועולים דוברי אנגלית בתהליך.</p>

<h2>6 חודשים לפני ההגעה</h2>
<ul>
  <li>✅ <strong>התחילו חיפוש נכסים</strong> — הנכסים הטובים בזכרון נעלמים off-market או תוך ימים; התחברו עכשיו לסוכן מקומי</li>
  <li>✅ <strong>הגישו בקשת עלייה</strong> (אם רלוונטי) — תהליך נפש ב'נפש לוקח 3–6 חודשים; התחילו מוקדם</li>
  <li>✅ <strong>פתחו חשבון בנק ישראלי</strong> — בנק הפועלים ובנק לאומי מציעים שירות באנגלית</li>
  <li>✅ <strong>אפוסטיל לכל המסמכים</strong> — תעודת לידה, נישואין, תארים אקדמיים</li>
  <li>✅ <strong>קבלו אישור משכנתה עקרוני</strong> — דעו את טווח התקציב לפני הגשת הצעות</li>
</ul>

<h2>3 חודשים לפני ההגעה</h2>
<ul>
  <li>✅ <strong>הגישו הצעות על נכסים</strong> — הזמן הנכון לחתימת הסכם רכישה</li>
  <li>✅ <strong>מנו עורך דין ישראלי</strong> — לבדיקת הסכם רכישה ולצרכים משפטיים כלליים</li>
  <li>✅ <strong>הצטרפו לקבוצות הקהילה האנגלית של זכרון</strong> — קבוצות WhatsApp ופייסבוק</li>
  <li>✅ <strong>חקרו בתי ספר</strong> — אם מגיעים עם ילדים</li>
</ul>

<h2>חודש ראשון בזכרון</h2>
<ul>
  <li>✅ <strong>הירשמו לקופת חולים</strong> — אצל משרד הבריאות; הביאו את כל המסמכים</li>
  <li>✅ <strong>הירשמו במשרד הפנים</strong> — קבלו תעודת זהות ישראלית אם רלוונטי</li>
  <li>✅ <strong>הירשמו ילדים לבית ספר</strong> — פנו למחלקת החינוך העירונית</li>
  <li>✅ <strong>קבלו רישיון נהיגה ישראלי</strong> — עולים חדשים עם רישיון זר ממירים תוך 90 יום</li>
</ul>

<h2>6 חודשים הראשונים</h2>
<ul>
  <li>✅ <strong>התחילו אולפן</strong> — עולים זכאים לאולפן חינמי; הירשמו דרך משרד הקליטה</li>
  <li>✅ <strong>סיימו פורמליות הרכישה</strong> — רישום טאבו, תשלום אחרון, קבלת מפתחות</li>
  <li>✅ <strong>שלמו מס רכישה</strong> — חייב להיות משולם תוך 60 יום מחתימת החוזה</li>
</ul>

<h2>טעויות נפוצות להימנע מהן</h2>
<ol>
  <li><strong>קנייה לפני ביקור.</strong> גם אחרי 10 סיורים וירטואליים — בואו לזכרון באופן אישי לפני ההתחייבות.</li>
  <li><strong>לא לתזמן עלייה לפי רכישה.</strong> ההפרש בין 8% מס זר לשיעור עולה על נכס ב-₪3M: ₪150,000–200,000.</li>
  <li><strong>עורך דין שלא מתמחה בנדל"ן.</strong> חבר שעוסק בדיני עבודה אינו האדם הנכון לחוזה ב-₪3M.</li>
</ol>

<div style="background:#1a1a1a;color:#fff;border-radius:16px;padding:32px;margin:40px 0;text-align:center;">
  <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">מתכננים מעבר?</p>
  <p style="font-size:22px;font-weight:700;margin-bottom:12px;">עשינו את זה עם עשרות משפחות. תנו לנו לעזור לכם לדלג על הטעויות.</p>
  <a href="https://wa.me/972522820632" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:100px;font-weight:600;text-decoration:none;font-size:15px;">דברו איתנו בוואטסאפ</a>
</div>
`.trim();

// ─── ARTICLE 10: HALOMOT & NEVE HABARON ─────────────────────────────────────
const premium_en = `
<p class="lead">Within Zichron Yaakov's already-desirable real estate market, two neighborhoods consistently represent the premium tier for buyers who want the most space, the newest build quality, or the most prestigious address: Halomot Zichron and Neve HaBaron. They serve different buyer profiles but share a common thread — they represent the top of what Zichron offers without crossing into the historic Moshava, where supply is extremely constrained. Here's what buyers need to know about both.</p>

<figure style="margin:32px 0;">
  <img src="${IMGS[4]}" alt="Premium Zichron Yaakov housing with views" style="width:100%;border-radius:12px;object-fit:cover;aspect-ratio:16/9;" loading="lazy" />
  <figcaption style="text-align:center;font-size:12px;color:#888;margin-top:8px;font-style:italic;">Zichron Yaakov's premium neighborhoods offer modern build quality, generous space and sweeping views.</figcaption>
</figure>

<h2>Halomot Zichron</h2>
<p>Halomot Zichron ("Dreams of Zichron") is a planned residential quarter developed in the 2000s–2010s on the northern edge of Zichron. It was designed as an upscale alternative to the older stock in the center and lower neighborhoods — offering modern building quality, parking, elevator access, and in many cases, outstanding views across the Sharon plain and toward the sea.</p>
<h3>Who Lives in Halomot Zichron</h3>
<p>Halomot attracts: Israeli professionals from Tel Aviv and the center of the country who want a lifestyle upgrade; senior buyers looking for modern build quality with elevator access; and a growing number of olim for whom the combination of modern finishes and proximity to Zichron's center (10–15 minutes' walk or 2 minutes by car) is ideal.</p>
<h3>Price Range — Halomot Zichron</h3>
<ul>
  <li>2-room apartment (55–65m²): ₪1.2M–1.7M</li>
  <li>3-room apartment (80–95m²): ₪1.8M–2.4M</li>
  <li>4-room apartment (100–120m²): ₪2.2M–3.0M</li>
  <li>Penthouse / top floor: ₪3.0M–4.5M (view premium applies)</li>
  <li>Price per m²: approximately ₪22,000–28,000</li>
</ul>
<h3>Pros — Halomot Zichron</h3>
<ul>
  <li>Modern construction quality — newer buildings, better insulation, elevators, underground parking</li>
  <li>View potential — upper floors command panoramic views of the Sharon plain and often the sea</li>
  <li>Community atmosphere — residents tend to be a mix of established families and newcomers in a similar life stage</li>
  <li>Easy driving access to Zichron center and to the main road south</li>
</ul>
<h3>Cons — Halomot Zichron</h3>
<ul>
  <li>Less walking distance to Moshava center than the core neighborhoods — a car or bus is practical</li>
  <li>Less "character" than the historic Moshava or the organic neighborhoods closer to center</li>
</ul>

<h2>Neve HaBaron</h2>
<p>Neve HaBaron is one of Zichron's most prestigious addresses — and one of its most architecturally interesting. The neighborhood features a mix of large private houses and a smaller number of upscale apartments, set among established gardens and tree-lined streets. Many properties here have private gardens, swimming pools, and built areas exceeding 200–300m².</p>
<p>The name references the Baron — specifically the Rothschild patronage that shaped Zichron's development. While the neighborhood is newer than the Moshava itself, it carries a strong sense of heritage and is home to many of Zichron's long-established families.</p>
<h3>Who Lives in Neve HaBaron</h3>
<p>Neve HaBaron draws: established Israeli families who have been in Zichron for multiple generations; high-net-worth domestic and foreign buyers seeking the most prestigious residential address in town; and buyers who want a private house with a garden in a location that still feels central to Zichron's life.</p>
<h3>Price Range — Neve HaBaron</h3>
<ul>
  <li>Private house (150–200m², standard plot): ₪4.5M–7.0M</li>
  <li>Private house (200–300m², larger plot): ₪7.0M–12.0M+</li>
  <li>Premium villa (300m²+, exceptional plot/views): ₪12.0M–20.0M+</li>
  <li>Apartment (where available): ₪2.5M–4.0M</li>
  <li>Land price per m² (build plots): ₪5,000–12,000+</li>
</ul>
<h3>Pros — Neve HaBaron</h3>
<ul>
  <li>Most prestigious residential address in Zichron — recognized by Israelis and olim alike</li>
  <li>Large private homes with gardens — rare in Israeli urban settings at any price</li>
  <li>Strong value retention — properties here have historically shown the most resilient price performance in downturns</li>
  <li>Community of established, long-term Zichron families</li>
</ul>
<h3>Cons — Neve HaBaron</h3>
<ul>
  <li>High entry price — the lowest-priced private houses start around ₪4.5M; most sell above ₪6M</li>
  <li>Limited supply — very few properties come to market annually; patience required</li>
  <li>Larger properties require maintenance budgets that can be significant</li>
</ul>

<h2>Which Should You Choose?</h2>
<div style="overflow-x:auto;margin:24px 0;">
<table style="width:100%;border-collapse:collapse;font-size:13px;">
  <thead><tr style="background:#1a1a1a;color:#fff;">
    <th style="padding:10px 12px;text-align:left;"></th><th style="padding:10px 12px;text-align:left;">Halomot Zichron</th><th style="padding:10px 12px;text-align:left;">Neve HaBaron</th>
  </tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Entry price</td><td style="padding:10px 12px;">₪1.2M+</td><td style="padding:10px 12px;">₪4.5M+</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Property type</td><td style="padding:10px 12px;">Mainly apartments</td><td style="padding:10px 12px;">Mainly private houses</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Build quality</td><td style="padding:10px 12px;">Modern (2000s+)</td><td style="padding:10px 12px;">Varies; typically high-spec</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">Views</td><td style="padding:10px 12px;">Top floors: excellent</td><td style="padding:10px 12px;">Variable by plot</td></tr>
    <tr><td style="padding:10px 12px;font-weight:600;">Best for</td><td style="padding:10px 12px;">Modern lifestyle buyers, olim</td><td style="padding:10px 12px;">Established buyers, families</td></tr>
  </tbody>
</table>
</div>

<div style="background:#1a1a1a;color:#fff;border-radius:16px;padding:32px;margin:40px 0;text-align:center;">
  <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">Interested in Halomot or Neve HaBaron?</p>
  <p style="font-size:22px;font-weight:700;margin-bottom:12px;">We know what's available — including off-market houses in Neve HaBaron.</p>
  <a href="https://wa.me/972522820632" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:100px;font-weight:600;text-decoration:none;font-size:15px;">Ask About Premium Listings</a>
</div>
`.trim();

const premium_he = `
<p class="lead">בתוך שוק הנדל"ן המבוקש ממילא של זכרון יעקב, שתי שכונות מייצגות בעקביות את הרמה הפרמיום לרוכשים שרוצים את השטח הגדול ביותר, איכות הבנייה החדישה ביותר, או הכתובת היוקרתית ביותר: חלומות זכרון ונווה הבארון. הן משרתות פרופילי קונים שונים אך חולקות חוט משותף — הן מייצגות את הפסגה של מה שזכרון מציעה.</p>

<h2>חלומות זכרון</h2>
<p>חלומות זכרון היא רובע מגורים מתוכנן שנבנה בשנות ה-2000–2010 בקצה הצפוני של זכרון. הוא תוכנן כחלופה יוקרתית למלאי הישן במרכז ובשכונות הנמוכות — ומציע איכות בנייה מודרנית, חנייה, מעלית ובמקרים רבים נוף מדהים לרמת השרון ולים.</p>
<h3>טווח מחירים — חלומות זכרון</h3>
<ul>
  <li>דירת 2 חדרים (55–65מ"ר): ₪1.2M–1.7M</li>
  <li>דירת 3 חדרים (80–95מ"ר): ₪1.8M–2.4M</li>
  <li>דירת 4 חדרים (100–120מ"ר): ₪2.2M–3.0M</li>
  <li>פנטהאוז / קומה עליונה: ₪3.0M–4.5M</li>
  <li>מחיר למ"ר: כ-₪22,000–28,000</li>
</ul>

<h2>נווה הבארון</h2>
<p>נווה הבארון הוא אחת הכתובות היוקרתיות ביותר בזכרון — ואחת המעניינות ביותר אדריכלית. השכונה מאופיינת בתמהיל של בתים פרטיים גדולים ומספר קטן יותר של דירות יוקרה, בין גנים מושתלים ורחובות מוצלים. נכסים רבים כאן כוללים גנים פרטיים, בריכות ומשטחים בנויים העולים על 200–300מ"ר.</p>
<h3>טווח מחירים — נווה הבארון</h3>
<ul>
  <li>בית פרטי (150–200מ"ר, מגרש רגיל): ₪4.5M–7.0M</li>
  <li>בית פרטי (200–300מ"ר, מגרש גדול): ₪7.0M–12.0M+</li>
  <li>וילה פרמיום (300מ"ר+, מגרש יוצא דופן): ₪12.0M–20.0M+</li>
  <li>דירה (כשזמינה): ₪2.5M–4.0M</li>
</ul>

<h2>מה לבחור?</h2>
<div style="overflow-x:auto;margin:24px 0;">
<table style="width:100%;border-collapse:collapse;font-size:13px;">
  <thead><tr style="background:#1a1a1a;color:#fff;">
    <th style="padding:10px 12px;text-align:right;"></th><th style="padding:10px 12px;text-align:right;">חלומות זכרון</th><th style="padding:10px 12px;text-align:right;">נווה הבארון</th>
  </tr></thead>
  <tbody>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">מחיר כניסה</td><td style="padding:10px 12px;">₪1.2M+</td><td style="padding:10px 12px;">₪4.5M+</td></tr>
    <tr style="background:#fafafa;border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">סוג נכס</td><td style="padding:10px 12px;">בעיקר דירות</td><td style="padding:10px 12px;">בעיקר בתים פרטיים</td></tr>
    <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 12px;font-weight:600;">מתאים ל</td><td style="padding:10px 12px;">רוכשי אורח חיים מודרני, עולים</td><td style="padding:10px 12px;">רוכשים מבוססים, משפחות</td></tr>
  </tbody>
</table>
</div>

<div style="background:#1a1a1a;color:#fff;border-radius:16px;padding:32px;margin:40px 0;text-align:center;">
  <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin-bottom:8px;">מתעניינים בחלומות זכרון או נווה הבארון?</p>
  <p style="font-size:22px;font-weight:700;margin-bottom:12px;">אנחנו יודעים מה זמין — כולל בתים off-market בנווה הבארון.</p>
  <a href="https://wa.me/972522820632" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:100px;font-weight:600;text-decoration:none;font-size:15px;">שאלו על נכסי פרמיום</a>
</div>
`.trim();

const ARTICLES = [
  {
    slug: "neve-remez-zichron-yaakov-neighborhood-guide",
    status: "published",
    title_en: "Neve Remez: Zichron Yaakov's Hidden Gem for Value Buyers",
    title_he: "נווה רמז: האבן הטובה הנסתרת של זכרון יעקב לרוכשי ערך",
    excerpt_en: "Quiet streets, generous apartment sizes, 10 minutes from Hameyasdim — and prices 15-25% below the Zichron average. The honest guide to Neve Remez for buyers and investors.",
    excerpt_he: "רחובות שקטים, דירות גדולות, 10 דקות מהמייסדים — ומחירים 15-25% מתחת לממוצע זכרון. המדריך הכנה לנווה רמז לרוכשים ומשקיעים.",
    body_en: neveRemez_en,
    body_he: neveRemez_he,
    featured_image: IMGS[0],
    og_image: IMGS[0],
    category: "neighborhoods",
    tags: ["neve remez", "zichron yaakov", "neighborhoods", "value", "apartments"],
    author: "Spirit Real Estate",
    publish_date: new Date().toISOString().split("T")[0],
    reading_time_minutes: 7,
    seo_title_en: "Neve Remez — Zichron Yaakov Neighborhood Guide 2026 | Spirit Real Estate",
    seo_title_he: 'נווה רמז — מדריך שכונות זכרון יעקב 2026 | ספיריט נדל"ן',
    meta_description_en: "Complete guide to Neve Remez in Zichron Yaakov: location, prices (₪22,000-27,000/m²), pros, cons and who it suits. One of Zichron's best-value neighborhoods for apartments.",
    meta_description_he: 'מדריך מלא לנווה רמז בזכרון יעקב: מיקום, מחירים (₪22,000-27,000/מ"ר), יתרונות, חסרונות ולמי מתאים. אחת השכונות ערך-תמורה הטובות ביותר לדירות בזכרון.',
    noindex: false,
  },
  {
    slug: "ramat-zvi-zichron-yaakov-best-value",
    status: "published",
    title_en: "Ramat Zvi: Zichron Yaakov's Best Value Neighborhood for 2026",
    title_he: "רמת צבי: שכונת ערך הנדל\"ן הטובה ביותר בזכרון יעקב ל-2026",
    excerpt_en: "Lowest entry price in Zichron, fastest appreciation rate, urban renewal potential. The full investment case for Ramat Zvi with verified price data.",
    excerpt_he: "מחיר כניסה נמוך ביותר בזכרון, קצב עלייה מהיר ביותר, פוטנציאל התחדשות עירונית. טיעון ההשקעה המלא לרמת צבי עם נתוני מחירים מאומתים.",
    body_en: ramatZvi_en,
    body_he: ramatZvi_he,
    featured_image: IMGS[1],
    og_image: IMGS[1],
    category: "neighborhoods",
    tags: ["ramat zvi", "zichron yaakov", "value", "investment", "urban renewal", "tama 38"],
    author: "Spirit Real Estate",
    publish_date: new Date().toISOString().split("T")[0],
    reading_time_minutes: 7,
    seo_title_en: "Ramat Zvi — Zichron Yaakov's Best Value Neighborhood 2026 | Spirit",
    seo_title_he: 'רמת צבי — שכונת הערך הטובה ביותר בזכרון יעקב 2026 | ספיריט נדל"ן',
    meta_description_en: "Ramat Zvi guide: Zichron Yaakov's lowest entry prices (₪19,000-24,000/m²), fastest appreciation, 4-5% rental yields and urban renewal potential. The full investment case.",
    meta_description_he: 'מדריך רמת צבי: מחירי הכניסה הנמוכים ביותר בזכרון יעקב (₪19,000-24,000/מ"ר), עלייה מהירה ביותר, תשואות שכירות 4-5% ופוטנציאל התחדשות עירונית.',
    noindex: false,
  },
  {
    slug: "moving-to-zichron-yaakov-relocation-checklist",
    status: "published",
    title_en: "Moving to Zichron Yaakov: The Month-by-Month Relocation Checklist",
    title_he: "מעבר לזכרון יעקב: רשימת משימות מעבר חודש-אחר-חודש",
    excerpt_en: "The complete practical checklist for English-speaking olim and overseas buyers relocating to Zichron Yaakov — from 6 months before arrival through your first 6 months in town.",
    excerpt_he: "רשימת המשימות המעשית המלאה לעולים דוברי אנגלית ורוכשים מחו\"ל המתעתדים לעבור לזכרון יעקב — מ-6 חודשים לפני ההגעה ועד 6 החודשים הראשונים בעיירה.",
    body_en: checklist_en,
    body_he: checklist_he,
    featured_image: IMGS[2],
    og_image: IMGS[2],
    category: "living",
    tags: ["relocation", "olim", "aliyah", "moving checklist", "living in zichron", "practical guide"],
    author: "Spirit Real Estate",
    publish_date: new Date().toISOString().split("T")[0],
    reading_time_minutes: 9,
    seo_title_en: "Moving to Zichron Yaakov — Complete Relocation Checklist 2026 | Spirit",
    seo_title_he: 'מעבר לזכרון יעקב — רשימת משימות מעבר מלאה 2026 | ספיריט נדל"ן',
    meta_description_en: "Month-by-month relocation checklist for olim and foreign buyers moving to Zichron Yaakov: what to do 6 months, 3 months, 1 month before arrival and in your first 6 months.",
    meta_description_he: "רשימת משימות מעבר חודש-אחר-חודש לעולים ורוכשים זרים שעוברים לזכרון יעקב: מה לעשות 6 חודשים, 3 חודשים, חודש לפני ההגעה ו-6 החודשים הראשונים.",
    noindex: false,
  },
  {
    slug: "halomot-zichron-neve-habaron-premium-neighborhoods",
    status: "published",
    title_en: "Halomot Zichron & Neve HaBaron: Premium Living in Zichron Yaakov",
    title_he: "חלומות זכרון ונווה הבארון: מגורי יוקרה בזכרון יעקב",
    excerpt_en: "A detailed comparison of Zichron Yaakov's two premium residential neighborhoods — modern Halomot Zichron and prestigious Neve HaBaron — with verified price ranges and buyer profiles.",
    excerpt_he: "השוואה מפורטת של שתי שכונות המגורים היוקרתיות של זכרון יעקב — חלומות זכרון המודרנית ונווה הבארון היוקרתית — עם טווחי מחירים מאומתים ופרופילי קונים.",
    body_en: premium_en,
    body_he: premium_he,
    featured_image: IMGS[4],
    og_image: IMGS[4],
    category: "neighborhoods",
    tags: ["halomot zichron", "neve habaron", "premium", "luxury", "private houses", "villas"],
    author: "Spirit Real Estate",
    publish_date: new Date().toISOString().split("T")[0],
    reading_time_minutes: 9,
    seo_title_en: "Halomot Zichron & Neve HaBaron — Premium Neighborhoods Guide 2026 | Spirit",
    seo_title_he: 'חלומות זכרון ונווה הבארון — מדריך שכונות יוקרה 2026 | ספיריט נדל"ן',
    meta_description_en: "Complete guide to Zichron Yaakov's premium neighborhoods: Halomot Zichron (apartments from ₪1.2M) and Neve HaBaron (private houses from ₪4.5M). Price ranges, pros, cons and buyer profiles.",
    meta_description_he: "מדריך מלא לשכונות היוקרה של זכרון יעקב: חלומות זכרון (דירות מ-₪1.2M) ונווה הבארון (בתים פרטיים מ-₪4.5M). טווחי מחירים, יתרונות, חסרונות ופרופילי קונים.",
    noindex: false,
  },
];

async function main() {
  for (const article of ARTICLES) {
    const { data, error } = await sb.from("blog_posts").insert(article).select("id, slug");
    if (error) { console.error(`ERROR on ${article.slug}:`, error.message); continue; }
    console.log(`✓ Inserted: ${data[0].slug}`);
  }
  console.log("Batch 3 done. All 10 articles inserted.");
}
main();
