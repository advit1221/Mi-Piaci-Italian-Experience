import { motion } from "motion/react";
import { useState } from "react";
import { EASE_EDITORIAL, viewportOnce } from "@/components/Animations/motion";
import { EditorialHeading } from "@/components/Shared/EditorialHeading";
import { SectionLabel } from "@/components/Shared/SectionLabel";
import { locations } from "@/data/locations";
import { cn } from "@/lib/utils";

/** 05 / VISIT US — location list with a live map panel per address. */
export function Locations() {
  const [active, setActive] = useState(0);
  const current = locations[active]!;

  return (
    <section id="locations" className="paper relative scroll-mt-24 bg-parchment py-24 lg:py-32">
      <span aria-hidden className="paper-grain" />

      <div className="relative mx-auto max-w-[112rem] px-6 lg:px-12">
        <SectionLabel index="05">Visit us</SectionLabel>
        <EditorialHeading
          lines={[
            <>
              Three doors. One <span className="italic">table.</span>
            </>,
          ]}
          className="mt-7 text-[clamp(2rem,5vw,3.8rem)] text-espresso"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <ul className="lg:col-span-5">
            {locations.map((loc, i) => (
              <li key={loc.id} className="border-b border-espresso/12">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="group block w-full py-7 text-left"
                  data-cursor="map"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="label-xs text-terracotta/70">0{i + 1}</span>
                    <h3
                      className={cn(
                        "font-display text-2xl transition-colors duration-300 lg:text-[2rem]",
                        active === i ? "text-terracotta" : "text-espresso",
                      )}
                    >
                      {loc.name.replace("Mi Piaci ", "")}
                    </h3>
                    <span className="label-xs ml-auto text-espresso/45">{loc.city}</span>
                  </div>
                  <p className="mt-2 max-w-sm pl-9 text-sm leading-relaxed text-foreground/60">
                    {loc.blurb}
                  </p>
                  <motion.span
                    aria-hidden
                    className="mt-4 ml-9 block h-px origin-left bg-terracotta"
                    animate={{ scaleX: active === i ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
                  />
                </button>
              </li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-linen">
              <motion.img
                key={current.photo.src}
                src={current.photo.src}
                alt={current.photo.alt}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: EASE_EDITORIAL }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 aspect-[16/7] w-full overflow-hidden border border-espresso/12">
              <iframe
                key={current.id}
                title={`Map of ${current.name}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  `${current.name} ${current.city}`,
                )}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale-[35%]"
              />
            </div>

            <a
              href={current.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-xs mt-5 inline-flex items-center gap-3 text-terracotta"
              data-cursor="map"
            >
              Open {current.name} in Google Maps <span aria-hidden>→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
