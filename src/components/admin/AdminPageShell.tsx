import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface AdminPageShellProps {
  title: string;
  filename: string;
  onDownload: () => void;
  children: React.ReactNode;
  loading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  loadingComponent?: React.ReactNode;
  extraActions?: React.ReactNode;
}

export function AdminPageShell({
  title,
  filename,
  onDownload,
  children,
  loading = false,
  error = null,
  onRetry,
  loadingComponent,
  extraActions,
}: AdminPageShellProps) {
  if (loading && loadingComponent) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    return (
      <div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>로드 실패</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
          {onRetry && (
            <Button variant="outline" size="sm" className="mt-2" onClick={onRetry}>
              다시 시도
            </Button>
          )}
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex gap-2">
          {extraActions}
          <Button onClick={onDownload}>다운로드 ({filename})</Button>
        </div>
      </div>
      {children}
    </div>
  );
}
