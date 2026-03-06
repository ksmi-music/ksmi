import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { assetUrl } from "@/lib/assetUrl";

const timeline = [
  { year: "Future", event: "정기 학술대회 개최" },
  { year: "2025", event: "창립 심포지엄 개최" },
  { year: "2024", event: "한국음악정보학회 설립" },
];

const activities = [
  { title: "학술연구", desc: "정기 학술대회 및 세미나 개최" },
  { title: "출판", desc: "학회지 및 연구자료집 발간" },
  { title: "교류협력", desc: "국내외 유관기관과의 학술교류" },
];

const Introduction = () => {
  return (
    <Layout>
      <PageHero title="학회 소개" subtitle="About KSMI" />

      <div className="mx-auto max-w-4xl px-4 py-16 space-y-16">
        <ScrollReveal>
          <section>
            <h2 className="text-xl font-bold mb-6 gradient-accent-bar">인사말</h2>
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="shrink-0">
                <img
                  src={assetUrl("/images/juhan_nam.jpg")}
                  alt="학회장 남주한"
                  className="w-36 h-36 rounded-lg object-cover"
                />
                <p className="text-xs font-semibold text-primary mt-2 text-center">학회장 남주한</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  한국음악정보학회(Korean Society for Music Informatics) 홈페이지를 방문해 주셔서 감사합니다.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                  한국음악정보학회는 음악 관련 데이터를 처리, 분석, 검색하는 음악정보검색(Music Information Retrieval, MIR) 분야부터 음악 생성에 이르기까지, 컴퓨터 기반으로 음악을 다루는 음악 정보 연구의 발전을 위해서 설립된 비영리 학술단체입니다. 음악 정보 연구는 음악 서비스의 고도화와 인공지능 기술의 확산에 힘입어 최근 큰 주목을 받고 있습니다. 본 학회는 음악 정보 연구에 관심있는 회원 간의 활발한 아이디어 교류와 연구 활동을 촉진하고, 연구 및 교육을 장려하며, 다양한 전공과 배경을 가진 분들이 함께 참여할 수 있도록 지원하고 있습니다. 또한, 매년 정기 학술대회를 개최하여 연구 성과를 공유하고 학문적 교류의 장을 마련하고자 합니다.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section>
            <h2 className="text-xl font-bold mb-8 gradient-accent-bar">학회 연혁</h2>
            <div className="relative border-l-2 border-border pl-8 space-y-8">
              {timeline.map((t) => (
                <div key={t.year} className="relative">
                  <div className="absolute -left-[41px] top-0.5 h-4 w-4 rounded-full border-2 border-accent bg-background" />
                  <p className="text-xs font-semibold text-accent">{t.year}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.event}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section>
            <h2 className="text-xl font-bold mb-6 gradient-accent-bar">학회 활동 소개</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {activities.map((act) => (
                <div key={act.title} className="rounded-lg border border-border p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 gradient-border-card">
                  <p className="font-semibold text-sm text-primary">{act.title}</p>
                  <p className="text-xs text-muted-foreground mt-2">{act.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>
    </Layout>
  );
};

export default Introduction;
