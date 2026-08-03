import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedLinkProps {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  /** Trailing arrow that slides on hover. */
  arrow?: boolean;
  onClick?: () => void;
}

const inner = (children: ReactNode, arrow: boolean) => (
  <>
    <span className="relative">
      {children}
      <motion.span
        className="underline-draw-line"
        initial={{ scaleX: 0 }}
        variants={{ hover: { scaleX: 1 } }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
    {arrow ? (
      <motion.span
        aria-hidden
        className="inline-block"
        variants={{ hover: { x: 6 } }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        →
      </motion.span>
    ) : null}
  </>
);

/** Link with a drawn underline and independently moving arrow. */
export function AnimatedLink({
  to,
  href,
  children,
  className,
  arrow = false,
  onClick,
}: AnimatedLinkProps) {
  const classes = cn(
    "label-xs inline-flex items-center gap-2 underline-draw",
    className,
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover="hover"
        whileFocus="hover"
        className={classes}
      >
        {inner(children, arrow)}
      </motion.a>
    );
  }

  return (
    <motion.span whileHover="hover" whileFocus="hover" className="inline-flex">
      <Link to={to ?? "/"} className={classes} {...(onClick ? { onClick } : {})}>
        {inner(children, arrow)}
      </Link>
    </motion.span>
  );
}
