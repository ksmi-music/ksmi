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

const labs = [
  { name: "Music and Audio Computing Lab (MACLab)", professor: "남주한 교수", univ: "KAIST 문화기술대학원", url: "https://mac.kaist.ac.kr/" },
  { name: "Music and Audio Research Group (MARG)", professor: "이교구 교수", univ: "서울대학교 융합과학기술대학원", url: "http://marg.snu.ac.kr/" },
  { name: "Music & Art Learning Lab (MALer)", professor: "정다샘 교수", univ: "서강대학교 아트&테크놀로지학과", url: "https://jdasam.github.io/" },
  { name: "Music & Brain Lab (MuBL)", professor: "이경면 교수", univ: "KAIST 문화기술대학원", url: "http://mubl.kaist.ac.kr/" },
  { name: "Applied and Innovative Research for Immersive Sound Lab (AiIRIS Lab)", professor: "김성영 교수", univ: "KAIST 문화기술대학원", url: "https://airislab.kaist.ac.kr/" },
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

const Labs = () => {
  return (
    <Layout>
      <PageHero title="관련 국내 연구실" subtitle="Domestic Research Labs" />

      <ScrollReveal className="mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-md border overflow-x-auto">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">연구실명</TableHead>
                <TableHead className="w-[25%]">책임교수</TableHead>
                <TableHead className="hidden sm:table-cell w-[35%]">소속</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labs.map((lab) => (
                <TableRow key={lab.name}>
                  <TableCell className="text-sm"><NameLink name={lab.name} url={lab.url} /></TableCell>
                  <TableCell className="text-sm">{lab.professor}</TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{lab.univ}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollReveal>
    </Layout>
  );
};

export default Labs;
