import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ICON_NAMES = [
  "BookOpen",
  "Users",
  "Calendar",
  "FileText",
  "Link2",
  "ExternalLink",
  "Info",
  "Mail",
  "MapPin",
  "Music",
  "Mic",
  "Image",
  "Video",
  "FolderOpen",
  "Home",
  "Settings",
  "Search",
  "Bell",
  "Star",
  "Heart",
  "Share2",
  "Download",
  "Upload",
  "Edit",
  "Plus",
  "Minus",
  "Check",
  "X",
  "ArrowRight",
  "ChevronRight",
] as const;

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function IconPicker({ value, onChange, className }: IconPickerProps) {
  const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[value] ?? Icons.BookOpen;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`justify-start gap-2 ${className ?? ""}`}
        >
          <IconComponent className="h-4 w-4" />
          <span className="truncate">{value || "아이콘 선택"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="start">
        <div className="grid grid-cols-5 gap-1">
          {ICON_NAMES.map((name) => {
            const Icon = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[name];
            if (!Icon) return null;
            return (
              <button
                key={name}
                type="button"
                onClick={() => onChange(name)}
                className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-muted ${
                  value === name ? "bg-muted" : ""
                }`}
                title={name}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
