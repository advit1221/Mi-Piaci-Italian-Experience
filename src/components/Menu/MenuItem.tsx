import { motion } from "motion/react";
import { viewportOnce } from "@/components/Animations/motion";
import type { MenuItem as MenuItemType } from "@/data/menu";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  item: MenuItemType;
  index: number;
  tone?: "light" | "dark";
}

/** Menu line: name, leader rule, price. Nudges right on hover. */
export function MenuItem({ item, index, tone = "light" }: MenuItemProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ x: 8 }}
      className={cn(
        "group border-b py-6 last:border-b-0",
        tone === "dark" ? "border-parchment/15" : "border-espresso/12",
      )}
    >
      <div className="flex items-baseline gap-4">
        <h4
          className={cn(
            "font-display text-xl leading-snug transition-colors duration-300 lg:text-[1.6rem]",
            tone === "dark"
              ? "text-parchment group-hover:text-ember"
              : "text-espresso group-hover:text-terracotta",
          )}
        >
          {item.name}
        </h4>
        {item.signature ? (
          <span className="label-xs shrink-0 border border-terracotta/50 px-2 py-1 text-[0.55rem] text-terracotta">
            Mi Piaci Signature
          </span>
        ) : null}
        <span
          aria-hidden
          className={cn(
            "mb-1 hidden h-px flex-1 sm:block",
            tone === "dark" ? "bg-parchment/20" : "bg-espresso/15",
          )}
        />
        <span
          className={cn(
            "font-display ml-auto shrink-0 text-lg sm:ml-0",
            tone === "dark" ? "text-ember" : "text-terracotta",
          )}
        >
          {item.price}
        </span>
      </div>
      {item.description ? (
        <p
          className={cn(
            "mt-2 max-w-xl text-sm leading-relaxed",
            tone === "dark" ? "text-parchment/60" : "text-foreground/60",
          )}
        >
          {item.description}
        </p>
      ) : null}
    </motion.li>
  );
}
