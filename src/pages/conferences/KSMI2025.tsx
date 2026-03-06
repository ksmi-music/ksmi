import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ExternalLink, MapPin, Clock, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useContent } from "@/lib/contentLoader";

interface LabItem {
  name: string;
  url: string;
}

interface PosterItem {
  id: string;
  lab: string;
  author: string;
  title: string;
}

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  simple?: boolean;
  highlight?: boolean;
  type?: string;
  contentRef?: string;
  greetings?: { name: string; title: string; url: string }[];
  speaker?: string;
  speakerTitle?: string;
  speakerUrl?: string;
  abstract?: string;
  bio?: string;
}

interface Ksmi2025Data {
  hero: { title: string; subtitle: string; location: string; time: string };
  labSession1: LabItem[];
  labSession2: LabItem[];
  posterSession1: PosterItem[];
  posterSession2: PosterItem[];
  schedule: ScheduleItem[];
  venue: {
    main: { title: string; desc: string; mapUrl: string };
    dinner: { title: string; desc: string; mapUrl: string };
  };
  committee: Record<string, { title: string; items: string[] }>;
}

const LabList = ({ labs }: { labs: LabItem[] }) => (
  <ul className="space-y-2">
    {labs.map((lab) => (
      <li key={lab.name} className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">•</span>
        <span>{lab.name}</span>
        <a href={lab.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center gap-1">
          <ExternalLink className="h-3 w-3" />
        </a>
      </li>
    ))}
  </ul>
);

const PosterList = ({ posters }: { posters: PosterItem[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-accent hover:underline cursor-pointer">
        <span>📋 포스터 목록 보기</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-3 py-2 text-left font-medium text-muted-foreground w-16">번호</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground w-16">Lab</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground w-24">발표자</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">제목</th>
              </tr>
            </thead>
            <tbody>
              {posters.map((p) => (
                <tr key={p.id + p.author} className="border-b border-border/50 last:border-0">
                  <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{p.id}</td>
                  <td className="px-3 py-2 text-xs font-medium text-primary">{p.lab}</td>
                  <td className="px-3 py-2 text-xs">{p.author}</td>
                  <td className="px-3 py-2 text-xs">{p.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const KSMI2025 = () => {
  const { data: res } = useContent<Ksmi2025Data>("conferences/2025.md");
  const data = res?.data;

  if (!data) return null;

  const { hero, labSession1, labSession2, posterSession1, posterSession2, schedule, venue, committee } = data;
  const labMap: Record<string, LabItem[]> = { labSession1, labSession2 };
  const posterMap: Record<string, PosterItem[]> = { posterSession1, posterSession2 };

  const renderScheduleContent = (item: ScheduleItem) => {
    if (item.type === "greetings" && item.greetings) {
      return (
        <div className="space-y-2 text-sm">
          {item.greetings.map((g, i) => (
            <p key={g.name}>
              인사말 #{i + 1}: <strong>{g.name}</strong> ({g.title}){" "}
              <a href={g.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center gap-1">
                Homepage <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          ))}
        </div>
      );
    }
    if (item.type === "keynote" && item.speaker) {
      return (
        <div className="space-y-4 text-sm">
          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="py-4 px-5 space-y-3">
              <p className="font-semibold">
                {item.speaker} <span className="font-normal text-muted-foreground">({item.speakerTitle})</span>{" "}
                {item.speakerUrl && (
                  <a href={item.speakerUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </p>
              <Accordion type="single" collapsible className="w-full">
                {item.abstract && (
                  <AccordionItem value="abstract" className="border-accent/20">
                    <AccordionTrigger className="text-sm py-2 hover:no-underline">Abstract</AccordionTrigger>
                    <AccordionContent className="text-xs leading-relaxed text-muted-foreground">{item.abstract}</AccordionContent>
                  </AccordionItem>
                )}
                {item.bio && (
                  <AccordionItem value="bio" className="border-accent/20">
                    <AccordionTrigger className="text-sm py-2 hover:no-underline">Bio</AccordionTrigger>
                    <AccordionContent className="text-xs leading-relaxed text-muted-foreground">{item.bio}</AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      );
    }
    if (item.type === "labs" && item.contentRef && labMap[item.contentRef]) {
      return <LabList labs={labMap[item.contentRef]} />;
    }
    if (item.type === "posters" && item.contentRef && posterMap[item.contentRef]) {
      return <PosterList posters={posterMap[item.contentRef]} />;
    }
    return null;
  };

  return (
    <Layout>
      <PageHero title={hero.title} subtitle={hero.subtitle}>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/70">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {hero.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {hero.time}
          </span>
        </div>
      </PageHero>

      <ScrollReveal className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold mb-6">심포지엄 일정</h2>
        <Accordion type="multiple" className="space-y-2">
          {schedule.map((item) => (
            <AccordionItem key={item.id} value={item.id} className={`rounded-lg border border-border px-4 ${item.highlight ? "border-accent/40 bg-accent/5" : ""}`}>
              {item.simple ? (
                <div className="flex items-center gap-4 py-4">
                  <span className="text-xs font-mono text-muted-foreground w-28 shrink-0">{item.time}</span>
                  <span className="text-sm text-muted-foreground">{item.title}</span>
                </div>
              ) : (
                <>
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4 text-left">
                      <span className="text-xs font-mono text-muted-foreground w-28 shrink-0">{item.time}</span>
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pl-32">{renderScheduleContent(item)}</AccordionContent>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>

        <h2 className="text-xl font-bold mt-16 mb-6">장소 안내</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="py-5 px-6 space-y-2">
              <h3 className="font-semibold text-sm">{venue.main.title}</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{venue.main.desc}</p>
              <a href={venue.main.mapUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-xs inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> 네이버지도
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-5 px-6 space-y-2">
              <h3 className="font-semibold text-sm">{venue.dinner.title}</h3>
              <p className="text-sm text-muted-foreground">{venue.dinner.desc}</p>
              <a href={venue.dinner.mapUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-xs inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> 네이버지도
              </a>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-bold mt-16 mb-6">조직위원회</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {committee.president && (
            <Card>
              <CardContent className="py-5 px-6 space-y-3">
                <h3 className="font-semibold text-sm">{committee.president.title}</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {committee.president.items.map((item: string | { role: string; name: string }, i: number) =>
                    typeof item === "string" ? (
                      <li key={i}>{item}</li>
                    ) : (
                      <li key={i}>
                        <span className="font-medium text-foreground">{item.role}</span> — {item.name}
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>
          )}
          {committee.domestic && (
            <Card>
              <CardContent className="py-5 px-6 space-y-3">
                <h3 className="font-semibold text-sm">{committee.domestic.title}</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {committee.domestic.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          {committee.international && (
            <Card>
              <CardContent className="py-5 px-6 space-y-3">
                <h3 className="font-semibold text-sm">{committee.international.title}</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {committee.international.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          {committee.industry && (
            <Card>
              <CardContent className="py-5 px-6 space-y-3">
                <h3 className="font-semibold text-sm">{committee.industry.title}</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {committee.industry.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {committee.staff && (
          <Card className="mt-4">
            <CardContent className="py-5 px-6 space-y-3">
              <h3 className="font-semibold text-sm">{committee.staff.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-sm text-muted-foreground">
                {committee.staff.items.map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </ScrollReveal>
    </Layout>
  );
};

export default KSMI2025;
