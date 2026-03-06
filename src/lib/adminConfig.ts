import type { LucideIcon } from "lucide-react";
import { Home, Bell, Link2, Building2, FlaskConical, Calendar, FileText, BookOpen } from "lucide-react";

export type AdminCategory = "general" | "society" | "conference";

export type ConferenceSubType = "list" | "year";

export interface AdminSection {
  to: string;
  label: string;
  path: string;
  desc: string;
  category: AdminCategory;
  icon: LucideIcon;
  /** 학술대회: "list"=역대 목록(단독), "year"=연도별(접기 그룹) */
  conferenceType?: ConferenceSubType;
  /** 연도별 학술대회 정렬용 (최신순) */
  year?: number;
  /** 2026 골든스탠다드: 연도별 하위 메뉴 (CFP, Program, Registration 등) */
  subItems?: { to: string; label: string }[];
}

export const ADMIN_CATEGORIES: Record<AdminCategory, string> = {
  general: "일반",
  society: "학회/리소스",
  conference: "학술대회",
};

export const ADMIN_SECTIONS: AdminSection[] = [
  {
    to: "/admin/guide",
    label: "관리자 가이드",
    path: "",
    desc: "각 관리 페이지 사용 방법 안내",
    category: "general",
    icon: BookOpen,
  },
  {
    to: "/admin/notices",
    label: "공지사항",
    path: "public/content/about/notices.md",
    desc: "홈 및 공지사항 페이지",
    category: "general",
    icon: Bell,
  },
  {
    to: "/admin/quick-links",
    label: "바로가기",
    path: "public/content/index/quickLinks.md",
    desc: "홈 바로가기 링크",
    category: "general",
    icon: Link2,
  },
  {
    to: "/admin/societies",
    label: "관련 학회/저널",
    path: "public/content/resources/societies.md",
    desc: "학회, 저널, 리소스 목록",
    category: "society",
    icon: Building2,
  },
  {
    to: "/admin/labs",
    label: "연구실",
    path: "public/content/resources/labs.md",
    desc: "관련 국내 연구실",
    category: "society",
    icon: FlaskConical,
  },
  {
    to: "/admin/conferences",
    label: "역대 학술대회 목록",
    path: "public/content/conferences/past.md",
    desc: "역대 학술대회 목록",
    category: "conference",
    icon: Calendar,
    conferenceType: "list",
  },
  {
    to: "/admin/conferences/2025",
    label: "2025",
    path: "public/content/conferences/2025.md",
    desc: "일정, 연구실/포스터, 조직위원회",
    category: "conference",
    icon: FileText,
    conferenceType: "year",
    year: 2025,
    subItems: [{ to: "/admin/conferences/2025", label: "편집" }],
  },
  {
    to: "/admin/conferences/ksmi2026",
    label: "2026",
    path: "public/content/conferences/ksmi2026.md",
    desc: "Call for Participation",
    category: "conference",
    icon: FileText,
    conferenceType: "year",
    year: 2026,
    subItems: [
      { to: "/admin/conferences/ksmi2026", label: "CFP" },
      { to: "/admin/conferences/ksmi2026/program", label: "Program" },
      { to: "/admin/conferences/ksmi2026/registration", label: "Registration" },
      { to: "/admin/conferences/ksmi2026/settings", label: "설정" },
    ],
  },
];
