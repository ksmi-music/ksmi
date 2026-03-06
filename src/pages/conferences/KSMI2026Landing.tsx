import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import KSMI2026Banner from "@/components/KSMI2026Banner";
import ScrollReveal from "@/components/ScrollReveal";
import ComingSoon from "@/components/ComingSoon";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useContent } from "@/lib/contentLoader";
import { useKsmi2026HomeHref } from "@/contexts/Ksmi2026ConfigContext";

/**
 * /conferences/ksmi2026 홈: ConferenceBanner + 설정에 따른 본문 내용
 * (리다이렉트가 아니라, 홈은 그대로 두고 본문만 교체)
 */
const KSMI2026Landing = () => {
  const { data: configRes } = useContent<{ homeHref?: string }>("conferences/ksmi2026-config.md");
  const homeHref = useKsmi2026HomeHref(configRes?.data?.homeHref);
  const { data: cfpRes } = useContent("conferences/ksmi2026.md");

  if (homeHref === "/") {
    return <Navigate to="/" replace />;
  }

  const ksmi2026Content = cfpRes?.raw ?? "";

  return (
    <Layout>
      <KSMI2026Banner />
      {homeHref === "/conferences/ksmi2026" || homeHref === "/conferences/ksmi2026/cfp" ? (
        <ScrollReveal className="mx-auto max-w-6xl px-4 py-16">
          <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-8 prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-li:my-1 prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-table:my-6 prose-th:bg-muted prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3 prose-hr:my-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {ksmi2026Content.replace(/^# KSMI 2026[\r\n]+한국음악정보학회 제1회 학술대회[\r\n]+---[\r\n]+/, "")}
            </ReactMarkdown>
          </article>
        </ScrollReveal>
      ) : homeHref === "/conferences/ksmi2026/program" ? (
        <ComingSoon
          title="Program"
          subtitle="KSMI 2026"
          description="프로그램 일정을 준비하고 있습니다. 곧 오픈될 예정입니다."
          hideHero
        />
      ) : homeHref === "/conferences/ksmi2026/registration" ? (
        <ComingSoon
          title="Registration"
          subtitle="KSMI 2026"
          description="등록 안내를 준비하고 있습니다. 곧 오픈될 예정입니다."
          hideHero
        />
      ) : (
        <ScrollReveal className="mx-auto max-w-6xl px-4 py-16">
          <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-8 prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-li:my-1 prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-table:my-6 prose-th:bg-muted prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3 prose-hr:my-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {ksmi2026Content.replace(/^# KSMI 2026[\r\n]+한국음악정보학회 제1회 학술대회[\r\n]+---[\r\n]+/, "")}
            </ReactMarkdown>
          </article>
        </ScrollReveal>
      )}
    </Layout>
  );
};

export default KSMI2026Landing;
