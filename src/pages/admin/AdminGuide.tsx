import { Link } from "react-router-dom";
import { BookOpen, FileDown, Copy, ArrowRight } from "lucide-react";
import { ADMIN_SECTIONS, ADMIN_CATEGORIES, type AdminCategory } from "@/lib/adminConfig";

const GUIDE_SECTIONS: Record<
  string,
  { title: string; steps: string[]; tips?: string[] }
> = {
  notices: {
    title: "공지사항",
    steps: [
      "공지사항 목록을 편집합니다. 홈과 공지사항 페이지에 표시됩니다.",
      "날짜, 태그, 제목, 내용을 입력하세요. 태그는 '공지', '행사' 등으로 구분합니다.",
      "드래그 핸들(⋮⋮)을 잡아 순서를 변경할 수 있습니다.",
      "미리보기로 실제 표시 모습을 확인하세요.",
      "다운로드 버튼으로 about/notices.md 파일을 받아 public/content/about/notices.md에 저장하세요.",
    ],
    tips: ["내용(상세)은 공지사항 상세 페이지에서만 보입니다. 제목만 필요한 경우 비워두어도 됩니다."],
  },
  "quick-links": {
    title: "바로가기",
    steps: [
      "홈 메인의 바로가기 카드를 편집합니다.",
      "라벨, 설명, 링크(href), 아이콘을 설정하세요.",
      "아이콘 선택기로 lucide-react 아이콘 중에서 선택할 수 있습니다.",
      "드래그로 순서를 변경하세요.",
      "다운로드한 index/quickLinks.md를 public/content/index/quickLinks.md에 저장하세요.",
    ],
  },
  societies: {
    title: "관련 학회/저널",
    steps: [
      "핵심 MIR 학회, 인접 분야 학회, 국내 학회, 관련 저널, 리소스 탭으로 구분됩니다.",
      "각 탭에서 항목을 추가·편집·삭제하고 드래그로 순서를 변경하세요.",
      "약칭(abbr), 이름, URL, 비고 등을 입력합니다. 저널은 출판사, 리소스는 설명 필드가 추가됩니다.",
      "다운로드한 resources/societies.md를 public/content/resources/societies.md에 저장하세요.",
    ],
  },
  labs: {
    title: "연구실",
    steps: [
      "관련 국내 연구실 목록을 편집합니다.",
      "연구실명, 책임교수, 소속, URL을 입력하세요.",
      "드래그로 순서를 변경할 수 있습니다.",
      "다운로드한 resources/labs.md를 public/content/resources/labs.md에 저장하세요.",
    ],
  },
  conferences: {
    title: "역대 학술대회 목록",
    steps: [
      "역대 학술대회 목록을 편집합니다. 학술대회가 늘어나도 연도 필터, 정렬, 접기로 관리하기 쉽습니다.",
      "연도 필터로 특정 연도만 보거나, 최신순/오래된순으로 정렬하세요.",
      "각 항목을 클릭해 펼치고 연도, 제목, 링크, 날짜, 장소, 키노트, 하이라이트 등을 입력하세요.",
      "전체 연도 보기에서 드래그로 순서를 변경할 수 있습니다. (연도 필터 적용 시에는 드래그 불가)",
      "내부 링크: 사이트 내 페이지면 '예', 외부 URL이면 '아니오'를 선택하세요.",
      "다운로드한 conferences/past.md를 public/content/conferences/past.md에 저장하세요.",
    ],
    tips: ["학술대회가 많아지면 '모두 접기'로 목록을 간단히 보고, 필요한 항목만 펼쳐 편집하세요."],
  },
  "conferences/2025": {
    title: "KSMI 2025 창립 심포지엄",
    steps: [
      "YAML 형식의 프론트매터를 직접 편집합니다.",
      "hero, labSession1/2, posterSession1/2, schedule, venue, committee 등의 섹션을 수정하세요.",
      "YAML 문법에 주의하세요. 들여쓰기와 콜론(:) 사용이 중요합니다.",
      "다운로드한 conferences/2025.md를 public/content/conferences/2025.md에 저장하세요.",
    ],
  },
  "conferences/ksmi2026": {
    title: "KSMI 2026",
    steps: [
      "CFP, Program, Registration, 설정 메뉴가 있습니다.",
      "설정에서 로고 클릭 시 이동할 Home 페이지를 드롭다운으로 선택할 수 있습니다. (CFP, Program, Registration, 메인 사이트)",
      "다운로드한 conferences/ksmi2026-config.md를 public/content/conferences/ksmi2026-config.md에 저장하세요.",
    ],
  },
};

const AdminGuide = () => {
  const sectionsByCategory = (["general", "society", "conference"] as AdminCategory[]).map(
    (cat) => ({ category: cat, items: ADMIN_SECTIONS.filter((s) => s.category === cat) })
  );

  const getGuideKey = (to: string) => {
    if (to === "/admin/guide") return null;
    if (to === "/admin/notices") return "notices";
    if (to === "/admin/quick-links") return "quick-links";
    if (to === "/admin/societies") return "societies";
    if (to === "/admin/labs") return "labs";
    if (to === "/admin/conferences/2025") return "conferences/2025";
    if (to === "/admin/conferences/ksmi2026") return "conferences/ksmi2026";
    if (to === "/admin/conferences") return "conferences";
    return null;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-7 w-7" />
          관리자 가이드
        </h1>
        <p className="text-muted-foreground mt-2">
          각 관리 페이지 사용 방법과 콘텐츠 저장 절차를 안내합니다.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <h2 className="font-semibold flex items-center gap-2 mb-2">
          <FileDown className="h-4 w-4" />
          공통 절차
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>관리 페이지에서 콘텐츠를 편집합니다.</li>
          <li>
            <strong className="text-foreground">다운로드</strong> 버튼으로 MD 파일을 받습니다.
          </li>
          <li>
            대시보드의 <Copy className="inline h-3.5 w-3.5" /> 버튼으로 저장 경로를 복사할 수 있습니다.
          </li>
          <li>
            다운로드한 파일을 <code className="bg-muted px-1 rounded">public/content/...</code> 경로에 저장합니다.
          </li>
          <li>
            <code className="bg-muted px-1 rounded">git add</code> → <code className="bg-muted px-1 rounded">git commit</code> → <code className="bg-muted px-1 rounded">git push</code> 후 <code className="bg-muted px-1 rounded">npm run deploy</code>로 배포합니다.
          </li>
        </ol>
      </div>

      {sectionsByCategory.map(
        ({ category, items }) =>
          items.length > 0 && (
            <div key={category}>
              <h2 className="text-lg font-semibold mb-4">{ADMIN_CATEGORIES[category]}</h2>
              <div className="space-y-6">
                {items.map((section) => {
                  const guideKey = getGuideKey(section.to);
                  const guide = guideKey ? GUIDE_SECTIONS[guideKey] : null;
                  return (
                    <div
                      key={section.to}
                      className="rounded-lg border border-border bg-card p-5 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{section.label}</h3>
                        <Link
                          to={section.to}
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          편집 페이지
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <p className="text-sm text-muted-foreground">{section.desc}</p>
                      {guide && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">사용 방법</h4>
                          <ol className="list-decimal list-inside space-y-1.5 text-sm text-muted-foreground">
                            {guide.steps.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ol>
                          {guide.tips && guide.tips.length > 0 && (
                            <div className="text-sm text-muted-foreground bg-muted/50 rounded p-3">
                              <span className="font-medium text-foreground">💡 </span>
                              {guide.tips.join(" ")}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default AdminGuide;
