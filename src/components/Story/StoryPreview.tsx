import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { fadeUp, viewportOnce } from "@/components/Animations/motion";
import { EditorialHeading } from "@/components/Shared/EditorialHeading";
import { ImageReveal } from "@/components/Shared/ImageReveal";
import { SectionLabel } from "@/components/Shared/SectionLabel";
import { WarmButton } from "@/components/Shared/WarmButton";
import { photos } from "@/lib/images";

/** 03 / OUR STORY — sticky photograph beside scrolling copy, links to /story. */
export function StoryPreview() {
  return (
    <section className="paper relative bg-linen py-24 lg:py-36" data-cursor="read">
      <span aria-hidden className="paper-grain" />

      <div className="relative mx-auto grid max-w-[112rem] gap-14 px-6 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <ImageReveal
              photo={photos.storyPhotos}
              parallax={28}
              className="aspect-square w-full"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <p className="label-xs mt-5 text-espresso/50">From the family album</p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
          <SectionLabel index="03">Our Story</SectionLabel>

          <EditorialHeading
            lines={[
              <>It started with</>,
              <>a simple idea:</>,
              <>
                make the <span className="italic">pizza</span>
              </>,
              <>Lorenzo wished he</>,
              <>could find.</>,
            ]}
            className="mt-8 text-[clamp(2rem,4.4vw,3.4rem)] text-espresso"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-10 max-w-lg space-y-5 text-sm leading-relaxed text-foreground/70"
          >
            <p>
              Lorenzo, the founder of Mi Piaci, had always wanted to open a pizzeria.
              When he came to India, he realised that although there were many
              restaurants serving Italian-inspired food, finding the kind of authentic
              Italian food he knew and loved was much harder.
            </p>
            <p>
              Mi Piaci grew from that desire: to create a place where Italian cooking
              was treated with respect, and where pizza, pasta, coffee and hospitality
              felt genuinely Italian.
            </p>
            <div className="pt-4">
              <Link to="/story" className="inline-flex">
                <WarmButton variant="outline">Read Our Story</WarmButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
