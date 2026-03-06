import { useState, useEffect } from "react";
import { useContent } from "@/lib/contentLoader";

export function useAdminContent<T = Record<string, unknown>>(path: string) {
  const { data: res, isLoading, error, refetch } = useContent<T>(path);
  const [data, setData] = useState<T | null>(null);
  const [content, setContent] = useState("");
  const [raw, setRaw] = useState("");

  useEffect(() => {
    if (res?.data) {
      setData(res.data);
      setContent(res.content);
      setRaw(res.raw);
    }
  }, [res]);

  return {
    data,
    setData,
    content,
    setContent,
    raw,
    setRaw,
    isLoading,
    error,
    refetch,
    res,
  };
}
