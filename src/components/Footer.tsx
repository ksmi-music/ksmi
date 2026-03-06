import { Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-subtle)" }} />
      <div className="relative mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-foreground">한국음악정보학회</p>
          <p>대표자: 남주한 · 고유번호: 207-82-72979</p>
        </div>
        <div className="flex flex-col sm:items-end gap-1">
          <a href="mailto:ksmi2025@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail className="h-3 w-3" />
            ksmi2025@gmail.com
          </a>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            대전광역시 유성구 어은로 57
          </div>
          <p className="text-[11px] text-muted-foreground/50 mt-1">© 2026 한국음악정보학회. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
