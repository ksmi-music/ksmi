import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Ksmi2026ConfigProvider } from "@/contexts/Ksmi2026ConfigContext";
import { NoticesOverrideProvider } from "@/contexts/NoticesOverrideContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Introduction from "./pages/about/Introduction";
import Leadership from "./pages/about/Leadership";
import Membership from "./pages/about/Membership";
import Notices from "./pages/about/Notices";

import PastConferences from "./pages/conferences/PastConferences";
import KSMI2025 from "./pages/conferences/KSMI2025";

const AdminLayout = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminLayout")) : () => null;
const AdminDashboard = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminDashboard")) : () => null;
const AdminNotices = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminNotices")) : () => null;
const AdminQuickLinks = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminQuickLinks")) : () => null;
const AdminSocieties = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminSocieties")) : () => null;
const AdminConferences = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminConferences")) : () => null;
const AdminLabs = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminLabs")) : () => null;
const AdminKsmi2025 = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminKsmi2025")) : () => null;
const AdminKsmi2026 = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminKsmi2026")) : () => null;
const AdminKsmi2026Program = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminKsmi2026Program")) : () => null;
const AdminKsmi2026Registration = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminKsmi2026Registration")) : () => null;
const AdminKsmi2026Settings = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminKsmi2026Settings")) : () => null;
const AdminKsmi2026Banner = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminKsmi2026Banner")) : () => null;
const AdminGuide = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminGuide")) : () => null;
const AdminIndexBanner = import.meta.env.DEV ? lazy(() => import("./pages/admin/AdminIndexBanner")) : () => null;
import KSMI2026 from "./pages/conferences/KSMI2026";
import KSMI2026Landing from "./pages/conferences/KSMI2026Landing";
import KSMI2026Program from "./pages/conferences/KSMI2026Program";
import KSMI2026Registration from "./pages/conferences/KSMI2026Registration";
import Societies from "./pages/resources/Societies";
import Labs from "./pages/resources/Labs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Ksmi2026ConfigProvider>
    <NoticesOverrideProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<Introduction />} />
          <Route path="/about/leadership" element={<Leadership />} />
          <Route path="/about/membership" element={<Membership />} />
          <Route path="/about/notices" element={<Notices />} />
          
          <Route path="/conferences/past" element={<PastConferences />} />
          <Route path="/conferences/2025" element={<KSMI2025 />} />
          <Route path="/conferences/ksmi2026" element={<KSMI2026Landing />} />
          <Route path="/conferences/ksmi2026/cfp" element={<KSMI2026 />} />
          <Route path="/conferences/ksmi2026/program" element={<KSMI2026Program />} />
          <Route path="/conferences/ksmi2026/registration" element={<KSMI2026Registration />} />
          <Route path="/resources/societies" element={<Societies />} />
          <Route path="/resources/labs" element={<Labs />} />
          {import.meta.env.DEV && (
            <Route path="/admin" element={<Suspense fallback={<div className="p-8 text-muted-foreground">로딩 중...</div>}><AdminLayout /></Suspense>}>
              <Route index element={<AdminDashboard />} />
              <Route path="guide" element={<AdminGuide />} />
              <Route path="notices" element={<AdminNotices />} />
              <Route path="quick-links" element={<AdminQuickLinks />} />
              <Route path="index-banner" element={<AdminIndexBanner />} />
              <Route path="societies" element={<AdminSocieties />} />
              <Route path="labs" element={<AdminLabs />} />
              <Route path="conferences" element={<AdminConferences />} />
              <Route path="conferences/2025" element={<AdminKsmi2025 />} />
              <Route path="conferences/ksmi2026" element={<AdminKsmi2026 />} />
              <Route path="conferences/ksmi2026/program" element={<AdminKsmi2026Program />} />
              <Route path="conferences/ksmi2026/registration" element={<AdminKsmi2026Registration />} />
              <Route path="conferences/ksmi2026/banner" element={<AdminKsmi2026Banner />} />
              <Route path="conferences/ksmi2026/settings" element={<AdminKsmi2026Settings />} />
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </NoticesOverrideProvider>
    </Ksmi2026ConfigProvider>
  </QueryClientProvider>
);

export default App;
