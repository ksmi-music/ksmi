import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Bell, Users, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const notices = [
  { id: 1, date: "2026.03.01", title: "한국음악정보학회 홈페이지가 새롭게 단장되었습니다.", tag: "공지" },
];

const quickLinks = [
  { label: "학회 소개", desc: "설립 목적과 비전", href: "/about", icon: BookOpen },
  { label: "회원 등록", desc: "회원 유형 및 혜택 안내", href: "/about/membership", icon: Users },
  { label: "역대 학술대회", desc: "연도별 학술대회 기록", href: "/conferences/past", icon: Calendar },
];

const Index = () => {
  const noticesReveal = useScrollReveal<HTMLElement>();
  const linksReveal = useScrollReveal<HTMLElement>();

  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-24 md:py-36 noise-overlay"
        style={{
          background: "var(--gradient-primary)",
        }}
      >
        {/* Mesh gradient orbs */}
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[hsl(185_60%_40%/0.08)] blur-[100px] animate-float" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[hsl(260_40%_50%/0.06)] blur-[80px] animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[hsl(200_50%_40%/0.08)] blur-[60px] animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative mx-auto max-w-6xl px-4 text-center z-10">
          <div className="inline-block mb-6">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/40 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm animate-slide-down">
              Korean Society for Music Informatics
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white md:text-5xl tracking-tight animate-slide-down" style={{ animationDelay: "0.05s", opacity: 0 }}>
            한국음악정보학회
          </h1>
          <p className="mt-4 text-lg md:text-xl animate-slide-down" style={{ animationDelay: "0.15s", opacity: 0 }}>
            <span className="bg-gradient-to-r from-white/70 via-white/80 to-[hsl(185_60%_70%/0.9)] bg-clip-text text-transparent">
              음악과 기술의 미래를 함께 만들어갑니다
            </span>
          </p>
          <p className="mt-5 max-w-2xl mx-auto text-sm text-white/45 leading-relaxed animate-slide-down whitespace-nowrap" style={{ animationDelay: "0.25s", opacity: 0 }}>
            음악과 정보기술의 융합 연구를 선도하며, 국내외 연구자 간의 학술 교류와 협력을 촉진합니다.
          </p>
        </div>

        {/* Gradient line accent */}
        <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: "var(--gradient-accent)" }} />

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-[40px]">
            <path d="M0,40 C300,10 600,60 1200,30 L1200,60 L0,60 Z" fill="hsl(0 0% 100%)" />
          </svg>
        </div>
      </section>

      {/* Notices */}
      <section
        ref={noticesReveal.ref}
        className={`mx-auto max-w-6xl px-4 py-16 ${noticesReveal.isVisible ? "reveal-visible" : "reveal-hidden"}`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            공지사항
          </h2>
          <Link to="/about/notices" className="text-xs text-muted-foreground hover:text-accent transition-colors">더 보기 →</Link>
        </div>
        <div className="space-y-3">
          {notices.map((n) => (
            <Card key={n.id} className="hover:shadow-md hover:border-accent/40 transition-all duration-300 group gradient-border-card">
              <CardContent className="flex items-center gap-4 py-4 px-5">
                <Badge
                  variant="secondary"
                  className="text-[11px] shrink-0 min-w-[48px] justify-center"
                >
                  {n.tag}
                </Badge>
                <p className="flex-1 text-sm group-hover:text-primary transition-colors">{n.title}</p>
                <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">
                  {n.date}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section
        ref={linksReveal.ref}
        className={`border-t border-border ${linksReveal.isVisible ? "reveal-visible" : "reveal-hidden"}`}
        style={{ background: "var(--gradient-subtle)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">바로가기</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {quickLinks.map((link, i) => (
              <Link key={link.href} to={link.href}>
                <Card className={`h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group gradient-border-card ${linksReveal.isVisible ? `reveal-visible stagger-${i + 1}` : "reveal-hidden"}`}>
                  <CardContent className="flex flex-col items-center text-center py-10 gap-4">
                    <div className="h-14 w-14 rounded-xl icon-glow flex items-center justify-center">
                      <link.icon className="h-7 w-7 text-primary group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="font-semibold">{link.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{link.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
