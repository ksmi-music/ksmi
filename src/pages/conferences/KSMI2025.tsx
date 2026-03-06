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

const labSession1 = [
  { name: "MARG, 서울대 (이교구 교수)", url: "https://marg.snu.ac.kr/" },
  { name: "AIRIS Lab, KAIST (김성영 교수)", url: "https://airislab.kaist.ac.kr/" },
  { name: "MALer Lab, 서강대 (정다샘 교수)", url: "https://malerlab.github.io/" },
  { name: "AAA Lab, 경북대 (이석진 교수)", url: "https://sites.google.com/view/knuaaalab/home" },
  { name: "가우디오랩 (전상배 CSO)", url: "https://www.gaudiolab.com/ko/" },
  { name: "수퍼톤 (이교구 교수)", url: "https://www.supertone.ai/ko" },
  { name: "엠피에이지 (정인서 대표)", url: "https://www.mpaghq.com/" },
  { name: "포자랩스 (윤홍규 R&D 팀장)", url: "https://www.pozalabs.com/" },
];

const labSession2 = [
  { name: "Belmont University (전성희 교수)", url: "https://www.belmont.edu/profiles/song-hui-chon/" },
  { name: "UIUC (최가현 교수)", url: "https://kahyunchoi.com/" },
  { name: "MuBL, KAIST (이경면 교수)", url: "https://www.mubl.kaist.ac.kr/" },
  { name: "SAPL, GIST (신종원 교수)", url: "https://sapl.gist.ac.kr/" },
  { name: "MAC Lab, KAIST (남주한 교수)", url: "https://mac.kaist.ac.kr/" },
  { name: "MEMI Lab, GIST | 크리에이티브마인드 (안창욱 교수)", url: "https://sites.google.com/view/gist-memi/" },
  { name: "뉴튠 (이종필 대표)", url: "https://www.neutune.com/" },
  { name: "SiriusXM/Pandora (김재훈 박사)", url: "https://www.siriusxm.com/pandora" },
  { name: "Suno (원상희 박사)", url: "https://suno.com/" },
];

const posterSession1 = [
  { id: "1-A", lab: "MARG", author: "이성호", title: "Reverse Engineering of Music Mixing Graphs with Differentiable Processors and Iterative Pruning" },
  { id: "1-B", lab: "MARG", author: "채윤기", title: "Lyrics Generation with Song form-aware Syllable Count Control" },
  { id: "1-C", lab: "MARG", author: "정해선", title: "Optimizing Music Captioning with Reinforcement Learning and Retrieval-Augmented Methods" },
  { id: "1-D", lab: "MARG", author: "신은식", title: "Synthetic Dataset Generation for String Ensemble Separation" },
  { id: "2-A", lab: "MARG", author: "신원철", title: "Improving Synthesizer Sound Matching using Reinforcement Learning" },
  { id: "2-B", lab: "MARG", author: "김하윤", title: "Expressive Singing Voice Synthesis" },
  { id: "2-C", lab: "MARG", author: "황선태", title: "DOSE: Drum One-Shot Extraction from Music Mixture" },
  { id: "2-D", lab: "MARG", author: "이하준", title: "Many-to-Many Timbre Transfer with Interpolation" },
  { id: "3-A", lab: "MARG", author: "김수빈", title: "ERP responses of Interval Judgment in the Tritone Paradox" },
  { id: "3-B", lab: "MARG", author: "김예진", title: "Drum Generation with Latent Diffusion Models" },
  { id: "3-C", lab: "MARG", author: "한동엽", title: "Music Transformer That Mimics Human Compositional Steps" },
  { id: "3-D", lab: "MALer", author: "박한나", title: "GAON: Generative AI Offers Notes for your music" },
  { id: "4-A", lab: "MALer", author: "김대웅", title: "ViolinDiff: Enhancing Expressive Violin Synthesis with Pitch Bend Conditioning" },
  { id: "4-B", lab: "MALer", author: "정종민", title: "Unified Music Representation Translation Across Visual, Symbolic, and Audio Modalities" },
  { id: "4-C", lab: "MALer", author: "이다솔", title: "Understanding era gap between the US and Korean music charts using music CNN" },
  { id: "4-D", lab: "AIRIS", author: "고부승", title: "Augmented Reality Auditory Training for Selective Auditory Attention Enhancement" },
  { id: "5-A", lab: "AIRIS", author: "이강은", title: "Immersive Automatic Audio Panning System Integrated with DAW for Music Production" },
  { id: "5-B", lab: "AIRIS", author: "오경택", title: "Aural Heritage: 6DoF Reconstruction of Cultural Heritage Sites" },
  { id: "5-C", lab: "AIRIS", author: "박이든", title: "Quantitative and Qualitative Quotients in Music Source Separation: A Cross-Genre Analysis" },
  { id: "5-D", lab: "AAA", author: "이대호", title: "Enhancement of Automatic Music Transcription Model with Number of Activated Pitch Information" },
  { id: "6-A", lab: "NMSL", author: "김예원", title: "Amuse: Human-AI Collaborative Songwriting with Multimodal Inspirations" },
  { id: "6-B", lab: "MAC", author: "최은진", title: "On the De-duplication of the Large-scale Symbolic Music Dataset" },
  { id: "6-C", lab: "MAC", author: "방하연", title: "PianoBind: A Multimodal Joint Embedding Model for Pop-piano Music" },
];

const posterSession2 = [
  { id: "1-A", lab: "MAC", author: "김현수", title: "D3RM: A Discrete Diffusion Refinement Model for Piano Transcription" },
  { id: "1-B", lab: "MAC", author: "최은진", title: "A Discrete Denoising Diffusion Model for Leadsheet2PianoArrangement" },
  { id: "1-C", lab: "MAC", author: "도승헌", title: "Connecting Large Language Models and Music" },
  { id: "1-D", lab: "MAC", author: "이준원", title: "Controllable Foley Sound Generation from Multimodal Inputs" },
  { id: "2-A", lab: "MAC", author: "김기락", title: "확산 모델을 이용한 표현력 있는 피아노 연주 손 동작 생성" },
  { id: "2-B", lab: "MAC", author: "권대용", title: "MusT-RAG: Musical Text Question Answering with Retrieval Augmented Generation" },
  { id: "2-C", lab: "MAC", author: "김다빈", title: "Any-to-Any Timbre Transfer with Musical Structure Morphing for Monophonic Instruments" },
  { id: "2-D", lab: "MAC", author: "배준형", title: "A Preliminary Expert Interview Study on the Potential for Piano Education Innovation through a Multimodal Data Dashboard" },
  { id: "3-A", lab: "MAC", author: "한단비내린", title: "Capturing Repetition and Expression in Korean Folk Singing through Audio-Based Segmentation" },
  { id: "3-B", lab: "MAC", author: "Daniel Bin", title: "DIPO: Diffusion Inference-Time Partial Optimization for Structure Preserving Content Editing" },
  { id: "3-C", lab: "MAC", author: "박새별", title: "Quantitative Analysis of Melodic Similarity in Music Copyright Infringement Cases (ISMIR 2024)" },
  { id: "3-D", lab: "SAPL", author: "손주혜", title: "Band Splitting-based Online Music Source Separation" },
  { id: "4-A", lab: "MuBL", author: "김현재", title: "The Emergence of Musicality in Deep Auditory Models: Learning from Non-Musical Natural Sounds" },
  { id: "4-B", lab: "MuBL", author: "오은지", title: "A Real-Time EEG Synchrony System for Visualizing Shared Musical Pleasure in Multimedia Performances" },
  { id: "4-C", lab: "MuBL", author: "최유진", title: "Avatar-Based Audience Experiences in VR Music Concerts: Flow and Social Bonding" },
  { id: "4-D", lab: "MuBL", author: "김효진", title: "Exploring a New Modality for Music Emotion: Emoji-Based Real-Time Chat Data" },
  { id: "5-A", lab: "MuBL", author: "송태인", title: "Review: Research on the Musical Emotions of Cochlear Implant Users" },
  { id: "5-B", lab: "MEMI", author: "김태현", title: "Multi-Task Learning based Temporal Pattern Matching Network for Guitar Tablature Transcription" },
  { id: "5-C", lab: "MARG", author: "정해선", title: "Exploring the Speech-to-Song Illusion: A Comparative Study of Standard Korean and Dialects" },
  { id: "5-D", lab: "MARG", author: "이성호", title: "Differentiable Acoustic Radiance Transfer" },
  { id: "6-A", lab: "MARG", author: "홍유니스", title: "Revisiting Mismatch Negativity: Additive Neural Processes Across Attention" },
  { id: "6-B", lab: "MARG", author: "황새연", title: "When Melody and Lyrics Disagree: A Multimodal Analysis of Emotion in Music" },
  { id: "6-C", lab: "MAC", author: "김혜미, 박지윤", title: "A Multi-Track Dataset for MIR Research" },
];

const LabList = ({ labs }: { labs: typeof labSession1 }) => (
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

const PosterList = ({ posters }: { posters: typeof posterSession1 }) => {
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

const scheduleItems = [
  {
    id: "opening",
    time: "10:00 – 10:30",
    title: "개회",
    content: (
      <div className="space-y-2 text-sm">
        <p>인사말 #1: <strong>Prof. Zhiyao Duan</strong> (University of Rochester, ISMIR president){" "}
          <a href="https://labsites.rochester.edu/air/index.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center gap-1">Homepage <ExternalLink className="h-3 w-3" /></a>
        </p>
        <p>인사말 #2: <strong>Prof. Jinha Lee</strong> (University of Washington){" "}
          <a href="https://gamer.ischool.uw.edu/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center gap-1">Homepage <ExternalLink className="h-3 w-3" /></a>
        </p>
      </div>
    ),
  },
  {
    id: "keynote",
    time: "10:30 – 11:30",
    title: "Keynote: Advancing Music Experience Through Music Information Research",
    highlight: true,
    content: (
      <div className="space-y-4 text-sm">
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="py-4 px-5 space-y-3">
            <p className="font-semibold">Dr. Masataka Goto <span className="font-normal text-muted-foreground">(Senior Principal Researcher, AIST)</span>{" "}
              <a href="https://staff.aist.go.jp/m.goto/index-e.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center gap-1"><ExternalLink className="h-3 w-3" /></a>
            </p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="abstract" className="border-accent/20">
                <AccordionTrigger className="text-sm py-2 hover:no-underline">Abstract</AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
                  Music technologies will open up new ways of enjoying music, both in terms of creating and appreciating music. In this keynote, I will discuss how music information research can enrich music experiences by introducing examples of our research outcomes. For example, "Lyric Apps" offer a new form of lyric-driven visual art, dynamically rendering different visual content based on user interaction. After releasing "TextAlive App API", a web-based framework for creating lyric apps, we have held annual programming contests since 2020. Another example is "Kiite Cafe", a web service that allows users to get together virtually to listen to music. It lets users enjoy the same song simultaneously while reacting in real time, creating a shared listening experience. In the future, further advances in music information research will make interactions between people and music more active and enriching.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="bio" className="border-accent/20">
                <AccordionTrigger className="text-sm py-2 hover:no-underline">Bio</AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
                  Masataka Goto received the Doctor of Engineering degree from Waseda University in 1998. He is currently the Senior Principal Researcher at the National Institute of Advanced Industrial Science and Technology (AIST), Japan. Over the past 33 years, he has published more than 350 papers in refereed journals and international conference proceedings and has received 72 awards, including several best paper awards, best presentation awards, the Tenth Japan Academy Medal, and the Tenth JSPS PRIZE. He has served as a committee member of over 140 scientific societies and conferences, including as the General Chair of ISMIR 2009 and 2014.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    ),
  },
  {
    id: "lunch",
    time: "11:30 – 12:30",
    title: "점심 시간",
    simple: true,
  },
  {
    id: "lab1",
    time: "12:30 – 13:30",
    title: "연구실 및 기업 소개 세션 #1",
    content: <LabList labs={labSession1} />,
  },
  {
    id: "poster1",
    time: "13:30 – 15:00",
    title: "학생 포스터 발표 세션 #1",
    content: <PosterList posters={posterSession1} />,
  },
  {
    id: "break",
    time: "15:00 – 15:15",
    title: "휴식",
    simple: true,
  },
  {
    id: "lab2",
    time: "15:15 – 16:15",
    title: "연구실 및 기업 소개 세션 #2",
    content: <LabList labs={labSession2} />,
  },
  {
    id: "poster2",
    time: "16:15 – 17:45",
    title: "학생 포스터 발표 세션 #2",
    content: <PosterList posters={posterSession2} />,
  },
  {
    id: "closing",
    time: "17:45 – 18:00",
    title: "폐회 및 기념 촬영",
    simple: true,
  },
  {
    id: "dinner",
    time: "18:00 – 20:00",
    title: "만찬 / 네트워킹",
    simple: true,
  },
];

const KSMI2025 = () => {
  return (
    <Layout>
      {/* Hero */}
      <PageHero title="KSMI 2025 창립 심포지엄" subtitle="2025년 4월 19일 (토)">
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/70">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            KAIST 학술문화관 5F
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            10:00 – 20:00
          </span>
        </div>
      </PageHero>

      <ScrollReveal className="mx-auto max-w-4xl px-4 py-12">
        {/* Schedule */}
        <h2 className="text-xl font-bold mb-6">심포지엄 일정</h2>
        <Accordion type="multiple" className="space-y-2">
          {scheduleItems.map((item) => (
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
                  <AccordionContent className="pb-4 pl-32">
                    {item.content}
                  </AccordionContent>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>

        {/* Venue */}
        <h2 className="text-xl font-bold mt-16 mb-6">장소 안내</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="py-5 px-6 space-y-2">
              <h3 className="font-semibold text-sm">학술대회 장소</h3>
              <p className="text-sm text-muted-foreground">KAIST 학술문화관 5F<br />(정근모 컨퍼런스홀 + 존 해너홀)</p>
              <a href="https://naver.me/FjbaurS6" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-xs inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> 네이버지도
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-5 px-6 space-y-2">
              <h3 className="font-semibold text-sm">저녁 만찬 장소</h3>
              <p className="text-sm text-muted-foreground">KAIST E15 대강당</p>
              <a href="https://naver.me/xBwfnQQI" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-xs inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> 네이버지도
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Organizing Committee */}
        <h2 className="text-xl font-bold mt-16 mb-6">조직위원회</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* 학회장 및 부회장 */}
          <Card>
            <CardContent className="py-5 px-6 space-y-3">
              <h3 className="font-semibold text-sm">학회장 및 부회장</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><span className="font-medium text-foreground">학회장</span> — 남주한 (한국과학기술원)</li>
                <li><span className="font-medium text-foreground">부회장</span> — 정다샘 (서강대학교)</li>
              </ul>
            </CardContent>
          </Card>

          {/* 국내이사 */}
          <Card>
            <CardContent className="py-5 px-6 space-y-3">
              <h3 className="font-semibold text-sm">국내이사</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>이교구 (서울대학교)</li>
                <li>이경면 (한국과학기술원)</li>
                <li>김성영 (한국과학기술원)</li>
                <li>신종원 (광주과학기술원)</li>
                <li>안창욱 (광주과학기술원)</li>
                <li>이석진 (경북대학교)</li>
              </ul>
            </CardContent>
          </Card>

          {/* 국외이사 */}
          <Card>
            <CardContent className="py-5 px-6 space-y-3">
              <h3 className="font-semibold text-sm">국외이사</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>이진하 (University of Washington)</li>
                <li>최가현 (University of Illinois Urbana-Champaign)</li>
                <li>전성희 (Belmont University)</li>
              </ul>
            </CardContent>
          </Card>

          {/* 산업계 이사 */}
          <Card>
            <CardContent className="py-5 px-6 space-y-3">
              <h3 className="font-semibold text-sm">산업계 이사</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>최근우 (Genentech)</li>
                <li>원상희 (Suno)</li>
                <li>김재훈 (SiriusXM/Pandora)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 학생 간사 */}
        <Card className="mt-4">
          <CardContent className="py-5 px-6 space-y-3">
            <h3 className="font-semibold text-sm">운영위원회 (학생 간사)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-sm text-muted-foreground">
              <span>도승헌 (KAIST)</span>
              <span>한단비내린 (KAIST)</span>
              <span>정해선 (서울대)</span>
              <span>이준원 (KAIST)</span>
              <span>박윤정 (KAIST)</span>
              <span>손호열 (KAIST)</span>
              <span>방하연 (KAIST)</span>
              <span>권대용 (KAIST)</span>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>
    </Layout>
  );
};

export default KSMI2025;
