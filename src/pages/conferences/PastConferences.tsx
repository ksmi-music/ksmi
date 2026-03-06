import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { ExternalLink, MapPin, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useContent } from "@/lib/contentLoader";

const PastConferences = () => {
  const { data: res } = useContent<{ conferences: { year: number; title: string; link: string; internal: boolean; date?: string; location?: string; keynote?: string; highlights?: string[]; participants?: string }[] }>("conferences/past.md");
  const conferences = res?.data?.conferences ?? [];
  return (
    <Layout>
      <PageHero title="역대 학술대회" subtitle="Past Conferences" />

      <ScrollReveal className="mx-auto max-w-4xl px-4 py-16">
        <div className="space-y-6">
          {conferences.map((c) => {
            const content = (
              <Card className="hover:shadow-md hover:-translate-y-1 transition-all duration-300 group gradient-border-card">
                <CardContent className="py-6 px-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">{c.year}</span>
                      <div>
                        <span className="text-base font-semibold">{c.title}</span>
                        {c.keynote && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Keynote: {c.keynote}
                          </p>
                        )}
                      </div>
                    </div>
                    {!c.internal && (
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-1" />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {c.date && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {c.date}
                      </span>
                    )}
                    {c.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {c.location}
                      </span>
                    )}
                    {c.participants && (
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3 w-3" /> {c.participants}
                      </span>
                    )}
                  </div>

                  {c.highlights && (
                    <div className="flex flex-wrap gap-1.5">
                      {c.highlights.map((h, i) => (
                        <Badge key={i} variant="secondary" className="text-xs font-normal">
                          {h}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );

            return c.internal ? (
              <Link key={c.year} to={c.link}>
                {content}
              </Link>
            ) : (
              <a key={c.year} href={c.link} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            );
          })}
        </div>
      </ScrollReveal>
    </Layout>
  );
};

export default PastConferences;
