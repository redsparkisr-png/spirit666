import { useAuth } from "@/hooks/useAuth";
import AdminLogin from "@/components/admin/AdminLogin";
import AvailableManager from "@/components/admin/AvailableManager";
import SoldManager from "@/components/admin/SoldManager";
import LifestyleManager from "@/components/admin/LifestyleManager";
import LeadsList from "@/components/admin/LeadsList";
import { useState } from "react";
import { LogOut } from "lucide-react";

const tabs = ["Available", "Sold", "Lifestyle", "Leads"] as const;

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [tab, setTab] = useState<typeof tabs[number]>("Available");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-body">Loading...</p>
      </div>
    );
  }

  if (!user) return <AdminLogin />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-xl font-display font-semibold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground font-body text-sm mb-4">
            Your account doesn't have admin privileges.
          </p>
          <button onClick={signOut} className="text-sm text-primary underline font-body">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container px-6 py-4 flex items-center justify-between">
          <h1 className="font-display font-semibold text-foreground text-lg">Admin Panel</h1>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground font-body"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </header>

      <div className="container px-6 py-6">
        <div className="flex gap-1 mb-6 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-body font-medium transition-colors border-b-2 -mb-px ${
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Available" && <AvailableManager />}
        {tab === "Sold" && <SoldManager />}
        {tab === "Lifestyle" && <LifestyleManager />}
        {tab === "Leads" && <LeadsList />}
      </div>
    </div>
  );
};

export default Admin;
