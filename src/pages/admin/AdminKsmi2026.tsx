import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAdminContent } from "@/hooks/useAdminContent";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPageSkeleton } from "@/components/admin/AdminPageSkeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Eye } from "lucide-react";

const AdminKsmi2026 = () => {
  const { raw, setRaw, isLoading, error, refetch } = useAdminContent("conferences/ksmi2026.md");

  const handleDownload = () => {
    const blob = new Blob([raw], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "conferences/ksmi2026.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("다운로드되었습니다.");
  };

  return (
    <AdminPageShell
      title="KSMI 2026 CFP 편집"
      filename="conferences/ksmi2026.md"
      onDownload={handleDownload}
      loading={isLoading}
      error={error ?? undefined}
      onRetry={refetch}
      loadingComponent={<AdminPageSkeleton />}
      extraActions={
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              미리보기
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>KSMI 2026 CFP 미리보기</DialogTitle>
            </DialogHeader>
            <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{raw}</ReactMarkdown>
            </article>
          </DialogContent>
        </Dialog>
      }
    >
      <div>
        <Label>Markdown 내용</Label>
        <Textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="mt-2 font-mono text-sm min-h-[500px]"
          placeholder="MD 내용..."
        />
      </div>
    </AdminPageShell>
  );
};

export default AdminKsmi2026;
