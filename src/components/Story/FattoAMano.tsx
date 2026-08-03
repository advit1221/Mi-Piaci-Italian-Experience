import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageReveal } from "@/components/Shared/ImageReveal";
import { photos } from "@/lib/images";

/** Kinetic typography band: FATTO A MANO drifts as you scroll past. */
export function FattoAMano() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["8%", "-16%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-12%", "10%"]);

  return (
    <section
      ref={ref}
      className="paper relative overflow-hidden bg-espresso py-24 text-parchment lg:py-32"
    >
      <span aria-hidden className="paper-grain mix-blend-overlay" />

      <div className="relative">
        <motion.h2
          {...(reduced ? {} : { style: { x: x1 } })}
          className="font-display text-[19vw] leading-[0.82] whitespace-nowrap"
        >
          FATTO A MANO
        </motion.h2>
        <motion.p
          {...(reduced ? {} : { style: { x: x2 } })}
          className="script mt-2 pl-[12vw] text-[6vw] leading-none whitespace-nowrap text-ember"
        >
          made by hand
        </motion.p>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-[112rem] grid-cols-2 gap-4 px-6 lg:grid-cols-4 lg:gap-6 lg:px-12">
        {[
          { photo: photos.pizzaBurrata, parallax: 30, ratio: "aspect-[3/4]" },
          { photo: photos.oven, parallax: 60, ratio: "aspect-[4/5] lg:mt-14" },
          { photo: photos.heartPizza, parallax: 44, ratio: "aspect-[3/4] lg:-mt-8" },
          { photo: photos.storefront, parallax: 24, ratio: "aspect-[4/5] lg:mt-6" },
        ].map((item) => (
          <div key={item.photo.src} data-cursor="view">
            <ImageReveal
              photo={item.photo}
              parallax={item.parallax}
              className={item.ratio}
              sizes="(max-width: 1024px) 45vw, 22vw"
            />
          </div>
        ))}
      </div>

      <p className="relative mx-auto mt-14 max-w-lg px-6 text-center text-sm leading-relaxed text-parchment/65 lg:px-12">
        Flour, water, salt, time. Everything else at Mi Piaci is a variation on
        those four things.
      </p>
    </section>
  );
}
