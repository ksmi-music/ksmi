import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAdminContent } from "@/hooks/useAdminContent";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPageSkeleton } from "@/components/admin/AdminPageSkeleton";

const AdminKsmi2025 = () => {
  const { raw, setRaw, isLoading, error, refetch } = useAdminContent("conferences/2025.md");

  const handleDownload = () => {
    const blob = new Blob([raw], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "conferences/2025.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("다운로드되었습니다.");
  };

  return (
    <AdminPageShell
      title="KSMI 2025 창립 심포지엄 편집"
      filename="conferences/2025.md"
      onDownload={handleDownload}
      loading={isLoading}
      error={error ?? undefined}
      onRetry={refetch}
      loadingComponent={<AdminPageSkeleton />}
    >
      <div>
        <Label>YAML Frontmatter (hero, labSession1/2, posterSession1/2, schedule, venue, committee)</Label>
        <Textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="mt-2 font-mono text-sm min-h-[500px]"
          placeholder="YAML 내용..."
        />
      </div>
    </AdminPageShell>
  );
};

export default AdminKsmi2025;
