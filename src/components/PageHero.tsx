import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

const PageHero = ({ title, subtitle, children }: PageHeroProps) => {
  return (
    <section
      className="relative overflow-hidden py-16 noise-overlay"
      style={{ background: "var(--gradient-page-hero)" }}
    >
      {/* Subtle mesh gradient orb */}
      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[hsl(185_60%_40%/0.06)] blur-[60px]" />

      <div className="relative mx-auto max-w-6xl px-4 z-10">
        <h1 className="text-3xl font-bold text-white animate-slide-down">{title}</h1>
        <p className="mt-2 text-white/60 text-sm animate-slide-down" style={{ animationDelay: "0.1s", opacity: 0 }}>{subtitle}</p>
        {children}
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: "var(--gradient-accent)" }} />
    </section>
  );
};

export default PageHero;
