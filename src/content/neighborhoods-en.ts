/**
 * Approved English content for the Zichron Yaakov Neighborhoods pillar page
 * (/en/zichron-yaakov-neighborhoods).
 *
 * English-only by design: the Hebrew page renders separately and must not be
 * auto-translated. Plain TS module (no "use client") so it can be imported by
 * both the server page wrapper (metadata + JSON-LD) and the client view.
 *
 * Option B: no price lines, no price-per-sqm figures, no price-level symbols,
 * no sea-view / walkability rating columns. Comparison table is non-numeric.
 */

export type NbCard = {
  slug: string;
  name: string;
  tag: string;
  description: string;
  bestFor: string;
  propertyTypes: string;
  pros: string[];
  considerations: string[];
};

export type NbComparisonRow = {
  area: string;
  bestFor: string;
  propertyFeel: string;
  mainTradeOff: string;
};

export type NbFaq = { q: string; a: string };
export type NbLink = { label: string; href: string };

export interface NeighborhoodsEnContent {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  intro: string[];
  neighborhoods: NbCard[];
  comparison: NbComparisonRow[];
  howToChoose: { h2: string; body: string[]; bullets: string[] };
  importantChecks: { h2: string; body: string[]; bullets: string[]; bodyAfter: string };
  faq: NbFaq[];
  cta: {
    title: string;
    body: string;
    primary: { label: string; href: string };
    secondary: { label: string; whatsappMessage: string };
  };
  internalLinks: NbLink[];
}

export const neighborhoodsEnContent: NeighborhoodsEnContent = {
  seoTitle: "Zichron Yaakov Neighborhoods Guide | Spirit Real Estate",
  metaDescription:
    "Explore the main neighborhoods and residential areas of Zichron Yaakov, from the historic center and Givat Zamarin to Neve HaBaron, Neve Remez, Halomot Zichron, Ramat Zvi and more.",
  h1: "Zichron Yaakov Neighborhoods Guide",
  heroSubtitle:
    "Zichron Yaakov is not one single market. Each neighborhood has its own rhythm, property types, buyer profile, walkability, views, lifestyle and trade-offs. This guide helps buyers compare the main residential areas before deciding where to focus their search.",
  intro: [
    "Choosing the right neighborhood in Zichron Yaakov is often just as important as choosing the right home. Some buyers want to be close to the historic center and cafés. Others want a quiet family street, a larger garden, a newer apartment, easier access to the train, or views toward the sea, forests or surrounding hills.",
    "For English-speaking and overseas buyers, the differences can be hard to understand from listings alone. A home may look attractive online, but the neighborhood context can change the decision: parking, slope, access, schools, walking distance, renovation needs, community feel and long-term fit all matter.",
    "This guide is designed as a practical starting point. It does not replace a private consultation or property-specific due diligence, but it can help you understand where to begin.",
  ],
  neighborhoods: [
    {
      slug: "hamoshava",
      name: "HaMoshava — Historic Center",
      tag: "Walkable · Historic · Lifestyle",
      description:
        "HaMoshava is the historic heart of Zichron Yaakov. It is the area many people imagine first: old stone buildings, cafés, boutique shops, galleries, restaurants, historic homes and the atmosphere of the original moshava. For buyers who want character, walkability and daily life close to the center, this is often one of the first areas to explore.",
      bestFor:
        "Buyers who value walkability, atmosphere, historic character and proximity to the center.",
      propertyTypes:
        "Renovated historic homes, older apartments, small houses, unique townhouses and occasional ground-floor homes with character features.",
      pros: [
        "Strong lifestyle appeal.",
        "Close to cafés, shops and local attractions.",
        "Good fit for buyers who do not want to rely on a car for every outing.",
        "Distinctive character that is hard to replicate in newer areas.",
      ],
      considerations: [
        "Parking can be limited.",
        "Inventory is often selective.",
        "Older homes may require deeper inspection, renovation planning or legal review.",
        "Weekend and holiday activity can be busier than in quieter residential areas.",
      ],
    },
    {
      slug: "givat-zamarin",
      name: "Givat Zamarin",
      tag: "Historic · Elevated · Character",
      description:
        "Givat Zamarin is closely connected to the earliest story of Zichron Yaakov. Set near the historic winery area and above parts of the moshava, it offers a more atmospheric and elevated setting, with older stone homes, narrow streets and a strong sense of place. For some buyers, it is one of the most distinctive parts of town.",
      bestFor:
        "Buyers looking for character, history, views and a home that feels different from a standard suburban property.",
      propertyTypes:
        "Older stone homes, renovated character homes, unique houses, small-scale residential pockets and properties that may require careful inspection.",
      pros: [
        "Historic atmosphere.",
        "Potential for views from elevated positions.",
        "Close to the old center and winery area.",
        "Strong emotional appeal for buyers who want something unique.",
      ],
      considerations: [
        "Limited supply.",
        "Roads and parking can be less convenient.",
        "Older structures may require renovation, planning and permit checks.",
        "Not every property will suit buyers looking for a modern, simple layout.",
      ],
    },
    {
      slug: "neve-habaron",
      name: "Neve HaBaron",
      tag: "Family · Green · Larger Homes",
      description:
        "Neve HaBaron is a well-known residential area associated with family living, larger homes and a quieter pace. Buyers often consider it when they want more outdoor space, a private or semi-detached home, and a setting that feels more residential than central.",
      bestFor:
        "Families, buyers who want a garden, and people looking for a quieter long-term residential setting.",
      propertyTypes:
        "Private homes, semi-detached homes, larger family houses and properties with gardens or outdoor areas.",
      pros: [
        "Good fit for family living.",
        "More potential for outdoor space than the historic center.",
        "Quieter residential feel.",
        "Often attractive to buyers who want a permanent home rather than a compact apartment.",
      ],
      considerations: [
        "A car is usually important.",
        "Homes can vary significantly in age, condition and layout.",
        "Buyers should compare plot, access, parking and renovation needs carefully.",
        "Pricing depends heavily on the specific street and property condition.",
      ],
    },
    {
      slug: "neve-remez",
      name: "Neve Remez",
      tag: "Quiet · Community · Views",
      description:
        "Neve Remez is often considered by buyers who want a quieter residential environment, a community feel and, in some locations, attractive views. It is less centered around cafés and tourism and more focused on day-to-day living, which can suit families, retirees and buyers who want calm without being disconnected from Zichron.",
      bestFor:
        "Families, retirees, English-speaking buyers and people looking for quiet streets with a practical residential feel.",
      propertyTypes:
        "Private homes, semi-detached homes, older homes, renovated homes and some properties with strong outdoor or view potential.",
      pros: [
        "Quiet residential character.",
        "Community feel.",
        "Some homes may offer sea or open views depending on position.",
        "Can be practical for buyers who want access toward Binyamina and the surrounding area.",
      ],
      considerations: [
        "Less walkable to the historic center.",
        "Access and traffic patterns should be checked at different times of day.",
        "Property quality and renovation level can vary.",
        "Buyers should verify view, privacy and parking property by property.",
      ],
    },
    {
      slug: "ramat-zvi",
      name: "Ramat Zvi",
      tag: "Established · Practical · Value-Oriented",
      description:
        "Ramat Zvi is an established residential area with a mix of older buildings, renewed properties and newer construction pockets. It may appeal to buyers who want Zichron Yaakov but are also thinking carefully about budget, practicality and long-term potential.",
      bestFor:
        "First-time buyers, young families, investors and buyers looking for a more practical entry point into Zichron Yaakov.",
      propertyTypes:
        "Apartments, renewed buildings, older homes, newer units and some semi-detached or family-oriented properties depending on location.",
      pros: [
        "Often more practical for budget-conscious buyers.",
        "A mix of older and newer housing creates different entry points.",
        "Good option for buyers who prioritize function over prestige.",
        "May suit buyers looking for a long-term improvement story.",
      ],
      considerations: [
        "Building quality can vary.",
        "Some parts may still feel in transition.",
        "Buyers should carefully check building condition, permits, parking and maintenance.",
        "It is important not to assume every property has the same upside or condition.",
      ],
    },
    {
      slug: "halomot-zichron",
      name: "Halomot Zichron",
      tag: "Newer · Family · Planned",
      description:
        "Halomot Zichron is a newer planned residential area on the southeastern side of town. It attracts buyers who prefer newer construction, family-oriented surroundings, parks, practical infrastructure and a less historic, more contemporary environment.",
      bestFor:
        "Young families, buyers who prefer newer buildings, and people who want a more planned neighborhood feel.",
      propertyTypes:
        "Apartments, garden apartments, penthouses, two-family homes and newer residential buildings.",
      pros: [
        "Newer construction and infrastructure.",
        "Family-oriented environment.",
        "Good fit for buyers who prefer modern layouts.",
        "Often easier to understand for buyers comparing newer developments.",
      ],
      considerations: [
        "Less historic character.",
        "A car is usually important for the center.",
        "Views, privacy and building quality should be checked individually.",
        "Newer does not automatically mean better; layout, maintenance and location still matter.",
      ],
    },
    {
      slug: "villot-bahoresh",
      name: "Villot BaHoresh",
      tag: "Forest · Private Homes · Green Setting",
      description:
        "Villot BaHoresh appeals to buyers who want a greener and more private residential feel. The area is associated with houses, gardens, trees and a quieter atmosphere, while still remaining connected to the broader Zichron Yaakov lifestyle.",
      bestFor:
        "Families and buyers looking for a private home, a garden and a more nature-oriented setting.",
      propertyTypes:
        "Private homes, semi-detached homes and larger residential properties with outdoor space.",
      pros: [
        "Green residential feel.",
        "More privacy than denser apartment areas.",
        "Attractive for buyers who want a home with outdoor living.",
        "Can suit buyers looking for a quieter premium residential environment.",
      ],
      considerations: [
        "Inventory may be limited.",
        "Roads and access should be checked carefully.",
        "Larger homes may require more maintenance.",
        "Buyers should verify plot boundaries, permits, renovation history and access.",
      ],
    },
    {
      slug: "mordot-habeer",
      name: "Mordot HaBeer",
      tag: "Newer · Premium · Quiet Growth",
      description:
        "Mordot HaBeer is a newer residential area near the southeastern side of Zichron Yaakov, close to the Halomot Zichron / Neve Sharet side of town. It may appeal to buyers who want newer construction, a quieter setting and a more contemporary residential environment.",
      bestFor:
        "Upgrade buyers, families seeking newer homes, and buyers who prefer a newer neighborhood over the historic center.",
      propertyTypes:
        "Private homes, semi-detached homes, garden apartments, roof apartments and newer residential properties depending on the specific project or street.",
      pros: [
        "Newer residential feel.",
        "Potential for modern layouts and parking.",
        "Quieter than the historic center.",
        "May attract buyers who want a long-term family home in a developing area.",
      ],
      considerations: [
        "Further from the old center.",
        "Public amenities and convenience should be checked in practice.",
        "Buyer demand and pricing should be evaluated property by property.",
        "Avoid assuming every new-build property is equal; construction quality, exposure and layout matter.",
      ],
    },
    {
      slug: "neve-sharet",
      name: "Neve Sharet",
      tag: "South · Access · Transition",
      description:
        "Neve Sharet is a southern residential area that may interest buyers looking for accessibility, more practical pricing relative to premium areas and proximity toward Binyamina and regional routes. It can be relevant for commuters and buyers who are open to an area that may feel more mixed or transitional.",
      bestFor:
        "Commuters, first-time buyers, practical buyers and investors who understand that each property must be checked carefully.",
      propertyTypes:
        "Apartments, older buildings, newer projects, renovated units and residential pockets with varying levels of finish and condition.",
      pros: [
        "Practical location for access toward Binyamina and nearby routes.",
        "May offer more approachable entry points than premium neighborhoods.",
        "Relevant for buyers who prioritize function and commute.",
        "Potential variety in property types.",
      ],
      considerations: [
        "Building quality and street feel can vary.",
        "Fewer lifestyle amenities within easy walking distance compared with the historic center.",
        "Buyers should check noise, access, parking, building condition and future planning.",
        "It is important to separate real opportunity from optimistic marketing language.",
      ],
    },
    {
      slug: "givat-eden",
      name: "Givat Eden",
      tag: "Views · Quiet · Northern Edge",
      description:
        "Givat Eden sits toward the northern side of Zichron Yaakov and is often considered by buyers who want a quieter residential feel, views and a more suburban environment. It can suit people who care less about being in the center and more about outlook, calm and relative space.",
      bestFor:
        "View seekers, retirees, families and buyers who prefer a quieter setting over maximum walkability.",
      propertyTypes:
        "Apartments, older homes, newer or renovated homes, villas and varied residential properties depending on the street.",
      pros: [
        "Potential for wide views from certain positions.",
        "Quieter residential atmosphere.",
        "Less central and therefore sometimes more practical for buyers comparing value.",
        "Can suit buyers who want scenery and calm.",
      ],
      considerations: [
        "Further from the historic center.",
        "Walkability varies by street and slope.",
        "Housing quality is mixed and should be checked carefully.",
        "Buyers should verify actual view, exposure, wind, access and stairs before deciding.",
      ],
    },
  ],
  comparison: [
    {
      area: "HaMoshava",
      bestFor: "Walkability, lifestyle and historic character",
      propertyFeel: "Historic homes, older apartments, unique townhouses",
      mainTradeOff: "Parking, age of buildings and busier central activity",
    },
    {
      area: "Givat Zamarin",
      bestFor: "Character homes, history and elevated setting",
      propertyFeel: "Stone homes, unique houses, renovation opportunities",
      mainTradeOff: "Limited supply, narrow access and renovation complexity",
    },
    {
      area: "Neve HaBaron",
      bestFor: "Families and larger homes",
      propertyFeel: "Private and semi-detached homes with outdoor space",
      mainTradeOff: "Car dependency and property-by-property variation",
    },
    {
      area: "Neve Remez",
      bestFor: "Quiet community living",
      propertyFeel: "Residential homes, some with views or outdoor space",
      mainTradeOff: "Less central and access should be checked",
    },
    {
      area: "Ramat Zvi",
      bestFor: "Practical buyers and value-conscious searches",
      propertyFeel: "Mixed older, renewed and newer housing",
      mainTradeOff: "Uneven condition and transition between streets",
    },
    {
      area: "Halomot Zichron",
      bestFor: "Newer family-oriented living",
      propertyFeel: "Modern apartments, garden homes, penthouses and newer homes",
      mainTradeOff: "Less historic character and car dependency",
    },
    {
      area: "Villot BaHoresh",
      bestFor: "Green setting and private homes",
      propertyFeel: "Houses, gardens and forest-like surroundings",
      mainTradeOff: "Limited inventory and maintenance considerations",
    },
    {
      area: "Mordot HaBeer",
      bestFor: "Newer premium-style residential living",
      propertyFeel: "Newer homes, semi-detached houses, garden and roof apartments",
      mainTradeOff: "Further from the old center and still developing in parts",
    },
    {
      area: "Neve Sharet",
      bestFor: "Commuters and practical buyers",
      propertyFeel: "Mixed apartments, older buildings and newer projects",
      mainTradeOff: "Uneven quality and fewer lifestyle amenities nearby",
    },
    {
      area: "Givat Eden",
      bestFor: "Views and quieter northern living",
      propertyFeel: "Mixed housing with potential for open views",
      mainTradeOff: "Distance from the center and slope/walkability checks",
    },
  ],
  howToChoose: {
    h2: "How to choose the right neighborhood",
    body: [
      "The best neighborhood in Zichron Yaakov depends on the buyer, not only on the property. A home that is perfect for one family may be wrong for another because of access, stairs, parking, school routines, community needs, renovation tolerance or distance from the center.",
      "Before deciding where to focus, buyers should ask:",
    ],
    bullets: [
      "Do you want to walk to cafés and shops, or do you prefer a quieter residential setting?",
      "Is a garden or outdoor space more important than central location?",
      "Do you prefer historic character or newer construction?",
      "How important is access toward Binyamina train station, Route 4 or regional commuting?",
      "Do you need a Mamad, elevator, parking or single-level living?",
      "Are you comfortable with renovation, or do you need a move-in-ready home?",
      "Are you buying for full-time living, Aliyah, investment, retirement or a second home?",
      "Do you need English-speaking community context before choosing an area?",
    ],
  },
  importantChecks: {
    h2: "Important checks before choosing a neighborhood",
    body: [
      "Online listings can show photos and basic details, but they rarely explain the practical experience of living in a specific street or building. Before making an offer, buyers should review the neighborhood and property together.",
    ],
    bullets: [
      "Noise, privacy and exposure.",
      "Distance to schools, parks, shops and transport.",
      "Building condition and maintenance.",
      "Permits, extensions and legal status.",
      "Outdoor space, garden usability and drainage.",
      "Actual view, not only listing description.",
      "Renovation needs and realistic cost.",
      "Future planning or nearby development where relevant.",
    ],
    bodyAfter:
      "For overseas buyers, these checks are especially important because a property may look very different in person than it appears online. Local guidance can help narrow the search before travel, save time during visits and reduce the risk of focusing on the wrong area.",
  },
  faq: [
    {
      q: "What is the best neighborhood in Zichron Yaakov?",
      a: "There is no single best neighborhood. HaMoshava may suit buyers who want walkability and historic character. Neve HaBaron may suit families looking for larger homes and outdoor space. Halomot Zichron may suit buyers who prefer newer construction. Neve Remez and Givat Eden may appeal to buyers looking for quiet and views. The right answer depends on lifestyle, budget, property type and long-term plans.",
    },
    {
      q: "Which neighborhoods are best for families?",
      a: "Families often look at Neve HaBaron, Halomot Zichron, Neve Remez, Villot BaHoresh and parts of Givat Eden, but the best fit depends on schools, commute, budget, outdoor space and the specific street. It is important to compare the actual home, not only the neighborhood name.",
    },
    {
      q: "Which areas are most walkable?",
      a: "HaMoshava and nearby historic areas are generally the strongest fit for buyers who want to walk to cafés, shops and the center. Givat Zamarin can also offer proximity to the old center in certain locations. Other neighborhoods may be quieter and more residential but usually require more car use.",
    },
    {
      q: "Where should overseas buyers begin their search?",
      a: "Overseas buyers should begin by defining lifestyle needs before choosing a neighborhood. Important questions include whether the buyer wants a full-time home, Aliyah base, second home, investment, retirement property or family home. From there, the search can be narrowed by walkability, outdoor space, building age, budget, view, parking and community preferences.",
    },
    {
      q: "Are newer neighborhoods better than older neighborhoods?",
      a: "Not always. Newer areas may offer modern layouts, parking and newer infrastructure, while older areas may offer character, location and mature surroundings. Older homes may require more inspection and renovation planning. Newer homes still need careful review of construction quality, layout, exposure, building management and long-term fit.",
    },
    {
      q: "Should I choose by neighborhood or by property?",
      a: "Both matter. The neighborhood determines daily life, access and community feel. The property determines comfort, cost, maintenance and resale potential. A strong buying decision usually balances both rather than choosing one in isolation.",
    },
    {
      q: "Can I buy in Zichron Yaakov without visiting every neighborhood?",
      a: "Yes, but it is better to narrow the search with local guidance first. Video walkthroughs, neighborhood explanations and structured comparisons can help overseas buyers focus on the most relevant areas before visiting in person.",
    },
    {
      q: "Do prices vary a lot between neighborhoods?",
      a: "Yes, prices can vary significantly depending on location, property type, condition, outdoor space, views, parking and buyer demand. Even within the same neighborhood, two homes can have very different value profiles. Buyers should avoid relying only on average prices or online comparisons.",
    },
  ],
  cta: {
    title: "Not sure which neighborhood fits your search?",
    body: "Tell us what kind of home, lifestyle and timeline you are looking for. We can help you compare the right areas of Zichron Yaakov before you spend time on properties that do not fit.",
    primary: { label: "Browse Homes for Sale", href: "/en/homes-for-sale-zichron-yaakov" },
    secondary: {
      label: "Ask About Neighborhoods",
      whatsappMessage:
        "Hi Spirit, I am researching Zichron Yaakov neighborhoods and would like help understanding which areas may fit my search.",
    },
  },
  internalLinks: [
    { label: "Homes for Sale in Zichron Yaakov", href: "/en/homes-for-sale-zichron-yaakov" },
    { label: "Buying Property in Zichron Yaakov", href: "/en/buying-property-zichron-yaakov" },
    { label: "Buying Property in Israel from Abroad", href: "/en/buying-property-israel-from-abroad" },
    { label: "Sell Your Home in Zichron Yaakov", href: "/en/sell" },
    { label: "Contact Spirit Real Estate", href: "/en/contact" },
    { label: "2026 Area-by-Area Buyer Notes", href: "/en/guides/zichron-yaakov-neighborhood-guide-2026" },
  ],
};
