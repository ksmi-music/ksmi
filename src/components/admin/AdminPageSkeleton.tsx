import { Skeleton } from "@/components/ui/skeleton";

export function AdminPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-border p-4 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ))}
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  );
}
