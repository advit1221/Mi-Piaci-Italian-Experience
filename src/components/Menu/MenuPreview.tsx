import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { viewportOnce } from "@/components/Animations/motion";
import { MenuItem } from "@/components/Menu/MenuItem";
import { EditorialHeading } from "@/components/Shared/EditorialHeading";
import { SectionLabel } from "@/components/Shared/SectionLabel";
import { WarmButton } from "@/components/Shared/WarmButton";
import { menuPreview } from "@/data/menu";

/** 04 / FROM OUR KITCHEN — dark menu card with an espresso steam detail. */
export function MenuPreview() {
  return (
    <section
      className="paper relative overflow-hidden bg-earth py-24 lg:py-32"
      data-cursor="taste"
    >
      <span aria-hidden className="paper-grain mix-blend-overlay" />

      <div className="relative mx-auto max-w-[112rem] px-6 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="04" className="text-ember">
              From our kitchen
            </SectionLabel>
            <EditorialHeading
              lines={[
                <>Pasta rolled by hand.</>,
                <>
                  Pizza made with <span className="italic">patience.</span>
                </>,
                <>Coffee taken seriously.</>,
              ]}
              className="mt-7 text-[clamp(1.9rem,4.2vw,3.2rem)] text-parchment"
            />
          </div>

          {/* espresso steam */}
          <div aria-hidden className="relative hidden h-16 w-16 lg:block">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="steam-line absolute bottom-0 w-px origin-bottom bg-gradient-to-t from-transparent via-ember/70 to-transparent"
                style={{ left: `${18 + i * 14}px`, height: "44px", animationDelay: `${i * 0.7}s` }}
              />
            ))}
          </div>
        </div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mt-14 max-w-4xl"
        >
          {menuPreview.map((item, i) => (
            <MenuItem key={item.name} item={item} index={i} tone="dark" />
          ))}
        </motion.ul>

        <div className="mt-12">
          <Link to="/menu" className="inline-flex">
            <WarmButton variant="light">Explore the Full Menu</WarmButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
