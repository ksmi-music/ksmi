import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Settings2, Home, Menu, ChevronDown, ChevronRight } from "lucide-react";
import { ADMIN_SECTIONS, ADMIN_CATEGORIES, type AdminCategory } from "@/lib/adminConfig";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const AdminLayout = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [conferenceYearOpen, setConferenceYearOpen] = useState(
    location.pathname.startsWith("/admin/conferences/") && location.pathname !== "/admin/conferences"
  );

  useEffect(() => {
    const isYearPage =
      location.pathname.startsWith("/admin/conferences/") &&
      location.pathname !== "/admin/conferences";
    if (isYearPage) setConferenceYearOpen(true);
  }, [location.pathname]);

  const isActive = (to: string) => {
    if (to === "/admin") return location.pathname === "/admin";
    return location.pathname === to || location.pathname.startsWith(to + "/");
  };

  const generalItems = ADMIN_SECTIONS.filter((s) => s.category === "general");
  const societyItems = ADMIN_SECTIONS.filter((s) => s.category === "society");
  const conferenceListItems = ADMIN_SECTIONS.filter(
    (s) => s.category === "conference" && s.conferenceType === "list"
  );
  const conferenceYearItems = ADMIN_SECTIONS.filter(
    (s) => s.category === "conference" && s.conferenceType === "year"
  ).sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  const isConferenceYearPage =
    location.pathname.startsWith("/admin/conferences/") &&
    location.pathname !== "/admin/conferences";

  const currentYearItem = conferenceYearItems.find(
    (item) =>
      location.pathname === item.to || location.pathname.startsWith(item.to + "/")
  );

  const NavLink = ({
    to,
    icon: Icon,
    label,
    active,
  }: {
    to: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    active: boolean;
  }) => (
    <Link
      to={to}
      onClick={() => setMobileOpen(false)}
      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        active ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted hover:text-primary"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );

  const NavContent = () => (
    <nav className="space-y-6">
      <NavLink
        to="/admin"
        icon={Home}
        label="대시보드"
        active={isActive("/admin") && location.pathname === "/admin"}
      />
      {/* 일반 */}
      {generalItems.length > 0 && (
        <div>
          <p className="mb-1 px-3 text-xs font-medium text-muted-foreground">
            {ADMIN_CATEGORIES.general}
          </p>
          <div className="space-y-0.5">
            {generalItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={isActive(item.to)}
              />
            ))}
          </div>
        </div>
      )}
      {/* 학회/리소스 */}
      {societyItems.length > 0 && (
        <div>
          <p className="mb-1 px-3 text-xs font-medium text-muted-foreground">
            {ADMIN_CATEGORIES.society}
          </p>
          <div className="space-y-0.5">
            {societyItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={isActive(item.to)}
              />
            ))}
          </div>
        </div>
      )}
      {/* 학술대회: 역대 목록(단독) + 연도별(접기 그룹) */}
      {(conferenceListItems.length > 0 || conferenceYearItems.length > 0) && (
        <div>
          <p className="mb-1 px-3 text-xs font-medium text-muted-foreground">
            {ADMIN_CATEGORIES.conference}
          </p>
          <div className="space-y-0.5">
            {conferenceListItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={isActive(item.to)}
              />
            ))}
            {conferenceYearItems.length > 0 && (
              <Collapsible
                open={conferenceYearOpen}
                onOpenChange={setConferenceYearOpen}
              >
                <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary">
                  {conferenceYearOpen ? (
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  )}
                  <span>연도별 학술대회</span>
                  <span className="ml-auto text-xs text-muted-foreground/70">
                    {conferenceYearItems.length}개
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-1 space-y-0.5 pl-1">
                    {conferenceYearItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        icon={item.icon}
                        label={item.label}
                        active={isActive(item.to)}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* 데스크톱: 왼쪽에 고정된 사이드바 */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 shrink-0 border-r border-border bg-background md:block">
        <div className="flex h-full flex-col">
          <Link
            to="/admin"
            className="flex h-14 items-center gap-2 border-b border-border px-4 hover:bg-muted/50"
          >
            <Settings2 className="h-5 w-5" />
            <span className="font-semibold">KSMI Admin</span>
          </Link>
          <div className="flex-1 overflow-y-auto p-4">
            <NavContent />
          </div>
        </div>
      </aside>

      {/* 2차 사이드바: 클릭한 연도 전용 (2026 클릭 → 2026 사이드바, 2025 클릭 → 2025 사이드바) */}
      {isConferenceYearPage && currentYearItem && (
        <aside className="fixed left-64 top-0 z-30 hidden h-screen w-56 shrink-0 border-r border-border bg-muted/30 md:block">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center gap-2 border-b border-border px-4">
              <span className="text-sm font-semibold">{currentYearItem.label}</span>
              {currentYearItem.year === 2026 && (
                <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                  표준
                </span>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <nav className="space-y-0.5">
                {currentYearItem.subItems?.map((sub) => (
                  <Link
                    key={sub.to}
                    to={sub.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      location.pathname === sub.to
                        ? "bg-muted text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-primary"
                    }`}
                  >
                    {sub.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </aside>
      )}

      {/* 메인 콘텐츠 영역: 사이드바 오른쪽 */}
      <div
        className={`min-h-screen transition-[padding] ${
          isConferenceYearPage ? "md:pl-[30rem]" : "md:pl-64"
        }`}
      >
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="flex h-14 items-center justify-between gap-2 px-4 md:px-8">
            <div className="flex items-center gap-2">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 pt-12">
                  <SheetHeader className="p-4 pb-0">
                    <SheetTitle>메뉴</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    <NavContent />
                  </div>
                </SheetContent>
              </Sheet>
              <Link to="/admin" className="flex items-center gap-2 font-semibold md:hidden">
                <Settings2 className="h-5 w-5" />
                KSMI Admin
              </Link>
            </div>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              사이트로 돌아가기
            </Link>
          </div>
        </header>

        <main className="w-full px-4 py-8 md:px-6 lg:px-8">
          <AdminBreadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
