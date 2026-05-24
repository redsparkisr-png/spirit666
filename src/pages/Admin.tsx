import { useAuth } from "@/hooks/useAuth";
import AdminLogin from "@/components/admin/AdminLogin";
import AvailableManager from "@/components/admin/AvailableManager";
import SoldManager from "@/components/admin/SoldManager";
import BlogManager from "@/components/admin/BlogManager";
import LifestyleManager from "@/components/admin/LifestyleManager";
import LeadsList from "@/components/admin/LeadsList";
import ContentManager from "@/components/admin/ContentManager";
import LocationsManager from "@/components/admin/LocationsManager";
import PropertyTypesManager from "@/components/admin/PropertyTypesManager";
import GuideManager from "@/components/admin/GuideManager";
import TestimonialManager from "@/components/admin/TestimonialManager";
import HeroManager from "@/components/admin/HeroManager";
import WhatsAppManager from "@/components/admin/WhatsAppManager";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { useState } from "react";
import { LogOut, LayoutDashboard, Home, Image, Quote, Users, Megaphone, FileText, MapPin, Tag, BookOpen, Type, Settings, Menu, X, ExternalLink } from "lucide-react";

type TabId =
  | "Dashboard" | "Available" | "Sold" | "Property Types" | "Locations"
  | "Hero" | "Content" | "Blog" | "Guide"
  | "Testimonials" | "Lifestyle"
  | "Leads" | "WhatsApp";

const groups: { label: string; items: { id: TabId; label: string; icon: any }[] }[] = [
  {
    label: "סקירה",
    items: [{ id: "Dashboard", label: "דשבורד", icon: LayoutDashboard }],
  },
  {
    label: "נכסים",
    items: [
      { id: "Available", label: "נכסים פעילים", icon: Home },
      { id: "Sold", label: "נכסים שנמכרו", icon: Tag },
      { id: "Property Types", label: "סוגי נכסים", icon: Type },
      { id: "Locations", label: "מיקומים", icon: MapPin },
    ],
  },
  {
    label: "תוכן",
    items: [
      { id: "Hero", label: "Hero", icon: Image },
      { id: "Content", label: "טקסטים", icon: Settings },
      { id: "Blog", label: "בלוג", icon: FileText },
      { id: "Guide", label: "מדריך קונה", icon: BookOpen },
    ],
  },
  {
    label: "Social Proof",
    items: [
      { id: "Testimonials", label: "המלצות", icon: Quote },
      { id: "Lifestyle", label: "גלריית אורח חיים", icon: Image },
    ],
  },
  {
    label: "תקשורת",
    items: [
      { id: "Leads", label: "לידים", icon: Users },
      { id: "WhatsApp", label: "הגדרות WhatsApp", icon: Megaphone },
    ],
  },
];

const Admin = () => {
  const { user, isAdmin, loading, error, signOut, retry } = useAuth();
  const [tab, setTab] = useState<TabId>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground font-body text-sm">בודק הרשאות…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-display font-semibold text-foreground">משהו השתבש</h2>
          <p className="text-muted-foreground font-body text-sm">{error}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={retry} className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-body text-sm hover:bg-primary/90">
              נסה שוב
            </button>
            <a href="/" className="px-4 py-2 border border-border rounded-full font-body text-sm text-muted-foreground hover:text-foreground">
              חזרה לאתר
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
          <h2 className="text-xl font-display font-semibold text-foreground mb-2">אין הרשאה</h2>
          <p className="text-muted-foreground font-body text-sm mb-4">
            לחשבון זה אין הרשאות ניהול.
          </p>
          <button onClick={signOut} className="text-sm text-primary underline font-body">
            התנתק
          </button>
        </div>
      </div>
    );
  }

  const activeLabel = groups.flatMap(g => g.items).find(i => i.id === tab)?.label ?? "";

  const handleNav = (id: TabId) => {
    setTab(id);
    setSidebarOpen(false);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background flex">
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-40 bg-card border-b border-border px-4 h-14 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="תפריט" className="p-2 text-foreground">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <span className="font-display text-foreground">ניהול אתר</span>
        <a href="/" className="p-2 text-muted-foreground" aria-label="חזרה לאתר"><ExternalLink className="w-4 h-4" /></a>
      </header>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 right-0 z-40 lg:z-auto w-64 h-screen bg-card border-l border-border flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="px-5 py-5 border-b border-border">
          <div className="font-display text-lg text-foreground">Spirit Admin</div>
          <div className="text-xs text-muted-foreground mt-0.5 font-body truncate">{user.email}</div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="px-3 mb-1.5 text-[11px] uppercase tracking-wider text-muted-foreground/70 font-body">
                {group.label}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = tab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <a
            href="/"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 font-body transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> חזרה לאתר
          </a>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 font-body transition-colors"
          >
            <LogOut className="w-4 h-4" /> התנתק
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 pt-14 lg:pt-0">
        <div className="hidden lg:flex sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border px-8 h-14 items-center">
          <h1 className="font-display text-foreground">{activeLabel}</h1>
        </div>
        <div className="px-4 md:px-8 py-6 md:py-8 max-w-6xl">
          {tab === "Dashboard" && <AdminDashboard onNavigate={(t) => setTab(t as TabId)} />}
          {tab === "Available" && <AvailableManager />}
          {tab === "Sold" && <SoldManager />}
          {tab === "Lifestyle" && <LifestyleManager />}
          {tab === "Testimonials" && <TestimonialManager />}
          {tab === "Leads" && <LeadsList />}
          {tab === "Hero" && <HeroManager />}
          {tab === "WhatsApp" && <WhatsAppManager />}
          {tab === "Content" && <ContentManager />}
          {tab === "Locations" && <LocationsManager />}
          {tab === "Property Types" && <PropertyTypesManager />}
          {tab === "Guide" && <GuideManager />}
          {tab === "Blog" && <BlogManager />}
        </div>
      </main>
    </div>
  );
};

export default Admin;
