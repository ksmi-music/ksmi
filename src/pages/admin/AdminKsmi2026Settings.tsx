import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminContent } from "@/hooks/useAdminContent";
import { useKsmi2026ConfigOverride } from "@/contexts/Ksmi2026ConfigContext";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPageSkeleton } from "@/components/admin/AdminPageSkeleton";
import { Loader2 } from "lucide-react";
import { downloadMd } from "@/lib/downloadMd";
import { saveContent } from "@/lib/saveContent";
import { useQueryClient } from "@tanstack/react-query";

const CONFIG_PATH = "conferences/ksmi2026-config.md";

const HOME_OPTIONS = [
  { value: "/conferences/ksmi2026", label: "CFP (Call for Participation)" },
  { value: "/conferences/ksmi2026/program", label: "Program" },
  { value: "/conferences/ksmi2026/registration", label: "Registration" },
  { value: "/", label: "메인 사이트" },
] as const;

const AdminKsmi2026Settings = () => {
  const queryClient = useQueryClient();
  const { data, setData, content, isLoading, error, refetch } = useAdminContent<{
    homeHref: string;
  }>(CONFIG_PATH);
  const { setHomeHrefOverride } = useKsmi2026ConfigOverride() ?? { setHomeHrefOverride: () => {} };
  const homeHref = data?.homeHref ?? "/conferences/ksmi2026";
  const [saving, setSaving] = useState(false);

  const handleHomeHrefChange = (v: string) => {
    setData((prev) => (prev ? { ...prev, homeHref: v } : { homeHref: v }));
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await saveContent(CONFIG_PATH, { homeHref }, content);
    setSaving(false);
    if (result.ok) {
      setHomeHrefOverride(null);
      toast.success("저장되었습니다.");
      await queryClient.invalidateQueries({ queryKey: ["content", CONFIG_PATH] });
      refetch();
    } else {
      toast.error(result.error ?? "저장에 실패했습니다.");
    }
  };

  const handleDownload = () => {
    downloadMd(CONFIG_PATH, { homeHref }, content);
    toast.success("다운로드되었습니다.");
  };

  return (
    <AdminPageShell
      title="KSMI 2026 설정"
      filename={CONFIG_PATH}
      onDownload={handleDownload}
      loading={isLoading}
      error={error ?? undefined}
      onRetry={refetch}
      loadingComponent={<AdminPageSkeleton />}
    >
      <div className="space-y-6 max-w-md">
        <div>
          <Label>홈 페이지 본문 내용</Label>
          <p className="text-sm text-muted-foreground mt-1 mb-3">
            /conferences/ksmi2026 홈은 항상 ConferenceBanner를 사용합니다. 아래에서 홈에 표시할 본문 내용(CFP, Program, Registration)을 선택하세요.
          </p>
          <Select
            value={homeHref}
            onValueChange={handleHomeHrefChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {HOME_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSave} disabled={saving} className="mt-3">
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            저장
          </Button>
        </div>
      </div>
    </AdminPageShell>
  );
};

export default AdminKsmi2026Settings;
