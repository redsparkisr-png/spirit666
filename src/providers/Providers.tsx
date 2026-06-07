"use client";

import { QueryClient, QueryClientProvider, HydrationBoundary, type DehydratedState } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/i18n";
import { useState } from "react";

export default function Providers({
  children,
  initialLang,
  dehydratedState,
}: {
  children: React.ReactNode;
  initialLang: "en" | "he";
  dehydratedState?: DehydratedState;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <TooltipProvider>
          <LanguageProvider initialLang={initialLang}>
            <Toaster />
            <Sonner />
            {children}
          </LanguageProvider>
        </TooltipProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
