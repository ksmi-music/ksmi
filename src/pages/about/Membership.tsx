import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Construction } from "lucide-react";

const Membership = () => {
  return (
    <Layout>
      <PageHero title="회원 등록" subtitle="Membership" />

      <ScrollReveal className="mx-auto max-w-4xl px-4 py-32 flex flex-col items-center text-center gap-4">
        <Construction className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-bold">페이지 준비중입니다</h2>
        <p className="text-sm text-muted-foreground">회원 등록 시스템을 준비하고 있습니다. 곧 오픈될 예정입니다.</p>
      </ScrollReveal>
    </Layout>
  );
};

export default Membership;
