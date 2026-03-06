import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";

const presidents = [
  { name: "남주한", role: "학회장", affiliation: "한국과학기술원" },
  { name: "정다샘", role: "부회장", affiliation: "서강대학교" },
];

const domesticDirectors = [
  { name: "이교구", affiliation: "서울대학교" },
  { name: "이경면", affiliation: "한국과학기술원" },
  { name: "김성영", affiliation: "한국과학기술원" },
  { name: "신종원", affiliation: "광주과학기술원" },
  { name: "안창욱", affiliation: "광주과학기술원" },
  { name: "이석진", affiliation: "경북대학교" },
];

const internationalDirectors = [
  { name: "이진하", affiliation: "University of Washington" },
  { name: "최가현", affiliation: "University of Illinois Urbana-Champaign" },
  { name: "전성희", affiliation: "Belmont University" },
];

const industryDirectors = [
  { name: "최근우", affiliation: "Genentech" },
  { name: "원상희", affiliation: "Suno" },
  { name: "김재훈", affiliation: "SiriusXM/Pandora" },
];

const DirectorCard = ({ name, affiliation }: { name: string; affiliation: string }) => (
  <Card className="hover:shadow-sm transition-all duration-300 gradient-border-card">
    <CardContent className="py-4 px-5">
      <p className="font-medium text-sm">{name}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{affiliation}</p>
    </CardContent>
  </Card>
);

const Leadership = () => {
  return (
    <Layout>
      <PageHero title="임원진 소개" subtitle="Leadership" />

      <div className="mx-auto max-w-5xl px-4 py-16 space-y-16">
        <ScrollReveal>
          <section>
            <h2 className="text-xl font-bold mb-8 gradient-accent-bar">학회장 및 부회장</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              {presidents.map((p) => (
                <Card key={p.name} className="text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 gradient-border-card">
                  <CardContent className="pt-6 pb-5 flex flex-col items-center gap-1">
                    <p className="font-semibold text-lg">{p.name}</p>
                    <p className="text-xs text-accent font-medium">{p.role}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.affiliation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section>
            <h2 className="text-xl font-bold mb-8 gradient-accent-bar">이사회</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">국내이사</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {domesticDirectors.map((d) => <DirectorCard key={d.name} {...d} />)}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">국외이사</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {internationalDirectors.map((d) => <DirectorCard key={d.name} {...d} />)}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">산업계 이사</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {industryDirectors.map((d) => <DirectorCard key={d.name} {...d} />)}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </Layout>
  );
};

export default Leadership;
