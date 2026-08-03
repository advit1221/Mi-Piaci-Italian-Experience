import type { Transition, Variants } from "motion/react";

export const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;
export const EASE_SOFT = [0.33, 1, 0.68, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  ui: 0.24,
  image: 0.8,
  section: 0.9,
} as const;

export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.section, ease: EASE_EDITORIAL },
  },
};

export const staggerLines = (stagger = 0.08, delay = 0): Transition => ({
  staggerChildren: stagger,
  delayChildren: delay,
});

export const lineChild: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE_EDITORIAL } },
};

/** Clip-path curtain reveal used for all photography. */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", scale: 1.08 },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 1.1, ease: EASE_EDITORIAL },
  },
};
