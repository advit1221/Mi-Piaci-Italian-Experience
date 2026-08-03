import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { lineChild, staggerLines, viewportOnce } from "@/components/Animations/motion";
import { cn } from "@/lib/utils";

interface EditorialHeadingProps {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  align?: "left" | "center" | "right";
}

/** Oversized serif headline that reveals line-by-line from behind a mask. */
export function EditorialHeading({
  lines,
  className,
  as = "h2",
  delay = 0,
  align = "left",
}: EditorialHeadingProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={staggerLines(0.075, delay)}
      className={cn(
        "font-display leading-[0.94] tracking-[-0.02em]",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            {...(reduced ? {} : { variants: lineChild })}
            className="block will-change-transform"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
