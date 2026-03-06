import { useMemo, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import { downloadMd } from "@/lib/downloadMd";
import { useAdminContent } from "@/hooks/useAdminContent";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminPageSkeleton } from "@/components/admin/AdminPageSkeleton";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { SortableItem } from "@/components/admin/SortableItem";

interface Conference {
  year: number;
  title: string;
  link: string;
  internal: boolean;
  date?: string;
  location?: string;
  keynote?: string;
  highlights?: string[];
  participants?: string;
}

type SortOrder = "newest" | "oldest";

const AdminConferences = () => {
  const { data, setData, content, isLoading, error, refetch } = useAdminContent<{
    conferences: Conference[];
  }>("conferences/past.md");
  const allConferences = data?.conferences ?? [];

  const [yearFilter, setYearFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const yearOptions = useMemo(() => {
    const years = [...new Set(allConferences.map((c) => c.year))].sort((a, b) => b - a);
    return years.map((y) => ({ value: String(y), label: `${y}년` }));
  }, [allConferences]);

  const filteredAndSorted = useMemo(() => {
    let list = [...allConferences];
    if (yearFilter !== "all") {
      const y = parseInt(yearFilter, 10);
      list = list.filter((c) => c.year === y);
    }
    list.sort((a, b) =>
      sortOrder === "newest" ? b.year - a.year : a.year - b.year
    );
    return list;
  }, [allConferences, yearFilter, sortOrder]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpandedIds(new Set(filteredAndSorted.map((_, i) => `conf-${i}`)));
  const collapseAll = () => setExpandedIds(new Set());

  const addConference = () => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            conferences: [
              ...prev.conferences,
              { year: new Date().getFullYear(), title: "", link: "", internal: true },
            ],
          }
        : {
            conferences: [
              { year: new Date().getFullYear(), title: "", link: "", internal: true },
            ],
          }
    );
  };

  const findOriginalIndex = (conf: Conference) =>
    allConferences.findIndex(
      (c) =>
        c.year === conf.year &&
        c.title === conf.title &&
        c.link === conf.link &&
        (c.date ?? "") === (conf.date ?? "")
    );

  const updateConference = (
    displayIndex: number,
    field: keyof Conference,
    value: string | number | boolean | string[]
  ) => {
    const conf = filteredAndSorted[displayIndex];
    const origIdx = findOriginalIndex(conf);
    if (origIdx === -1) return;
    setData((prev) =>
      prev
        ? {
            ...prev,
            conferences: prev.conferences.map((c, i) =>
              i === origIdx ? { ...c, [field]: value } : c
            ),
          }
        : prev
    );
  };

  const removeConference = (displayIndex: number) => {
    const conf = filteredAndSorted[displayIndex];
    const origIdx = findOriginalIndex(conf);
    if (origIdx === -1) return;
    setData((prev) =>
      prev ? { ...prev, conferences: prev.conferences.filter((_, i) => i !== origIdx) } : prev
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (yearFilter !== "all") return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = filteredAndSorted.findIndex((_, i) => `conf-${i}` === active.id);
    const newIdx = filteredAndSorted.findIndex((_, i) => `conf-${i}` === over.id);
    if (oldIdx === -1 || newIdx === -1) return;
    const reordered = arrayMove(filteredAndSorted, oldIdx, newIdx);
    setData((prev) => (prev ? { ...prev, conferences: reordered } : prev));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDownload = () => {
    downloadMd("conferences/past.md", { conferences }, content);
    toast.success("다운로드되었습니다.");
  };

  return (
    <AdminPageShell
      title="역대 학술대회 편집"
      filename="conferences/past.md"
      onDownload={handleDownload}
      loading={isLoading}
      error={error ?? undefined}
      onRetry={refetch}
      loadingComponent={<AdminPageSkeleton />}
    >
      <div className="flex flex-wrap gap-3 mb-4">
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="연도 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 연도</SelectItem>
            {yearOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as SortOrder)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">최신순</SelectItem>
            <SelectItem value="oldest">오래된순</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" onClick={expandAll}>
            모두 펼치기
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>
            모두 접기
          </Button>
        </div>
        {yearFilter !== "all" && (
          <span className="text-xs text-muted-foreground self-center">
            연도 필터 적용 시 드래그 정렬은 전체 보기에서만 가능합니다.
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        총 {filteredAndSorted.length}건
        {yearFilter !== "all" && ` (${yearOptions.find((o) => o.value === yearFilter)?.label} 필터)`}
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredAndSorted.map((_, i) => `conf-${i}`)}>
          <div className="space-y-2">
            {filteredAndSorted.map((conf, index) => {
              const id = `conf-${index}`;
              const isExpanded = expandedIds.has(id);
              return (
                <SortableItem key={`${conf.year}-${conf.title}-${index}`} id={id}>
                  <Collapsible open={isExpanded} onOpenChange={() => toggleExpand(id)}>
                    <div className="rounded-lg border border-border bg-card">
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-center gap-2">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="font-medium">{conf.year}년</span>
                            <span className="text-muted-foreground">{conf.title || "(제목 없음)"}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeConference(index);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="border-t border-border px-4 py-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <Label>연도</Label>
                              <Input
                                type="number"
                                value={conf.year}
                                onChange={(e) => updateConference(index, "year", parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div>
                              <Label>제목</Label>
                              <Input
                                value={conf.title}
                                onChange={(e) => updateConference(index, "title", e.target.value)}
                                placeholder="KSMI 2025 창립 심포지엄"
                              />
                            </div>
                            <div>
                              <Label>링크</Label>
                              <Input
                                value={conf.link}
                                onChange={(e) => updateConference(index, "link", e.target.value)}
                                placeholder="/conferences/2025"
                              />
                            </div>
                            <div>
                              <Label>내부 링크</Label>
                              <select
                                value={conf.internal ? "true" : "false"}
                                onChange={(e) => updateConference(index, "internal", e.target.value === "true")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              >
                                <option value="true">예</option>
                                <option value="false">아니오</option>
                              </select>
                            </div>
                            <div>
                              <Label>날짜</Label>
                              <Input
                                value={conf.date ?? ""}
                                onChange={(e) => updateConference(index, "date", e.target.value)}
                                placeholder="2025년 1월 11일 (토)"
                              />
                            </div>
                            <div>
                              <Label>장소</Label>
                              <Input
                                value={conf.location ?? ""}
                                onChange={(e) => updateConference(index, "location", e.target.value)}
                                placeholder="KAIST 학술문화관"
                              />
                            </div>
                            <div>
                              <Label>키노트</Label>
                              <Input
                                value={conf.keynote ?? ""}
                                onChange={(e) => updateConference(index, "keynote", e.target.value)}
                                placeholder="Dr. Masataka Goto (AIST, Japan)"
                              />
                            </div>
                            <div>
                              <Label>참여</Label>
                              <Input
                                value={conf.participants ?? ""}
                                onChange={(e) => updateConference(index, "participants", e.target.value)}
                                placeholder="17개 연구실·기업 참여"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <Label>하이라이트 (쉼표로 구분)</Label>
                              <Input
                                value={(conf.highlights ?? []).join(", ")}
                                onChange={(e) =>
                                  updateConference(
                                    index,
                                    "highlights",
                                    e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                                  )
                                }
                                placeholder="키노트: ..., 연구실/기업 소개 2회, ..."
                              />
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                </SortableItem>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      <Button variant="outline" className="mt-4" onClick={addConference}>
        <Plus className="h-4 w-4 mr-2" />
        학술대회 추가
      </Button>
    </AdminPageShell>
  );
};

export default AdminConferences;
