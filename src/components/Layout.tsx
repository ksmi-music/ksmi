import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import ConferenceHeader from "./ConferenceHeader";
import Footer from "./Footer";
import { SeoHead } from "./SeoHead";
import { SEO_CONFIG } from "@/lib/seoConfig";

const CONFERENCE_PATHS = ["/conferences/2025", "/conferences/ksmi2026"];
const isConferencePath = (path: string) =>
  CONFERENCE_PATHS.some((p) => path === p || path.startsWith(p + "/"));

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const useConferenceHeader = isConferencePath(location.pathname);
  const seo = SEO_CONFIG[location.pathname] ?? SEO_CONFIG["/"];

  return (
    <div className="flex min-h-screen flex-col">
      <SeoHead
        title={seo.title}
        description={seo.description}
        path={seo.path}
      />
      {useConferenceHeader ? <ConferenceHeader /> : <Header />}
      <main className="flex-1 animate-page-fade">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
