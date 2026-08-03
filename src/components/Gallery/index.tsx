import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { EASE_EDITORIAL, viewportOnce } from "@/components/Animations/motion";
import { EditorialHeading } from "@/components/Shared/EditorialHeading";
import { SectionLabel } from "@/components/Shared/SectionLabel";
import { gallery } from "@/data/gallery";
import { cn } from "@/lib/utils";

const spanClass: Record<string, string> = {
  hero: "sm:col-span-2 aspect-[16/10]",
  wide: "sm:col-span-2 aspect-[16/9]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
};

/** 06 / GALLERY — editorial masonry grid with a lightbox. */
export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const move = useCallback((dir: 1 | -1) => {
    setOpen((prev) =>
      prev === null ? prev : (prev + dir + gallery.length) % gallery.length,
    );
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, move]);

  const current = open === null ? null : gallery[open]!;

  return (
    <section id="gallery" className="paper relative scroll-mt-24 bg-linen py-24 lg:py-32">
      <span aria-hidden className="paper-grain" />

      <div className="relative mx-auto max-w-[112rem] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="06">Gallery</SectionLabel>
            <EditorialHeading
              lines={[
                <>
                  The room, the oven, <span className="italic">the plates.</span>
                </>,
              ]}
              className="mt-7 text-[clamp(1.8rem,4.4vw,3.2rem)] text-espresso"
            />
          </div>
          <p className="label-xs text-espresso/45">{gallery.length} photographs</p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-5">
          {gallery.map((entry, i) => (
            <motion.button
              key={entry.src}
              type="button"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: (i % 4) * 0.07, ease: EASE_EDITORIAL }}
              className={cn(
                "group relative overflow-hidden bg-espresso/5",
                spanClass[entry.span] ?? spanClass["square"],
              )}
              data-cursor="view"
            >
              <img
                src={entry.src}
                alt={entry.alt}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 50vw, 25vw"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-10 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="label-xs text-parchment">{entry.caption}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-ink/95 p-6"
            onClick={() => setOpen(null)}
          >
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
              className="max-h-[78vh] w-auto max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="script mt-6 text-xl text-ember">{current.caption}</p>

            <div
              className="mt-6 flex items-center gap-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => move(-1)}
                className="label-xs text-parchment/70 transition-colors hover:text-parchment"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="label-xs text-parchment/70 transition-colors hover:text-parchment"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                className="label-xs text-parchment/70 transition-colors hover:text-parchment"
              >
                Next →
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
