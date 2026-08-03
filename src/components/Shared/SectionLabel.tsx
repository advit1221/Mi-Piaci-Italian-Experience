import { motion } from "motion/react";
import { viewportOnce } from "@/components/Animations/motion";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index?: string;
  children: string;
  className?: string;
}

/** Small uppercase editorial label, e.g. "01 / MI PIACI". */
export function SectionLabel({ index, children, className }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6 }}
      className={cn("label-xs flex items-center gap-3 text-terracotta", className)}
    >
      {index ? <span className="opacity-70">{index}</span> : null}
      {index ? <span className="h-px w-8 bg-current opacity-50" /> : null}
      <span>{children}</span>
    </motion.div>
  );
}
