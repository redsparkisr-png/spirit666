"use client";

import { useEffect, useRef, useState } from "react";

// Hides while the user is actively scrolling down (past a small top offset,
// so it doesn't flicker at the very top of a page), reappears on scroll-up
// or shortly after scrolling stops. Used to keep fixed floating buttons
// (WhatsApp, accessibility) from sitting on top of content — forms, card
// CTAs, image corners — while the user is mid-scroll toward them.
export function useScrollHide(threshold = 10, idleDelayMs = 1000, topOffset = 120) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;
      if (Math.abs(diff) > threshold) {
        setHidden(diff > 0 && y > topOffset);
        lastY.current = y;
      }
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setHidden(false), idleDelayMs);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [threshold, idleDelayMs, topOffset]);

  return hidden;
}
