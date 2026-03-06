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
import { toast } from "sonner";
import { downloadMd } from "@/lib/downloadMd";
import { useAdminContent } from "@/hooks/useAdminContent";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPageSkeleton } from "@/components/admin/AdminPageSkeleton";
import { Plus, Trash2, Eye, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { IconPicker } from "@/components/admin/IconPicker";
import { SortableItem } from "@/components/admin/SortableItem";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface QuickLink {
  label: string;
  desc: string;
  href: string;
  icon: string;
}

const AdminQuickLinks = () => {
  const { data, setData, content, isLoading, error, refetch } = useAdminContent<{
    quickLinks: QuickLink[];
  }>("index/quickLinks.md");
  const quickLinks = data?.quickLinks ?? [];

  const addLink = () => {
    setData((prev) =>
      prev
        ? { ...prev, quickLinks: [...prev.quickLinks, { label: "", desc: "", href: "", icon: "BookOpen" }] }
        : { quickLinks: [{ label: "", desc: "", href: "", icon: "BookOpen" }] }
    );
  };

  const updateLink = (index: number, field: keyof QuickLink, value: string) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            quickLinks: prev.quickLinks.map((l, i) =>
              i === index ? { ...l, [field]: value } : l
            ),
          }
        : prev
    );
  };

  const removeLink = (index: number) => {
    setData((prev) =>
      prev ? { ...prev, quickLinks: prev.quickLinks.filter((_, i) => i !== index) } : prev
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setData((prev) => {
      if (!prev) return prev;
      const oldIndex = prev.quickLinks.findIndex((_, i) => `link-${i}` === active.id);
      const newIndex = prev.quickLinks.findIndex((_, i) => `link-${i}` === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return { ...prev, quickLinks: arrayMove(prev.quickLinks, oldIndex, newIndex) };
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDownload = () => {
    downloadMd("index/quickLinks.md", { quickLinks }, content);
    toast.success("다운로드되었습니다.");
  };

  return (
    <AdminPageShell
      title="바로가기 편집"
      filename="index/quickLinks.md"
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
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>바로가기 미리보기</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {quickLinks.map((link, i) => {
                  const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[link.icon] ?? Icons.BookOpen;
                  return (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardContent className="flex flex-col items-center text-center py-6 gap-3">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{link.label || "(라벨)"}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{link.desc || "(설명)"}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </DialogContent>
        </Dialog>
      }
    >
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={quickLinks.map((_, i) => `link-${i}`)}>
          <div className="space-y-4">
            {quickLinks.map((link, index) => (
              <SortableItem key={index} id={`link-${index}`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeLink(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>라벨</Label>
                <Input
                  value={link.label}
                  onChange={(e) => updateLink(index, "label", e.target.value)}
                  placeholder="학회 소개"
                />
              </div>
              <div>
                <Label>설명</Label>
                <Input
                  value={link.desc}
                  onChange={(e) => updateLink(index, "desc", e.target.value)}
                  placeholder="설립 목적과 비전"
                />
              </div>
              <div>
                <Label>링크 (href)</Label>
                <Input
                  value={link.href}
                  onChange={(e) => updateLink(index, "href", e.target.value)}
                  placeholder="/about"
                />
              </div>
              <div>
                <Label>아이콘</Label>
                <IconPicker
                  value={link.icon}
                  onChange={(v) => updateLink(index, "icon", v)}
                />
              </div>
            </div>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button variant="outline" className="mt-4" onClick={addLink}>
        <Plus className="h-4 w-4 mr-2" />
        링크 추가
      </Button>
    </AdminPageShell>
  );
};

export default AdminQuickLinks;
