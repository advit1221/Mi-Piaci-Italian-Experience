import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { viewportOnce } from "@/components/Animations/motion";
import { photos } from "@/lib/images";

/**
 * Oven-mouth transition: an arched aperture opens as it enters the viewport,
 * warm glow rises and a few embers drift up. No literal flames.
 */
export function OvenTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.72, 1]);
  const glow = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <div ref={ref} className="relative bg-ink py-20 lg:py-28">
      <motion.div
        {...(reduced ? {} : { style: { opacity: glow } })}
        className="oven-glow pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-oven)" }}
      />

      <motion.div
        {...(reduced ? {} : { style: { scale } })}
        className="relative mx-auto w-[min(88vw,780px)]"
      >
        <div
          className="relative overflow-hidden bg-earth"
          style={{ borderRadius: "999px 999px 6px 6px" }}
          data-cursor="view"
        >
          <motion.img
            src={photos.oven.src}
            alt={photos.oven.alt}
            loading="lazy"
            decoding="async"
            initial={{ scale: 1.16 }}
            whileInView={{ scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-[4/3.4] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25" />
        </div>

        {!reduced
          ? Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                aria-hidden
                className="ember absolute bottom-6 h-[3px] w-[3px] rounded-full bg-ember"
                style={
                  {
                    left: `${18 + i * 10}%`,
                    "--dur": `${4.5 + i * 0.7}s`,
                    "--dx": `${i % 2 ? 18 : -14}px`,
                    animationDelay: `${i * 0.8}s`,
                  } as React.CSSProperties
                }
              />
            ))
          : null}

        <p className="label-xs mt-10 text-center text-ember">
          420°C · 90 seconds · one pizza at a time
        </p>
      </motion.div>
    </div>
  );
}
