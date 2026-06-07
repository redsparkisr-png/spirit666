"use client";

import { useParams } from "next/navigation";
import { Suspense, lazy } from "react";

const CrmLayout = lazy(() => import("@/crm/components/CrmLayout"));
const CrmDashboard = lazy(() => import("@/crm/pages/CrmDashboard"));
const CrmLeadsList = lazy(() => import("@/crm/pages/CrmLeadsList"));
const CrmLeadDetail = lazy(() => import("@/crm/pages/CrmLeadDetail"));
const CrmQuickAdd = lazy(() => import("@/crm/pages/CrmQuickAdd"));
const CrmTasks = lazy(() => import("@/crm/pages/CrmTasks"));
const CrmPipeline = lazy(() => import("@/crm/pages/CrmPipeline"));
const CrmReports = lazy(() => import("@/crm/pages/CrmReports"));

const Loader = () => (
  <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function CrmContent() {
  const params = useParams<{ segments?: string[] }>();
  const segments = params?.segments ?? [];
  const [first, second] = segments;

  if (!first) return <CrmDashboard />;
  if (first === "leads") {
    if (!second) return <CrmLeadsList />;
    if (second === "new") return <CrmQuickAdd />;
    return <CrmLeadDetail />;
  }
  if (first === "tasks") return <CrmTasks />;
  if (first === "pipeline") return <CrmPipeline />;
  if (first === "reports") return <CrmReports />;
  return <CrmDashboard />;
}

export default function CrmPage() {
  return (
    <Suspense fallback={<Loader />}>
      <CrmLayout>
        <CrmContent />
      </CrmLayout>
    </Suspense>
  );
}
