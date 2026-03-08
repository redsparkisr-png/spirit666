import { useAuth } from "@/hooks/useAuth";
import AdminLogin from "@/components/admin/AdminLogin";
import AvailableManager from "@/components/admin/AvailableManager";
import SoldManager from "@/components/admin/SoldManager";
import LifestyleManager from "@/components/admin/LifestyleManager";
import LeadsList from "@/components/admin/LeadsList";
import ContentManager from "@/components/admin/ContentManager";
import LocationsManager from "@/components/admin/LocationsManager";
import PropertyTypesManager from "@/components/admin/PropertyTypesManager";
import GuideManager from "@/components/admin/GuideManager";
import { useState } from "react";
import { LogOut } from "lucide-react";

const tabs = ["Available", "Sold", "Lifestyle", "Leads", "Content", "Locations", "Property Types", "Guide"] as const;

const Admin = () => {
  const { user, isAdmin, loading, error, signOut, retry } = useAuth();
  const [tab, setTab] = useState<typeof tabs[number]>("Available");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground font-body text-sm">Checking access…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-display font-semibold text-foreground">Something went wrong</h2>
          <p className="text-muted-foreground font-body text-sm">{error}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={retry} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-body text-sm hover:bg-primary/90">
              Retry
            </button>
            <a href="/" className="px-4 py-2 border border-border rounded-lg font-body text-sm text-muted-foreground hover:text-foreground">
              Back to Home
            </a>
          </div>
        </div>
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
        <div className="flex gap-1 mb-6 border-b border-border overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-body font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
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
        {tab === "Content" && <ContentManager />}
        {tab === "Locations" && <LocationsManager />}
        {tab === "Property Types" && <PropertyTypesManager />}
      </div>
    </div>
  );
};

export default Admin;
