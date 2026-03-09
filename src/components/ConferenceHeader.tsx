import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assetUrl } from "@/lib/assetUrl";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

/** homeHref 설정과 무관하게 CFP 포함 모든 메뉴 링크는 항상 표시 */
const KSMI2026_NAV_STATIC = [
  { label: "논문 및 데모 발표 모집", href: "/conferences/ksmi2026/cfp" },
  { label: "프로그램", href: "/conferences/ksmi2026/program" },
  { label: "등록", href: "/conferences/ksmi2026/registration" },
  { label: "학회 홈페이지", href: "/" },
] as const;

const ConferenceHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isKSMI2026 = location.pathname.startsWith("/conferences/ksmi2026");
  const isKSMI2025 = location.pathname.startsWith("/conferences/2025");

  /** KSMI 2026 로고 클릭 시 항상 /conferences/ksmi2026으로 이동 */
  const logoHref = isKSMI2026
    ? "/conferences/ksmi2026"
    : isKSMI2025
      ? "/conferences/2025"
      : "/";
  const navLinks = isKSMI2026 ? KSMI2026_NAV_STATIC : [];

  const linkClass = (href: string) => {
    const isActive =
      href === "/conferences/ksmi2026/cfp"
        ? location.pathname === "/conferences/ksmi2026/cfp"
        : location.pathname === href;
    return `px-3 py-2 text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary"}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo (KSMI 2026 페이지에서는 학술대회 로고 사용) */}
        <Link to={logoHref} className="flex items-center group">
          <img
            src={isKSMI2026 ? encodeURI(assetUrl("/conference_logo/KSMI 2026.png")) : assetUrl("/logo_ksmi.webp")}
            alt={isKSMI2026 ? "KSMI 2026" : "KSMI 로고"}
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => (
            <Link key={item.href} to={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="p-2 text-foreground" aria-label="메뉴 열기">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0">
            <nav className="flex flex-col pt-12 px-4">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 text-base font-medium border-b border-border transition-colors ${
                    (item.href === "/conferences/ksmi2026/cfp"
                      ? location.pathname === "/conferences/ksmi2026/cfp"
                      : location.pathname === item.href)
                      ? "text-primary"
                      : "hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default ConferenceHeader;
