/* ------------------------------------------------------------------ */
/*  CHEDAWON — English site content (mirrors src/lib/company.ts)       */
/* ------------------------------------------------------------------ */

export const EN_COMPANY = {
  name: "CHEDAWON Co., Ltd.",
  nameKr: "주식회사 채다원",
  slogan: "People. Diverse Lives. Good Food.",
  ceo: "Park Young-ho",
  founded: "June 1, 2017",
  capital: "KRW 600 million",
  phone: "+82-32-752-7227",
  phoneHref: "+82327527227",
  address: "1-39, Manseok-dong, Dong-gu, Incheon, South Korea",
  business: "Food ingredient distribution & meal kit OEM/ODM",
} as const;

export const EN_COMPANY_INFO: { label: string; value: string }[] = [
  { label: "Business", value: "Food ingredient distribution & meal kit OEM/ODM" },
  { label: "CEO", value: "Park Young-ho" },
  { label: "Founded", value: "June 1, 2017" },
  { label: "Capital", value: "KRW 600 million" },
  { label: "Phone", value: "+82-32-752-7227" },
  { label: "Address", value: "1-39, Manseok-dong, Dong-gu, Incheon, South Korea" },
];

export const EN_CEO_MESSAGE = [
  "Building on years of experience supplying ingredients to Korea's major airlines — and on new supply contracts with leading supermarkets, convenience stores, salad franchises, and hotels & resorts — CHEDAWON is expanding its business areas and growing into a specialized ingredient company founded on strong partnerships with producers and suppliers.",
  "To become a trusted ingredient-solution provider that meets customer needs and advances food culture, we put menu development and quality management first, while continuing to invest in customer-friendly systems, technology, and R&D.",
  "Going forward, we will strengthen partnerships across our supplier network, grow as a sustainable leader in food distribution, and stay ahead of digitalization, eco-friendly trends, and innovative service models — delivering better products and greater satisfaction, without exception.",
] as const;

/* ------------------------------ Hero ------------------------------ */

export const EN_HERO_KEYWORDS = [
  "Ingredient Distribution",
  "Meal Kit OEM/ODM",
  "Food-Making Process Innovation",
  "HACCP-Certified Plants",
  "Airline Catering Expertise",
  "B2B Purchasing Agency",
  "Cooksan Specialty Meal Kits",
  "Online Ingredient Mall",
  "MEALBOX25",
  "TFS · Total Food Solution",
];

export const EN_STATS = [
  { value: "16,000+", label: "Business clients served" },
  { value: "81.5%", label: "Repeat order rate" },
  { value: "620,330+", label: "Cumulative deliveries" },
  { value: "4", label: "HACCP-certified categories" },
];

export type EnGrowthMetricItem = { value: string; label: string };

export const EN_DEFAULT_GROWTH_METRICS: EnGrowthMetricItem[] = [
  { value: "16,000+", label: "Business clients" },
  { value: "81.5%", label: "Repeat order rate" },
  { value: "620,330+", label: "Cumulative deliveries" },
  { value: "4", label: "HACCP certifications" },
];

export const EN_METRICS = [
  { value: 2017, suffix: "", label: "Incorporated", raw: true },
  { value: 4, suffix: "", label: "HACCP certifications" },
  { value: 16000, suffix: "+", label: "Business clients" },
  { value: 620330, suffix: "+", label: "Cumulative deliveries" },
  { value: 81.5, suffix: "%", label: "Repeat order rate", decimals: 1 },
] as const;

/* --------------------------- Business ----------------------------- */

export type EnBusiness = {
  id: string;
  category: string;
  title: string;
  headline: string;
  image: string;
  intro: string;
  stats?: { value: string; label: string }[];
  sections: { subtitle: string; points: string[] }[];
};

export const EN_BUSINESSES: EnBusiness[] = [
  {
    id: "distribution",
    category: "B2B",
    title: "Ingredient Distribution & Purchasing Agency",
    headline: "One-stop B2B ingredient distribution across the entire value chain",
    image: "/images/biz-b2b-v4.png",
    intro:
      "Korea's B2B ingredient distribution market — estimated to grow from KRW 55 trillion (2020) to KRW 64 trillion (2025) — is expanding 6–8% a year as digitalization accelerates online ordering and delivery services.",
    stats: [
      { value: "KRW 55T → 64T", label: "Market size (2020 → 2025)" },
      { value: "6–8%", label: "Annual market growth" },
    ],
    sections: [
      {
        subtitle: "Cost reduction",
        points: [
          "Lower purchase costs through direct sourcing from producing regions and bulk buying with trusted suppliers",
          "Stable pricing via mid- to long-term contract purchasing and diversified buying methods",
        ],
      },
      {
        subtitle: "Process improvement",
        points: [
          "Simplified sourcing, new-product proposals, and supplier management — shorter purchasing lead times",
          "Dedicated specialists for purchasing, inventory, and portioning (processing) convenience",
        ],
      },
      {
        subtitle: "Quality & safety management",
        points: [
          "Continuous supply of vetted partners through annual on-site audits and regular evaluations",
          "Pre-emptive quality checks on at-risk items and rigorous hygiene & safety management",
        ],
      },
    ],
  },
  {
    id: "manufacturing",
    category: "B2B / B2C",
    title: "Food Manufacturing (OEM / ODM)",
    headline: "Food-making process innovation",
    image: "/images/biz-mfg-v5.png",
    intro:
      "We open our own manufacturing facilities to individuals and small businesses that want to commercialize convenience foods and original recipes — with the industry's lowest MOQ, so anyone can launch a product without heavy inventory risk.",
    stats: [
      { value: "Lowest MOQ", label: "Easy ordering · product launches" },
      { value: "R&D", label: "Planning · manufacturing · rapid testing" },
    ],
    sections: [
      {
        subtitle: "For product owners — burdens removed",
        points: [
          "No MOQ pressure, inventory or disposal risk, complex cooking processes, or warehousing logistics",
        ],
      },
      {
        subtitle: "CHEDAWON solution",
        points: [
          "OEM/ODM for new and existing brands, multi-item production by food type",
          "Licensing & menu analysis, product & package design, and video production",
        ],
      },
      {
        subtitle: "Connected sales channels",
        points: [
          "New-item proposals to B2B partners",
          "Entry into MCN, crowdfunding, and open commerce",
          "Online marketing: keyword & SNS ads, blogger reviews",
        ],
      },
    ],
  },
  {
    id: "mealkit",
    category: "Cooksan",
    title: "Specialty Meal Kits",
    headline: "Opening a new meal-kit trend with the Cooksan brand",
    image: "/images/biz-kit-v4.png",
    intro:
      "Meal-kit trends are shifting toward health & wellness, personalization, convenience, sustainability, and global diversity. Through premium differentiation, stronger marketing, and O2O offline expansion linked with online channels, we are opening new markets in the meal-kit industry.",
    stats: [
      { value: "1-person", label: "Dual-income · health-focused consumers" },
      { value: "Millennials", label: "Core customer base" },
    ],
    sections: [
      {
        subtitle: "Five industry trends",
        points: [
          "Health & wellness: organic ingredients, low-calorie, low-sodium meal kits",
          "Personalized & convenient: kits designed for quick, easy cooking",
          "Sustainable & global: eco-friendly packaging and world-cuisine kits",
        ],
      },
      {
        subtitle: "Strength of in-house production",
        points: [
          "Production efficiency, quality control, economies of scale, and secured distribution channels",
          "Competitive meal-kit operations using CHEDAWON's own food manufacturing plants",
        ],
      },
      {
        subtitle: "Market strategy",
        points: [
          "Premium product upgrades and package curation aligned with market trends",
          "Stronger marketing, offline store entry, and O2O online linkage",
        ],
      },
    ],
  },
  {
    id: "mall",
    category: "B2C Platform",
    title: "Online Ingredient Mall",
    headline: "One-stop solution for food-service ingredient shopping",
    image: "/images/biz-online-v4.png",
    intro:
      "A verified online marketplace for food-service business owners — differentiated service, premium product curation, and proven operations across Smart Store, crowdfunding (Wadiz), and open marketplaces.",
    stats: [
      { value: "16,000+", label: "Business clients" },
      { value: "81.5%", label: "Repeat order rate" },
      { value: "620,330+", label: "Cumulative deliveries" },
      { value: "6,200,999+", label: "Products sold" },
    ],
    sections: [
      {
        subtitle: "Live market price information",
        points: [
          "Real-time average prices for key items — lettuce 4kg, cucumbers 10kg, cheongyang peppers 1kg, and more",
          "Transparent purchase decisions backed by live pricing data",
        ],
      },
      {
        subtitle: "A proven ingredient service",
        points: [
          "A distribution platform trusted by food-service business owners",
          "81.5% of all customers keep coming back",
        ],
      },
      {
        subtitle: "Genuine customer reviews",
        points: [
          "\u201CIt feels like shopping the market in person — and I can order with complete peace of mind.\u201D",
          "\u201CThis is my 10th order! They have never missed a promise — and my restaurant has grown because of them.\u201D",
        ],
      },
    ],
  },
];

/* ---------------------------- Products ---------------------------- */

export const EN_PRODUCTS = [
  {
    name: "Ricotta Cheese Salad",
    kr: "리코타치즈 샐러드",
    weight: "240g",
    kcal: "238.51 kcal",
    dressing: "Balsamic",
    items: ["Ricotta cheese", "Fusilli", "Cherry tomatoes", "Sweet corn", "Olives", "Vegetable mix"],
    image: "/images/prod-1.png",
  },
  {
    name: "Tender Chicken Salad",
    kr: "텐더치킨 샐러드",
    weight: "220g",
    kcal: "216.59 kcal",
    dressing: "Ranch",
    items: ["Cajun chicken", "Cherry tomatoes", "Sweet corn", "Olives", "Vegetable mix"],
    image: "/images/prod-2.png",
  },
  {
    name: "Bacon Potato Salad",
    kr: "베이컨 감자 샐러드",
    weight: "200g",
    kcal: "229.38 kcal",
    dressing: "Ranch",
    items: ["Bacon", "Potato", "Cherry tomatoes", "Egg", "Kidney beans", "Vegetable mix"],
    image: "/images/prod-3-v2.png",
  },
  {
    name: "Chicken Breast Salad",
    kr: "닭가슴살 샐러드",
    weight: "220g",
    kcal: "194.23 kcal",
    dressing: "Balsamic",
    items: ["Chicken breast", "Cherry tomatoes", "Olives", "Vegetable mix"],
    image: "/images/prod-4.png",
  },
  {
    name: "Smoked Chicken Salad",
    kr: "훈제 닭가슴살 샐러드",
    weight: "215g",
    kcal: "196.53 kcal",
    dressing: "Oriental",
    items: ["Smoked chicken breast", "Olives", "Paprika", "Sweet corn", "Vegetable mix"],
    image: "/images/prod-5.png",
  },
] as const;

export const EN_PRODUCT_LINES = [
  {
    name: "Basic Salads",
    desc: "Ricotta cheese · Chicken tender · Pulled pork · Chicken breast · Cube chicken breast (170g / dressing separate)",
  },
  {
    name: "Square Salads",
    desc: "Cajun chicken · Chicken & egg · Ricotta cheese & egg · Pulled pork (230g / dressing separate)",
  },
  {
    name: "Salad Kit",
    desc: "Sweet corn · Olive slices · Egg · Cherry tomatoes · Vegetable mix (1,000g)",
  },
] as const;

/* ------------------------- Certifications ------------------------- */

export const EN_CERTIFICATIONS = [
  { name: "Fruit & Vegetable Processed Products", no: "No. 2022-3-1248", period: "2022.12.29 – 2025.12.28" },
  { name: "Ready-to-Cook Sets", no: "No. 2024-3-0956", period: "2024.10.30 – 2027.10.29" },
  { name: "Fresh Convenience Foods", no: "No. 2023-3-0254", period: "2023.03.30 – 2026.03.29" },
  { name: "Ready-to-Eat Foods", no: "No. 2023-3-0862", period: "2023.11.02 – 2026.11.01" },
] as const;

export const EN_EQUIPMENT_STAGES: {
  label: string;
  desc: string;
  items: { name: string; role: string; image: string }[];
}[] = [
  {
    label: "Raw Material Processing",
    desc: "Washing · Slicing · Dewatering",
    items: [
      { name: "3-Tier Bubble Washer", role: "Washing & sanitizing", image: "/images/equip-washer.jpg" },
      { name: "Bucket Washer", role: "Container washing", image: "/images/equip-bucketwasher.jpg" },
      { name: "Vegetable Slicer", role: "Cutting & slicing", image: "/images/equip-slicer.jpg" },
      { name: "Centrifugal Dryer", role: "Dewatering", image: "/images/equip-dryer.jpg" },
    ],
  },
  {
    label: "Packaging & Forming",
    desc: "Vacuum packing · Tray sealing",
    items: [
      { name: "GP460 Auto Thermoforming Vacuum Packer", role: "Auto forming · vacuum packing", image: "/images/equip-gp460.jpg" },
      { name: "Double-Chamber Vacuum Packer", role: "Vacuum packing", image: "/images/equip-chamber.jpg" },
      { name: "Tray Sealer", role: "Tray sealing & closing", image: "/images/equip-traysealer.jpg" },
      { name: "Horizontal Band Sealer", role: "Pouch sealing", image: "/images/equip-bandsealer.jpg" },
    ],
  },
  {
    label: "Safety Inspection",
    desc: "Metal contamination detection",
    items: [
      { name: "Metal Detector", role: "Foreign object inspection", image: "/images/equip-metal.jpg" },
      { name: "Metal Detector (Aluminum)", role: "Aluminum-compatible inspection", image: "/images/equip-metal-alu.jpg" },
    ],
  },
];

/* --------------------------- Strategy ----------------------------- */

export const EN_STRATEGY_PILLARS = [
  {
    name: "Custom Manufacturing",
    kr: "맞춤제조",
    points: [
      "Sourcing of raw materials from trusted producing regions, with standardized processing by category",
      "Self-operated plants designed to HACCP standards — multi-item, small-batch production by product type",
    ],
  },
  {
    name: "Quality Management",
    kr: "품질관리",
    points: [
      "Risk analysis with function-by-function checks before item selection and ordering",
      "Advanced hygiene & safety systems and dedicated specialist training",
    ],
  },
  {
    name: "Price Competitiveness",
    kr: "Price",
    points: [
      "Cost savings through bulk purchasing and strategic unified price contracts",
      "Continuous price verification through price monitoring",
    ],
  },
  {
    name: "Trend Response",
    kr: "Trend",
    points: [
      "Tangible and intangible service products built on the B2B infrastructure to meet client needs",
      "New items proposed after price verification and market research",
    ],
  },
  {
    name: "Data-Driven Service",
    kr: "Data Base",
    points: [
      "Tailored services based on analysis of client purchase items and patterns",
      "Stronger online distribution and sustainable digital transformation powered by big data",
    ],
  },
] as const;

export const EN_END_TO_END_FLOW = [
  { label: "Raw sourcing", desc: "Trusted producing regions" },
  { label: "HACCP manufacturing", desc: "Self-operated plants" },
  { label: "Quality inspection", desc: "Function-by-function checks" },
  { label: "Cold-chain delivery", desc: "Produced fresh daily" },
  { label: "Data accumulation", desc: "Tailored service design" },
] as const;

/* ----------------------------- Values ----------------------------- */

export const EN_VALUES = [
  {
    title: "Differentiated service\nfor our clients",
    image: "/images/value-1.png",
    points: [
      "Client-tailored services through diversification of existing business units",
      "Type-specific services and solutions matched to each client's business",
      "Stronger V.A.S (Value Added Services) distribution capabilities",
      "Strategic partnerships with B2B operators",
    ],
  },
  {
    title: "Expanding\nnew business areas",
    image: "/images/value-2.png",
    points: [
      "Proactive diversification in a changing market environment",
      "OEM manufacturing, solution-based services, and expanded specialty meal kits",
      "Business operations that put future-oriented value first",
      "An organization built to respond nimbly to market conditions",
    ],
  },
  {
    title: "A new distribution\nparadigm",
    image: "/images/value-3.png",
    points: [
      "Technology that maximizes synergy and value across diverse business environments",
      "A unique food-tech domain where manufacturing, distribution, technology, and services converge",
      "Leading the new distribution market by seizing emerging opportunities",
    ],
  },
  {
    title: "Responsibility as\na social enterprise",
    image: "/images/value-4.png",
    points: [
      "Solid, close partnerships with suppliers through fair trade",
      "Giving back profits to society — practicing sharing and environmental responsibility",
      "Fulfilling our rights and duties as a member of society",
    ],
  },
] as const;

/* ----------------------------- History ---------------------------- */

export type EnHistoryEntry = { year: number; month: string; text: string };

export const EN_HISTORY: { year: number; items: { month: string; text: string }[] }[] = [
  {
    year: 2025,
    items: [{ month: "02", text: "Ingredient supply to GS25 convenience stores" }],
  },
  {
    year: 2024,
    items: [
      { month: "10", text: "HACCP certification for ready-to-cook sets" },
      { month: "02", text: "Ingredient supply to GS Supermarkets" },
    ],
  },
  {
    year: 2023,
    items: [
      { month: "11", text: "HACCP certification for ready-to-eat foods" },
      { month: "08", text: "HACCP certification — Seongnam Plant 2" },
      { month: "05", text: "Seongnam Plant 2 established" },
      { month: "03", text: "HACCP certification for fresh convenience foods" },
    ],
  },
  {
    year: 2022,
    items: [
      { month: "12", text: "HACCP certification for fruit & vegetable products" },
      { month: "10", text: "Ingredient supply to MYCHEF (meal kits)" },
      { month: "10", text: "Headquarters relocated to Manseok-dong, Incheon" },
      { month: "08", text: "Capital increase" },
    ],
  },
  {
    year: 2021,
    items: [{ month: "11", text: "Ingredient supply to Korean Air Cendi catering" }],
  },
  {
    year: 2017,
    items: [
      { month: "11", text: "Ingredient supply to LSG Sky Chefs Korea (foreign airlines)" },
      { month: "06", text: "Ingredient supply to gategourmet Korea (Asiana Airlines)" },
      { month: "06", text: "Company incorporated" },
    ],
  },
];

export const EN_YEAR_SUMMARIES = [
  "Supply to GS25 convenience stores widened our reach into major retail channels.",
  "HACCP certifications and GS Supermarket supply grew our distribution and manufacturing capabilities together.",
  "The new Seongnam plant and three HACCP certifications greatly expanded our production infrastructure.",
  "HQ relocation, a capital increase, and meal-kit supply solidified our business foundation.",
  "Korean Air catering supply proved our expertise in airline ingredient sourcing.",
  "We took our first steps with incorporation and catering supply to both major airlines.",
];

export const EN_DEFAULT_HISTORY: EnHistoryEntry[] = EN_HISTORY.flatMap((h) =>
  h.items.map((item) => ({ year: h.year, month: item.month, text: item.text }))
);

/* ----------------------------- Partners --------------------------- */

export type EnPartnerItem = { name: string; ko: string };

export const EN_PARTNERS: EnPartnerItem[] = [
  { name: "ASIANA AIRLINES", ko: "아시아나항공" },
  { name: "KOREAN AIR", ko: "대한항공" },
  { name: "LSG Sky Chefs", ko: "엘에스지스카이셰프코리아" },
  { name: "GS Retail", ko: "지에스리테일" },
  { name: "MYCHEF", ko: "마이셰프" },
  { name: "SALKIT", ko: "셀러팝" },
  { name: "Sweet Balance", ko: "스윗밸런스" },
];

/* ------------------------------- News ------------------------------ */

export type EnNewsItem = {
  category: string;
  date: string;
  title: string;
  desc: string;
  highlight?: boolean;
};

export const EN_NEWS: EnNewsItem[] = [
  {
    category: "Supply",
    date: "2025.02",
    title: "Ingredient supply contract signed with GS25 convenience stores",
    desc: "Expanded our supply network to convenience-store channels nationwide and built a regular delivery system for fresh ingredients.",
    highlight: true,
  },
  {
    category: "Certification",
    date: "2024.10",
    title: "HACCP certification for ready-to-cook sets — all 4 categories now certified",
    desc: "Following fruit & vegetable products, fresh convenience foods, and ready-to-eat foods, our fourth category certification completed HACCP management across the entire lineup.",
  },
  {
    category: "Supply",
    date: "2024.02",
    title: "Ingredient supply begins for GS Supermarkets",
    desc: "Expanded supply to major-retail channels, proving quality built on airline-catering expertise.",
  },
  {
    category: "Facility",
    date: "2023.05",
    title: "Seongnam Plant 2 established — with HACCP certification",
    desc: "Commissioned a second plant to expand production capacity and obtained HACCP certification in August of the same year.",
  },
];

export const EN_CHANNELS = [
  { icon: "plane", label: "Airlines & Catering", desc: "Korean Air · Asiana Airlines · LSG" },
  { icon: "store", label: "Major Retail", desc: "GS Retail (supermarkets & convenience stores)" },
  { icon: "utensils", label: "Franchise", desc: "Salad & meal-kit brands" },
  { icon: "hotel", label: "Hotels & Resorts", desc: "Catering ingredient supply" },
] as const;

/* ------------------------------- FAQ ------------------------------ */

export const EN_FAQS: { q: string; a: string }[] = [
  {
    q: "Where do you deliver ingredients?",
    a: "We deliver nationwide across Korea via our cold-chain network, centered on the Seoul capital area. A regular delivery schedule is set up for each client based on site size and product range.",
  },
  {
    q: "What is your minimum order quantity (MOQ) for OEM/ODM?",
    a: "CHEDAWON aims for the industry's lowest MOQ. The minimum production quantity varies by item and specification — a 1:1 consultation will confirm the exact quantities and terms.",
  },
  {
    q: "Which products are HACCP-certified?",
    a: "We hold HACCP certification for four categories: fruit & vegetable processed products, ready-to-cook sets, fresh convenience foods, and ready-to-eat foods. Certification numbers and details are listed in the Quality section of this website.",
  },
  {
    q: "How long does product development (ODM) take, from planning to launch?",
    a: "We support every stage — planning, licensing, design, and manufacturing. Lead times vary by item and specification; consultations confirm a development schedule for each product.",
  },
  {
    q: "Do you provide ingredient market price information?",
    a: "Yes. The CHEDAWON ingredient mall publishes real-time average prices for key items, supporting transparent purchasing decisions.",
  },
  {
    q: "What types of clients do you supply?",
    a: "We supply B2B clients including airlines & catering, major retail (supermarkets and convenience stores), salad and meal-kit franchises, and hotels & resorts.",
  },
  {
    q: "How does a quotation consultation work?",
    a: "Submit a 1:1 inquiry or call +82-32-752-7227 — a specialist will connect with you promptly and prepare a tailored quotation based on your business site information.",
  },
  {
    q: "Where are your production facilities?",
    a: "We operate our own plants in Incheon (headquarters, Dong-gu Manseok-dong) and Seongnam (Plant 2), running every process with in-house equipment. Both plants are designed and operated to HACCP standards.",
  },
];

/* --------------------------- Inquiry form ------------------------- */

export const EN_INQUIRY_TYPES = [
  { value: "Ingredient supply", api: "식자재 공급" },
  { value: "OEM / ODM manufacturing", api: "OEM·ODM 제조" },
  { value: "MEALBOX25 · Meal kits", api: "MEALBOX25·밀키트" },
  { value: "Other", api: "기타" },
] as const;
