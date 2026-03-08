import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/lib/i18n";
import LanguageLayout from "@/components/LanguageLayout";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";
import CookiePolicy from "./pages/CookiePolicy";
import Sell from "./pages/Sell";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import BuyingProperty from "./pages/BuyingProperty";
import HomesForSale from "./pages/HomesForSale";
import LivingInZichron from "./pages/LivingInZichron";
import MovingToZichron from "./pages/MovingToZichron";
import BlueprintDownload from "./pages/BlueprintDownload";
import NotFound from "./pages/NotFound";

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
