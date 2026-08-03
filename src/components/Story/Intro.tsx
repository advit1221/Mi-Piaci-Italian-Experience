import { motion } from "motion/react";
import { fadeUp, viewportOnce } from "@/components/Animations/motion";
import { EditorialHeading } from "@/components/Shared/EditorialHeading";
import { ImageReveal } from "@/components/Shared/ImageReveal";
import { SectionLabel } from "@/components/Shared/SectionLabel";
import { photos } from "@/lib/images";

/** 01 / MI PIACI — asymmetric introduction with an overlapping detail photo. */
export function Intro() {
  return (
    <section id="mi-piaci" className="paper relative bg-flour py-24 lg:py-36">
      <span aria-hidden className="paper-grain" />

      <div className="relative mx-auto grid max-w-[112rem] gap-14 px-6 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="lg:col-span-5 lg:pt-10">
          <SectionLabel index="01">Mi Piaci</SectionLabel>

          <EditorialHeading
            lines={[
              <>Italian food made</>,
              <>
                with <span className="italic">patience,</span>
              </>,
              <>instinct and a</>,
              <>little obsession.</>,
            ]}
            className="mt-8 text-[clamp(2rem,4.6vw,3.6rem)] text-espresso"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-10 max-w-md space-y-5 text-sm leading-relaxed text-foreground/70"
          >
            <p>
              Mi Piaci is an Italian kitchen, run the Italian way. Dough is mixed,
              rested and stretched by hand. Pasta is rolled fresh and cut the way each
              shape asks for. Sauces are kept short, ingredients are kept few, and
              nothing is rushed because it would be quicker.
            </p>
            <p>
              The coffee counter is treated with the same seriousness as the pass. And
              the welcome — loud, warm, generous — is the part we are least willing to
              compromise on.
            </p>
            <div className="rule-thin mt-8 max-w-xs" />
            <p className="script text-xl text-terracotta">Benvenuti.</p>
          </motion.div>
        </div>

        <div className="relative lg:col-span-7">
          <ImageReveal
            photo={photos.interiorGingham}
            parallax={36}
            className="aspect-[4/5] w-full lg:aspect-[4/4.4]"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-10 -left-6 w-40 shadow-[var(--shadow-warm)] sm:w-56 lg:-left-16 lg:w-64"
            data-cursor="view"
          >
            <ImageReveal
              photo={photos.heartPizza}
              className="aspect-[3/4]"
              sizes="260px"
            />
          </motion.div>

          <p className="label-xs mt-16 ml-auto max-w-[12rem] text-right text-terracotta lg:mt-8">
            Wood-fired · rolled by hand · served hot
          </p>
        </div>
      </div>
    </section>
  );
}
