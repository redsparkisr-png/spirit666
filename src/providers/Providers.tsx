"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/i18n";
import { useState } from "react";

export default function Providers({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: "en" | "he";
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider initialLang={initialLang}>
          <Toaster />
          <Sonner />
          {children}
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
