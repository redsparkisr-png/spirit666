import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import spiritLogo from "@/assets/spirit-logo.jpg";
import hagitImg from "@/assets/hagit-cohen-morgan.png";
import aviImg from "@/assets/avi-suliman.png";
import eliranImg from "@/assets/eliran-amsalem.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import lifestyle4 from "@/assets/lifestyle-4.jpg";
import lifestyle5 from "@/assets/lifestyle-5.jpg";
import lifestyle6 from "@/assets/lifestyle-6.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import sold1 from "@/assets/sold-1.jpg";
import sold2 from "@/assets/sold-2.jpg";
import sold3 from "@/assets/sold-3.jpg";
import sold4 from "@/assets/sold-4.jpg";

/* ─── tiny helpers ─── */
const Divider = () => (
  <div className="w-full flex items-center gap-4 my-16 md:my-20">
    <span className="flex-1 h-px bg-border" />
    <span className="w-2 h-2 rotate-45 border border-gold bg-transparent" />
    <span className="flex-1 h-px bg-border" />
  </div>
);

const SectionBadge = ({ n, label }: { n: string; label: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-sm font-semibold">
      {n}
    </span>
    <span className="text-xs tracking-[0.25em] uppercase font-body text-muted-foreground">{label}</span>
  </div>
);

const GuideImage = ({ src, caption, aspect = "16/9" }: { src: string; caption: string; aspect?: string }) => (
  <figure className="my-8">
    <div
      className="w-full rounded-lg overflow-hidden border border-border"
      style={{ aspectRatio: aspect }}
    >
      <img src={src} alt={caption} className="w-full h-full object-cover" loading="lazy" />
    </div>
    <figcaption className="text-xs text-muted-foreground/70 font-body italic mt-2 text-center">{caption}</figcaption>
  </figure>
);

const StatCard = ({ value, label, light = false }: { value: string; label: string; light?: boolean }) => (
  <div className="text-center p-4">
    <p className={`font-display text-2xl md:text-3xl font-semibold ${light ? "text-primary-foreground" : "text-foreground"}`}>{value}</p>
    <p className={`text-xs font-body mt-1 leading-snug ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{label}</p>
  </div>
);

const ProConList = ({ pros, cons }: { pros: string[]; cons: string[] }) => (
  <div className="grid md:grid-cols-2 gap-4 my-6">
    <div className="space-y-2">
      {pros.map((p, i) => (
        <p key={i} className="font-body text-sm flex gap-2"><span className="text-primary font-semibold shrink-0">✓</span>{p}</p>
      ))}
    </div>
    <div className="space-y-2">
      {cons.map((c, i) => (
        <p key={i} className="font-body text-sm flex gap-2"><span className="text-destructive font-semibold shrink-0">✗</span>{c}</p>
      ))}
    </div>
  </div>
);

const QuoteBlock = ({ quote, source }: { quote: string; source: string }) => (
  <blockquote className="border-l-4 border-gold pl-6 py-4 my-10">
    <p className="font-display italic text-lg md:text-xl text-foreground leading-relaxed">"{quote}"</p>
    <cite className="block mt-3 text-xs font-body text-muted-foreground not-italic">— {source}</cite>
  </blockquote>
);

const FooterLine = () => (
  <p className="text-[10px] text-muted-foreground/40 font-body text-center mt-10">
    spirit-homes-guide.lovable.app &nbsp;·&nbsp; © 2026 Spirit Real Estate. All rights reserved.
  </p>
);

/* ─── MAIN PAGE ─── */
const BuyerGuide2026 = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = "Zichron Yaakov Buyer Blueprint 2026 — Spirit Real Estate";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "The definitive guide for English-speaking Olim buying real estate in Zichron Yaakov, Israel. Market data, neighborhood profiles, tax benefits & buying roadmap.");
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.createElement("meta"); robots.setAttribute("name", "robots"); document.head.appendChild(robots); }
    robots.setAttribute("content", "noindex, nofollow");
    return () => { robots?.setAttribute("content", "index, follow"); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ═══════════════════════════════════════════
          COVER PAGE
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-charcoal/95" />
        </div>
        <div className="relative z-10 container px-6 py-24 md:py-36 flex flex-col items-center text-center">
          <p className="text-xs tracking-[0.35em] uppercase font-body text-gold mb-6">
            Spirit Real Estate · Boutique Property · Zichron Yaakov
          </p>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-primary-foreground mb-4">
            Zichron Yaakov<br />
            <span className="text-gold">Buyer Blueprint</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-xl mt-4 mb-12">
            The Definitive Guide for English-Speaking Olim<br />
            Buying Real Estate in Israel's Most Coveted Moshava
          </p>

          {/* Hero stats — light variant for readability on dark bg */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border border-primary-foreground/20 rounded-xl p-6 md:p-8 bg-primary-foreground/5 backdrop-blur-sm max-w-3xl w-full">
            <StatCard value="₪27,400" label="Avg ₪/m² — Q1 2025" light />
            <StatCard value="+13.5%" label="Year-on-Year Growth" light />
            <StatCard value="22%" label="Foreign Buyers" light />
            <StatCard value="15–20%" label="English Speakers" light />
          </div>

          <div className="mt-12 flex flex-col items-center gap-3">
            <span className="text-xs tracking-[0.3em] uppercase font-body text-gold/80">Edition 2026</span>
            <p className="text-xs font-body text-primary-foreground/50">Boutique Real Estate · Personalized Guidance · Off-Market Access</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BODY — constrained width for editorial feel
      ═══════════════════════════════════════════ */}
      <div className="container px-6 max-w-3xl mx-auto py-16 md:py-24">

        {/* ── TABLE OF CONTENTS ── */}
        <section>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-muted-foreground mb-3">Table of Contents</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-10">Inside This Guide</h2>
          <ol className="space-y-3 font-body text-foreground">
            {[
              "Why Zichron Yaakov — The Investment Case",
              "The Anglo Olim Experience",
              "The Lifestyle: Promenade, Wine & Culture",
              "Ramat HaNadiv & Nature",
              "Education — Schools & Youth",
              "Neighborhood Deep Dive with Price Data",
              "Market Data: Prices, Trends & Transactions",
              "The Investment & Airbnb Angle",
              "Olim Tax Benefits & Purchase Process 2026",
              "Conservation, Planning & Future Growth",
              "Critical Mistakes to Avoid",
              "Your Step-by-Step Buying Roadmap",
              "Why Spirit Real Estate",
            ].map((t, i) => (
              <li key={i} className="flex items-baseline gap-4 group">
                <span className="font-display font-semibold text-gold w-8 text-right shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 border-b border-dotted border-border group-hover:border-gold transition-colors pb-1">{t}</span>
              </li>
            ))}
          </ol>
        </section>

        <Divider />

        {/* ── 01: WHY ZICHRON YAAKOV ── */}
        <section>
          <SectionBadge n="01" label="The Investment Case" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">Why Zichron Yaakov</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">The Investment Case for Israel's Most Coveted Moshava</p>

          <GuideImage src={lifestyle1} caption="The iconic wine-barrel welcome sign at the entrance to Zichron Yaakov" />

          <div className="font-body text-foreground space-y-5 leading-relaxed">
            <p>When people picture buying property in Israel, Tel Aviv and Jerusalem dominate the conversation. But for those who dream of a quieter life — where Mediterranean views replace skyscrapers, where vineyards line the hillsides and history breathes through every cobblestone — there is another option. And it is quickly becoming the preferred destination for discerning buyers from North America, Canada, and the UK.</p>
            <p>Zichron Yaakov sits on the southern ridge of Mount Carmel, 35 km south of Haifa and 70 km north of Tel Aviv. Founded in 1882 by Romanian Jewish pioneers and transformed by Baron Edmond de Rothschild — who brought in French vintners and planted Israel's first serious vineyards — the town has always occupied a singular position: historic, beautiful, and immune to the homogenizing pressures of mass development.</p>
            <p>Today, that scarcity is its greatest asset. Strict conservation laws limit new construction. Supply is chronically tight. And demand — from affluent Israelis, returning diaspora, and English-speaking Olim — has never been stronger.</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card rounded-xl border border-border p-6 my-10">
            <StatCard value="₪27,400" label="Avg price per m² — Q1 2025" />
            <StatCard value="+13.5%" label="Year-on-year price growth" />
            <StatCard value="192" label="Transactions in Q1 2025 alone" />
            <StatCard value="22%" label="Foreign buyers — Americans lead" />
          </div>

          <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-5">Five Reasons This Market Outperforms</h3>
          <ul className="space-y-4 font-body text-foreground">
            {[
              ["Constrained supply.", "Conservation bylaws prevent speculative development. Every property that sells is genuinely irreplaceable."],
              ["Growing Anglo community.", "Between 15–20% of residents are native English speakers — one of the highest ratios in Israel."],
              ["Tourism & wine economy.", "The Wine Route, Ramat HaNadiv, and boutique hospitality create year-round rental demand."],
              ["Remote-work tailwind.", "Professionals no longer need Tel Aviv. Zichron, 45 min by train, is capturing this demographic shift."],
              ["Infrastructure investment.", "A modernized train station, Route 6 access, and planned employment zones drive long-term appreciation."],
            ].map(([bold, rest], i) => (
              <li key={i} className="flex gap-3">
                <span className="text-gold mt-1 shrink-0">▸</span>
                <span><strong>{bold}</strong> {rest}</span>
              </li>
            ))}
          </ul>

          <QuoteBlock
            quote="Zichron offers the possibility of house-style living — something nearly out of reach in Tel Aviv unless you're willing to pay several times the price."
            source="Ynet News, October 2025"
          />
        </section>

        <Divider />

        {/* ── 02: THE ANGLO OLIM EXPERIENCE ── */}
        <section>
          <SectionBadge n="02" label="Your Soft Landing" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">The Anglo Olim Experience</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">Your Soft Landing on the Carmel</p>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <GuideImage src={lifestyle2} caption="Signpost pointing to Ramat HaNadiv and the promenade" aspect="4/3" />
            <GuideImage src={lifestyle3} caption="The historic Sha'ar Yishai gate — entrance to the Moshava" aspect="4/3" />
          </div>

          <div className="font-body text-foreground space-y-5 leading-relaxed">
            <p>For English-speaking families making Aliyah, the first question is rarely about property prices. It is about belonging. Will my children find friends? Will I find a synagogue? Can I navigate daily life before my Hebrew is conversational? In Zichron Yaakov, the answer to all three questions is an emphatic yes.</p>

            <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">The "Israeli Five Towns"</h3>
            <p>American immigrants have given the Zichron–Caesarea–Binyamina–Hadera–Pardes Hana corridor an affectionate nickname: the Five Towns. Named for the famous Orthodox enclave in Long Island, the comparison is apt. The area contains a critical mass of English speakers, multiple Jewish communities across the observance spectrum, and a social infrastructure that makes the transition to Israeli life far gentler than arriving in a Hebrew-only city.</p>
            <p>Zichron itself hosts the ESRA Five Towns branch, an active Chabad, Nefesh B'Nefesh community events, and the "Five Towns" email list connecting thousands of Anglos across the region.</p>

            <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">The Anglo Infrastructure</h3>
            <ul className="space-y-2">
              {[
                "ESRA Five Towns: English-language social events, secondhand bookshop, welfare support",
                "Nefesh B'Nefesh: \"Thousands of NBN Olim\" registered in Zichron area",
                "Municipal Liaison to New Immigrants: Dedicated integration office",
                "Healthcare in English: Maccabi, Clalit, and Meuchedet all represented locally",
                "Hillel Yaffe Hospital in Hadera — 15 minutes away with English-speaking staff",
                "Community networks: \"Secret Five T's\" Facebook group, WhatsApp networks, NBN Go North",
                "Religious pluralism: Secular, Dati Leumi, Chabad, Reform, Conservative — all present",
              ].map((item, i) => (
                <li key={i} className="flex gap-3"><span className="text-gold shrink-0">▸</span><span>{item}</span></li>
              ))}
            </ul>
          </div>

          <QuoteBlock
            quote="Olim feel a sense of belonging in the community almost immediately upon arrival."
            source="Nefesh B'Nefesh Community Guide, 2025"
          />
        </section>

        <Divider />

        {/* ── 03: THE LIFESTYLE ── */}
        <section>
          <SectionBadge n="03" label="Promenade, Wine & Culture" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">The Lifestyle</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">Promenade, Wine & Boutique Culture</p>

          <GuideImage src={lifestyle4} caption="HaMeyasdim Street (The Founders' Promenade) — the heart of the Moshava" />

          <div className="font-body text-foreground space-y-5 leading-relaxed">
            <p>Most people discover Zichron as tourists and never quite recover from it. The cobblestone Midrachov runs through the historic center like a stage set from a Provence village — gallery windows catching afternoon light, the smell of fresh espresso, the sound of a violin from inside a courtyard. For residents, this is simply Tuesday.</p>

            <div className="grid md:grid-cols-2 gap-4 my-8">
              <GuideImage src={lifestyle5} caption="Carmel Winery, established 1882 — one of Israel's oldest" aspect="4/3" />
              <GuideImage src={lifestyle6} caption="Hotel Syr — boutique hospitality on the Midrachov" aspect="4/3" />
            </div>

            <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">The Wine Route & Wineries</h3>
            <p>Zichron is home to three major wineries — Tishbi Estate (the largest single-family winery in Israel), Carmel Winery (founded 1882), and nearby Binyamina Winery — plus a constellation of boutique producers in the surrounding hills. Residents participate in private barrel tastings, harvest events, and the annual Wine Festival.</p>

            <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">The Hidden Courtyards (Chatzerot)</h3>
            <p>Zichron's greatest secret is its courtyards — the "chatzerot" tucked behind the main street. These former farmyards have become galleries, weaving workshops, ceramics studios, and artisan boutiques. Property adjacent to these courtyards commands significant premiums precisely because access to this texture cannot be replicated in any new development.</p>
          </div>

          {/* Attractions table */}
          <div className="overflow-x-auto my-10">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-3 font-semibold">Attraction</th>
                  <th className="text-left p-3 font-semibold">Details</th>
                  <th className="text-left p-3 font-semibold">Distance</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["HaMeyasdim Promenade", "Boutique shops, galleries, wine bars, cafes", "In town"],
                  ["Tishbi Estate Winery", "Vineyard tours, Vinotherapy Spa, fine dining", "5 min"],
                  ["Carmel Winery", "Historic winery est. 1882, tours & shop", "In town"],
                  ["Ramat HaNadiv", "450-acre Rothschild gardens & nature park", "10 min"],
                  ["Dor-Habonim Beach", "Protected coves, crystal Mediterranean water", "10 min"],
                  ["First Aliyah Museum", "World-class heritage museum, English tours", "In town"],
                  ["Caesarea", "Roman amphitheater, marina, fine dining", "20 min"],
                  ["Haifa", "Bahá'í Gardens, hospitals, shopping, nightlife", "30 min"],
                  ["Tel Aviv", "City center, Ben Gurion Airport", "45 min by train"],
                ].map(([a, d, dist], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-sand-light"}>
                    <td className="p-3 font-semibold">{a}</td>
                    <td className="p-3 text-muted-foreground">{d}</td>
                    <td className="p-3">{dist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider />

        {/* ── 04: RAMAT HANADIV ── */}
        <section>
          <SectionBadge n="04" label="The Green Heart" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">Ramat HaNadiv</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">A World-Class Nature Reserve</p>

          <GuideImage src={property1} caption="View of Zichron Yaakov from the surrounding Carmel hills — a town wrapped in green" />

          <div className="font-body text-foreground space-y-5 leading-relaxed">
            <p>Directly adjacent to Zichron's southern edge lies Ramat HaNadiv — a 450-acre memorial park and nature reserve established by the Rothschild family. It is the resting place of Baron Edmond and his wife Adelaide, and for Zichron residents, it is their backyard.</p>
            <ul className="space-y-2">
              {[
                "Fragrance Garden: Designed for the visually impaired, with labeled aromatic plants in Hebrew, Arabic and Braille",
                "Waterfall Garden: Cascading terraces and reflection pools",
                "Rose Garden: Thousands of species; peak bloom in spring",
                "Rothschild Memorial: The Baron and Baroness's resting place — a deeply moving landmark",
                "Nature Reserve: Kilometers of marked hiking and cycling trails through Mediterranean forest",
                "Hanadiv Farm: Working farm with pick-your-own produce and petting zoo — ideal for families",
                "Cultural Events: Outdoor concerts, film screenings (English subtitles), volunteer programs",
                "Druze Food Stand: Authentic Druze cuisine — a beloved weekend institution for locals",
              ].map((item, i) => (
                <li key={i} className="flex gap-3"><span className="text-gold shrink-0">▸</span><span>{item}</span></li>
              ))}
            </ul>
          </div>

          <QuoteBlock
            quote="Over an area of 450 acres just south of Zichron, the Ramat HaNadiv is the fulfillment of the Baron's vision for a peaceful and tranquil place for people, plants, and animals."
            source="My Israel Property"
          />
        </section>

        <Divider />

        {/* ── 05: EDUCATION ── */}
        <section>
          <SectionBadge n="05" label="Schools & Youth" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">Education</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">Schools, Youth Programs & Learning Options</p>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <GuideImage src={property2} caption="The First Aliyah Museum — world-class heritage, English-language tours" aspect="4/3" />
            <GuideImage src={property3} caption="Historic mural in the town center depicting Baron de Rothschild" aspect="4/3" />
          </div>

          <p className="font-body text-foreground leading-relaxed mb-8">Zichron Yaakov ranks 8 out of 10 on Israel's national socio-economic index, and its schools reflect that standing. The town offers a genuine spectrum of educational philosophies, ensuring virtually every family finds the right fit.</p>

          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-3 font-semibold">School</th>
                  <th className="text-left p-3 font-semibold">Character</th>
                  <th className="text-left p-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Nili Elementary", "Secular state", "Largest; strong academic reputation"],
                  ["HaChoresh Elementary", "Secular state", "Strong science program; popular with Anglo families"],
                  ["HaChita Elementary", "Secular state", "Central location; walkable from Historic Center"],
                  ["Keshet", "Democratic & pluralistic", "Open pedagogy; popular with progressive families"],
                  ["Yavetz", "Religious (Dati Leumi)", "Active observant community; strong Zionist ethos"],
                ].map(([s, c, n], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-sand-light"}>
                    <td className="p-3 font-semibold">{s}</td>
                    <td className="p-3 text-muted-foreground">{c}</td>
                    <td className="p-3">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-2 font-body text-foreground">
            {[
              "7 secondary schools including democratic and pluralistic models",
              "Tzofim (Scouts) and Bnei Akiva — both very active chapters",
              "Advanced skate park in Chalomot neighborhood",
              "Rich arts program: music, drama, and visual arts academies",
              "Multiple sports clubs: basketball, football, martial arts, swimming",
            ].map((item, i) => (
              <li key={i} className="flex gap-3"><span className="text-gold shrink-0">▸</span><span>{item}</span></li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* ── 06: NEIGHBORHOOD DEEP DIVE ── */}
        <section>
          <SectionBadge n="06" label="Neighborhoods & Prices" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">Neighborhood Deep Dive</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">Profiles, Character & Price Data</p>

          <p className="font-body text-foreground leading-relaxed mb-10">Zichron Yaakov is not a monolithic market. Its eight distinct neighborhoods each attract a different buyer, offer a different lifestyle, and carry a different price point. Understanding which neighborhood aligns with your priorities is the single most important decision in your buying process.</p>

          {/* Historic Center */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-2xl font-semibold text-foreground">The Historic Center (HaMoshava)</h3>
              <span className="text-sm font-body font-semibold text-primary">↑ +15% YoY</span>
            </div>
            <p className="text-sm font-body text-muted-foreground mb-4">Historic stone homes, villas, low-rise apartments</p>
            <div className="grid grid-cols-2 gap-4 bg-sand-light rounded-lg p-4 mb-6">
              <div><p className="text-xs text-muted-foreground font-body">Price per m²</p><p className="font-display font-semibold text-foreground">₪32,000–₪45,000</p></div>
              <div><p className="text-xs text-muted-foreground font-body">Total range</p><p className="font-display font-semibold text-foreground">₪5.3M–₪14M</p></div>
            </div>
            <GuideImage src={property4} caption="The historic gate leading into the Moshava's main street" aspect="16/9" />
            <p className="font-body text-foreground leading-relaxed mb-4">The irreplaceable heart of Zichron. Stone farmhouses from the 1880s, authentic courtyards, and full walkability to the Midrachov. Conservation laws make this effectively impossible to replicate. Properties sell in an average of 65 days — down from 90 two years ago.</p>
            <ProConList
              pros={["Maximum capital appreciation and strongest scarcity premium", "Fully walkable to all services, cafes, galleries, and restaurants", "Heritage architecture with genuine investment-grade value", "Strongest short-term rental (Airbnb) performance"]}
              cons={["Strict conservation limits on renovations", "Parking is limited", "Highest entry price in Zichron"]}
            />
            <p className="text-sm font-body text-muted-foreground italic">Ideal for: Empty nesters, retirees, Airbnb investors, heritage property enthusiasts</p>
          </div>

          {/* Neve HaBaron */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-2xl font-semibold text-foreground">Neve HaBaron</h3>
              <span className="text-sm font-body font-semibold text-primary">↑ +12% YoY</span>
            </div>
            <p className="text-sm font-body text-muted-foreground mb-4">Villas on large plots, Ramat HaNadiv border</p>
            <div className="grid grid-cols-2 gap-4 bg-sand-light rounded-lg p-4 mb-6">
              <div><p className="text-xs text-muted-foreground font-body">Price per m²</p><p className="font-display font-semibold text-foreground">₪28,000–₪38,000</p></div>
              <div><p className="text-xs text-muted-foreground font-body">Total range</p><p className="font-display font-semibold text-foreground">₪5M–₪11M</p></div>
            </div>
            <p className="font-body text-foreground leading-relaxed mb-4">An old, quiet, prestigious neighborhood whose western edge borders directly on Ramat HaNadiv nature reserve. Large plots, exceptional privacy, and verdant surroundings make it a favorite of international buyers. Most transactions happen off-market.</p>
            <ProConList
              pros={["Private estate feel with direct nature reserve access", "Large plots available — rare in Israel", "Off-market deal flow; strong insider network needed"]}
              cons={["Car-dependent for daily errands", "Distance from the Midrachov", "Limited supply — patience required"]}
            />
            <p className="text-sm font-body text-muted-foreground italic">Ideal for: International buyers, privacy seekers, nature lovers</p>
          </div>

          {/* HaShmura */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-2xl font-semibold text-foreground">HaShmura</h3>
              <span className="text-sm font-body font-semibold text-primary">↑ +11% YoY</span>
            </div>
            <p className="text-sm font-body text-muted-foreground mb-4">Villas and semi-detached homes, cliff-edge location</p>
            <div className="grid grid-cols-2 gap-4 bg-sand-light rounded-lg p-4 mb-6">
              <div><p className="text-xs text-muted-foreground font-body">Price per m²</p><p className="font-display font-semibold text-foreground">₪26,000–₪35,000</p></div>
              <div><p className="text-xs text-muted-foreground font-body">Total range</p><p className="font-display font-semibold text-foreground">₪4.5M–₪9M</p></div>
            </div>
            <GuideImage src={property5} caption="Typical HaShmura street with Mediterranean views at the end" aspect="16/9" />
            <p className="font-body text-foreground leading-relaxed mb-4">Perched on the natural escarpment overlooking the coastal plain, HaShmura offers some of Zichron's most dramatic sea views. Underground utilities, manicured streets, a local commercial center with café and gym, and a socially active, affluent community.</p>
            <ProConList
              pros={["Exceptional 180° Mediterranean sea views", "Underground infrastructure — no overhead wires", "Active community with commercial amenities on-site"]}
              cons={["Car required for most errands", "View premium means higher entry price"]}
            />
            <p className="text-sm font-body text-muted-foreground italic">Ideal for: View-buyers, professionals, active social families</p>
          </div>

          {/* Givat Eden */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-2xl font-semibold text-foreground">Givat Eden</h3>
              <span className="text-sm font-body font-semibold text-primary">↑ +10% YoY</span>
            </div>
            <p className="text-sm font-body text-muted-foreground mb-4">Luxury villas on large plots, northernmost ridge</p>
            <div className="grid grid-cols-2 gap-4 bg-sand-light rounded-lg p-4 mb-6">
              <div><p className="text-xs text-muted-foreground font-body">Price per m²</p><p className="font-display font-semibold text-foreground">₪24,000–₪34,000</p></div>
              <div><p className="text-xs text-muted-foreground font-body">Total range</p><p className="font-display font-semibold text-foreground">₪6.5M–₪9.6M</p></div>
            </div>
            <p className="font-body text-foreground leading-relaxed mb-4">An elite enclave on Zichron's northern tip offering sweeping panoramas of Haifa Bay and the Carmel ridge. Wide streets, large parks, and a suburban atmosphere attract academics and professionals. The Horesh school sits at the entrance.</p>
            <ProConList
              pros={["Stunning 270° views of Haifa Bay and Carmel", "Large plots and private yards — rare in Israel", "HaChoresh school literally on the doorstep"]}
              cons={["Isolated — car essential for everything", "Most expensive villa segment in Zichron"]}
            />
            <p className="text-sm font-body text-muted-foreground italic">Ideal for: Families with school-age children, view-seekers, villa buyers</p>
          </div>

          {/* Chalomot Zichron */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-2xl font-semibold text-foreground">Chalomot Zichron</h3>
              <span className="text-sm font-body font-semibold text-primary">↑ +9% YoY</span>
            </div>
            <p className="text-sm font-body text-muted-foreground mb-4">Modern apartments, duplexes, garden units</p>
            <div className="grid grid-cols-2 gap-4 bg-sand-light rounded-lg p-4 mb-6">
              <div><p className="text-xs text-muted-foreground font-body">Price per m²</p><p className="font-display font-semibold text-foreground">₪18,000–₪26,000</p></div>
              <div><p className="text-xs text-muted-foreground font-body">Total range</p><p className="font-display font-semibold text-foreground">₪2.8M–₪5.5M</p></div>
            </div>
            <p className="font-body text-foreground leading-relaxed mb-4">Zichron's largest modern neighborhood — ~800 units built in a terraced, rural style on the eastern slopes. A 25-dunam central park, an advanced skate park, a Maccabi clinic, and quick access to Binyamina train station make this the most accessible entry point for first-time buyers.</p>
            <ProConList
              pros={["Most accessible price point in Zichron", "Modern construction with no heritage restrictions", "25-dunam park and skate park on site", "Closest neighborhood to Binyamina rail"]}
              cons={["Further from the historic center and Midrachov", "Less boutique character"]}
            />
            <p className="text-sm font-body text-muted-foreground italic">Ideal for: Young families, first-time buyers, budget-conscious Olim</p>
          </div>

          {/* Zammarin */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-2xl font-semibold text-foreground">Zammarin (Historic Quarter)</h3>
              <span className="text-sm font-body font-semibold text-primary">↑ +11% YoY</span>
            </div>
            <p className="text-sm font-body text-muted-foreground mb-4">Original stone homes, hilltop character properties</p>
            <div className="grid grid-cols-2 gap-4 bg-sand-light rounded-lg p-4 mb-6">
              <div><p className="text-xs text-muted-foreground font-body">Price per m²</p><p className="font-display font-semibold text-foreground">₪22,000–₪32,000</p></div>
              <div><p className="text-xs text-muted-foreground font-body">Total range</p><p className="font-display font-semibold text-foreground">₪3.5M–₪7M</p></div>
            </div>
            <p className="font-body text-foreground leading-relaxed mb-4">The ancient Aramaic name of Zichron — meaning "winegrowers" — lives on in this bohemian hilltop quarter above the original Carmel Winery. Original stone architecture, winding alleys, and an artistic community create a character that cannot be replicated. Strong STR potential.</p>
            <ProConList
              pros={["Unique bohemian-artistic character", "19th-century heritage architecture", "Strong short-term rental income potential"]}
              cons={["Properties typically require renovation investment", "Conservation restrictions on changes"]}
            />
            <p className="text-sm font-body text-muted-foreground italic">Ideal for: Creatives, Airbnb investors, heritage property enthusiasts</p>
          </div>

          {/* Neve Ramz & Neve Sharet */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-2xl font-semibold text-foreground">Neve Ramz & Neve Sharet</h3>
              <span className="text-sm font-body font-semibold text-primary">↑ +8% YoY</span>
            </div>
            <p className="text-sm font-body text-muted-foreground mb-4">Older attached homes, urban renewal opportunity</p>
            <div className="grid grid-cols-2 gap-4 bg-sand-light rounded-lg p-4 mb-6">
              <div><p className="text-xs text-muted-foreground font-body">Price per m²</p><p className="font-display font-semibold text-foreground">₪14,000–₪20,000</p></div>
              <div><p className="text-xs text-muted-foreground font-body">Total range</p><p className="font-display font-semibold text-foreground">₪1.8M–₪3.5M</p></div>
            </div>
            <p className="font-body text-foreground leading-relaxed mb-4">Southern neighborhoods undergoing genuine urban renewal, fueled by proximity to the planned Wine Park project. The most affordable entry into the Zichron market, with meaningful upside as infrastructure improves.</p>
            <ProConList
              pros={["Lowest entry price in Zichron", "Upside potential from Wine Park project (2026–2028)", "Established neighborhood with community roots"]}
              cons={["Older housing stock requiring renovation budget", "Less prestigious address"]}
            />
            <p className="text-sm font-body text-muted-foreground italic">Ideal for: Value investors, first-time buyers with renovation appetite</p>
          </div>

          {/* Villas in HaHoresh */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-2xl font-semibold text-foreground">Villas in HaHoresh</h3>
              <span className="text-sm font-body font-semibold text-primary">↑ +10% YoY</span>
            </div>
            <p className="text-sm font-body text-muted-foreground mb-4">Low-density villas on large plots, forested setting</p>
            <div className="grid grid-cols-2 gap-4 bg-sand-light rounded-lg p-4 mb-6">
              <div><p className="text-xs text-muted-foreground font-body">Price per m²</p><p className="font-display font-semibold text-foreground">₪22,000–₪30,000</p></div>
              <div><p className="text-xs text-muted-foreground font-body">Total range</p><p className="font-display font-semibold text-foreground">₪4M–₪8M</p></div>
            </div>
            <p className="font-body text-foreground leading-relaxed mb-4">A pastoral northern neighborhood bordering the HaChoresh school and open green space. Low-density construction on generous plots, a quiet residential character, and proximity to nature make it ideal for families with young children who want the Zichron lifestyle without the tourist footfall.</p>
            <ProConList
              pros={["Large plots in forested setting", "Quiet, safe, child-friendly environment", "HaChoresh school adjacent"]}
              cons={["Car required", "Less walkable than Historic Center"]}
            />
            <p className="text-sm font-body text-muted-foreground italic">Ideal for: Families with young children, space and quiet seekers</p>
          </div>
        </section>

        <Divider />

        {/* ── 07: MARKET DATA ── */}
        <section>
          <SectionBadge n="07" label="Prices & Trends" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">Market Data</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">Prices, Trends & Real Transactions 2025–2026</p>

          <GuideImage src={sold1} caption="Hillside residential panorama — villas and homes cascading down the Carmel slopes" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card rounded-xl border border-border p-6 my-10">
            <StatCard value="₪3.67M" label="Average property price" />
            <StatCard value="+15.9%" label="Transaction volume YoY" />
            <StatCard value="65 days" label="Avg days on market" />
            <StatCard value="192" label="Total Q1 2025 transactions" />
          </div>

          <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-5">Price Per Square Meter by Area (2025–2026)</h3>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-3 font-semibold">Neighborhood</th>
                  <th className="text-left p-3 font-semibold">Property Type</th>
                  <th className="text-left p-3 font-semibold">₪/m² Range</th>
                  <th className="text-left p-3 font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Historic Center", "Villas & apartments", "₪32,000–₪45,000", "↑ Strong"],
                  ["Neve HaBaron", "Estate villas", "₪28,000–₪38,000", "↑ Strong"],
                  ["HaShmura", "Villas, semi-detached", "₪26,000–₪35,000", "↑ Steady"],
                  ["Givat Eden", "Luxury villas", "₪24,000–₪34,000", "↑ Steady"],
                  ["Zammarin", "Heritage stone homes", "₪22,000–₪32,000", "↑ Steady"],
                  ["Villas in HaHoresh", "Low-density villas", "₪22,000–₪30,000", "↑ Steady"],
                  ["Chalomot Zichron", "Apartments & duplexes", "₪18,000–₪26,000", "↑ Moderate"],
                  ["Neve Ramz / Neve Sharet", "Older attached homes", "₪14,000–₪20,000", "↑ Developing"],
                ].map(([n, t, p, tr], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-sand-light"}>
                    <td className="p-3 font-semibold">{n}</td>
                    <td className="p-3 text-muted-foreground">{t}</td>
                    <td className="p-3">{p}</td>
                    <td className="p-3 text-primary font-semibold">{tr}</td>
                  </tr>
                ))}
                <tr className="bg-primary/5 font-semibold">
                  <td className="p-3">Town Average</td>
                  <td className="p-3">All categories</td>
                  <td className="p-3">₪27,400</td>
                  <td className="p-3 text-primary">↑ +13.5% YoY</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-5">Verified Real Transactions (Actual Closing Prices)</h3>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-3 font-semibold">Property</th>
                  <th className="text-left p-3 font-semibold">Location</th>
                  <th className="text-left p-3 font-semibold">Closing Price</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["5 rooms, 180m², full renovation", "Maaleh HaCarmel St.", "₪6,000,000"],
                  ["5 rooms, 177m², garden apartment, sea view", "HaMeyasdim area", "₪5,320,000"],
                  ["6 rooms, 131m², semi-detached cottage", "Sderot Nili", "₪3,290,000"],
                  ["5 rooms, 150m², new construction", "Villot BaHoresh", "₪5,200,000"],
                  ["Villa, 235m² on 600m² plot, pool, sea view", "Givat Eden", "₪7,900,000"],
                  ["Villa, 250m² on 500m² plot, pool", "Central Moshava", "₪7,800,000"],
                  ["3 rooms, 70m², gut renovation", "Historic Center", "₪2,100,000"],
                ].map(([p, l, c], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-sand-light"}>
                    <td className="p-3">{p}</td>
                    <td className="p-3 text-muted-foreground">{l}</td>
                    <td className="p-3 font-semibold">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-5">How Zichron Compares to Israel's Major Markets</h3>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-3 font-semibold">City</th>
                  <th className="text-left p-3 font-semibold">Avg ₪/m² (2025)</th>
                  <th className="text-left p-3 font-semibold">Lifestyle</th>
                  <th className="text-left p-3 font-semibold">Anglo Community</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Tel Aviv (center)", "₪62,000–₪80,000", "Urban, dense", "Moderate"],
                  ["Jerusalem", "₪38,000–₪55,000", "Historic, varied", "Strong"],
                  ["Ra'anana", "₪28,000–₪40,000", "Suburban, Anglo hub", "Very strong"],
                  ["Zichron Yaakov", "₪27,400 avg", "Boutique, Mediterranean", "15–20% of pop."],
                  ["Haifa (Carmel)", "₪22,000–₪32,000", "Urban, diverse", "Moderate"],
                  ["Netanya", "₪20,000–₪28,000", "Coastal, Franco community", "Strong"],
                ].map(([city, price, life, anglo], i) => (
                  <tr key={i} className={city === "Zichron Yaakov" ? "bg-gold/10 font-semibold" : i % 2 === 0 ? "bg-card" : "bg-sand-light"}>
                    <td className="p-3">{city}</td>
                    <td className="p-3">{price}</td>
                    <td className="p-3 text-muted-foreground">{life}</td>
                    <td className="p-3 text-muted-foreground">{anglo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-foreground leading-relaxed italic">Zichron offers Ra'anana-comparable prices with a lifestyle that Ra'anana simply cannot match — and a fraction of Tel Aviv's cost.</p>
        </section>

        <Divider />

        {/* ── 08: INVESTMENT ANGLE ── */}
        <section>
          <SectionBadge n="08" label="Airbnb & Capital Growth" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">The Investment Angle</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">Airbnb, Rental Yields & Capital Growth</p>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <GuideImage src={sold2} caption="Luxury hotel complex on the Zichron ridge — a major tourism anchor" aspect="4/3" />
            <GuideImage src={sold3} caption="Premium coastal resort near Dor-Habonim, 10 minutes from Zichron" aspect="4/3" />
          </div>

          <p className="font-body text-foreground leading-relaxed mb-8">Zichron Yaakov is not merely a lifestyle purchase. For investors, it presents a compelling combination of scarcity-driven capital appreciation, a growing short-term rental market, and structural demand drivers that are unlikely to reverse.</p>

          <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-5">Short-Term Rental (Airbnb) Performance</h3>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-3 font-semibold">Metric</th>
                  <th className="text-left p-3 font-semibold">Data</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Average guest rating", "4.9 / 5.0 stars across Zichron listings"],
                  ["Peak occupancy periods", "Passover, Sukkot, Wine Festival, summer weekends"],
                  ["Nightly rate — historic center", "₪600–₪1,800 depending on property size"],
                  ["Monthly rental — long-term apartments", "₪7,000–₪12,000/month"],
                  ["National avg gross rental yield", "3.16% (Global Property Guide, Q3 2025)"],
                  ["STR premium vs long-term rental", "60–120% higher income for well-located units"],
                ].map(([m, d], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-sand-light"}>
                    <td className="p-3 font-semibold">{m}</td>
                    <td className="p-3 text-muted-foreground">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-body text-foreground leading-relaxed mb-6">Foreign investment accounted for 22% of Q1 2025 residential purchases, with North American and French buyers leading. Many acquire historic center properties for part-year residency combined with STR income — generating both lifestyle value and investment return.</p>

          <QuoteBlock
            quote="Short-term rental markets, particularly for properties near vineyards and in the Historic Center, demonstrated excellent performance, with occupancy rates peaking during holiday seasons and festivals."
            source="Q1 2025 Zichron Market Report"
          />

          <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">Capital Appreciation Outlook</h3>
          <p className="font-body text-foreground leading-relaxed">The Q1 2025 report projects annualized price growth of 12–14% for the remainder of 2025. The key structural drivers — conservation laws, rising Anglo Olim numbers, remote work enabling Zichron as a primary residence, and Wine Route tourism growth — are permanent features of this market, not short-cycle phenomena.</p>
        </section>

        <Divider />

        {/* ── 09: OLIM TAX BENEFITS ── */}
        <section>
          <SectionBadge n="09" label="Tax & Purchase Process" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">Olim Tax Benefits</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">Your Financial Advantage as a New Immigrant — 2026 Update</p>

          <p className="font-body text-foreground leading-relaxed mb-8">Israel's benefits system for new immigrants is among the most generous in the world, particularly for property buyers. Understanding these benefits — and timing your purchase correctly — can save hundreds of thousands of shekels.</p>

          <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-5">Purchase Tax (Mas Rechisha) for Olim Hadashim</h3>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-3 font-semibold">Property Value</th>
                  <th className="text-left p-3 font-semibold">Oleh Tax Rate</th>
                  <th className="text-left p-3 font-semibold">Non-Resident Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-card">
                  <td className="p-3">First ₪1,978,745</td>
                  <td className="p-3 text-primary font-semibold">0%</td>
                  <td className="p-3 text-destructive font-semibold">8%</td>
                </tr>
                <tr className="bg-sand-light">
                  <td className="p-3">₪1,978,745 – ₪6,000,000</td>
                  <td className="p-3 text-primary font-semibold">0.5%</td>
                  <td className="p-3 text-destructive font-semibold">8%</td>
                </tr>
                <tr className="bg-card">
                  <td className="p-3">Above ₪6,000,000</td>
                  <td className="p-3">Standard rates apply</td>
                  <td className="p-3 text-destructive font-semibold">10%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 my-8">
            <p className="font-body text-foreground text-sm"><strong>⚠ Example:</strong> On a ₪5M property, an Oleh pays approximately ₪15,100 in purchase tax. A non-resident pays ₪400,000. The saving exceeds ₪385,000.</p>
          </div>

          <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-5">Additional Olim Property Benefits</h3>
          <ul className="space-y-3 font-body text-foreground">
            {[
              "Government (Zakaut) Mortgage: Subsidized loan up to ~₪200,000 at 4–4.5% fixed, available for 15 years post-Aliyah",
              "Rental Assistance: ₪1,000–₪3,000/month for your first 24–30 months (amount based on family size)",
              "Arnona (Municipal Tax) Discount: 50–90% discount on property tax for up to 100m², one 12-month period in your first two years",
              "10-Year Foreign Income Exemption: Income and assets held abroad exempt from Israeli tax for 10 years (for those who made Aliyah before Dec 31, 2025)",
              "Foreign Mortgage Access: Non-residents can typically secure 50–70% LTV; Olim qualify for up to 75% LTV",
              "Customs Exemption: Import all household goods and appliances tax-free for 3 years post-Aliyah",
            ].map((item, i) => (
              <li key={i} className="flex gap-3"><span className="text-gold shrink-0">▸</span><span>{item}</span></li>
            ))}
          </ul>

          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-5 my-8">
            <p className="font-body text-foreground text-sm"><strong>⚠ Critical 2026 note:</strong> The 10-year exemption from reporting foreign assets was cancelled for new residents arriving from January 1, 2026. Those who made Aliyah before December 31, 2025 retain the old rules. Consult a qualified Israeli tax attorney before any purchase.</p>
          </div>
        </section>

        <Divider />

        {/* ── 10: CONSERVATION & FUTURE GROWTH ── */}
        <section>
          <SectionBadge n="10" label="Planning & 2040 Vision" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">Conservation & Future Growth</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">Planning Rules, Restrictions & the 2040 Vision</p>

          <GuideImage src={sold4} caption="New boutique villa in traditional Zichron stone style — conservation-compliant construction" />

          <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-5">Conservation: Why It Protects Your Investment</h3>
          <p className="font-body text-foreground leading-relaxed mb-8">Zichron's conservation regime is often framed as a constraint. In reality, it is the primary reason the market outperforms. Strict architectural guidelines ensure the town cannot be cheapened by speculative development. What you buy today will still be surrounded by beauty in 30 years.</p>

          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-3 font-semibold">Grade</th>
                  <th className="text-left p-3 font-semibold">Name</th>
                  <th className="text-left p-3 font-semibold">What It Means</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Grade 1", "Full Conservation", "No external or significant internal changes. Property preserved exactly as built."],
                  ["Grade 2", "Strict Conservation", "Internal changes possible with approval. External alterations severely restricted."],
                  ["Grade 3", "Moderate Conservation", "Greater internal flexibility; external changes require approval."],
                  ["Grade 4", "Minimal Conservation", "Standard building rules with heritage sensitivity."],
                ].map(([g, n, w], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-sand-light"}>
                    <td className="p-3 font-semibold">{g}</td>
                    <td className="p-3">{n}</td>
                    <td className="p-3 text-muted-foreground">{w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-5">The 2040 Master Plan: What's Coming</h3>
          <ul className="space-y-3 font-body text-foreground">
            {[
              "Wine Park (2026–2028): Major tourism-commercial complex in southern Zichron — expected to drive significant price appreciation in Neve Ramz / Neve Sharet",
              "Binyamina Rail Station Upgrade (2028–2032): Modernized station with expanded parking and commercial development, strengthening the Tel Aviv commuter link",
              "New Employment Zone (2030–2035): High-tech park adjacent to rail station, projecting 5,000 new jobs",
              "Population Growth Target: Official projections target 37,000 residents (up from 25,000 today)",
              "Eastern Expansion (2035–2040): New residential neighborhoods planned, increasing supply and tax base",
            ].map((item, i) => (
              <li key={i} className="flex gap-3"><span className="text-gold shrink-0">▸</span><span>{item}</span></li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* ── 11: CRITICAL MISTAKES ── */}
        <section>
          <SectionBadge n="11" label="What to Avoid" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">Critical Mistakes to Avoid</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">What Every Olim Buyer Must Know</p>

          <p className="font-body text-foreground leading-relaxed mb-8">The Israeli property market has its own rules, customs, and traps. Foreign buyers — even experienced ones — regularly make costly errors. Here are the most important ones, and how to avoid them.</p>

          <div className="space-y-6">
            {[
              ["01", "Signing a Zikaron Devarim Without a Lawyer", "In Israel, a \"letter of intent\" is a legally binding contract. Never sign one without a real estate attorney reviewing it first. Deposits can be forfeited."],
              ["02", "Skipping the Conservation Review", "Before buying any property near the Historic Center, obtain the specific conservation designation and understand exactly what renovations are permitted."],
              ["03", "Ignoring Off-Market Listings", "A substantial portion of Zichron's best properties never appear on public portals. Without a trusted local agent, you are seeing only a fraction of what is available."],
              ["04", "Not Checking the Future Master Plan", "A property adjacent to an undeveloped lot may look attractive today. That lot could become a commercial zone under the 2040 plan. Always check the TBA for surrounding parcels."],
              ["05", "Wiring Funds After Signing", "Arrange international transfers before signing. Israeli purchase contracts have strict payment timelines — missing them triggers significant penalties."],
              ["06", "Skipping Tax Planning", "The difference between a structured and unstructured purchase as an Oleh can be ₪300,000–₪500,000 in taxes. A qualified Israeli accountant is essential."],
            ].map(([num, title, desc]) => (
              <div key={num} className="flex gap-5 bg-card rounded-xl border border-border p-5 md:p-6">
                <span className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-display text-sm font-bold shrink-0">{num}</span>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-2">{title}</h4>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── 12: BUYING ROADMAP ── */}
        <section>
          <SectionBadge n="12" label="Step-by-Step" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">Your Buying Roadmap</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">The Step-by-Step Process in Israel</p>

          <p className="font-body text-foreground leading-relaxed mb-10">Buying property in Israel as a foreign buyer involves more steps than in most Western markets, but the process is well-established and manageable with the right team around you.</p>

          <div className="space-y-0">
            {[
              ["1", "Engage a Local Buyer's Agent", "2–4 weeks before searching", "A Zichron specialist with off-market access is your single most important decision."],
              ["2", "Appoint an English-Speaking Real Estate Attorney", "", "Performs title searches, checks conservation file, verifies permits, drafts contract. Do not share a lawyer with the seller."],
              ["3", "Secure Mortgage Pre-Approval", "", "Israeli banks offer Olim up to 75% LTV. Pre-approval establishes your budget and strengthens your negotiating position."],
              ["4", "Make an Offer & Conduct Due Diligence", "", "Agent negotiates price. Lawyer simultaneously reviews Tabu, verifies legal status, building permits, and conservation designation."],
              ["5", "Sign the Purchase Contract & Pay Initial Deposit", "", "Contract specifies price, payment schedule, completion date. Initial deposit (typically 10%) due within 7 days. Wire funds before signing."],
              ["6", "Register Cautionary Note (He'arat Azhara)", "", "Your lawyer immediately registers on the Tabu, preventing the seller from re-selling or mortgaging the property."],
              ["7", "File Tax Forms & Pay Purchase Tax", "", "Form 1345 within 40 days. Purchase tax within 60 days. Your Oleh reduced rates are applied at this stage."],
              ["8", "Final Payment & Tabu Registration", "", "Upon final installment, keys are transferred and property registered in your name. Mazel Tov."],
            ].map(([n, title, timing, desc], i, arr) => (
              <div key={n} className="flex gap-5 relative">
                {/* Vertical line */}
                {i < arr.length - 1 && <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border" />}
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-sm font-bold shrink-0 z-10">
                  {n}
                </div>
                <div className="pb-8">
                  <h4 className="font-display font-semibold text-foreground">
                    {title}
                    {timing && <span className="text-sm font-body text-muted-foreground font-normal ml-2">({timing})</span>}
                  </h4>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── 13: WHY SPIRIT REAL ESTATE ── */}
        <section>
          <SectionBadge n="13" label="Your Partner" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">Why Spirit Real Estate</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">Your Boutique Partner in Zichron Yaakov</p>

          <GuideImage src={heroBg} caption="The Mediterranean coastal plain as seen from Zichron Yaakov — the view residents wake up to" />

          <p className="font-body text-foreground leading-relaxed mb-8">Spirit Real Estate is Zichron Ya'akov's boutique property firm, dedicated exclusively to this market. We do not operate across Israel. We do not juggle dozens of cities. We know every street, every courtyard, and every neighborhood in the Moshava with a depth that generalist agencies simply cannot match.</p>

          <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-5">What Sets Us Apart</h3>
          <ul className="space-y-3 font-body text-foreground">
            {[
              "Off-market access: Many of the finest properties in Zichron never appear on public portals. Our network gives you access first.",
              "English first: We work in English. Every document, every conversation, every explanation — in your language.",
              "Olim specialists: We have guided dozens of Anglo families through the Aliyah-purchase process. We know the pitfalls and the shortcuts.",
              "Conservation expertise: We will tell you exactly what you can and cannot do with any property before you make an offer.",
              "Personal service: You work with a dedicated agent, not a call center.",
              "No pressure: We are paid when you find the right property — not when you compromise on the wrong one.",
            ].map((item, i) => (
              <li key={i} className="flex gap-3"><span className="text-gold shrink-0">▸</span><span>{item}</span></li>
            ))}
          </ul>

          {/* Team */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { img: hagitImg, name: "Hagit Cohen Morgan", role: "Founder" },
              { img: aviImg, name: "Avi Suleiman", role: "Founder" },
              { img: eliranImg, name: "Eliran Amsalem", role: "International Marketing & Overseas Buyers" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-2 border-gold/30">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-display font-semibold text-foreground">{member.name}</p>
                <p className="text-xs font-body text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 bg-primary rounded-2xl p-10 md:p-14">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary-foreground mb-4">
              Ready to Find Your Home in Zichron Yaakov?
            </h3>
            <p className="font-body text-primary-foreground/70 mb-8">
              Schedule a private strategy consultation — no obligation, no pressure.
            </p>
            <Link
              to={`/${lang}/contact`}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-white py-4 px-10 rounded-lg font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Book a Consultation
            </Link>
          </div>
        </section>

        {/* ── FOOTER / DISCLAIMER ── */}
        <div className="mt-20 pt-10 border-t border-border text-center">
          <img src={spiritLogo} alt="Spirit Real Estate" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
          <p className="font-display text-sm font-semibold text-foreground">Spirit Real Estate</p>
          <p className="text-xs font-body text-muted-foreground">Boutique Property · Zichron Yaakov, Israel</p>
          <p className="text-[10px] font-body text-muted-foreground/60 mt-6 max-w-xl mx-auto leading-relaxed">
            This guide is provided for informational purposes only as of March 2026 and does not constitute legal, financial, or tax advice. Market data sourced from Israel Land Authority records, Q1 2025 market reports, and publicly available transaction data. All prices are indicative. Consult qualified Israeli legal and tax professionals before completing any property transaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyerGuide2026;
