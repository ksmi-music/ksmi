import { Link } from "react-router-dom";

interface BannerButton {
  label: string;
  href: string;
}

interface ConferenceBannerProps {
  title: string;
  /** 모바일에서 title 아래 줄바꿈으로 표시 (예: "제1회 학술대회") */
  titleSub?: string;
  date: string;
  venue: string;
  buttons?: BannerButton[];
}

const ConferenceBanner = ({ title, titleSub, date, venue, buttons = [] }: ConferenceBannerProps) => {
  return (
    <section className="relative overflow-hidden">
      {/* Richer background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(220 60% 10%) 0%, hsl(220 55% 16%) 30%, hsl(200 50% 22%) 60%, hsl(185 45% 24%) 100%)",
        }}
      />
      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none animate-shimmer"
        style={{
          background: "linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
      />
      {/* Multiple radial glows - 화려한 빛 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full bg-[hsl(185_65%_50%/0.12)] blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-[hsl(220_60%_30%/0.2)] blur-[80px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-[hsl(185_55%_45%/0.08)] blur-[70px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[hsl(200_50%_40%/0.1)] blur-[60px] pointer-events-none" />
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Enhanced waveform - 더 화려한 웨이브 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="conf-wave-fill" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="hsl(185 55% 45%)" stopOpacity="0" />
              <stop offset="40%" stopColor="hsl(185 55% 50%)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="hsl(185 60% 55%)" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="conf-wave-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="hsl(220 60% 35%)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(185 60% 60%)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(220 60% 35%)" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="conf-wave-fade" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="8%" stopColor="white" stopOpacity="1" />
              <stop offset="92%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="conf-wave-mask">
              <rect x="0" y="0" width="1200" height="120" fill="url(#conf-wave-fade)" />
            </mask>
          </defs>
          <g mask="url(#conf-wave-mask)">
            {/* Primary filled waveform */}
            <path
              d="M0,120 L0,80 Q100,60 200,75 T400,65 T600,80 T800,70 T1000,75 T1200,85 L1200,120 Z"
              fill="url(#conf-wave-fill)"
            />
            {/* Secondary layer */}
            <path
              d="M0,120 L0,95 Q150,75 300,90 T600,85 T900,95 T1200,88 L1200,120 Z"
              fill="url(#conf-wave-fill)"
              opacity="0.7"
            />
            {/* Third layer - 더 풍부한 깊이 */}
            <path
              d="M0,120 L0,105 Q200,85 400,95 T800,90 T1200,98 L1200,120 Z"
              fill="hsl(185 55% 50% / 0.04)"
            />
            {/* Crisp waveform line */}
            <path
              d="M0,80 Q100,60 200,75 T400,65 T600,80 T800,70 T1000,75 T1200,85"
              fill="none"
              stroke="url(#conf-wave-line)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-28 md:py-36 z-10">
        <div className="text-center">
          {/* KSMI 2026 뱃지 */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
            <span className="text-accent font-semibold text-sm tracking-wider">KSMI 2026</span>
            <span className="text-white/40">·</span>
            <span className="text-white/60 text-sm">Korean Society for Music Informatics</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-snug drop-shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            {title}
            {titleSub && (
              <>
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>
                <span className="block md:inline">{titleSub}</span>
              </>
            )}
          </h1>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-6 text-white/90 text-lg md:text-xl">
            <span className="font-medium">{date}</span>
            <span className="hidden sm:inline text-white/40">·</span>
            <span className="font-medium">{venue}</span>
          </div>
          {buttons.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {buttons.map((btn, i) => {
                const isExternal = btn.href.startsWith("http");
                const content = (
                  <span className="inline-flex items-center justify-center rounded-xl border-2 border-white bg-[hsl(185_65%_45%)] px-7 py-3.5 text-base font-bold text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all hover:bg-[hsl(185_65%_50%)] hover:scale-105 hover:shadow-[0_6px_28px_rgba(0,0,0,0.4)]">
                    {btn.label || "(라벨)"}
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

        {/* Bottom accent - 더 화려한 그라데이션 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1.5"
          style={{
            background: "linear-gradient(90deg, hsl(220 60% 20%), hsl(185 65% 50%), hsl(185 60% 55%), hsl(220 60% 20%))",
            boxShadow: "0 0 20px hsl(185 60% 50% / 0.3)",
          }}
        />
      </div>
    </section>
  );
};

export default ConferenceBanner;
