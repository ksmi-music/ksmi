import { useContent } from "@/lib/contentLoader";
import { useNoticesOverride } from "@/contexts/NoticesOverrideContext";

export interface NoticeItem {
  id: number;
  date: string;
  title: string;
  tag: string;
  content?: string;
  href?: string;
}

/**
 * 공지사항 데이터 (override 우선, 없으면 파일)
 */
export function useNoticesContent() {
  const { data: res } = useContent<{ notices: NoticeItem[] }>("about/notices.md");
  const { noticesOverride } = useNoticesOverride() ?? { noticesOverride: null };

  const notices = noticesOverride ?? res?.data?.notices ?? [];
  return { notices, data: res };
}
