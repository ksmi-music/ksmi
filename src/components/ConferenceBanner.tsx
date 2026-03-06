interface ConferenceBannerProps {
  title: string;
  date: string;
  venue: string;
}

const ConferenceBanner = ({ title, date, venue }: ConferenceBannerProps) => {
  return (
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
            <linearGradient id="conf-wave-fill" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="hsl(185 55% 45%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(185 55% 45%)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="hsl(185 55% 50%)" stopOpacity="0.18" />
            </linearGradient>
            <linearGradient id="conf-wave-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="hsl(220 60% 35%)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="hsl(185 55% 55%)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="hsl(220 60% 35%)" stopOpacity="0.2" />
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
            {/* Filled waveform area */}
            <path
              d="M0,120 L0,80 Q100,60 200,75 T400,65 T600,80 T800,70 T1000,75 T1200,85 L1200,120 Z"
              fill="url(#conf-wave-fill)"
            />
            {/* Secondary layer - softer depth */}
            <path
              d="M0,120 L0,95 Q150,75 300,90 T600,85 T900,95 T1200,88 L1200,120 Z"
              fill="url(#conf-wave-fill)"
              opacity="0.6"
            />
            {/* Waveform line - crisp edge */}
            <path
              d="M0,80 Q100,60 200,75 T400,65 T600,80 T800,70 T1000,75 T1200,85"
              fill="none"
              stroke="url(#conf-wave-line)"
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
            KSMI 2026 · Korean Society for Music Informatics
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-snug">
            {title}
          </h1>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-6 text-white/80 text-lg md:text-xl">
            <span>{date}</span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span>{venue}</span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: "linear-gradient(90deg, hsl(220 60% 25%), hsl(185 60% 45%), hsl(220 60% 25%))",
          }}
        />
      </div>
    </section>
  );
};

export default ConferenceBanner;
