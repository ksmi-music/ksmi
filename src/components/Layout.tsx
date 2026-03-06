import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import ConferenceHeader from "./ConferenceHeader";
import Footer from "./Footer";

const CONFERENCE_PATHS = ["/conferences/2025", "/conferences/ksmi2026"];
const isConferencePath = (path: string) =>
  CONFERENCE_PATHS.some((p) => path === p || path.startsWith(p + "/"));

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const useConferenceHeader = isConferencePath(location.pathname);

  return (
    <div className="flex min-h-screen flex-col">
      {useConferenceHeader ? <ConferenceHeader /> : <Header />}
      <main className="flex-1 animate-page-fade">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
