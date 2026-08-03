import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

type CursorLabel = "" | "VIEW" | "READ" | "MAP" | "TASTE";

/**
 * Desktop-only cursor. Reads `data-cursor` on hovered elements
 * ("view" | "read" | "map" | "taste"). Disabled on touch/reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<CursorLabel>("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 620, damping: 42, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 620, damping: 42, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const next = el?.dataset["cursor"]?.toUpperCase() ?? "";
      setLabel(next as CursorLabel);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden lg:block"
    >
      <motion.div
        animate={{ width: label ? 76 : 12, height: label ? 76 : 12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-parchment/70 bg-espresso/85 backdrop-blur-[2px]"
      >
        <AnimatePresence>
          {label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="label-xs text-parchment"
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
