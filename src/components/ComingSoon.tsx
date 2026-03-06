import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  subtitle: string;
  description?: string;
  /** KSMI2026Banner 사용 시 PageHero 중복 방지 */
  hideHero?: boolean;
}

const ComingSoon = ({ title, subtitle, description, hideHero }: ComingSoonProps) => {
  return (
    <>
      {!hideHero && <PageHero title={title} subtitle={subtitle} />}

      <ScrollReveal className="mx-auto max-w-4xl px-4 py-32 flex flex-col items-center text-center gap-4">
        <Construction className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-bold">페이지 준비중입니다</h2>
        <p className="text-sm text-muted-foreground">
          {description ?? "콘텐츠를 준비하고 있습니다. 곧 오픈될 예정입니다."}
        </p>
      </ScrollReveal>
    </>
  );
};

export default ComingSoon;
