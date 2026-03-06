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
import { Plus, Trash2 } from "lucide-react";
import { SortableItem } from "@/components/admin/SortableItem";

interface Lab {
  name: string;
  professor: string;
  univ: string;
  url: string;
}

const AdminLabs = () => {
  const { data, setData, content, isLoading, error, refetch } = useAdminContent<{
    labs: Lab[];
  }>("resources/labs.md");
  const labs = data?.labs ?? [];

  const addLab = () => {
    setData((prev) =>
      prev
        ? { ...prev, labs: [...prev.labs, { name: "", professor: "", univ: "", url: "" }] }
        : { labs: [{ name: "", professor: "", univ: "", url: "" }] }
    );
  };

  const updateLab = (index: number, field: keyof Lab, value: string) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            labs: prev.labs.map((l, i) => (i === index ? { ...l, [field]: value } : l)),
          }
        : prev
    );
  };

  const removeLab = (index: number) => {
    setData((prev) => (prev ? { ...prev, labs: prev.labs.filter((_, i) => i !== index) } : prev));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setData((prev) => {
      if (!prev) return prev;
      const oldIndex = prev.labs.findIndex((_, i) => `lab-${i}` === active.id);
      const newIndex = prev.labs.findIndex((_, i) => `lab-${i}` === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return { ...prev, labs: arrayMove(prev.labs, oldIndex, newIndex) };
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDownload = () => {
    downloadMd("resources/labs.md", { labs }, content);
    toast.success("다운로드되었습니다.");
  };

  return (
    <AdminPageShell
      title="연구실 편집"
      filename="resources/labs.md"
      onDownload={handleDownload}
      loading={isLoading}
      error={error ?? undefined}
      onRetry={refetch}
      loadingComponent={<AdminPageSkeleton />}
    >
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={labs.map((_, i) => `lab-${i}`)}>
          <div className="space-y-4">
            {labs.map((lab, index) => (
              <SortableItem key={index} id={`lab-${index}`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeLab(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>연구실명</Label>
                <Input
                  value={lab.name}
                  onChange={(e) => updateLab(index, "name", e.target.value)}
                  placeholder="Music and Audio Computing Lab (MACLab)"
                />
              </div>
              <div>
                <Label>책임교수</Label>
                <Input
                  value={lab.professor}
                  onChange={(e) => updateLab(index, "professor", e.target.value)}
                  placeholder="남주한 교수"
                />
              </div>
              <div>
                <Label>소속</Label>
                <Input
                  value={lab.univ}
                  onChange={(e) => updateLab(index, "univ", e.target.value)}
                  placeholder="KAIST 문화기술대학원"
                />
              </div>
              <div>
                <Label>URL</Label>
                <Input
                  value={lab.url}
                  onChange={(e) => updateLab(index, "url", e.target.value)}
                  placeholder="https://mac.kaist.ac.kr/"
                />
              </div>
            </div>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button variant="outline" className="mt-4" onClick={addLab}>
        <Plus className="h-4 w-4 mr-2" />
        연구실 추가
      </Button>
    </AdminPageShell>
  );
};

export default AdminLabs;
