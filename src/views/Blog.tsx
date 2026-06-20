"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Clock, Calendar, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import { useSiteContent } from "@/hooks/useSiteContent";

interface BlogPost {
  id: string;
  title_en: string;
  title_he: string;
  slug: string;
  excerpt_en: string;
  excerpt_he: string;
  featured_image: string | null;
  category: string | null;
  author: string;
  publish_date: string;
  reading_time_minutes: number;
  seo_title_en: string | null;
  seo_title_he: string | null;
  meta_description_en: string | null;
  meta_description_he: string | null;
}

interface BlogCategory {
  id: string;
  name_en: string;
  name_he: string;
  slug: string;
}

type Props = {
  initialPosts?: BlogPost[];
  initialCategories?: BlogCategory[];
};

const Blog = ({ initialPosts, initialCategories }: Props = {}) => {
  const { lang } = useLanguage();
  const { t } = useSiteContent();
  const isHe = lang === "he";
  const prefix = `/${lang}`;

  const [posts, setPosts] = useState<BlogPost[]>(initialPosts ?? []);
  const [categories, setCategories] = useState<BlogCategory[]>(initialCategories ?? []);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loaded, setLoaded] = useState(!!initialPosts);

  useEffect(() => {
    if (initialPosts) return;
    Promise.all([
      supabase.from("blog_posts").select("*").eq("status", "published").order("publish_date", { ascending: false }),
      supabase.from("blog_categories").select("*").order("display_order"),
    ]).then(([postsRes, catsRes]) => {
      if (postsRes.data) setPosts(postsRes.data as BlogPost[]);
      if (catsRes.data) setCategories(catsRes.data as BlogCategory[]);
      setLoaded(true);
    });
  }, [initialPosts]);

  const filtered = posts.filter((p) => {
    const matchesCat = activeCategory === "all" || p.category === activeCategory;
    const title = isHe ? p.title_he : p.title_en;
    const excerpt = isHe ? p.excerpt_he : p.excerpt_en;
    const matchesSearch = !searchQuery || title.toLowerCase().includes(searchQuery.toLowerCase()) || excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const WHATSAPP_URL = `https://wa.me/972522820632?text=${encodeURIComponent(isHe ? "היי, אשמח לקבל את המדריך לרכישת בית בזכרון יעקב" : "Hi, I'd like to receive the Zichron Yaakov Buyer Blueprint.")}`;

  return (
    <main>
      <Header />
      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-14"
          >
            <h1 className="font-display font-semibold text-foreground text-3xl md:text-4xl mb-3">
              {isHe ? "מדריכים ותובנות" : "Guides & Insights"}
            </h1>
            <p className="text-muted-foreground font-body text-sm md:text-base max-w-xl mx-auto">
              {isHe
                ? "מידע מקצועי ותובנות מהשטח לכל מי שמתעניין בנדל״ן בזכרון יעקב"
                : "Expert knowledge and local insights for anyone exploring real estate in Zichron Yaakov"}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto mb-10 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHe ? "חיפוש מאמרים..." : "Search articles..."}
                className="w-full ps-10 pe-4 py-2.5 rounded-full border border-border bg-card font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-1.5 rounded-full font-body text-xs font-medium transition-colors ${activeCategory === "all" ? "bg-gold text-white" : "bg-card text-muted-foreground border border-border hover:text-foreground"}`}
              >
                {isHe ? "הכל" : "All"}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-1.5 rounded-full font-body text-xs font-medium transition-colors ${activeCategory === cat.slug ? "bg-gold text-white" : "bg-card text-muted-foreground border border-border hover:text-foreground"}`}
                >
                  {isHe ? cat.name_he : cat.name_en}
                </button>
              ))}
            </div>
          </div>

          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <Link href={`${prefix}/guides/${featured.slug}`} className="block group">
                <div className="grid md:grid-cols-2 gap-6 bg-card rounded-2xl overflow-hidden shadow-md border border-border/40 hover:shadow-xl transition-shadow">
                  {featured.featured_image && (
                    <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                      <img src={featured.featured_image} alt={isHe ? featured.title_he : featured.title_en} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="eager" fetchPriority="high" decoding="async" />
                    </div>
                  )}
                  <div className="p-6 md:p-8 flex flex-col justify-center text-start">
                    {featured.category && (
                      <span className="text-gold font-body text-xs font-semibold uppercase tracking-wider mb-2">
                        {categories.find((c) => c.slug === featured.category)?.[isHe ? "name_he" : "name_en"] || featured.category}
                      </span>
                    )}
                    <h2 className="font-display font-semibold text-foreground text-xl md:text-2xl mb-3 group-hover:text-gold transition-colors">
                      {isHe ? featured.title_he : featured.title_en}
                    </h2>
                    <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-3">
                      {isHe ? featured.excerpt_he : featured.excerpt_en}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(featured.publish_date).toLocaleDateString(isHe ? "he-IL" : "en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.reading_time_minutes} {isHe ? "דק׳ קריאה" : "min read"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {rest.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <Link href={`${prefix}/guides/${post.slug}`} className="block group h-full">
                    <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/40 hover:shadow-md transition-all h-full flex flex-col">
                      {post.featured_image && (
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={post.featured_image} alt={isHe ? post.title_he : post.title_en} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-1 text-start">
                        {post.category && (
                          <span className="text-gold font-body text-[10px] font-semibold uppercase tracking-wider mb-2">
                            {categories.find((c) => c.slug === post.category)?.[isHe ? "name_he" : "name_en"] || post.category}
                          </span>
                        )}
                        <h3 className="font-display font-semibold text-foreground text-base mb-2 group-hover:text-gold transition-colors">
                          {isHe ? post.title_he : post.title_en}
                        </h3>
                        <p className="text-muted-foreground font-body text-sm line-clamp-2 mb-4 flex-1">
                          {isHe ? post.excerpt_he : post.excerpt_en}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-body mt-auto">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.publish_date).toLocaleDateString(isHe ? "he-IL" : "en-US", { month: "short", day: "numeric" })}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.reading_time_minutes} {isHe ? "דק׳" : "min"}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {loaded && filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-body text-sm">
                {isHe ? "אין מאמרים להצגה כרגע" : "No articles to display at the moment"}
              </p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-center mt-16 bg-primary rounded-2xl p-8 md:p-12"
          >
            <h3 className="font-display font-semibold text-primary-foreground text-xl md:text-2xl mb-3">
              {isHe ? "רוצים לקבל את המדריך המלא?" : "Want the Full Buyer Guide?"}
            </h3>
            <p className="font-body text-primary-foreground/70 text-sm mb-6">
              {isHe
                ? "המדריך לרוכשי בתים בזכרון יעקב כולל מחירים, שכונות ותובנות שלא תמצאו באינטרנט."
                : "Our Zichron Yaakov Buyer Blueprint includes pricing, neighborhoods and insights you won't find online."}
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-white py-3.5 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {isHe ? "הורדת המדריך" : "Get the Guide"}
            </a>
          </motion.div>
        </div>
      </section>
      <TrustSection />
    </main>
  );
};

export default Blog;
