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

const coreMIR = [
  { abbr: "ISMIR", name: "International Society for Music Information Retrieval", url: "https://ismir.net", note: "MIR 분야 최대 학회, 연례 컨퍼런스" },
  { abbr: "SMC", name: "Sound and Music Computing Conference", url: "https://smcnetwork.org", note: "사운드·음악 컴퓨팅 전반" },
  { abbr: "NIME", name: "New Interfaces for Musical Expression", url: "https://www.nime.org", note: "음악 인터페이스·HCI" },
  { abbr: "ICMC", name: "International Computer Music Conference", url: "https://www.computermusic.org", note: "컴퓨터 음악 분야 최고 역사의 학회" },
  { abbr: "DAFx", name: "Digital Audio Effects Conference", url: "https://www.dafx.de", note: "디지털 오디오 이펙트·신호처리" },
  { abbr: "AIMC", name: "Conference on AI Music Creativity", url: "https://aimusiccreativity.org", note: "AI 음악 창작 특화" },
  { abbr: "CMMR", name: "Computer Music Multidisciplinary Research", url: "https://cmmr.org", note: "컴퓨터 음악 학제간 연구" },
];

const adjacent = [
  { abbr: "ICMPC", name: "International Conference on Music Perception and Cognition", url: "https://icmpc.org", note: "음악 지각·인지 격년 학회" },
  { abbr: "SMPC", name: "Society for Music Perception and Cognition", url: "https://www.musicperception.org", note: "음악 인지 학회 (미국 중심)" },
  { abbr: "ESCOM", name: "European Society for the Cognitive Sciences of Music", url: "https://www.escomsociety.org", note: "유럽 음악 인지과학" },
  { abbr: "AES", name: "Audio Engineering Society", url: "https://www.aes.org", note: "오디오 공학 전반" },
  { abbr: "ICAD", name: "International Conference on Auditory Display", url: "https://icad.org", note: "소리정보 디스플레이·소니피케이션" },
];

const domestic = [
  { name: "한국음악교육학회", abbr: "KMES", url: "https://www.kmes.or.kr", note: "음악 교육" },
  { name: "한국대중음악학회", abbr: "KASPM", url: "https://www.kaspm.net", note: "대중음악 연구" },
  { name: "대중음악콘텐츠학회", abbr: "PMCS", url: "http://pmcskorea.org", note: "대중음악 콘텐츠" },
  { name: "한국실용음악교육학회", abbr: "KSAME", url: "https://ksame.kr", note: "실용음악 교육" },
  { name: "한국음향학회", abbr: "ASK", url: "https://www.acoustics.or.kr", note: "음향 공학" },
  { name: "미래음악교육학회", abbr: "—", url: "http://futuremusiced.org", note: "미래 음악 교육" },
];

const journals = [
  { name: "Transactions of ISMIR (TISMIR)", publisher: "ISMIR 학회", url: "https://transactions.ismir.net", note: "MIR 전문, Open Access" },
  { name: "Computer Music Journal (CMJ)", publisher: "MIT Press", url: "https://direct.mit.edu/comj", note: "1977년 창간, 컴퓨터 음악 대표 저널" },
  { name: "Journal of New Music Research (JNMR)", publisher: "Taylor & Francis", url: "https://www.tandfonline.com/toc/nnmr20/current", note: "음악학·심리학·CS 학제간" },
  { name: "Journal of the AES (JAES)", publisher: "AES", url: "https://www.aes.org/journal/", note: "오디오 공학" },
  { name: "Organised Sound", publisher: "Cambridge Univ. Press", url: "https://www.cambridge.org/core/journals/organised-sound", note: "전자음악·사운드아트" },
  { name: "Journal of Creative Music Systems (JCMS)", publisher: "Open Access", url: "https://www.jcms.org.uk", note: "AI 음악 창작 특화" },
  { name: "Leonardo Music Journal", publisher: "MIT Press", url: "https://direct.mit.edu/lmj", note: "예술·과학·기술 융합" },
  { name: "Musicae Scientiae", publisher: "ESCOM / SAGE", url: "https://journals.sagepub.com/home/msx", note: "음악 인지과학" },
];

const resources = [
  { name: "ISMIR 논문 아카이브", desc: "ISMIR 컨퍼런스 전체 논문 데이터베이스", url: "https://ismir.net/resources/" },
  { name: "MIREX", desc: "MIR 알고리즘 평가 캠페인 (Music Information Retrieval Evaluation eXchange)", url: "https://www.music-ir.org/mirex/wiki/MIREX_HOME" },
  { name: "WIMIR", desc: "음악정보검색 분야 다양성·포용 커뮤니티 (Widening Inclusion in MIR)", url: "https://wimir.wordpress.com/" },
  { name: "DBLP (ISMIR)", desc: "ISMIR 컨퍼런스 논문 색인", url: "https://dblp.org/db/conf/ismir/index.html" },
  { name: "SMC Conference List", desc: "Sound and Music Computing 관련 컨퍼런스 목록", url: "https://smcnetwork.org/" },
  { name: "NIME Proceedings", desc: "NIME 컨퍼런스 전체 아카이브", url: "https://www.nime.org/archives/" },
];

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

const Societies = () => {
  return (
    <Layout>
      <PageHero title="관련 학회 / 저널" subtitle="Related Societies, Journals & Resources" />

      <div className="mx-auto max-w-5xl px-4 py-16 space-y-16">
        <ScrollReveal>
          <section>
            <h2 className="text-xl font-bold mb-8 gradient-accent-bar">Ⅰ. 관련 학회 / 컨퍼런스</h2>

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
