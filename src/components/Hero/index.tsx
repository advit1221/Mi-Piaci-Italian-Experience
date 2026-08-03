import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE_EDITORIAL } from "@/components/Animations/motion";
import { EditorialHeading } from "@/components/Shared/EditorialHeading";
import { WarmButton } from "@/components/Shared/WarmButton";
import { photos } from "@/lib/images";

const INTRO_DELAY = 0.95;

/** Full-viewport photographic hero with an asymmetric editorial overlay. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-32%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const scrollToIntro = () => {
    document.getElementById("mi-piaci")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ delay: reduced ? 0 : INTRO_DELAY, duration: 2.4, ease: EASE_EDITORIAL }}
        {...(reduced ? {} : { style: { y: imgY } })}
      >
        <img
          src={photos.interiorEvening.src}
          alt={photos.interiorEvening.alt}
          fetchPriority="high"
          decoding="async"
          className="h-[114%] w-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </motion.div>

      <motion.div
        {...(reduced ? {} : { style: { y: textY, opacity: fade } })}
        className="relative mx-auto flex h-full max-w-[112rem] flex-col justify-end px-6 pb-20 lg:px-12 lg:pb-24"
      >
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: INTRO_DELAY + 0.1, duration: 0.8 }}
            className="script mb-6 text-2xl text-ember lg:text-3xl"
          >
            Mehrauli · Galleria Market · M3M Gurgaon
          </motion.p>

          <EditorialHeading
            as="h1"
            delay={INTRO_DELAY + 0.2}
            lines={[
              <>A little piece</>,
              <>
                of <span className="italic">Italy,</span>
              </>,
              <>closer than you think.</>,
            ]}
            className="text-[clamp(2.75rem,8.4vw,7.5rem)] text-parchment"
          />
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: INTRO_DELAY + 0.9, duration: 0.8, ease: EASE_EDITORIAL }}
            className="max-w-md text-sm leading-relaxed text-parchment/75 lg:ml-auto lg:text-right"
          >
            Handmade pasta, pizza from a wood-fired oven, coffee taken seriously — and
            the kind of Italian hospitality that makes you stay for one more course.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: INTRO_DELAY + 1.05, duration: 0.8, ease: EASE_EDITORIAL }}
            className="order-first flex flex-wrap items-center gap-4 lg:order-none"
          >
            <WarmButton variant="filled" onClick={scrollToIntro}>
              Discover Mi Piaci
            </WarmButton>
            <a href="/menu" className="inline-flex">
              <WarmButton variant="light">Explore the Menu</WarmButton>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
