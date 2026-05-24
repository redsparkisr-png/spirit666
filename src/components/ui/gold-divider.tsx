import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
  /** Width of the line in pixels (each side of the diamond). Default 60. */
  width?: number;
}

/**
 * Thin gold divider with a small diamond accent — luxury catalog style.
 * Used between major homepage sections.
 */
const GoldDivider = ({ className, width = 60 }: GoldDividerProps) => {
  return (
    <div
      className={cn("flex items-center justify-center gap-3 py-4 md:py-6", className)}
      aria-hidden="true"
    >
      <span
        className="block h-px bg-gold/40"
        style={{ width: `${width}px` }}
      />
      <span className="block w-1.5 h-1.5 rotate-45 bg-gold/60" />
      <span
        className="block h-px bg-gold/40"
        style={{ width: `${width}px` }}
      />
    </div>
  );
};

export default GoldDivider;