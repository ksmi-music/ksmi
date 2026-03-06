export async function saveContent(
  path: string,
  data: Record<string, unknown>,
  content = ""
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/save-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, data, content }),
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok) {
      return { ok: false, error: json.error ?? `HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
