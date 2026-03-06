import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Introduction from "./pages/about/Introduction";
import Leadership from "./pages/about/Leadership";
import Membership from "./pages/about/Membership";
import Notices from "./pages/about/Notices";

import PastConferences from "./pages/conferences/PastConferences";
import KSMI2025 from "./pages/conferences/KSMI2025";
import Societies from "./pages/resources/Societies";
import Labs from "./pages/resources/Labs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="/resources/societies" element={<Societies />} />
          <Route path="/resources/labs" element={<Labs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
