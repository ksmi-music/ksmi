import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Copy, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADMIN_SECTIONS } from "@/lib/adminConfig";

const AdminDashboard = () => {
  const copyPath = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(path).then(
      () => toast.success("경로가 복사되었습니다."),
      () => toast.error("복사에 실패했습니다.")
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">콘텐츠 편집</h1>
      <p className="text-sm text-muted-foreground mb-4">
        편집 후 다운로드한 파일을 해당 경로에 저장하고, git push 후 npm run deploy로 배포하세요.
      </p>
      <Link to="/admin/guide">
        <Button variant="outline" size="sm" className="mb-6">
          <BookOpen className="h-4 w-4 mr-2" />
          관리자 가이드 보기
        </Button>
      </Link>

      <div className="grid gap-4 sm:grid-cols-2">
        {ADMIN_SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.to}
              to={section.to}
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 hover:bg-muted/50 transition-colors"
            >
              <div className="rounded-md bg-primary/10 p-2 shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold">{section.label}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{section.desc}</p>
                {section.path && (
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-xs text-muted-foreground font-mono truncate flex-1">{section.path}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0"
                      onClick={(e) => copyPath(e, section.path)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
