/* ------------------------------------------------------------------ */
/*  CHEDAWON — company data extracted from PR deck (202508 v2.0)       */
/* ------------------------------------------------------------------ */

export const COMPANY = {
  name: "주식회사 채다원",
  nameEn: "CHEDAWON Co., Ltd.",
  slogan: "사람. 다양한 생활. 좋은 먹거리",
  tagline: "The Company Responsible for Healthy Life",
  ceo: "박영호",
  founded: "2017년 06월 01일",
  capital: "6억원",
  phone: "032-752-7227",
  phoneDisplay: "032.752.7227",
  address: "인천광역시 동구 만석동 1-39",
  business: "식자재 유통 및 밀키트 OEM/ODM 사업",
} as const;

/* ------------------------------ Hero ------------------------------ */

export const HERO_KEYWORDS = [
  "식자재 유통",
  "밀키트 OEM/ODM",
  "푸드메이킹 프로세스 혁신",
  "HACCP 인증 생산시설",
  "항공사 케이터링 노하우",
  "B2B 구매대행",
  "특화 밀키트 Cooksan",
  "식자재 전문몰",
  "MEALBOX25",
  "TFS · Total Food Solution",
];

/* ------------------------- CEO / About ---------------------------- */

export const CEO_MESSAGE = {
  title: "고객의 요구를 충족시킬 수 있는\n신뢰받는 식자재 솔루션 공급자",
  body: [
    "(주)채다원은 다년간 국내 대형항공사 식자재 공급의 노하우와 최근 대기업 수퍼/편의점, 샐러드 프렌차이즈, 호텔&리조트 등의 신규 공급을 통해 사업영역이 확대되고 있으며 생산지, 공급사와의 파트너십을 기반으로 상생하며 성장하고 있는 식자재 전문 기업으로 새롭게 도약하고 있습니다.",
    "고객의 요구를 충족시킬 수 있는 신뢰받는 식자재 솔루션 공급자가 되어 식품문화를 발전시키는데 기여하고자 지속적인 메뉴 개발, 품질 관리를 우선하며 고객 친화적인 시스템 구축, 관리 등에도 기술적 투자, 연구 개발을 꾸준히 노력하고자 합니다.",
    "앞으로도 다양한 공급사와 공고한 파트너십을 기반으로 성장할 수 있는 식품유통의 지속성장기업으로 더 나은 제품, 더 나은 만족감을 제공하기 위해 끊임없이 노력을 기울일 것이며 디지털화, 친환경 트렌드, 혁신적인 서비스 모델 등의 주요 발전 방향에 발맞추어 경쟁력을 강화할 것을 약속 드립니다.",
  ],
};

export const COMPANY_INFO: { label: string; value: string }[] = [
  { label: "사업분야", value: "식자재 유통 및 밀키트 OEM/ODM 사업" },
  { label: "대표자", value: "박영호" },
  { label: "설립일", value: "2017년 06월 01일" },
  { label: "자본금", value: "6억원" },
  { label: "대표전화", value: "032-752-7227" },
  { label: "주소", value: "인천광역시 동구 만석동 1-39" },
];

/* --------------------------- Business ----------------------------- */

export type BusinessItem = {
  id: string;
  category: string;
  title: string;
  headline: string;
  image: string;
  intro: string;
  stats?: { value: string; label: string }[];
  sections: {
    subtitle: string;
    points: string[];
  }[];
  chips?: string[];
};

export const BUSINESSES: BusinessItem[] = [
  {
    id: "distribution",
    category: "B2B",
    title: "식자재 유통 · 구매대행",
    headline: "전과정을 아우르는 원스톱 B2B 식자재 유통",
    image: "/images/biz-b2b-v4.png",
    intro:
      "한국의 기업 간 거래(B2B) 식자재 유통 시장은 다양한 산업에서 중요한 역할을 하고 있으며, 앞으로의 전망도 밝습니다. 국내 B2B 식자재 유통 시장은 2020년 55조 원에서 2025년 64조 원으로 성장할 것으로 추산되며, 연 6~8% 성장과 디지털화의 진행으로 온라인 주문과 배송 서비스가 더욱 활성화될 것입니다.",
    stats: [
      { value: "55조 → 64조", label: "B2B 식자재 유통 시장 규모 (2020→2025)" },
      { value: "6~8%", label: "연평균 시장 성장률" },
    ],
    sections: [
      {
        subtitle: "원가 · 비용절감",
        points: [
          "다양한 산지 직거래, 우수 공급사와의 거래로 대량 구매를 통한 구매원가 절감",
          "계약구매 등 중장기 단가 반영을 통한 단가 안정화와 구매 방식 다양화로 가격 경쟁력 확보",
        ],
      },
      {
        subtitle: "업무프로세스 개선",
        points: [
          "다양한 신규품목 제안과 소싱, 협력사 관리 등 복잡한 업무를 간소화하고 구매 Lead Time 단축",
          "전문 인력을 통한 고객사의 구매·재고·관리 및 소분(가공)에 통한 편의성과 물류체계 제공",
        ],
      },
      {
        subtitle: "품질평가 및 안전관리",
        points: [
          "연 1회 이상의 현장 점검과 정기평가를 통해 우수협력사를 지속적으로 확보",
          "품질저하 예상품목에 대한 사전 점검으로 선제적 품질관리와 위생 안전관리 시행",
        ],
      },
    ],
    chips: [
      "시장 트렌드 변화에 따른 빠른 상품기획",
      "고객사별 가격 관리 (사업장별/단가계약)",
      "생산·제조·가공·유통·판매 전과정 원스톱 비즈니스",
    ],
  },
  {
    id: "manufacturing",
    category: "B2B / B2C",
    title: "식품제조 연결사업",
    headline: "푸드메이킹 프로세스 혁신",
    image: "/images/biz-mfg-v5.png",
    intro:
      "간편식과 기타 자체 레시피의 상품화를 원하는 개인·소상공인에게 자체 제조시설을 제공하여, 업계 최소 MOQ로 부담 없이 의뢰하고 상품을 만들 수 있습니다. R&D 기획과 제조역량, 빠른 고객테스트와 온라인에 대한 강점을 가진 경쟁력이 밀레니얼 세대의 감성을 파고들어 팬덤을 이루고, 꾸준하고 지속적인 소비로 연결하면서 시장을 만들 수 있습니다.",
    stats: [
      { value: "업계 최소 MOQ", label: "간편 의뢰 · 상품 제작" },
      { value: "R&D", label: "기획 · 제조역량 · 고객테스트" },
    ],
    sections: [
      {
        subtitle: "식품 제조 의뢰자 — 이런 부담이 사라집니다",
        points: [
          "MOQ 부담 · 재고/폐기 부담 · 복잡한 조리과정 · 물류(창고) 관리 부담",
        ],
      },
      {
        subtitle: "채다원 솔루션",
        points: [
          "신규/기존 브랜드 OEM/ODM, 다품목·식품 유형별 제조 기반",
          "인허가 및 메뉴 분석, 개발·포장 등 브랜드/패키지 디자인, 영상 제작",
        ],
      },
      {
        subtitle: "다수의 판매채널 — 판매 연계",
        points: [
          "B2B 파트너사 신규 품목 제안",
          "MCN / 크라우드펀딩 / 일반커머스 진출",
          "온라인 홍보: 키워드 광고, SNS 광고, 블로그 체험단 등",
        ],
      },
    ],
    chips: [
      "레시피 · 제조 / 물류시스템 연계",
      "자체기획상품 판매 (CookSan, etc)",
      "국내 유탁상품 판매",
    ],
  },
  {
    id: "mealkit",
    category: "Cooksan",
    title: "특화 밀키트 사업",
    headline: "Cooksan 브랜드로 여는 밀키트 시장의 새로운 트렌드",
    image: "/images/biz-kit-v4.png",
    intro:
      "밀키트 산업의 최근 트렌드는 건강·웰빙, 개인화·맞춤형, 간편성·편의성, 지속가능성·친환경, 다양성·글로벌화로 변화하고 있습니다. 브랜드 차별화를 통한 프리미엄 상품의 고급화와 패키지 구성을 통해 시장 트렌드 변화에 따른 빠른 상품기획과 마케팅 강화, 오프라인매장 진출, 온라인과의 연계로 밀키트시장의 신규시장을 개척하고자 합니다.",
    stats: [
      { value: "1인 가구", label: "맞벌이 가구 · 건강·웰빙 지향 소비자" },
      { value: "밀레니얼", label: "새로운 주요 고객층" },
    ],
    sections: [
      {
        subtitle: "밀키트 산업의 5가지 트렌드",
        points: [
          "건강 및 웰빙 지향: 유기농 식재료, 저칼로리, 저염 등 건강 지향적 밀키트",
          "개인화·맞춤형 / 간편성·편의성: 취미 시간이 짧고 손쉽게 요리할 수 있는 밀키트 선호",
          "지속가능성·친환경 / 다양성·글로벌화: 친환경 포장재와 다양한 세계 요리 밀키트 출시",
        ],
      },
      {
        subtitle: "자체 생산의 강점",
        points: [
          "생산 효율성, 품질 관리, 규모의 경제, 유통 채널 확보 등의 장점",
          "채다원 식품제조시설을 활용한 밀키트 사업으로 경쟁력 확보",
        ],
      },
      {
        subtitle: "시장 개척 전략",
        points: [
          "프리미엄 상품 고급화와 패키지 구성으로 시장 트렌드 대응",
          "마케팅 강화 · 오프라인매장 진출 · O2O 오프라인매장 진출을 통한 온라인과의 연계",
        ],
      },
    ],
    chips: ["밀키트 신규시장 개척: AMR (Airline Meal Replacement)", "인허가 및 메뉴분석 · 개발 포장", "O2O 오프라인 매장 진출"],
  },
  {
    id: "mall",
    category: "B2C Platform",
    title: "식자재 전문몰",
    headline: "심심한 식자재 장보기 고민,\n채다원으로 한번에 해결하세요",
    image: "/images/biz-online-v4.png",
    intro:
      "온라인을 기반으로 차별화된 서비스 제공, 프리미엄 상품의 고급화와 패키지 구성을 통한 상품 로열티 부여, 스마트스토어 · 크라우드펀딩(워디즈 등) · 오픈마켓 입점 등 온라인 홍보를 통해 식자재 전문몰 온라인 유통 사업을 운영하고 있습니다.",
    stats: [
      { value: "16,000+", label: "이용 고객사" },
      { value: "81.5%", label: "재이용률" },
      { value: "620,330", label: "누적 배송 건수" },
      { value: "6,200,999", label: "판매 상품 개수" },
    ],
    sections: [
      {
        subtitle: "실시간 주요 식자재 평균 시세",
        points: [
          "양상추 4kg 국내산, 오이 특 10kg 국내산, 청양고추 특 1kg 등 주요 품목별 시세 제공",
          "주요 식자재의 실시간 평균 시세 정보 제공으로 투명한 구매 의사결정 지원",
        ],
      },
      {
        subtitle: "오랜 기간 검증된 식자재 서비스",
        points: [
          "외식업 사업자들이 사용하는 검증된 유통 플랫폼",
          "전체 고객의 81.5%가 꾸준히 재이용하고 있습니다",
        ],
      },
      {
        subtitle: "고객들의 진솔한 후기",
        points: [
          "“장을 직접 보는 것처럼 편리할 뿐만 아니라, 안심할 수 있어서 너무 좋아요.”",
          "“벌써 10번째 주문! 한 번도 약속을 어기지 않고, 우리 가게가 클 수 있도록 도와주어서 감사합니다.”",
        ],
      },
    ],
    chips: ["디자인 콘텐츠: 브랜드/패키지 디자인, 영상 제작", "온라인 홍보: 키워드·SNS 광고", "스마트스토어 · 크라우드펜딩 · 오픈마켓"],
  },
];

/* --------------------------- Strategy ----------------------------- */

export const STRATEGY_PILLARS = [
  {
    name: "맞춤제조",
    en: "CUSTOM MANUFACTURING",
    points: [
      "품목 카테고리 별 신뢰성 있는 우수 산지 중심으로 원물 소싱 및 가공 공정화",
      "HACCP 기준으로 설계된 자체공장, 제품유형에 맞는 다품종 소량생산 가능",
    ],
  },
  {
    name: "품질관리",
    en: "QUALITY MANAGEMENT",
    points: [
      "품목 선정 및 발주 전 Function별 Check를 통한 위험요소 분석",
      "위생·안전관리를 위한 선진 위생 및 관리체계와 담당자 육성",
    ],
  },
  {
    name: "Price",
    en: "PRICE COMPETITIVENESS",
    points: [
      "대량구매 및 전략적 통합구매계약(단가계약)에 의한 원가절감 유도",
      "Price Monitoring에 의한 지속적 가격 검증",
    ],
  },
  {
    name: "Trend",
    en: "TREND RESPONSE",
    points: [
      "고객의 니즈에 대응하기 위한 B2B 인프라 활용 유/무형 서비스 상품 개발",
      "신규품목은 단가검증 및 시장조사 업무를 수행하여 제안",
    ],
  },
  {
    name: "Data Base",
    en: "DATA-DRIVEN SERVICE",
    points: [
      "고객 구매 품목 및 패턴 등의 자료 분석을 기반으로 한 맞춤형 서비스 제공",
      "빅데이터 활용 온라인 유통 강화 및 디지털 전환의 지속 가능성",
    ],
  },
];

/* ----------------------------- Values ----------------------------- */

export const VALUES = [
  {
    title: "고객사를 위한\n차별화 서비스",
    image: "/images/value-1.png",
    points: [
      "기존 사업부문 다각화를 통한 고객 맞춤식 서비스 제공",
      "고객 사업 특성에 맞는 유형별 서비스와 솔루션 제안",
      "V.A.S(Value Added Services) 유통사업 역량강화",
      "B2B 사업자와의 전략적 사업 협력관계 구축",
    ],
  },
  {
    title: "신규 사업\n영역 확대",
    image: "/images/value-2.png",
    points: [
      "변화하는 시장 환경에 따른 능동적 사업영역의 다각화",
      "OEM 방식의 제조, 솔루션화 사업, 특화 밀키트 사업 및 상품확대",
      "미래지향적인 가치에 우선한 사업의 영위",
      "시장상황에 능동적으로 대처하기 위한 조직 강화",
    ],
  },
  {
    title: "신유통\n패러다임 제시",
    image: "/images/value-3.png",
    points: [
      "다양한 사업환경의 시너지 사업 및 가치를 극대화하는 기술 추구",
      "제조, 유통, 기술, 서비스가 융합된 독자적인 푸드테크 사업 영역",
      "새로운 사업환경에서의 시장 선점을 위한 신유통시장 리더",
    ],
  },
  {
    title: "사회적기업으로의\n책임",
    image: "/images/value-4.png",
    points: [
      "공정거래를 통한 협력사들과의 견고하고 밀접한 협력 관계 강화",
      "이익의 사회환원을 통한 나눔과 환경을 위한 실천 노력",
      "사회 구성원으로서의 권리와 의무 이행",
    ],
  },
];

/* ---------------------------- Products ---------------------------- */

export const PRODUCTS = [
  {
    name: "리코타치즈 샐러드",
    en: "Ricotta Cheese Salad",
    weight: "240g",
    kcal: "238.51 kcal",
    dressing: "발사믹",
    items: ["리코타치즈", "퓨질리", "방울토마토", "스위트콘", "올리브", "야채믹스"],
    image: "/images/prod-1.png",
  },
  {
    name: "텐더치킨 샐러드",
    en: "Tender Chicken Salad",
    weight: "220g",
    kcal: "216.59 kcal",
    dressing: "랜치",
    items: ["케이준치킨", "방울토마토", "스위트콘", "올리브", "야채믹스"],
    image: "/images/prod-2.png",
  },
  {
    name: "베이컨 감자 샐러드",
    en: "Bacon Potato Salad",
    weight: "200g",
    kcal: "229.38 kcal",
    dressing: "랜치",
    items: ["베이컨", "감자", "방울토마토", "계란", "키드니빈스", "야채믹스"],
    image: "/images/prod-3.png",
  },
  {
    name: "닭가슴살 샐러드",
    en: "Chicken Breast Salad",
    weight: "220g",
    kcal: "194.23 kcal",
    dressing: "발사믹",
    items: ["닭가슴살", "방울토마토", "올리브", "야채믹스"],
    image: "/images/prod-4.png",
  },
  {
    name: "훈제 닭가슴살 샐러드",
    en: "Smoked Chicken Salad",
    weight: "215g",
    kcal: "196.53 kcal",
    dressing: "오리엔탈",
    items: ["훈제닭가슴살", "올리브", "파프리카", "스위트콘", "야채믹스"],
    image: "/images/prod-5.png",
  },
];

export const PRODUCT_LINES = [
  {
    name: "베이직 샐러드",
    desc: "리코타치즈 · 치킨텐더 · 풀드포크 · 닭가슴살 · 큐브닭가슴살 (170g / 드레싱 별도)",
  },
  {
    name: "사각 샐러드",
    desc: "케이준 치킨 · 치킨 에그 · 리코타 치즈 에그 · 풀드포크 (230g / 드레싱 별도)",
  },
  { name: "셀러드 키트", desc: "스위트콘 · 올리브슬라이스 · 계란 · 방울토마토 · 야채믹스 (1,000g)" },
];

/* -------------------------- Certifications ------------------------ */

export const CERTIFICATIONS = [
  { name: "과채가공품", no: "제 2022-3-1248호", period: "2022.12.29 ~ 2025.12.28" },
  { name: "간편조리세트", no: "제 2024-3-0956호", period: "2024.10.30 ~ 2027.10.29" },
  { name: "신선 편의식품", no: "제 2023-3-0254호", period: "2023.03.30 ~ 2026.03.29" },
  { name: "즉석 섭취식품", no: "제 2023-3-0862호", period: "2023.11.02 ~ 2026.11.01" },
];

export const EQUIPMENT_STAGES: {
  label: string;
  desc: string;
  items: { name: string; role: string; image: string }[];
}[] = [
  {
    label: "원물 처리",
    desc: "세척 · 절단 · 탈수",
    items: [
      {
        name: "대형 3단 버블세척기",
        role: "원물 세척 · 살균",
        image: "/images/equip-washer.jpg",
      },
      {
        name: "버켓 세척기",
        role: "용기 세척",
        image: "/images/equip-bucketwasher.jpg",
      },
      {
        name: "채소 슬라이서",
        role: "절단 · 슬라이스",
        image: "/images/equip-slicer.jpg",
      },
      {
        name: "탈수기",
        role: "탈수",
        image: "/images/equip-dryer.jpg",
      },
    ],
  },
  {
    label: "포장 · 성형",
    desc: "진공 포장 · 트레이 실링",
    items: [
      {
        name: "GP460 자동 열성형 진공포장기",
        role: "자동 성형 · 진공 포장",
        image: "/images/equip-gp460.jpg",
      },
      {
        name: "복식 챔버식 진공포장기",
        role: "진공 포장",
        image: "/images/equip-chamber.jpg",
      },
      {
        name: "트레이 실러 포장기",
        role: "트레이 실링 · 밀봉",
        image: "/images/equip-traysealer.jpg",
      },
      {
        name: "수평형 밴드 실링기",
        role: "포장 백 실링",
        image: "/images/equip-bandsealer.jpg",
      },
    ],
  },
  {
    label: "안전 검사",
    desc: "금속 이물 검출",
    items: [
      {
        name: "금속 검출기",
        role: "이물 검사",
        image: "/images/equip-metal.jpg",
      },
      {
        name: "금속 검출기 (알루미늄)",
        role: "알루미늄 대응 검사",
        image: "/images/equip-metal-alu.jpg",
      },
    ],
  },
];

/* ----------------------------- History ---------------------------- */

export const HISTORY = [
  {
    year: 2025,
    items: [{ month: "02", text: "GS25편의점 식자재공급" }],
  },
  {
    year: 2024,
    items: [
      { month: "10", text: "간편조리세트 HACCP 인증" },
      { month: "02", text: "GS수퍼 식자재공급" },
    ],
  },
  {
    year: 2023,
    items: [
      { month: "11", text: "즉석섭취 HACCP 인증" },
      { month: "08", text: "성남 제2공장 HACCP 인증" },
      { month: "05", text: "성남 제2공장 신설" },
      { month: "03", text: "신선편의식품 HACCP 인증" },
    ],
  },
  {
    year: 2022,
    items: [
      { month: "12", text: "과채가공품 HACCP 인증" },
      { month: "10", text: "마이셰프 식자재 공급 (밀키트)" },
      { month: "10", text: "본사 이전 (현 만석동)" },
      { month: "08", text: "자본금 증자" },
    ],
  },
  {
    year: 2021,
    items: [{ month: "11", text: "대한항공쎈디 식자재 공급 (대한항공)" }],
  },
  {
    year: 2017,
    items: [
      { month: "11", text: "엘에스지스카이셰프코리아 식자재 공급 (외항사)" },
      { month: "06", text: "케이트고메코리아 식자재 공급 (아시아나항공)" },
      { month: "06", text: "법인설립" },
    ],
  },
];

/* ----------------------------- Partners --------------------------- */

export const PARTNERS = [
  { name: "ASIANA AIRLINES", ko: "아시아나항공" },
  { name: "KOREAN AIR", ko: "대한항공" },
  { name: "LSG Sky Chefs", ko: "엘에스지스카이셰프코리아" },
  { name: "GS Retail", ko: "지에스리테일" },
  { name: "MYCHEF", ko: "마이셰프" },
  { name: "SALKIT", ko: "셀러팝" },
  { name: "Sweet Balance", ko: "스윗밸런스" },
];
