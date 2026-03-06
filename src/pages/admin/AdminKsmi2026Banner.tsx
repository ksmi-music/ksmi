import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { downloadMd } from "@/lib/downloadMd";
import { saveContent } from "@/lib/saveContent";
import { useAdminContent } from "@/hooks/useAdminContent";
import { useQueryClient } from "@tanstack/react-query";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPageSkeleton } from "@/components/admin/AdminPageSkeleton";
import { Plus, Trash2, Eye, Save, Loader2 } from "lucide-react";
import { SortableItem } from "@/components/admin/SortableItem";
import {
  Dialog,
  DialogContent,
  DialogTitleHidden,
  DialogTrigger,
} from "@/components/ui/dialog";
import ConferenceBanner from "@/components/ConferenceBanner";

interface BannerButton {
  label: string;
  href: string;
}

const CONTENT_PATH = "conferences/ksmi2026-banner-buttons.md";

const AdminKsmi2026Banner = () => {
  const queryClient = useQueryClient();
  const { data, setData, content, isLoading, error, refetch } = useAdminContent<{
    buttons: BannerButton[];
  }>(CONTENT_PATH);
  const buttons = data?.buttons ?? [];
  const [saving, setSaving] = useState(false);

  const addButton = () => {
    setData((prev) =>
      prev
        ? { ...prev, buttons: [...prev.buttons, { label: "", href: "" }] }
        : { buttons: [{ label: "", href: "" }] }
    );
  };

  const updateButton = (index: number, field: keyof BannerButton, value: string) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            buttons: prev.buttons.map((b, i) =>
              i === index ? { ...b, [field]: value } : b
            ),
          }
        : prev
    );
  };

  const removeButton = (index: number) => {
    setData((prev) =>
      prev ? { ...prev, buttons: prev.buttons.filter((_, i) => i !== index) } : prev
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setData((prev) => {
      if (!prev) return prev;
      const oldIndex = prev.buttons.findIndex((_, i) => `btn-${i}` === active.id);
      const newIndex = prev.buttons.findIndex((_, i) => `btn-${i}` === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return { ...prev, buttons: arrayMove(prev.buttons, oldIndex, newIndex) };
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDownload = () => {
    downloadMd(CONTENT_PATH, { buttons }, content);
    toast.success("다운로드되었습니다.");
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await saveContent(CONTENT_PATH, { buttons }, content);
    setSaving(false);
    if (result.ok) {
      toast.success("저장되었습니다.");
      await queryClient.invalidateQueries({ queryKey: ["content", CONTENT_PATH] });
      refetch();
    } else {
      toast.error(result.error ?? "저장에 실패했습니다.");
    }
  };

  return (
    <AdminPageShell
      title="KSMI 2026 배너 버튼"
      filename="conferences/ksmi2026-banner-buttons.md"
      onDownload={handleDownload}
      loading={isLoading}
      error={error ?? undefined}
      onRetry={refetch}
      loadingComponent={<AdminPageSkeleton />}
      extraActions={
        <>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            저장
          </Button>
          <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              배너 미리보기
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <DialogTitleHidden>배너 미리보기</DialogTitleHidden>
            <div className="max-h-[80vh] overflow-y-auto">
              <ConferenceBanner
                title="한국음악정보학회"
                titleSub="제1회 학술대회"
                date="2026년 5월 30일 (토)"
                venue="서강대학교, 서울"
                buttons={buttons}
              />
            </div>
            </DialogContent>
        </Dialog>
        </>
      }
    >
      <p className="text-sm text-muted-foreground mb-6">
        KSMI 2026 홈 배너에 표시할 버튼을 추가·편집합니다. 버튼은 날짜·장소 아래에 가로로 배치됩니다.
      </p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={buttons.map((_, i) => `btn-${i}`)}>
          <div className="space-y-4">
            {buttons.map((btn, index) => (
              <SortableItem key={index} id={`btn-${index}`}>
                <div className="space-y-4 p-4 rounded-lg border border-border bg-card">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeButton(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>라벨</Label>
                      <Input
                        value={btn.label}
                        onChange={(e) => updateButton(index, "label", e.target.value)}
                        placeholder="CFP 보기"
                      />
                    </div>
                    <div>
                      <Label>링크 (href)</Label>
                      <Input
                        value={btn.href}
                        onChange={(e) => updateButton(index, "href", e.target.value)}
                        placeholder="/conferences/ksmi2026/cfp"
                      />
                    </div>
                  </div>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button variant="outline" className="mt-4" onClick={addButton}>
        <Plus className="h-4 w-4 mr-2" />
        버튼 추가
      </Button>
    </AdminPageShell>
  );
};

export default AdminKsmi2026Banner;
