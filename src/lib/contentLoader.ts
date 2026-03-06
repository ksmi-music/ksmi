import { useQuery } from "@tanstack/react-query";
import { parseMd } from "./content";

const BASE = `${import.meta.env.BASE_URL}content`.replace(/\/+/g, "/");

export async function loadContent<T = Record<string, unknown>>(
  path: string
): Promise<{ data: T; content: string; raw: string }> {
  const url = `${BASE}/${path}`.replace(/\/+/g, "/");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load content: ${path}`);
  const raw = await res.text();
  const { data, content } = parseMd<T>(raw);
  return { data, content, raw };
}

export function useContent<T = Record<string, unknown>>(path: string) {
  return useQuery({
    queryKey: ["content", path],
    queryFn: () => loadContent<T>(path),
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
}
