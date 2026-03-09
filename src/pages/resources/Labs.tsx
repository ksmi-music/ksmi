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

const Labs = () => {
  const { data: res } = useContent<{ labs: { name: string; professor: string; univ: string; url: string }[] }>("resources/labs.md");
  const labs = (res?.data?.labs ?? []).slice().sort((a, b) => a.name.localeCompare(b.name));

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
