import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

const STORAGE_KEY = "ksmi-notices-override";

export interface NoticeItem {
  id: number;
  date: string;
  title: string;
  tag: string;
  content?: string;
  /** 링크 URL (내부: /path, 외부: https://...) */
  href?: string;
}

function getStoredNotices(): NoticeItem[] | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (!v) return null;
    const parsed = JSON.parse(v) as NoticeItem[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

type NoticesOverrideContextValue = {
  noticesOverride: NoticeItem[] | null;
  setNoticesOverride: (v: NoticeItem[] | null) => void;
};

const NoticesOverrideContext = createContext<NoticesOverrideContextValue | null>(null);

export function NoticesOverrideProvider({ children }: { children: ReactNode }) {
  const [noticesOverride, setNoticesOverrideState] = useState<NoticeItem[] | null>(() =>
    getStoredNotices()
  );
  const setNoticesOverride = useCallback((v: NoticeItem[] | null) => {
    try {
      if (v && v.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setNoticesOverrideState(v);
  }, []);

  return (
    <NoticesOverrideContext.Provider value={{ noticesOverride, setNoticesOverride }}>
      {children}
    </NoticesOverrideContext.Provider>
  );
}

export function useNoticesOverride() {
  return useContext(NoticesOverrideContext);
}
