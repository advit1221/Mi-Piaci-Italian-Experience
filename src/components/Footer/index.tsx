import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { EditorialHeading } from "@/components/Shared/EditorialHeading";
import { locations } from "@/data/locations";

const explore = [
  { label: "Home", to: "/" },
  { label: "Our Story", to: "/story" },
  { label: "Menu", to: "/menu" },
  { label: "Reservations", to: "/reservations" },
];

export function Footer() {
  return (
    <footer className="paper relative overflow-hidden bg-earth pt-24 pb-10 text-parchment">
      <span aria-hidden className="paper-grain mix-blend-overlay" />

      <div className="relative mx-auto max-w-[112rem] px-6 lg:px-12">
        <EditorialHeading
          as="h2"
          lines={[
            <>
              MI <span className="italic">PIACI</span>
            </>,
          ]}
          className="text-[18vw] leading-[0.8] text-parchment/95 lg:text-[13vw]"
        />

        <div className="mt-16 grid gap-12 border-t border-parchment/20 pt-12 sm:grid-cols-3">
          <div>
            <p className="label-xs text-ember">Explore</p>
            <ul className="mt-5 space-y-3">
              {explore.map((item) => (
                <li key={item.label}>
                  <motion.span whileHover="hover" className="inline-flex">
                    <Link to={item.to} className="relative font-display text-xl">
                      {item.label}
                      <motion.span
                        className="underline-draw-line"
                        initial={{ scaleX: 0 }}
                        variants={{ hover: { scaleX: 1 } }}
                        transition={{ duration: 0.35 }}
                      />
                    </Link>
                  </motion.span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-xs text-ember">Visit</p>
            <ul className="mt-5 space-y-3">
              {locations.map((loc) => (
                <li key={loc.id}>
                  <motion.a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover="hover"
                    className="relative inline-flex font-display text-xl"
                    data-cursor="map"
                  >
                    {loc.name.replace("Mi Piaci ", "")}
                    <motion.span
                      className="underline-draw-line"
                      initial={{ scaleX: 0 }}
                      variants={{ hover: { scaleX: 1 } }}
                      transition={{ duration: 0.35 }}
                    />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-xs text-ember">Social</p>
            <ul className="mt-5 space-y-3">
              <li>
                <motion.a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover="hover"
                  className="relative inline-flex font-display text-xl"
                >
                  Instagram
                  <motion.span
                    className="underline-draw-line"
                    initial={{ scaleX: 0 }}
                    variants={{ hover: { scaleX: 1 } }}
                    transition={{ duration: 0.35 }}
                  />
                </motion.a>
              </li>
            </ul>
            <p className="mt-6 max-w-xs text-xs leading-relaxed text-parchment/55">
              Addresses, opening hours and phone numbers to be supplied by Mi Piaci.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-parchment/20 pt-8 sm:flex-row sm:items-center">
          <p className="script text-xl text-ember">Made with love, served Italian.</p>

          <motion.svg
            viewBox="0 0 60 60"
            className="h-12 w-12 text-ember"
            whileHover={{ rotate: 18, scale: 1.1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            <path
              d="M30 6 L54 50 Q30 58 6 50 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle cx="26" cy="34" r="2.6" fill="currentColor" />
            <circle cx="38" cy="42" r="2.2" fill="currentColor" />
            <circle cx="32" cy="22" r="1.8" fill="currentColor" />
          </motion.svg>
        </div>
      </div>
    </footer>
  );
}
