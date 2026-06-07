import type { Metadata } from "next";
import { createServerSupabase } from "@/lib/supabase/server";
import BlogPost from "@/views/BlogPost";

export const revalidate = 3600;

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const l = lang === "he" ? "he" : "en";
  const supabase = createServerSupabase();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title_en, title_he, excerpt_en, excerpt_he, seo_title_en, seo_title_he, meta_description_en, meta_description_he, og_image, featured_image, slug, publish_date, author")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!post) {
    return { title: "Article Not Found | Spirit Real Estate" };
  }

  const title = (l === "he" ? post.seo_title_he : post.seo_title_en) ||
    `${l === "he" ? post.title_he : post.title_en} | Spirit Real Estate`;
  const description = (l === "he" ? post.meta_description_he : post.meta_description_en) ||
    (l === "he" ? post.excerpt_he : post.excerpt_en);
  const url = `${SITE}/${l}/guides/${post.slug}`;
  const image = post.og_image || post.featured_image;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/guides/${post.slug}`, he: `${SITE}/he/guides/${post.slug}` },
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      locale: l === "he" ? "he_IL" : "en_US",
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
      publishedTime: post.publish_date,
      authors: [post.author],
    },
  };
}

export async function generateStaticParams() {
  const supabase = createServerSupabase();
  const { data } = await supabase.from("blog_posts").select("slug").eq("status", "published");
  const langs = ["en", "he"];
  return (data ?? []).flatMap((p) => langs.map((lang) => ({ lang, slug: p.slug })));
}

export default function BlogPostPage() {
  return <BlogPost />;
}
