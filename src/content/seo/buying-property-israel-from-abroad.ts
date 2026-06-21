import type { BilingualSeoPageContent } from "@/types/seo-content";

// NOTE: Sections 4+ and FAQ are pending — the external content package was truncated
// after Section 3, Subsection 1. CTA and internal links are temporary placeholders.
// Do not generate missing content here: wait for the complete approved package.

export const buyingPropertyAbroadContent: BilingualSeoPageContent = {
  slug: "buying-property-israel-from-abroad",

  // ─── English (Phase 3B.2: approved content — PARTIAL, sections 4+ pending) ─
  en: {
    seoTitle: "Buying Property in Israel from Abroad | Spirit Real Estate",

    metaDescription:
      "Planning to buy property in Israel from abroad? Learn how overseas buyers should approach the process, from remote search and local representation to legal checks, tax questions and buying in Zichron Yaakov.",

    h1: "Buying Property in Israel from Abroad",

    heroIntro:
      "Buying property in Israel from abroad can be exciting, but it also requires a careful process. Photos, videos and online listings can help you begin the search, but they cannot replace local context, professional checks and a clear understanding of how the Israeli purchase process works.\n\nSpirit Real Estate helps English-speaking and overseas buyers approach the Israeli market with structure, clarity and local guidance — especially when searching for homes in Zichron Yaakov and the surrounding area.",

    sections: [
      // ── Section 1 ──
      {
        h2: "Start with the right expectations",
        body:
          "Many overseas buyers begin with a broad idea: a home in Israel, a future Aliyah plan, a place for family visits, a long-term investment, or a move to a community that feels familiar and connected.\n\nThat is a good starting point, but it is not enough to make a smart purchase.\n\nBuying from abroad means you are often judging a property before you fully understand the street, neighborhood, legal process, tax implications, renovation needs, building condition and day-to-day practicality. The online version of a home can be very different from the lived reality.\n\nBefore focusing on listings, clarify the purpose of the purchase.",
        bullets: [
          "Are you buying for immediate use or future relocation?",
          "Is this for Aliyah, retirement, family visits or investment?",
          "Do you need the home to be move-in ready?",
          "Will the property need to work for children, guests or older family members?",
          "Do you need English-speaking community support nearby?",
          "Are you planning to finance the purchase in Israel or abroad?",
          "Who will represent you locally when you are not in Israel?",
        ],
        bodyAfterBullets:
          "The clearer the purpose, the easier it becomes to filter out homes that look attractive online but do not match your real needs.",
      },

      // ── Section 2 ──
      {
        h2: "Why Zichron Yaakov attracts overseas buyers",
        body:
          "Zichron Yaakov is often considered by overseas and English-speaking buyers because it offers a rare combination: historic character, residential neighborhoods, green surroundings, access to the coast, community life and a calmer pace than Israel's largest cities.\n\nFor some buyers, the appeal is the established Anglo presence and the ability to land in a place that feels easier to navigate. For others, it is the balance between lifestyle, space, scenery and proximity to Binyamina, Caesarea, Haifa and the coastal road.\n\nStill, Zichron is not one single market. Different neighborhoods and property types serve different buyers.",
        bullets: [
          "Historic areas may suit buyers who value atmosphere and walkability.",
          "Family neighborhoods may offer more space, gardens and parking.",
          "Apartments or garden apartments may suit lower-maintenance living.",
          "Hillside homes may offer views but require practical assessment.",
          "Boutique projects may feel simpler, but require specification and registration checks.",
          "Some buyers may prefer nearby communities depending on budget, transport and lifestyle needs.",
        ],
        bodyAfterBullets:
          "A good overseas search does not begin with “show me everything.” It begins with understanding which part of the market actually fits your life.",
        sectionLink: {
          label: "Learn more about buying property in Zichron Yaakov.",
          href: "/buying-property-zichron-yaakov",
        },
      },

      // ── Section 3 — subsections 2+ pending: external content package was truncated here ──
      {
        h2: "The remote buying process",
        body:
          "Remote buying should be structured in stages. The goal is not to make a major decision from a single video. The goal is to narrow the search, identify serious options and know when a property deserves a deeper review.",
        subsections: [
          {
            h3: "1. Define your brief",
            body:
              "Start with your purpose, budget, timing, location preferences, required rooms, outdoor space, parking, accessibility, community needs and whether you are flexible on renovation.",
          },
          // Subsection 2+ body was not provided in the approved content package.
          // Do not add content here — await the complete package.
        ],
      },
    ],

    // FAQ pending: not provided in supplied content package.
    faq: [],

    inlineProperties: true,
    inlinePropertiesAfterSection: undefined, // position TBD when full content arrives

    schemaType: "Article",
    datePublished: "2026-01-01",
    dateModified: "2026-06-21",

    // Temporary CTA — full approved CTA block not yet received.
    cta: {
      variant: "whatsapp",
      headline: "Buying in Israel from abroad?",
      subline:
        "Tell us about your situation — budget, timeline and what you are looking for. We will help you understand the process and which homes may be relevant.",
      label: "Message Us on WhatsApp",
      waHref:
        "https://wa.me/972527703800?text=Hi%20Spirit%2C%20I%27m%20looking%20to%20buy%20property%20in%20Israel%20from%20abroad",
      secondaryCta: {
        label: "View Available Properties",
        href: "/properties",
      },
    },

    // Temporary internal links — full set pending with complete content package.
    internalLinks: [
      { label: "Buying Property in Zichron Yaakov", href: "/buying-property-zichron-yaakov" },
      { label: "Homes for Sale in Zichron Yaakov", href: "/homes-for-sale-zichron-yaakov" },
      { label: "Available Properties", href: "/properties" },
      { label: "Contact Spirit Real Estate", href: "/contact" },
    ],
  },

  // ─── Hebrew — minimal temporary fallback (full version to be supplied separately) ─
  // Do not auto-translate EN content into Hebrew.
  he: {
    seoTitle: 'רכישת נכס בישראל מחו"ל — ספיריט נדל"ן',
    metaDescription:
      "רכישת נכס בישראל מחו״ל — מדריך לקונים מחו״ל, ייצוג מקומי, בדיקות משפטיות ומס, ורכישה בזכרון יעקב.",
    h1: 'רכישת נכס בישראל מחו"ל',
    heroIntro:
      "רכישת נכס בישראל מחו״ל דורשת תהליך מסודר — ליווי מקומי, בדיקות מקצועיות והבנה מעמיקה של שוק הנדל״ן המקומי.\n\nספיריט נדל״ן מסייע לקונים דוברי אנגלית ולקונים מחו״ל להתמצא בשוק הישראלי — ובמיוחד בזכרון יעקב.",
    sections: [],
    faq: [],
    inlineProperties: true,
    inlinePropertiesAfterSection: undefined,
    schemaType: "Article",
    datePublished: "2026-01-01",
    dateModified: "2026-06-21",
    cta: {
      variant: "whatsapp",
      headline: 'קונים נכס בישראל מחו"ל?',
      subline: "ספרו לנו מה אתם מחפשים — ונסייע לכם להבין איך התהליך עובד ואילו נכסים עשויים להתאים.",
      label: "שלחו לנו הודעה בוואטסאפ",
      waHref:
        "https://wa.me/972527703800?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%20%D7%91%D7%A8%D7%9B%D7%99%D7%A9%D7%AA%20%D7%A0%D7%9B%D7%A1%20%D7%91%D7%99%D7%A9%D7%A8%D7%90%D7%9C%20%D7%9E%D7%97%D7%95%22%D7%9C",
      secondaryCta: {
        label: "כל הנכסים",
        href: "/properties",
      },
    },
    internalLinks: [
      { label: "רכישת נכס בזכרון יעקב", href: "/buying-property-zichron-yaakov" },
      { label: "בתים למכירה בזכרון יעקב", href: "/homes-for-sale-zichron-yaakov" },
      { label: "כל הנכסים", href: "/properties" },
      { label: "צרו קשר", href: "/contact" },
    ],
  },
};
