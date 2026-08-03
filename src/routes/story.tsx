import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { fadeUp, viewportOnce } from "@/components/Animations/motion";
import { EditorialHeading } from "@/components/Shared/EditorialHeading";
import { ImageReveal } from "@/components/Shared/ImageReveal";
import { OvenTransition } from "@/components/Shared/OvenTransition";
import { SectionLabel } from "@/components/Shared/SectionLabel";
import { ReservationsCta } from "@/components/Reservations/ReservationsCta";
import { photos } from "@/lib/images";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Mi Piaci" },
      {
        name: "description",
        content:
          "How Mi Piaci began: Lorenzo's search for genuinely Italian pizza in India, and the kitchen he built to make it.",
      },
      { property: "og:title", content: "Our Story — Mi Piaci" },
      {
        property: "og:description",
        content:
          "Lorenzo always wanted to open a pizzeria. Mi Piaci is what happened when he couldn't find the Italian food he loved.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <>
      <header className="paper relative bg-flour pt-40 pb-20 lg:pt-52 lg:pb-28">
        <span aria-hidden className="paper-grain" />
        <div className="relative mx-auto max-w-[112rem] px-6 lg:px-12">
          <SectionLabel index="01">Our Story</SectionLabel>
          <EditorialHeading
            as="h1"
            lines={[
              <>The pizzeria</>,
              <>
                Lorenzo <span className="italic">wanted</span>
              </>,
              <>to find.</>,
            ]}
            className="mt-8 text-[clamp(2.8rem,8vw,6.5rem)] text-espresso"
          />
        </div>
      </header>

      <section className="paper relative bg-flour pb-24 lg:pb-32">
        <div className="relative mx-auto grid max-w-[112rem] gap-14 px-6 lg:grid-cols-12 lg:px-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-6 text-base leading-relaxed text-foreground/75 lg:col-span-5"
          >
            <p className="font-display text-2xl leading-snug text-espresso">
              Lorenzo, the founder of Mi Piaci, had always wanted to open a pizzeria.
            </p>
            <p>
              When he came to India, he realised that although there were plenty of
              restaurants serving Italian-inspired dishes, finding the kind of authentic
              Italian food he knew and loved was much harder. Pizza that tasted like the
              pizza at home. Pasta cut the way his family cut it. Coffee poured properly.
            </p>
            <p>
              So he built it himself. A wood-fired oven, a dough that is given time,
              a short list of ingredients bought well, and a dining room that sounds
              like somebody&apos;s house on a Sunday.
            </p>
            <div className="rule-thin my-8 max-w-xs" />
            <p className="script text-2xl text-terracotta">
              Mi piaci — I like you. It seemed like the right name.
            </p>
          </motion.div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ImageReveal
              photo={photos.storyPhotos}
              parallax={30}
              className="aspect-[4/5] w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <p className="label-xs mt-5 text-espresso/50">{photos.storyPhotos.alt}</p>
          </div>
        </div>
      </section>

      <OvenTransition />

      <section className="paper relative bg-linen py-24 lg:py-32">
        <span aria-hidden className="paper-grain" />
        <div className="relative mx-auto grid max-w-[112rem] gap-12 px-6 lg:grid-cols-3 lg:px-12">
          {[
            {
              title: "The dough",
              body: "Mixed, rested, folded and stretched by hand. Never rolled with a pin, never rushed to service.",
            },
            {
              title: "The pasta",
              body: "Rolled fresh and cut to suit the sauce — tagliatelle for butter and truffle, chitarra for carbonara.",
            },
            {
              title: "The counter",
              body: "Espresso pulled properly, milk textured properly. The coffee is not an afterthought to the food.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="border-t border-espresso/20 pt-6"
            >
              <p className="label-xs text-terracotta">0{i + 1}</p>
              <h2 className="font-display mt-4 text-3xl text-espresso">{item.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/65">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <ReservationsCta />
    </>
  );
}
