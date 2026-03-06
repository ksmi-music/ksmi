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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { downloadMd } from "@/lib/downloadMd";
import { useAdminContent } from "@/hooks/useAdminContent";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPageSkeleton } from "@/components/admin/AdminPageSkeleton";
import type { SocietiesData, SocietyItem } from "@/lib/content";
import { Plus, Trash2 } from "lucide-react";
import { SortableItem } from "@/components/admin/SortableItem";

type SectionKey = keyof SocietiesData;

const SECTION_LABELS: Record<SectionKey, string> = {
  coreMIR: "핵심 MIR 학회",
  adjacent: "인접 분야 학회",
  domestic: "국내 학회",
  journals: "관련 저널",
  resources: "리소스",
};

const DEFAULT_SECTIONS: SocietiesData = {
  coreMIR: [],
  adjacent: [],
  domestic: [],
  journals: [],
  resources: [],
};

const AdminSocieties = () => {
  const { data, setData, content, isLoading, error, refetch } =
    useAdminContent<SocietiesData>("resources/societies.md");
  const sections = data ?? DEFAULT_SECTIONS;

  const updateItem = (section: SectionKey, index: number, field: keyof SocietyItem, value: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: prev[section].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      };
    });
  };

  const addItem = (section: SectionKey) => {
    const base: SocietyItem = { name: "", url: "" };
    if (section === "journals") base.publisher = "";
    if (section === "resources") base.desc = "";
    else base.abbr = "";
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: [...prev[section], base],
      };
    });
  };

  const removeItem = (section: SectionKey, index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: prev[section].filter((_, i) => i !== index),
      };
    });
  };

  const handleDragEnd = (section: SectionKey) => (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setData((prev) => {
      if (!prev) return prev;
      const items = prev[section];
      const oldIndex = items.findIndex((_, i) => `${section}-${i}` === active.id);
      const newIndex = items.findIndex((_, i) => `${section}-${i}` === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return {
        ...prev,
        [section]: arrayMove(items, oldIndex, newIndex),
      };
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDownload = () => {
    downloadMd("resources/societies.md", sections, content);
    toast.success("다운로드되었습니다.");
  };

  const SocietyItemForm = ({
    section,
    item,
    index,
  }: {
    section: SectionKey;
    item: SocietyItem;
    index: number;
  }) => (
    <SortableItem key={`${section}-${index}`} id={`${section}-${index}`}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
          <Button variant="ghost" size="sm" onClick={() => removeItem(section, index)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
        {section !== "resources" && (
          <div>
            <Label>약칭</Label>
            <Input
              value={item.abbr ?? ""}
              onChange={(e) => updateItem(section, index, "abbr", e.target.value)}
              placeholder="ISMIR"
            />
          </div>
        )}
        <div>
          <Label>이름</Label>
          <Input
            value={item.name}
            onChange={(e) => updateItem(section, index, "name", e.target.value)}
            placeholder="International Society for Music Information Retrieval"
          />
        </div>
        {section === "journals" && (
          <div>
            <Label>출판사</Label>
            <Input
              value={item.publisher ?? ""}
              onChange={(e) => updateItem(section, index, "publisher", e.target.value)}
              placeholder="ISMIR 학회"
            />
          </div>
        )}
        {section === "resources" && (
          <div>
            <Label>설명</Label>
            <Input
              value={item.desc ?? ""}
              onChange={(e) => updateItem(section, index, "desc", e.target.value)}
              placeholder="ISMIR 컨퍼런스 전체 논문 데이터베이스"
            />
          </div>
        )}
        <div>
          <Label>URL</Label>
          <Input
            value={item.url}
            onChange={(e) => updateItem(section, index, "url", e.target.value)}
            placeholder="https://ismir.net"
          />
        </div>
        {section !== "resources" && (
          <div>
            <Label>비고</Label>
            <Input
              value={item.note ?? ""}
              onChange={(e) => updateItem(section, index, "note", e.target.value)}
              placeholder="MIR 분야 최대 학회"
            />
          </div>
        )}
      </div>
      </div>
    </SortableItem>
  );

  return (
    <AdminPageShell
      title="관련 학회/저널 편집"
      filename="resources/societies.md"
      onDownload={handleDownload}
      loading={isLoading}
      error={error ?? undefined}
      onRetry={refetch}
      loadingComponent={<AdminPageSkeleton />}
    >
      <Tabs defaultValue="coreMIR">
        <TabsList className="mb-4">
          {(Object.keys(SECTION_LABELS) as SectionKey[]).map((key) => (
            <TabsTrigger key={key} value={key}>
              {SECTION_LABELS[key]}
            </TabsTrigger>
          ))}
        </TabsList>
        {(Object.keys(SECTION_LABELS) as SectionKey[]).map((section) => (
          <TabsContent key={section} value={section} className="space-y-4">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd(section)}>
              <SortableContext items={sections[section].map((_, i) => `${section}-${i}`)}>
                {sections[section].map((item, index) => (
                  <SocietyItemForm key={`${section}-${index}`} section={section} item={item} index={index} />
                ))}
              </SortableContext>
            </DndContext>
            <Button variant="outline" onClick={() => addItem(section)}>
              <Plus className="h-4 w-4 mr-2" />
              항목 추가
            </Button>
          </TabsContent>
        ))}
      </Tabs>
    </AdminPageShell>
  );
};

export default AdminSocieties;
