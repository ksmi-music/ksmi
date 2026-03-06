import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assetUrl } from "@/lib/assetUrl";
import { Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const navItems = [
  {
    label: "학회 소개",
    children: [
      { label: "학회 소개", href: "/about" },
      { label: "공지사항", href: "/about/notices" },
      { label: "임원진 소개", href: "/about/leadership" },
      { label: "회원 등록", href: "/about/membership" },
    ],
  },
  {
    label: "학술대회",
    children: [
      { label: "KSMI 2026", href: "/conferences/ksmi2026", disabled: false },
      { label: "역대 학술대회", href: "/conferences/past" },
    ],
  },
  {
    label: "관련 사이트",
    children: [
      { label: "관련 학회 / 저널", href: "/resources/societies" },
      { label: "관련 국내 연구실", href: "/resources/labs" },
    ],
  },
];

const DesktopDropdown = ({ item }: { item: (typeof navItems)[0] }) => {
  const [open, setOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        {item.label}
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-0.5 z-50">
          <div className="w-48 rounded-md border border-border bg-popover p-2 shadow-lg animate-dropdown-in origin-top">
            {item.children.map((child) => (
              <div key={child.label}>
                {child.disabled === true ? (
                  <span className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground/50 cursor-not-allowed">
                    {child.label}
                  </span>
                ) : (
                  <Link
                    to={child.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    {child.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={assetUrl("/logo_ksmi.webp")} alt="KSMI 로고" className="h-8 md:h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            홈
          </Link>
          {navItems.map((item) => (
            <DesktopDropdown key={item.label} item={item} />
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
              <Link to="/" onClick={() => setMobileOpen(false)} className="py-3 text-base font-medium border-b border-border">
                홈
              </Link>
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-border">
                  <p className="py-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {item.label}
                  </p>
                  {item.children.map((child) =>
                    child.disabled === true ? (
                      <span key={child.label} className="block pl-4 py-2 text-sm text-muted-foreground/50">
                        {child.label}
                      </span>
                    ) : (
                      <Link
                        key={child.label}
                        to={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block pl-4 py-2 text-sm hover:text-primary transition-colors cursor-pointer"
                      >
                        {child.label}
                      </Link>
                    )
                  )}
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
