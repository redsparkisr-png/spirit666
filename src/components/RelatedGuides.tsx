import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";

interface Post {
  id: string;
  slug: string;
  title_he: string;
  title_en: string;
  excerpt_he: string;
  excerpt_en: string;
  featured_image: string | null;
  reading_time_minutes: number;
  category: string | null;
}

type Props = {
  category?: string;
  excludeSlug?: string;
  limit?: number;
};

const RelatedGuides = ({ category, excludeSlug, limit = 3 }: Props) => {
  const { lang } = useLanguage();
  const { t } = useSiteContent();
  const isHe = lang === "he";
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    let query = supabase
      .from("blog_posts")
      .select("id,slug,title_he,title_en,excerpt_he,excerpt_en,featured_image,reading_time_minutes,category")
      .eq("status", "published")
      .order("publish_date", { ascending: false })
      .limit(limit + (excludeSlug ? 1 : 0));
    if (category) query = query.eq("category", category);
    query.then(({ data }) => {
      if (!data) return;
      const filtered = excludeSlug ? data.filter((p) => p.slug !== excludeSlug) : data;
      setPosts(filtered.slice(0, limit) as Post[]);
    });
  }, [category, excludeSlug, limit]);

  if (posts.length === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-card border-t border-border">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-semibold text-foreground text-2xl md:text-3xl mb-2 text-center">
            {t("common.related_guides_title")}
          </h2>
          <p className="text-muted-foreground font-body text-center mb-10 text-sm">
            {t("common.related_guides_subtitle")}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((p) => {
              const title = isHe ? p.title_he : p.title_en;
              const excerpt = isHe ? p.excerpt_he : p.excerpt_en;
              return (
                <Link
                  key={p.id}
                  to={`/${lang}/guides/${p.slug}`}
                  className="group block bg-background rounded-2xl overflow-hidden border border-border hover:border-gold/50 hover:shadow-lg transition-all"
                >
                  {p.featured_image && (
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={p.featured_image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-foreground text-lg leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed line-clamp-2 mb-4">
                      {excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs font-body text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {p.reading_time_minutes} {isHe ? "דק׳" : "min"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-gold font-semibold">
                        {isHe ? "קראו" : "Read"}
                        <ArrowRight className={`w-3 h-3 ${isHe ? "rotate-180" : ""}`} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedGuides;