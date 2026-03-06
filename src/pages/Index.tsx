import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useContent } from "@/lib/contentLoader";
import { useNoticesContent } from "@/hooks/useNoticesContent";

const Index = () => {
  const noticesReveal = useScrollReveal<HTMLElement>();
  const linksReveal = useScrollReveal<HTMLElement>();

  const { notices } = useNoticesContent();
  const { data: quickLinksRes } = useContent<{ quickLinks: { label: string; desc: string; href: string; icon: string }[] }>("index/quickLinks.md");
  const { data: bannerButtonsRes } = useContent<{ buttons: { label: string; href: string }[] }>("index/banner-buttons.md");
  const quickLinks = quickLinksRes?.data?.quickLinks ?? [];
  const bannerButtons = bannerButtonsRes?.data?.buttons ?? [];

  return (
    <Layout>
      {/* Hero - KSMI 2026(ConferenceBanner)과 동일한 디자인 기반 */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(220 55% 12%) 0%, hsl(220 50% 18%) 40%, hsl(200 45% 22%) 100%)",
          }}
        />
        {/* Subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[hsl(185_60%_40%/0.08)] blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[hsl(220_60%_25%/0.15)] blur-[60px] pointer-events-none" />
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Waveform motif - refined music informatics identity */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="index-wave-fill" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="hsl(185 55% 45%)" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(185 55% 45%)" stopOpacity="0.06" />
                <stop offset="100%" stopColor="hsl(185 55% 50%)" stopOpacity="0.18" />
              </linearGradient>
              <linearGradient id="index-wave-line" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="hsl(220 60% 35%)" stopOpacity="0.2" />
                <stop offset="50%" stopColor="hsl(185 55% 55%)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="hsl(220 60% 35%)" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="index-wave-fade" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="8%" stopColor="white" stopOpacity="1" />
                <stop offset="92%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="index-wave-mask">
                <rect x="0" y="0" width="1200" height="120" fill="url(#index-wave-fade)" />
              </mask>
            </defs>
            <g mask="url(#index-wave-mask)">
              <path
                d="M0,120 L0,80 Q100,60 200,75 T400,65 T600,80 T800,70 T1000,75 T1200,85 L1200,120 Z"
                fill="url(#index-wave-fill)"
              />
              <path
                d="M0,120 L0,95 Q150,75 300,90 T600,85 T900,95 T1200,88 L1200,120 Z"
                fill="url(#index-wave-fill)"
                opacity="0.6"
              />
              <path
                d="M0,80 Q100,60 200,75 T400,65 T600,80 T800,70 T1000,75 T1200,85"
                fill="none"
                stroke="url(#index-wave-line)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-28 md:py-36 z-10">
          <div className="text-center">
            <p className="text-white/50 text-base md:text-lg font-medium tracking-[0.2em] uppercase mb-4">
              Korean Society for Music Informatics
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-snug">
              한국음악정보학회
            </h1>
            <p className="mt-8 text-white/80 text-lg md:text-xl">
              음악과 기술의 미래를 함께 만들어갑니다
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-white/50 text-sm leading-relaxed">
              음악과 정보기술의 융합 연구를 선도하며, 국내외 연구자 간의 학술 교류와 협력을 촉진합니다.
            </p>
            {bannerButtons.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {bannerButtons.map((btn, i) => {
                  const isExternal = btn.href.startsWith("http");
                  const content = (
                    <span className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/20 hover:gap-3">
                      {btn.label || "(라벨)"}
                      <Icons.ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  );
                  return isExternal ? (
                    <a key={i} href={btn.href} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    <Link key={i} to={btn.href}>
                      {content}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: "linear-gradient(90deg, hsl(220 60% 25%), hsl(185 60% 45%), hsl(220 60% 25%))",
          }}
        />
      </section>

      {/* Notices */}
      <section
        ref={noticesReveal.ref}
        className={`mx-auto max-w-6xl px-4 py-16 ${noticesReveal.isVisible ? "reveal-visible" : "reveal-hidden"}`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Icons.Bell className="h-5 w-5 text-primary" />
            공지사항
          </h2>
          <Link to="/about/notices" className="text-xs text-muted-foreground hover:text-accent transition-colors">더 보기 →</Link>
        </div>
        <div className="space-y-3">
          {notices.map((n) => {
            const cardContent = (
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
            );
            const card = (
              <Card className="hover:shadow-md hover:border-accent/40 transition-all duration-300 group gradient-border-card">
                {cardContent}
              </Card>
            );
            if (n.href?.trim()) {
              const isInternal = n.href.startsWith("/");
              return isInternal ? (
                <Link key={n.id} to={n.href}>
                  {card}
                </Link>
              ) : (
                <a key={n.id} href={n.href} target="_blank" rel="noopener noreferrer">
                  {card}
                </a>
              );
            }
            return <div key={n.id}>{card}</div>;
          })}
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
            {quickLinks.map((link, i) => {
              const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[link.icon] ?? Icons.BookOpen;
              return (
              <Link key={link.href} to={link.href}>
                <Card className={`h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group gradient-border-card ${linksReveal.isVisible ? `reveal-visible stagger-${i + 1}` : "reveal-hidden"}`}>
                  <CardContent className="flex flex-col items-center text-center py-10 gap-4">
                    <div className="h-14 w-14 rounded-xl icon-glow flex items-center justify-center">
                      <IconComponent className="h-7 w-7 text-primary group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="font-semibold">{link.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{link.desc}</p>
                    </div>
                    <Icons.ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </CardContent>
                </Card>
              </Link>
            );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
