import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE_EDITORIAL } from "@/components/Animations/motion";

const SLICES = 8;
const RADIUS = 78;

function slicePath(i: number) {
  const step = (Math.PI * 2) / SLICES;
  const a0 = i * step - Math.PI / 2;
  const a1 = a0 + step;
  const x0 = 100 + RADIUS * Math.cos(a0);
  const y0 = 100 + RADIUS * Math.sin(a0);
  const x1 = 100 + RADIUS * Math.cos(a1);
  const y1 = 100 + RADIUS * Math.sin(a1);
  return `M100 100 L${x0.toFixed(2)} ${y0.toFixed(2)} A${RADIUS} ${RADIUS} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

/**
 * Brand intro: a line-drawn pizza whose slices draw themselves in sequence,
 * one slice detaches, the wordmark appears and the loader lifts away.
 * Total ≈ 2.1s, skipped entirely under prefers-reduced-motion.
 */
export function PizzaLoader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => setDone(true), 2100);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          aria-hidden
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.85, ease: EASE_EDITORIAL }}
          className="paper fixed inset-0 z-[100] flex flex-col items-center justify-center bg-espresso"
        >
          <span className="paper-grain mix-blend-overlay" />
          <motion.div
            className="absolute inset-0"
            style={{ background: "var(--gradient-oven)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.4 }}
          />

          <motion.svg
            viewBox="0 0 200 200"
            className="relative h-40 w-40"
            initial={{ rotate: -8 }}
            animate={{ rotate: 4 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <motion.circle
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              stroke="var(--parchment)"
              strokeWidth="1.25"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.75, ease: EASE_EDITORIAL }}
            />
            {Array.from({ length: SLICES }).map((_, i) => (
              <motion.path
                key={i}
                d={slicePath(i)}
                fill="none"
                stroke="var(--ember)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  i === 2
                    ? { pathLength: 1, opacity: 1, x: 13, y: -9 }
                    : { pathLength: 1, opacity: 0.85 }
                }
                transition={{
                  pathLength: { delay: 0.5 + i * 0.08, duration: 0.4 },
                  opacity: { delay: 0.5 + i * 0.08, duration: 0.3 },
                  x: { delay: 1.35, duration: 0.6, ease: EASE_EDITORIAL },
                  y: { delay: 1.35, duration: 0.6, ease: EASE_EDITORIAL },
                }}
              />
            ))}
          </motion.svg>

          <div className="relative mt-8 overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 1.35, duration: 0.7, ease: EASE_EDITORIAL }}
              className="font-display text-3xl text-parchment"
            >
              Mi <span className="italic">Piaci</span>
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.5 }}
            className="label-xs mt-3 text-ember"
          >
            Fatto a mano
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
