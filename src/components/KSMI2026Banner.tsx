import { useLocation } from "react-router-dom";
import ConferenceBanner from "./ConferenceBanner";
import PageHero from "./PageHero";
import { useContent } from "@/lib/contentLoader";

/** 홈 = /conferences/ksmi2026 (로고 클릭 시 진입 경로) → ConferenceBanner */
const HOME_PATH = "/conferences/ksmi2026";

/** CFP, Program, Registration → PageHero */
const KSMI2026_PAGE_BANNERS: Record<string, { title: string; subtitle: string }> = {
  "/conferences/ksmi2026/cfp": { title: "Call for Participation", subtitle: "KSMI 2026" },
  "/conferences/ksmi2026/program": { title: "Program", subtitle: "KSMI 2026" },
  "/conferences/ksmi2026/registration": { title: "Registration", subtitle: "KSMI 2026" },
};

const KSMI2026Banner = () => {
  const location = useLocation();
  const { data: bannerButtonsRes } = useContent<{ buttons: { label: string; href: string }[] }>(
    "conferences/ksmi2026-banner-buttons.md"
  );
  const buttons = bannerButtonsRes?.data?.buttons ?? [];

  if (location.pathname === HOME_PATH) {
    return (
      <ConferenceBanner
        title="한국음악정보학회 제1회 학술대회"
        date="2026년 5월 30일 (토)"
        venue="서강대학교, 서울"
        buttons={buttons}
      />
    );
  }

  const pageBanner = KSMI2026_PAGE_BANNERS[location.pathname];
  if (pageBanner) {
    return <PageHero title={pageBanner.title} subtitle={pageBanner.subtitle} />;
  }

  return <PageHero title="KSMI 2026" subtitle="한국음악정보학회 제1회 학술대회" />;
};

export default KSMI2026Banner;
