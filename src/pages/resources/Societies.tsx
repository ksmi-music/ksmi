import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContent } from "@/lib/contentLoader";
import type { SocietiesData } from "@/lib/content";

const Societies = () => {
  const { data: res } = useContent<SocietiesData>("resources/societies.md");
  const coreMIR = res?.data?.coreMIR ?? [];
  const adjacent = res?.data?.adjacent ?? [];
  const domestic = res?.data?.domestic ?? [];
  const journals = res?.data?.journals ?? [];
  const resources = res?.data?.resources ?? [];

  const NameLink = ({ name, url }: { name: string; url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground hover:text-accent hover:underline inline-flex items-center gap-1 transition-colors"
  >
    {name}
    <ExternalLink className="h-3 w-3 text-muted-foreground" />
  </a>
);

  return (
    <Layout>
      <PageHero title="관련 학회 / 저널" subtitle="Related Societies, Journals & Resources" />

      <div className="mx-auto max-w-5xl px-4 py-16 space-y-16">
        <ScrollReveal>
          <section>
            <h2 className="text-xl font-bold mb-8 gradient-accent-bar">Ⅰ. 관련 학회</h2>

            <div className="mb-10">
              <h3 className="text-sm font-semibold text-muted-foreground mb-1">1. 핵심 MIR / 음악 기술 학회</h3>
              <p className="text-xs text-muted-foreground mb-4">음악정보검색(Music Information Retrieval) 및 음악 기술 분야의 주요 국제 학회입니다.</p>
              <div className="rounded-md border overflow-x-auto">
                <Table className="table-fixed w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[15%]">약칭</TableHead>
                      <TableHead className="w-[50%]">학회 / 컨퍼런스명</TableHead>
                      <TableHead className="hidden sm:table-cell w-[35%]">비고</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coreMIR.map((s) => (
                      <TableRow key={s.abbr}>
                        <TableCell className="font-medium text-primary text-sm">{s.abbr}</TableCell>
                        <TableCell className="text-sm"><NameLink name={s.name} url={s.url} /></TableCell>
                        <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{s.note}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-semibold text-muted-foreground mb-1">2. 인접 분야 (음악 인지·심리·음향)</h3>
              <p className="text-xs text-muted-foreground mb-4">음악 인지과학, 심리학, 오디오 공학 등 인접 분야의 국제 학회입니다.</p>
              <div className="rounded-md border overflow-x-auto">
                <Table className="table-fixed w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[15%]">약칭</TableHead>
                      <TableHead className="w-[50%]">학회 / 컨퍼런스명</TableHead>
                      <TableHead className="hidden sm:table-cell w-[35%]">비고</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adjacent.map((s) => (
                      <TableRow key={s.abbr}>
                        <TableCell className="font-medium text-primary text-sm">{s.abbr}</TableCell>
                        <TableCell className="text-sm"><NameLink name={s.name} url={s.url} /></TableCell>
                        <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{s.note}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-1">3. 국내 관련 학회</h3>
              <p className="text-xs text-muted-foreground mb-4">한국 내 음악 교육, 대중음악, 음향 분야의 학회입니다.</p>
              <div className="rounded-md border overflow-x-auto">
                <Table className="table-fixed w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[15%]">약칭</TableHead>
                      <TableHead className="w-[50%]">학회명</TableHead>
                      <TableHead className="hidden sm:table-cell w-[35%]">비고</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {domestic.map((s) => (
                      <TableRow key={s.abbr}>
                        <TableCell className="font-medium text-primary text-sm">{s.abbr}</TableCell>
                        <TableCell className="text-sm"><NameLink name={s.name} url={s.url} /></TableCell>
                        <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{s.note}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section>
            <h2 className="text-xl font-bold mb-4 gradient-accent-bar">Ⅱ. 관련 저널</h2>
            <p className="text-xs text-muted-foreground mb-6">MIR, 음악 기술, 음악 인지과학 분야의 주요 학술 저널입니다.</p>
            <div className="rounded-md border overflow-x-auto">
              <Table className="table-fixed w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">저널명</TableHead>
                    <TableHead className="hidden sm:table-cell w-[25%]">출판</TableHead>
                    <TableHead className="hidden sm:table-cell w-[35%]">특징</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journals.map((j) => (
                    <TableRow key={j.name}>
                      <TableCell className="text-sm"><NameLink name={j.name} url={j.url} /></TableCell>
                      <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{j.publisher}</TableCell>
                      <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{j.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section>
            <h2 className="text-xl font-bold mb-4 gradient-accent-bar">Ⅲ. 리소스 / 커뮤니티</h2>
            <p className="text-xs text-muted-foreground mb-6">논문 아카이브, 평가 캠페인, 다양성 커뮤니티 등 유용한 리소스입니다.</p>
            <div className="rounded-md border overflow-x-auto">
              <Table className="table-fixed w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">리소스</TableHead>
                    <TableHead className="w-[70%]">설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((r) => (
                    <TableRow key={r.name}>
                      <TableCell className="text-sm"><NameLink name={r.name} url={r.url} /></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{r.desc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </Layout>
  );
};

export default Societies;
