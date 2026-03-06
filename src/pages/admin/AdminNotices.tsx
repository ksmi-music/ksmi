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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { downloadMd } from "@/lib/downloadMd";
import { useAdminContent } from "@/hooks/useAdminContent";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPageSkeleton } from "@/components/admin/AdminPageSkeleton";
import { Plus, Trash2, Eye } from "lucide-react";
import { SortableItem } from "@/components/admin/SortableItem";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Notice {
  id: number;
  date: string;
  title: string;
  tag: string;
  content?: string;
}

const AdminNotices = () => {
  const { data, setData, content, isLoading, error, refetch } = useAdminContent<{
    notices: Notice[];
  }>("about/notices.md");
  const notices = data?.notices ?? [];

  const addNotice = () => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            notices: [
              ...prev.notices,
              { id: Date.now(), date: "", title: "", tag: "공지", content: "" },
            ],
          }
        : { notices: [{ id: Date.now(), date: "", title: "", tag: "공지", content: "" }] }
    );
  };

  const updateNotice = (index: number, field: keyof Notice, value: string | number) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            notices: prev.notices.map((n, i) =>
              i === index ? { ...n, [field]: value } : n
            ),
          }
        : prev
    );
  };

  const removeNotice = (index: number) => {
    setData((prev) =>
      prev ? { ...prev, notices: prev.notices.filter((_, i) => i !== index) } : prev
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setData((prev) => {
      if (!prev) return prev;
      const oldIndex = prev.notices.findIndex((n) => n.id.toString() === active.id);
      const newIndex = prev.notices.findIndex((n) => n.id.toString() === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return { ...prev, notices: arrayMove(prev.notices, oldIndex, newIndex) };
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDownload = () => {
    downloadMd("about/notices.md", { notices }, content);
    toast.success("다운로드되었습니다.");
  };

  return (
    <AdminPageShell
      title="공지사항 편집"
      filename="about/notices.md"
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
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>공지사항 미리보기</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {notices.map((n) => (
                <Card key={n.id}>
                  <CardContent className="flex items-center gap-4 py-4 px-5">
                    <Badge variant="secondary" className="text-[11px] shrink-0">
                      {n.tag}
                    </Badge>
                    <p className="flex-1 text-sm">{n.title}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{n.date}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={notices.map((n) => n.id.toString())}>
          <div className="space-y-4">
            {notices.map((notice, index) => (
              <SortableItem key={notice.id} id={notice.id.toString()}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeNotice(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>날짜</Label>
                <Input
                  value={notice.date}
                  onChange={(e) => updateNotice(index, "date", e.target.value)}
                  placeholder="2026.03.01"
                />
              </div>
              <div>
                <Label>태그</Label>
                <Input
                  value={notice.tag}
                  onChange={(e) => updateNotice(index, "tag", e.target.value)}
                  placeholder="공지"
                />
              </div>
            </div>
            <div>
              <Label>제목</Label>
              <Input
                value={notice.title}
                onChange={(e) => updateNotice(index, "title", e.target.value)}
                placeholder="공지 제목"
              />
            </div>
            <div>
              <Label>내용 (공지사항 페이지용)</Label>
              <Textarea
                value={notice.content ?? ""}
                onChange={(e) => updateNotice(index, "content", e.target.value)}
                placeholder="상세 내용"
                rows={4}
              />
            </div>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button variant="outline" className="mt-4" onClick={addNotice}>
        <Plus className="h-4 w-4 mr-2" />
        공지 추가
      </Button>
    </AdminPageShell>
  );
};

export default AdminNotices;
