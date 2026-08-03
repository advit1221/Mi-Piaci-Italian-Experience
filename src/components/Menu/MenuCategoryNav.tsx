import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { menu } from "@/data/menu";
import { cn } from "@/lib/utils";

/** Sticky, horizontally scrollable group selector with an active indicator. */
export function MenuCategoryNav() {
  const [active, setActive] = useState(menu[0]?.id ?? "");

  useEffect(() => {
    const targets = menu
      .map((g) => document.getElementById(`group-${g.id}`))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id.replace("group-", ""));
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-[4.5rem] z-30 border-y border-espresso/12 bg-parchment/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[112rem] gap-2 overflow-x-auto px-6 py-4 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {menu.map((group) => (
          <a
            key={group.id}
            href={`#group-${group.id}`}
            className={cn(
              "label-xs relative shrink-0 px-4 py-2 transition-colors duration-300",
              active === group.id ? "text-parchment" : "text-espresso/60 hover:text-espresso",
            )}
          >
            {active === group.id ? (
              <motion.span
                layoutId="menu-nav-pill"
                className="absolute inset-0 -z-10 bg-espresso"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : null}
            {group.title}
          </a>
        ))}
      </div>
    </div>
  );
}
