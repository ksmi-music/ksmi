import { useState } from "react";
import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const DISPLAY_FORMAT = "yyyy.MM.dd";

interface DatePickerInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DatePickerInput({
  value,
  onChange,
  placeholder = "2026.03.01",
  className,
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);

  const parsedDate = (() => {
    if (!value.trim()) return undefined;
    try {
      const d = parse(value, DISPLAY_FORMAT, new Date());
      return isNaN(d.getTime()) ? undefined : d;
    } catch {
      return undefined;
    }
  })();

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    onChange(format(date, DISPLAY_FORMAT));
    setOpen(false);
  };

  return (
    <div className={cn("flex gap-1", className)}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0" type="button">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={parsedDate}
            onSelect={handleSelect}
            locale={ko}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
