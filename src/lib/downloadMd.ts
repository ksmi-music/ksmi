import matter from "gray-matter";

export function downloadMd(filename: string, data: Record<string, unknown>, content = "") {
  const md = matter.stringify(content, data as Record<string, unknown>, {
    lineWidth: -1,
  });
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
