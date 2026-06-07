"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCrmAuth } from "../hooks/useCrmAuth";
import CrmLogin from "./CrmLogin";
import {
  LayoutDashboard, Users, ListTodo, Columns3, BarChart3, LogOut, Menu, X, Plus,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/crm", icon: LayoutDashboard, label: "דשבורד", exact: true },
  { to: "/crm/leads", icon: Users, label: "לידים", exact: false },
  { to: "/crm/tasks", icon: ListTodo, label: "משימות", exact: false },
  { to: "/crm/pipeline", icon: Columns3, label: "Pipeline", exact: false },
  { to: "/crm/reports", icon: BarChart3, label: "דוחות", exact: false },
];

const CrmLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, hasCrmAccess, loading, error, signOut, retry } = useCrmAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (to: string, exact: boolean) =>
    exact ? pathname === to : (pathname || "").startsWith(to);

  const navClass = (to: string, exact: boolean) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive(to, exact)
        ? "bg-blue-600/15 text-blue-400"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4" dir="rtl">
        <div className="text-center space-y-4">
          <p className="text-white text-lg font-medium">שגיאה</p>
          <p className="text-gray-400 text-sm">{error}</p>
          <button onClick={retry} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">נסה שוב</button>
        </div>
      </div>
    );
  }

  if (!user) return <CrmLogin />;

  if (!hasCrmAccess) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4" dir="rtl">
        <div className="text-center space-y-4">
          <p className="text-white text-lg font-medium">אין הרשאה</p>
          <p className="text-gray-400 text-sm">אין לך גישה למערכת ה-CRM.</p>
          <button onClick={signOut} className="text-blue-400 underline text-sm">התנתק</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-white" dir="rtl">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0f1117]/95 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-400 hover:text-white">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <span className="text-sm font-bold text-white">Spirit CRM</span>
        <button
          onClick={() => router.push("/crm/leads/new")}
          className="p-2 bg-blue-600 rounded-lg"
        >
          <Plus className="w-4 h-4" />
        </button>
      </header>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-40 w-64 bg-[#13161f] border-l border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 border-b border-white/5">
          <h1 className="text-lg font-bold text-white">Spirit CRM</h1>
          <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={navClass(item.to, item.exact)}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button
            onClick={() => { router.push("/crm/leads/new"); setSidebarOpen(false); }}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors mb-2"
          >
            <Plus className="w-4 h-4" />
            ליד חדש
          </button>
          <button onClick={signOut} className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-300 py-2 text-sm transition-colors">
            <LogOut className="w-4 h-4" />
            התנתק
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:mr-64 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#13161f]/95 backdrop-blur-md border-t border-white/5 flex justify-around py-2" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
        {NAV_ITEMS.slice(0, 4).map((item) => (
          <Link
            key={item.to}
            href={item.to}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors ${
              isActive(item.to, item.exact) ? "text-blue-400" : "text-gray-500"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default CrmLayout;
