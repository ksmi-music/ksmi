import Layout from "@/components/Layout";
import { FileText } from "lucide-react";

const Bylaws = () => {
  return (
    <Layout>
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-bold text-primary-foreground">회칙 / 정관</h1>
          <p className="mt-2 text-primary-foreground/70 text-sm">Bylaws</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-muted-foreground">준비 중입니다</h2>
        <p className="text-sm text-muted-foreground/70 mt-2">
          학회 정관 내용이 준비되면 이 페이지에서 확인하실 수 있습니다.
        </p>
      </div>
    </Layout>
  );
};

export default Bylaws;
