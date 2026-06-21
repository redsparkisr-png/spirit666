import Link from "next/link";
import type { SeoInternalLink } from "@/types/seo-content";

interface Props {
  links: SeoInternalLink[];
  lang: string;
}

// Server component — all links render in initial HTML for crawlers.
export default function InternalLinksBlock({ links, lang }: Props) {
  if (links.length === 0) return null;

  return (
    <section className="py-12 bg-background border-t border-border">
      <div className="container px-6">
        <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={`/${lang}${link.href}`}
              className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
