import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Save, X, Eye, EyeOff } from "lucide-react";

interface BlogPost {
  id: string;
  title_en: string;
  title_he: string;
  slug: string;
  excerpt_en: string;
  excerpt_he: string;
  body_en: string;
  body_he: string;
  featured_image: string | null;
  category: string | null;
  tags: string[];
  author: string;
  publish_date: string;
  status: string;
  reading_time_minutes: number;
  seo_title_en: string | null;
  seo_title_he: string | null;
  meta_description_en: string | null;
  meta_description_he: string | null;
  og_image: string | null;
  canonical_url: string | null;
  noindex: boolean;
}

interface BlogCategory {
  id: string;
  name_en: string;
  name_he: string;
  slug: string;
  display_order: number;
}

const EMPTY_POST: Omit<BlogPost, "id"> = {
  title_en: "", title_he: "", slug: "", excerpt_en: "", excerpt_he: "",
  body_en: "", body_he: "", featured_image: null, category: null,
  tags: [], author: "Spirit Real Estate", publish_date: new Date().toISOString(),
  status: "draft", reading_time_minutes: 5,
  seo_title_en: null, seo_title_he: null,
  meta_description_en: null, meta_description_he: null,
  og_image: null, canonical_url: null, noindex: false,
};

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"content" | "seo">("content");

  const load = () => {
    supabase.from("blog_posts").select("*").order("publish_date", { ascending: false }).then(({ data }) => { if (data) setPosts(data as BlogPost[]); });
    supabase.from("blog_categories").select("*").order("display_order").then(({ data }) => { if (data) setCategories(data as BlogCategory[]); });
  };

  useEffect(load, []);

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9\u0590-\u05FF]+/g, "-").replace(/^-|-$/g, "");

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const { id, ...rest } = editing as any;
    if (!rest.slug) rest.slug = generateSlug(rest.title_en || rest.title_he || "post");

    if (isNew) {
      await supabase.from("blog_posts").insert(rest);
    } else {
      await supabase.from("blog_posts").update(rest).eq("id", id);
    }
    setSaving(false);
    setEditing(null);
    setIsNew(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    load();
  };

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground text-lg">
            {isNew ? "New Blog Post" : "Edit Post"}
          </h3>
          <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab("content")} className={`px-3 py-1.5 text-sm font-body rounded ${tab === "content" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>Content</button>
          <button onClick={() => setTab("seo")} className={`px-3 py-1.5 text-sm font-body rounded ${tab === "seo" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>SEO</button>
        </div>

        {tab === "content" && (
          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Title (EN)</label>
                <input value={editing.title_en || ""} onChange={(e) => setEditing({ ...editing, title_en: e.target.value })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Title (HE)</label>
                <input value={editing.title_he || ""} onChange={(e) => setEditing({ ...editing, title_he: e.target.value })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" dir="rtl" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Slug</label>
                <input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" placeholder="auto-generated-if-empty" />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Category</label>
                <select value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value || null })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm">
                  <option value="">— None —</option>
                  {categories.map((c) => <option key={c.id} value={c.slug}>{c.name_en}</option>)}
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Excerpt (EN)</label>
                <textarea value={editing.excerpt_en || ""} onChange={(e) => setEditing({ ...editing, excerpt_en: e.target.value })} rows={3} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Excerpt (HE)</label>
                <textarea value={editing.excerpt_he || ""} onChange={(e) => setEditing({ ...editing, excerpt_he: e.target.value })} rows={3} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" dir="rtl" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-body text-muted-foreground mb-1">Body (EN) — HTML supported</label>
              <textarea value={editing.body_en || ""} onChange={(e) => setEditing({ ...editing, body_en: e.target.value })} rows={10} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm font-mono" />
            </div>
            <div>
              <label className="block text-xs font-body text-muted-foreground mb-1">Body (HE) — HTML supported</label>
              <textarea value={editing.body_he || ""} onChange={(e) => setEditing({ ...editing, body_he: e.target.value })} rows={10} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm font-mono" dir="rtl" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Featured Image URL</label>
                <input value={editing.featured_image || ""} onChange={(e) => setEditing({ ...editing, featured_image: e.target.value || null })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Author</label>
                <input value={editing.author || ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Reading Time (min)</label>
                <input type="number" value={editing.reading_time_minutes || 5} onChange={(e) => setEditing({ ...editing, reading_time_minutes: Number(e.target.value) })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Status</label>
                <select value={editing.status || "draft"} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Publish Date</label>
                <input type="datetime-local" value={editing.publish_date ? new Date(editing.publish_date).toISOString().slice(0, 16) : ""} onChange={(e) => setEditing({ ...editing, publish_date: new Date(e.target.value).toISOString() })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Tags (comma-separated)</label>
                <input value={(editing.tags || []).join(", ")} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" />
              </div>
            </div>
          </div>
        )}

        {tab === "seo" && (
          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">SEO Title (EN)</label>
                <input value={editing.seo_title_en || ""} onChange={(e) => setEditing({ ...editing, seo_title_en: e.target.value || null })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">SEO Title (HE)</label>
                <input value={editing.seo_title_he || ""} onChange={(e) => setEditing({ ...editing, seo_title_he: e.target.value || null })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" dir="rtl" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Meta Description (EN)</label>
                <textarea value={editing.meta_description_en || ""} onChange={(e) => setEditing({ ...editing, meta_description_en: e.target.value || null })} rows={3} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Meta Description (HE)</label>
                <textarea value={editing.meta_description_he || ""} onChange={(e) => setEditing({ ...editing, meta_description_he: e.target.value || null })} rows={3} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" dir="rtl" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">OG Image URL</label>
                <input value={editing.og_image || ""} onChange={(e) => setEditing({ ...editing, og_image: e.target.value || null })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Canonical URL</label>
                <input value={editing.canonical_url || ""} onChange={(e) => setEditing({ ...editing, canonical_url: e.target.value || null })} className="w-full px-3 py-2 rounded border border-border bg-card font-body text-sm" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm font-body text-foreground">
              <input type="checkbox" checked={editing.noindex || false} onChange={(e) => setEditing({ ...editing, noindex: e.target.checked })} />
              noindex (hide from search engines)
            </label>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-body text-sm font-medium hover:bg-primary/90 disabled:opacity-50">
            <Save className="w-4 h-4" />{saving ? "Saving..." : "Save"}
          </button>
          <button onClick={() => { setEditing(null); setIsNew(false); }} className="px-6 py-2.5 rounded-lg border border-border font-body text-sm text-muted-foreground hover:text-foreground">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground text-lg">Blog Posts</h3>
        <button onClick={() => { setEditing({ ...EMPTY_POST }); setIsNew(true); setTab("content"); }} className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-body text-sm font-medium hover:bg-primary/90">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground font-body text-sm text-center py-8">No blog posts yet. Create your first one!</p>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 bg-card rounded-lg border border-border p-4">
              {p.featured_image && <img src={p.featured_image} alt="" className="w-16 h-12 rounded object-cover flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-body font-medium text-foreground text-sm truncate">{p.title_en || p.title_he}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-[10px] font-body font-semibold uppercase px-2 py-0.5 rounded-full ${p.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {p.status}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-body">{new Date(p.publish_date).toLocaleDateString()}</span>
                  {p.category && <span className="text-[11px] text-muted-foreground font-body">{p.category}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setEditing(p); setIsNew(false); setTab("content"); }} className="p-2 text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => remove(p.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManager;
