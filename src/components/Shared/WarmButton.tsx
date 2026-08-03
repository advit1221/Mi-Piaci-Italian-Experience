import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "filled" | "outline" | "light";

interface WarmButtonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const styles: Record<Variant, string> = {
  filled: "text-parchment",
  outline: "border border-espresso/40 text-espresso",
  light: "border border-parchment/50 text-parchment",
};

const fills: Record<Variant, string> = {
  filled: "bg-terracotta",
  outline: "bg-espresso",
  light: "bg-parchment",
};

const hoverText: Record<Variant, string> = {
  filled: "",
  outline: "group-hover:text-parchment",
  light: "group-hover:text-espresso",
};

/** Button whose background expands from the bottom while the arrow slides. */
export function WarmButton({
  children,
  variant = "filled",
  className,
  arrow = true,
  type = "button",
  disabled = false,
  onClick,
}: WarmButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      {...(onClick ? { onClick } : {})}
      whileHover="hover"
      whileFocus="hover"
      whileTap={{ scale: 0.985 }}
      className={cn(
        "group label-xs relative isolate inline-flex items-center gap-3 overflow-hidden px-7 py-4 transition-colors duration-300 disabled:opacity-50",
        variant === "filled" && fills.filled,
        styles[variant],
        className,
      )}
    >
      {variant !== "filled" ? (
        <motion.span
          aria-hidden
          className={cn("absolute inset-0 -z-10 origin-bottom", fills[variant])}
          initial={{ scaleY: 0 }}
          variants={{ hover: { scaleY: 1 } }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      ) : (
        <motion.span
          aria-hidden
          className="absolute inset-0 -z-10 origin-bottom bg-espresso"
          initial={{ scaleY: 0 }}
          variants={{ hover: { scaleY: 1 } }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <span className={cn("relative transition-colors duration-300", hoverText[variant])}>
        {children}
      </span>
      {arrow ? (
        <motion.span
          aria-hidden
          className={cn("relative transition-colors duration-300", hoverText[variant])}
          variants={{ hover: { x: 7 } }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          →
        </motion.span>
      ) : null}
    </motion.button>
  );
}
