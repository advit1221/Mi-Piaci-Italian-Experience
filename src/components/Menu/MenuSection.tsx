import { motion } from "motion/react";
import { viewportOnce } from "@/components/Animations/motion";
import { MenuItem } from "@/components/Menu/MenuItem";
import { ImageReveal } from "@/components/Shared/ImageReveal";
import type { MenuCategory } from "@/data/menu";

interface MenuSectionProps {
  category: MenuCategory;
}

export function MenuSection({ category }: MenuSectionProps) {
  return (
    <section className="scroll-mt-40 border-t border-espresso/12 py-14 first:border-t-0 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <motion.h3
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="font-display sticky top-40 text-3xl text-espresso lg:text-[2.4rem]"
          >
            {category.title}
          </motion.h3>
        </div>

        <div className="lg:col-span-6">
          {category.items.length > 0 ? (
            <ul>
              {category.items.map((item, i) => (
                <MenuItem key={item.name} item={item} index={i} />
              ))}
            </ul>
          ) : (
            <div className="border border-dashed border-espresso/25 bg-linen/50 p-8">
              <p className="label-xs text-terracotta">Awaiting menu content</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                Items and prices for <strong>{category.title}</strong> haven&apos;t been
                supplied yet. Send the list and it drops straight in — nothing here is
                invented.
              </p>
            </div>
          )}
        </div>

        {category.photo ? (
          <div className="lg:col-span-3" data-cursor="view">
            <ImageReveal
              photo={category.photo}
              parallax={22}
              className="aspect-[3/4] w-full"
              sizes="(max-width: 1024px) 100vw, 22vw"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
