import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SortableItem({ id, children, className }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border border-border p-4 space-y-4 ${isDragging ? "opacity-50" : ""} ${className ?? ""}`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="touch-none cursor-grab active:cursor-grabbing p-1 -ml-1 mt-0.5 text-muted-foreground hover:text-foreground shrink-0"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
