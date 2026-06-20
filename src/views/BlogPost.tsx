"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowLeft, ArrowRight, User, Share2, Facebook, Linkedin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import ReadingProgress from "@/components/ReadingProgress";
import { useSiteContent } from "@/hooks/useSiteContent";
import { toast } from "sonner";

interface Post {
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
  tags: string[] | null;
  author: string;
  publish_date: string;
  reading_time_minutes: number;
  seo_title_en: string | null;
  seo_title_he: string | null;
  meta_description_en: string | null;
  meta_description_he: string | null;
  og_image: string | null;
  canonical_url: string | null;
  noindex: boolean;
  updated_at?: string;
}

type Props = {
  post: Post | null;
  related: Post[];
};

const BlogPost = ({ post, related }: Props) => {
  const { lang } = useLanguage();
  const { t } = useSiteContent();
  const isHe = lang === "he";
  const prefix = `/${lang}`;

  const WHATSAPP_URL = `https://wa.me/972522820632?text=${encodeURIComponent(isHe ? "היי, אשמח לקבל מידע נוסף על נדל״ן בזכרון יעקב" : "Hi, I'd like to learn more about property in Zichron Yaakov.")}`;

  const bodyForTOC = post ? (isHe ? post.body_he : post.body_en) : "";
  const toc = useMemo(() => {
    if (!bodyForTOC) return [] as { id: string; text: string; level: number }[];
    const matches = Array.from(bodyForTOC.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi));
    return matches.map((m, idx) => {
      const text = m[2].replace(/<[^>]+>/g, "").trim();
      const id = `h-${idx}-${text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").slice(0, 60)}`;
      return { id, text, level: Number(m[1]) };
    });
  }, [bodyForTOC]);

  const enhancedBody = useMemo(() => {
    if (!bodyForTOC) return "";
    let i = 0;
    return bodyForTOC.replace(/<h([23])([^>]*)>/gi, (_, lvl, attrs) => {
      const id = toc[i]?.id;
      i += 1;
      return id ? `<h${lvl}${attrs} id="${id}">` : `<h${lvl}${attrs}>`;
    });
  }, [bodyForTOC, toc]);

  if (!post) {
    return (
      <main>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-display font-semibold text-foreground text-2xl mb-3">{isHe ? "המאמר לא נמצא" : "Article Not Found"}</h1>
            <Link href={`${prefix}/guides`} className="text-gold font-body text-sm underline">{isHe ? "חזרה למדריכים" : "Back to Guides"}</Link>
          </div>
        </div>
      </main>
    );
  }

  const title = isHe ? post.title_he : post.title_en;
  const BackArrow = isHe ? ArrowRight : ArrowLeft;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <main>
      <ReadingProgress />
      <Header />
      <article className="py-12 md:py-20 bg-background">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <Link href={`${prefix}/guides`} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground font-body text-sm mb-8 transition-colors">
              <BackArrow className="w-4 h-4" />
              {isHe ? "חזרה למדריכים" : "Back to Guides"}
            </Link>

            {post.category && (
              <span className="text-gold font-body text-xs font-semibold uppercase tracking-wider mb-3 block">{post.category}</span>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display font-semibold text-foreground text-3xl md:text-4xl leading-tight mb-4 text-start"
            >
              {title}
            </motion.h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-body mb-8">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(post.publish_date).toLocaleDateString(isHe ? "he-IL" : "en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.reading_time_minutes} {isHe ? "דק׳ קריאה" : "min read"}</span>
              {post.updated_at && new Date(post.updated_at).toDateString() !== new Date(post.publish_date).toDateString() && (
                <span className="italic text-muted-foreground/80">
                  {isHe ? "עודכן" : "Updated"} {new Date(post.updated_at).toLocaleDateString(isHe ? "he-IL" : "en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              )}
            </div>

            {post.featured_image && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl overflow-hidden shadow-lg mb-10"
              >
                <img src={post.featured_image} alt={title} className="w-full aspect-[16/9] object-cover" loading="eager" fetchPriority="high" decoding="async" />
              </motion.div>
            )}

            {toc.length > 2 && (
              <nav className="mb-10 bg-card border border-border rounded-2xl p-5">
                <p className="font-display font-semibold text-foreground text-sm mb-3">{t("blog.toc.title")}</p>
                <ol className="space-y-1.5 list-decimal list-inside font-body text-sm text-muted-foreground">
                  {toc.map((it) => (
                    <li key={it.id} className={it.level === 3 ? "ms-4" : ""}>
                      <a href={`#${it.id}`} className="hover:text-gold transition-colors">{it.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none font-body text-foreground text-start
                prose-headings:font-display prose-headings:text-foreground
                prose-p:text-foreground/85 prose-p:leading-relaxed
                prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: enhancedBody }}
            />

            <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-3">
              <span className="font-body text-sm text-muted-foreground inline-flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                {t("blog.share.title")}
              </span>
              <a href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${shareUrl}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-body px-3 py-1.5 rounded-full border border-border hover:border-gold hover:text-gold transition-colors">
                WhatsApp
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex items-center gap-1.5 text-xs font-body px-3 py-1.5 rounded-full border border-border hover:border-gold hover:text-gold transition-colors">
                <Facebook className="w-3 h-3" /> Facebook
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center gap-1.5 text-xs font-body px-3 py-1.5 rounded-full border border-border hover:border-gold hover:text-gold transition-colors">
                <Linkedin className="w-3 h-3" /> LinkedIn
              </a>
              <button type="button" onClick={() => { navigator.clipboard.writeText(shareUrl); toast.success(isHe ? "הקישור הועתק" : "Link copied"); }} className="inline-flex items-center gap-1.5 text-xs font-body px-3 py-1.5 rounded-full border border-border hover:border-gold hover:text-gold transition-colors">
                {isHe ? "העתק קישור" : "Copy link"}
              </button>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-muted text-muted-foreground font-body text-xs border border-border">{tag}</span>
                ))}
              </div>
            )}

            <div className="mt-12 bg-primary rounded-2xl p-8 text-center">
              <h3 className="font-display font-semibold text-primary-foreground text-xl mb-3">
                {isHe ? "מחפשים בית בזכרון יעקב?" : "Looking for a Home in Zichron Yaakov?"}
              </h3>
              <p className="font-body text-primary-foreground/70 text-sm mb-6">
                {isHe ? "דברו איתנו ונעזור לכם למצוא את הנכס המתאים." : "Chat with us and we'll help you find the right property."}
              </p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-white py-3.5 px-8 rounded-full font-body font-semibold transition-all">
                {isHe ? "דברו איתנו בוואטסאפ" : "Chat with Us on WhatsApp"}
              </a>
            </div>

            {related.length > 0 && (
              <div className="mt-16">
                <h3 className="font-display font-semibold text-foreground text-xl mb-6 text-start">
                  {isHe ? "מאמרים קשורים" : "Related Articles"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {related.map((r) => (
                    <Link key={r.id} href={`${prefix}/guides/${r.slug}`} className="block group">
                      <div className="bg-card rounded-xl overflow-hidden border border-border/40 hover:shadow-md transition-shadow h-full">
                        {r.featured_image && (
                          <div className="aspect-[16/10] overflow-hidden">
                            <img src={r.featured_image} alt={isHe ? r.title_he : r.title_en} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                          </div>
                        )}
                        <div className="p-4 text-start">
                          <h4 className="font-display font-semibold text-foreground text-sm mb-1 group-hover:text-gold transition-colors">
                            {isHe ? r.title_he : r.title_en}
                          </h4>
                          <p className="text-muted-foreground font-body text-xs line-clamp-2">
                            {isHe ? r.excerpt_he : r.excerpt_en}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
      <TrustSection />
    </main>
  );
};

export default BlogPost;
