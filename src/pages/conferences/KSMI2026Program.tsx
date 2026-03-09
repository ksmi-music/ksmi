import Layout from "@/components/Layout";
import KSMI2026Banner from "@/components/KSMI2026Banner";
import ComingSoon from "@/components/ComingSoon";

const KSMI2026Program = () => (
  <Layout>
    <KSMI2026Banner />
    <ComingSoon
      title="프로그램"
      subtitle="KSMI 2026"
      description="프로그램 일정을 준비하고 있습니다. 곧 오픈될 예정입니다."
      hideHero
    />
  </Layout>
);

export default KSMI2026Program;
