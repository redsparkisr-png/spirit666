import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/lib/i18n";
import LanguageLayout from "@/components/LanguageLayout";
import Index from "./pages/Index";

// Lazy-load non-critical pages for code splitting
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Sell = lazy(() => import("./pages/Sell"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const Properties = lazy(() => import("./pages/Properties"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const BuyingProperty = lazy(() => import("./pages/BuyingProperty"));
const HomesForSale = lazy(() => import("./pages/HomesForSale"));
const LivingInZichron = lazy(() => import("./pages/LivingInZichron"));
const MovingToZichron = lazy(() => import("./pages/MovingToZichron"));
const BlueprintDownload = lazy(() => import("./pages/BlueprintDownload"));
const BuyerGuide2026 = lazy(() => import("./pages/BuyerGuide2026"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function detectLang(): "en" | "he" {
  const stored = localStorage.getItem("preferred_lang");
  if (stored === "he" || stored === "en") return stored;
  if (navigator.language?.startsWith("he")) return "he";
  return "en";
}

const RootRedirect = () => <Navigate to={`/${detectLang()}/`} replace />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/:lang" element={<LanguageLayout />}>
              <Route index element={<Index />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="accessibility" element={<Accessibility />} />
              <Route path="cookies" element={<CookiePolicy />} />
              <Route path="sell" element={<Sell />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="properties" element={<Properties />} />
              <Route path="property/:slug" element={<PropertyDetail />} />
              <Route path="buying-property-zichron-yaakov" element={<BuyingProperty />} />
              <Route path="homes-for-sale-zichron-yaakov" element={<HomesForSale />} />
              <Route path="living-in-zichron-yaakov" element={<LivingInZichron />} />
              <Route path="moving-to-zichron-yaakov" element={<MovingToZichron />} />
              <Route path="blueprint-download" element={<BlueprintDownload />} />
              <Route path="buyer-guide-2026" element={<BuyerGuide2026 />} />
              <Route path="admin" element={<Admin />} />
            </Route>
            {/* Backward compat for /admin */}
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
