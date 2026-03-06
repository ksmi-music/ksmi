import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

const DEFAULT_HOME = "/conferences/ksmi2026";
const STORAGE_KEY = "ksmi2026-homeHref-override";

function getStoredOverride(): string | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v || null;
  } catch {
    return null;
  }
}

type Ksmi2026ConfigContextValue = {
  /** Admin에서 변경한 homeHref (파일 저장 전 미리보기용) */
  homeHrefOverride: string | null;
  setHomeHrefOverride: (v: string | null) => void;
};

const Ksmi2026ConfigContext = createContext<Ksmi2026ConfigContextValue | null>(null);

export function Ksmi2026ConfigProvider({ children }: { children: ReactNode }) {
  const [homeHrefOverride, setHomeHrefOverrideState] = useState<string | null>(() => getStoredOverride());
  const setHomeHrefOverride = useCallback((v: string | null) => {
    try {
      if (v) localStorage.setItem(STORAGE_KEY, v);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setHomeHrefOverrideState(v);
  }, []);

  return (
    <Ksmi2026ConfigContext.Provider value={{ homeHrefOverride, setHomeHrefOverride }}>
      {children}
    </Ksmi2026ConfigContext.Provider>
  );
}

export function useKsmi2026HomeHref(fileHomeHref: string | undefined): string {
  const ctx = useContext(Ksmi2026ConfigContext);
  return ctx?.homeHrefOverride ?? fileHomeHref ?? DEFAULT_HOME;
}

export function useKsmi2026ConfigOverride() {
  return useContext(Ksmi2026ConfigContext);
}
