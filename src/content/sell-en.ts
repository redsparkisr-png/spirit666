/**
 * Approved English content for the Sell page (/en/sell).
 * English-only by design: the Hebrew Sell page renders separately from
 * useSiteContent() t() keys and must not be auto-translated. This object is a
 * plain TS module (no "use client") so it can be imported by both the server
 * page wrapper (for JSON-LD + metadata) and the client view.
 */

export type SellCard = { title: string; body: string };
export type SellStep = { title: string; body: string };
export type SellFaqItem = { q: string; a: string };
export type SellLink = { label: string; href: string };

export interface SellEnContent {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroBadge: string;
  heroSubtitle: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  section1: { h2: string; body: string[]; cards: SellCard[] };
  process: { h2: string; intro: string; steps: SellStep[] };
  section3: { h2: string; body: string[]; bullets: string[] };
  section4: { h2: string; body: string[]; bullets: string[] };
  section5: { h2: string; body: string[]; bullets: string[]; bodyAfter: string };
  section6: { h2: string; body: string[]; cards: SellCard[] };
  section7: { h2: string; body: string };
  form: { heading: string; intro: string; addressPlaceholder: string; button: string };
  faq: SellFaqItem[];
  internalLinks: SellLink[];
}

export const sellEnContent: SellEnContent = {
  seoTitle: "Sell Your Home in Zichron Yaakov | Spirit Real Estate",
  metaDescription:
    "Sell your home in Zichron Yaakov with a clear pricing strategy, discreet local guidance, qualified buyer exposure and a transparent process from valuation to negotiation.",
  h1: "Sell Your Home in Zichron Yaakov",
  heroBadge: "For Homeowners in Zichron Yaakov",
  heroSubtitle: [
    "Selling a home in Zichron Yaakov is not only about listing it online. It is about understanding the property, the neighborhood, the likely buyer profile, the right pricing strategy and how to create serious interest without weakening your position in the market.",
    "At Spirit Real Estate, we help homeowners sell with clarity, discretion and a strategy built around the right buyers — local families, English-speaking buyers, overseas clients and people who are already looking for the right home in Zichron Yaakov.",
  ],
  primaryCta: { label: "Request a Confidential Valuation", href: "#valuation" },
  secondaryCta: { label: "See Our Selling Process", href: "#process" },
  section1: {
    h2: "Why selling in Zichron Yaakov needs a local strategy",
    body: [
      "Zichron Yaakov is not a uniform real estate market. A private home near the historic center, a semi-detached home in a family neighborhood, a hillside property with views, a penthouse with a roof terrace and a home on a larger lot can all attract very different buyers.",
      "That means a strong sale does not begin with a generic asking price or a quick listing. It begins with understanding who the right buyer is likely to be, what they will value, what they may question and how the property should be positioned before it reaches the market.",
      "A well-managed sale should answer several questions before the first viewing is scheduled.",
    ],
    cards: [
      {
        title: "Pricing with context",
        body: "The right asking price is not based only on square meters or a nearby listing. It depends on street, condition, outdoor space, views, parking, layout, renovation needs, buyer demand and how the property compares to realistic alternatives.",
      },
      {
        title: "Reaching qualified buyers",
        body: "Not every viewer is a serious buyer. We focus on positioning your home for people who are genuinely relevant — including local buyers, English-speaking families and overseas clients who may need more context before visiting.",
      },
      {
        title: "Protecting your property's value",
        body: "A property can lose momentum if it is exposed too broadly, priced without strategy or presented without the right context. A thoughtful launch helps preserve confidence and supports stronger negotiation.",
      },
    ],
  },
  process: {
    h2: "Our selling process",
    intro:
      "A good selling process should feel structured, calm and transparent. Before we talk about marketing, we first look at the property as a buyer would: what is clear, what needs context, what may raise questions and what should be improved before going live.",
    steps: [
      {
        title: "Property review and seller goals",
        body: "We begin by understanding the property, the seller's timeline, privacy needs, motivation, target price expectations and whether the sale should begin quietly or go directly to the open market.",
      },
      {
        title: "Market positioning and valuation",
        body: "We review the property in context — location, condition, layout, outdoor space, views, parking, comparable alternatives and likely buyer profiles. The goal is to create a pricing direction that is realistic, strategic and defensible.",
      },
      {
        title: "Preparation and presentation",
        body: "Before marketing begins, we help identify what should be cleaned, repaired, clarified, photographed or explained. Small preparation choices can change how buyers experience the home.",
      },
      {
        title: "Targeted exposure",
        body: "Depending on the property and seller preference, exposure may include public marketing, private buyer outreach, English-speaking buyer networks, overseas buyer communication and selected local channels.",
      },
      {
        title: "Viewings, feedback and negotiation",
        body: "We manage inquiries, qualify buyers, coordinate viewings, collect feedback and help the seller understand the quality of interest before negotiating. The goal is not just activity — it is the right activity.",
      },
      {
        title: "Offer support and professional coordination",
        body: "Once a serious buyer is identified, we help manage the process around offer terms, timing, buyer questions and coordination with the seller's attorney and other professionals until the transaction moves forward.",
      },
    ],
  },
  section3: {
    h2: "Selling quietly or publicly",
    body: [
      "Not every home should be launched the same way. Some properties benefit from broad exposure. Others may be better introduced quietly to selected buyers before becoming public.",
      "A quiet or selective approach can be useful when the seller wants privacy, when the home is unique, when pricing needs to be tested carefully, or when the property may appeal to a narrow buyer profile. Public marketing can be powerful when the property is well prepared, priced correctly and ready for wider exposure.",
      "The right strategy depends on the property and the seller's goals.",
    ],
    bullets: [
      "A quiet launch can protect privacy and reduce unnecessary traffic.",
      "A public launch can create broader demand when the home is positioned correctly.",
      "Selected exposure may be useful for premium, unique or sensitive properties.",
      "A property should not be pushed widely before the price, presentation and story are ready.",
      "The best strategy is the one that creates qualified interest without weakening negotiation power.",
    ],
  },
  section4: {
    h2: "Reaching English-speaking and overseas buyers",
    body: [
      "One of the advantages of selling with Spirit is access to buyers who may not behave like typical local portal users. Many English-speaking and overseas buyers need more guidance before they visit a home or make an offer. They may ask different questions, compare neighborhoods differently and need clearer context around the property, location and buying process.",
      "For sellers, this matters.",
      "A home that is presented only as a set of photos and basic details may not be enough for a buyer searching from abroad. The right explanation can help them understand why the home is relevant, what lifestyle it supports and what questions should be reviewed before moving forward.",
    ],
    bullets: [
      "English-speaking buyers often need neighborhood context.",
      "Overseas buyers may require video support and clearer practical explanations.",
      "Aliyah or relocation buyers may think in terms of schools, community, access and long-term fit.",
      "Serious buyers from abroad often need help understanding Israeli room count, Mamad, parking, outdoor space and legal checks.",
      "A seller benefits when the property is presented in a way that makes sense to the right audience.",
    ],
  },
  section5: {
    h2: "What sellers should prepare before going to market",
    body: [
      "A successful sale is easier when the seller prepares early. Some preparation is visual. Some is legal or practical. Some is simply about making sure buyers can understand the home quickly and confidently.",
      "Before launching, sellers should consider:",
    ],
    bullets: [
      "Basic property documents and ownership information.",
      "Any known permits, extensions or planning history.",
      "Renovation records, invoices or warranties where relevant.",
      "Current municipal tax information and ongoing costs.",
      "Mortgage or lien information to review with the seller's attorney.",
      "Repairs, decluttering, cleaning and garden preparation.",
      "Whether professional photography or video is needed.",
      "What items are included or excluded from the sale.",
      "The seller's preferred timing and flexibility.",
      "Whether privacy or quiet exposure is important.",
    ],
    bodyAfter:
      "Legal, tax and registration questions should be reviewed with qualified Israeli professionals. A real estate strategy can support the sale, but it does not replace legal or tax advice.",
  },
  section6: {
    h2: "Transparency throughout the process",
    body: [
      "A seller should never feel that they are guessing what is happening. We believe in clear communication, honest feedback and a process that helps the seller understand the quality of buyer interest.",
      "Transparency means explaining not only what happened, but what it means.",
    ],
    cards: [
      {
        title: "Clear buyer feedback",
        body: "After viewings or serious inquiries, sellers should understand what buyers responded to, what concerned them and whether the interest is meaningful.",
      },
      {
        title: "Realistic market updates",
        body: "If the market response is different from expectations, we discuss it clearly. Sometimes the issue is price, sometimes presentation, sometimes timing and sometimes the buyer pool.",
      },
      {
        title: "No pressure strategy",
        body: "Selling a home is a major decision. Our role is to guide the process, protect the seller's interests and help make informed decisions — not to create unnecessary pressure.",
      },
    ],
  },
  section7: {
    h2: "Request a confidential valuation",
    body: "If you are considering selling your home in Zichron Yaakov, the first step is a private conversation. Tell us about the property, your timing and what matters most to you. We will help you understand how your home may be positioned, what should be checked before going to market and which selling strategy may fit your goals.",
  },
  form: {
    heading: "Request a Confidential Home Valuation",
    intro: "Share a few details about your property and we will contact you privately.",
    addressPlaceholder: "Property address or neighborhood",
    button: "Request Valuation",
  },
  faq: [
    {
      q: "How do I know what my home in Zichron Yaakov is worth?",
      a: "A proper valuation should look beyond size and room count. It should consider location, street, condition, layout, outdoor space, views, parking, renovation needs, comparable alternatives and current buyer demand. A serious valuation should also account for how the home will be positioned in the market.",
    },
    {
      q: "Should I sell publicly or quietly?",
      a: "It depends on the property and your goals. Some homes benefit from public exposure, while others may be better introduced first to selected qualified buyers. A quiet approach can protect privacy and help test interest before a wider launch, but it should be planned carefully.",
    },
    {
      q: "Can Spirit reach buyers from abroad?",
      a: "Yes. Spirit works with English-speaking and overseas buyers who are looking in Zichron Yaakov and the surrounding area. These buyers often need local context, clear communication and practical guidance before deciding whether a home is relevant.",
    },
    {
      q: "What should I prepare before selling?",
      a: "Sellers should gather relevant property documents, review legal and tax questions with professionals, prepare the home visually, clarify what is included in the sale and think carefully about timing, privacy and pricing expectations.",
    },
    {
      q: "Do I need an attorney before listing my home?",
      a: "It is wise to speak with an Israeli real estate attorney early, especially if there are questions around ownership, registration, permits, taxes, inheritance, mortgages or timing. A real estate agent can guide the selling strategy, but legal matters should be handled by a qualified attorney.",
    },
    {
      q: "How long does it take to sell a home in Zichron Yaakov?",
      a: "Timing depends on the property, pricing, condition, buyer demand, negotiation, legal checks and the seller's flexibility. Some homes attract interest quickly, while others require a more selective or patient strategy.",
    },
    {
      q: "What makes a buyer serious?",
      a: "A serious buyer usually has a clear budget, understands their needs, is prepared to view or review the property properly, asks practical questions and is ready to involve the right professionals when moving toward an offer.",
    },
    {
      q: "Can I sell if I am not currently living in Israel?",
      a: "In many cases, sellers living abroad can begin the process remotely, but they should coordinate carefully with their attorney and local representatives. Communication, documentation and signing authority should be clarified before moving forward.",
    },
  ],
  internalLinks: [
    { label: "Homes for Sale in Zichron Yaakov", href: "/en/homes-for-sale-zichron-yaakov" },
    { label: "Buying Property in Zichron Yaakov", href: "/en/buying-property-zichron-yaakov" },
    { label: "Buying Property in Israel from Abroad", href: "/en/buying-property-israel-from-abroad" },
    { label: "Zichron Yaakov Neighborhoods Guide", href: "/en/zichron-yaakov-neighborhoods" },
    { label: "Contact Spirit Real Estate", href: "/en/contact" },
    { label: "About Spirit Real Estate", href: "/en/about" },
  ],
};
