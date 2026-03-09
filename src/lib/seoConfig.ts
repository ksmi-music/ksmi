/**
 * 페이지별 SEO 설정
 */
export const SEO_CONFIG: Record<
  string,
  { title: string; description: string; path: string }
> = {
  "/": {
    title: "한국음악정보학회 - KSMI | Korean Society for Music Informatics",
    description:
      "한국음악정보학회(Korean Society for Music Informatics, KSMI) 공식 홈페이지. 음악정보학 관련 학술대회, 연구, 학회 소개.",
    path: "/",
  },
  "/about": {
    title: "학회 소개",
    description:
      "한국음악정보학회(KSMI) 학회 소개. 음악정보학 연구를 위한 비영리 학술단체로, 학술대회, 출판, 국내외 학술교류를 진행합니다.",
    path: "/about",
  },
  "/about/leadership": {
    title: "임원진",
    description:
      "한국음악정보학회(KSMI) 임원진 소개. 학회장, 이사, 감사 등 학회 운영을 담당하는 임원진을 확인하세요.",
    path: "/about/leadership",
  },
  "/about/membership": {
    title: "회원 안내",
    description:
      "한국음악정보학회(KSMI) 회원 가입 안내. 정회원, 학생회원, 단체회원 등 회원 유형과 혜택을 확인하세요.",
    path: "/about/membership",
  },
  "/about/notices": {
    title: "공지사항",
    description:
      "한국음악정보학회(KSMI) 공지사항. 학회 소식, 학술대회 안내, 회원 공지 등을 확인하세요.",
    path: "/about/notices",
  },
  "/conferences/past": {
    title: "지난 학술대회",
    description:
      "한국음악정보학회(KSMI) 지난 학술대회 목록. 과거 학술대회 자료와 발표 내용을 확인하세요.",
    path: "/conferences/past",
  },
  "/conferences/2025": {
    title: "KSMI 2025 창립 심포지엄",
    description:
      "한국음악정보학회 창립 심포지엄 KSMI 2025. 음악정보학 연구의 새로운 시작을 알리는 학술 행사.",
    path: "/conferences/2025",
  },
  "/conferences/ksmi2026": {
    title: "KSMI 2026 학술대회",
    description:
      "한국음악정보학회 KSMI 2026 학술대회. 음악정보학 분야의 최신 연구 성과를 공유하는 학술 행사.",
    path: "/conferences/ksmi2026",
  },
  "/conferences/ksmi2026/cfp": {
    title: "KSMI 2026 논문 모집 (CFP)",
    description:
      "KSMI 2026 학술대회 논문 모집(Call for Papers). 음악정보학 관련 연구 논문을 제출하세요.",
    path: "/conferences/ksmi2026/cfp",
  },
  "/conferences/ksmi2026/program": {
    title: "KSMI 2026 프로그램",
    description:
      "KSMI 2026 학술대회 프로그램. 발표 일정, 세션 구성, 초청 연사 정보를 확인하세요.",
    path: "/conferences/ksmi2026/program",
  },
  "/conferences/ksmi2026/registration": {
    title: "KSMI 2026 등록",
    description:
      "KSMI 2026 학술대회 참가 등록. 온라인 등록 및 참가비 안내.",
    path: "/conferences/ksmi2026/registration",
  },
  "/resources/societies": {
    title: "관련 학회",
    description:
      "한국음악정보학회(KSMI) 관련 학회 목록. 국내외 음악정보학, 음악학 관련 학회를 소개합니다.",
    path: "/resources/societies",
  },
  "/resources/labs": {
    title: "연구실",
    description:
      "한국음악정보학회(KSMI) 회원 연구실 목록. 음악정보학 관련 국내 대학 연구실을 소개합니다.",
    path: "/resources/labs",
  },
};
