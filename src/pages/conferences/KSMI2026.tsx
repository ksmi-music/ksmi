import Layout from "@/components/Layout";
import KSMI2026Banner from "@/components/KSMI2026Banner";
import ScrollReveal from "@/components/ScrollReveal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useContent } from "@/lib/contentLoader";

const KSMI2026 = () => {
  const { data: res } = useContent("conferences/ksmi2026.md");
  const ksmi2026Content = res?.raw ?? "";
  return (
    <Layout>
      <KSMI2026Banner />

      <ScrollReveal className="mx-auto max-w-6xl px-4 py-16">
        <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-8 prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-li:my-1 prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-table:my-6 prose-th:bg-muted prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3 prose-hr:my-12">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {ksmi2026Content.replace(/^# KSMI 2026[\r\n]+한국음악정보학회 제1회 학술대회[\r\n]+---[\r\n]+/, "")}
          </ReactMarkdown>
        </article>
      </ScrollReveal>
    </Layout>
  );
};

export default KSMI2026;
