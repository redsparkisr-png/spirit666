import { useEffect, useState } from "react";

/**
 * Slim top progress bar that reflects scroll progress within an <article>.
 * Uses the brand gold color; fixed at the top of the viewport.
 */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const article = document.querySelector("article");
      const totalHeight =
        (article?.scrollHeight ?? document.body.scrollHeight) - window.innerHeight;
      const scrolled = window.scrollY;
      const pct = totalHeight > 0 ? Math.min(100, Math.max(0, (scrolled / totalHeight) * 100)) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 h-1 z-50 pointer-events-none" aria-hidden>
      <div
        className="h-full bg-gold transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;