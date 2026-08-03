import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { EASE_EDITORIAL } from "@/components/Animations/motion";
import { EditorialHeading } from "@/components/Shared/EditorialHeading";
import { WarmButton } from "@/components/Shared/WarmButton";
import { photos } from "@/lib/images";

const INTRO_DELAY = 0.95;

/** Full-viewport cinematic hero with controlled editorial hierarchy. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.045]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  // Cursor-follow warmth — a soft ember glow that trails the pointer.
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.4);
  const glowX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const glowLeft = useTransform(glowX, (v) => `${v * 100}%`);
  const glowTop = useTransform(glowY, (v) => `${v * 100}%`);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const scrollToIntro = () => {
    document
      .getElementById("mi-piaci")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      className="relative isolate h-[100svh] min-h-[680px] overflow-hidden bg-ink"
    >
      {/* Background photograph */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          delay: reduced ? 0 : INTRO_DELAY,
          duration: 2.6,
          ease: EASE_EDITORIAL,
        }}
        {...(reduced
          ? {}
          : {
              style: {
                y: imgY,
                scale: imgScale,
              },
            })}
      >
        <img
          src={photos.interiorEvening.src}
          alt={photos.interiorEvening.alt}
          fetchPriority="high"
          decoding="async"
          className="h-[112%] w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/10" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(17,12,8,0.90) 0%, rgba(17,12,8,0.68) 32%, rgba(17,12,8,0.22) 62%, rgba(17,12,8,0.04) 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(12,8,5,0.80) 0%, rgba(12,8,5,0.26) 40%, transparent 68%)",
          }}
        />

        {/* Vignette — now breathes very slightly instead of sitting static */}
        <motion.div
          className="absolute inset-0"
          animate={
            reduced
              ? undefined
              : {
                  background: [
                    "radial-gradient(circle at 62% 42%, transparent 25%, rgba(8,5,3,0.15) 72%, rgba(8,5,3,0.36) 100%)",
                    "radial-gradient(circle at 58% 46%, transparent 28%, rgba(8,5,3,0.17) 72%, rgba(8,5,3,0.38) 100%)",
                    "radial-gradient(circle at 62% 42%, transparent 25%, rgba(8,5,3,0.15) 72%, rgba(8,5,3,0.36) 100%)",
                  ],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Cursor-follow ember glow */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-[1] h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-[110px] mix-blend-screen"
          style={{
            left: glowLeft,
            top: glowTop,
            background:
              "radial-gradient(circle, rgba(217,119,87,0.9) 0%, rgba(140,76,26,0.5) 45%, transparent 72%)",
          }}
        />
      )}

      {/* Drifting embers — slow ambient bokeh */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <motion.div
            className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-ember/25 blur-3xl"
            animate={{ y: [0, -26, 0], x: [0, 14, 0], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[14%] top-[32%] h-56 w-56 rounded-full bg-[#D97757]/15 blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, -18, 0], opacity: [0.18, 0.32, 0.18] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          />
          <motion.div
            className="absolute bottom-[8%] left-[38%] h-32 w-32 rounded-full bg-ember/20 blur-3xl"
            animate={{ y: [0, -18, 0], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />

          {/* Fine floating dust motes — tiny, slow, barely-there */}
          {[
            { left: "22%", top: "70%", size: 3, dur: 9, delay: 0 },
            { left: "48%", top: "25%", size: 2, dur: 11, delay: 1.4 },
            { left: "68%", top: "60%", size: 3, dur: 8, delay: 0.6 },
            { left: "80%", top: "20%", size: 2, dur: 12, delay: 2 },
            { left: "34%", top: "80%", size: 2, dur: 10, delay: 0.9 },
            { left: "58%", top: "45%", size: 2, dur: 13, delay: 1.8 },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-parchment/60"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ y: [0, -60, 0], opacity: [0, 0.5, 0] }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}

          {/* Slow diagonal light sweep — a faint sheen passing across the frame */}
          <motion.div
            className="absolute -inset-y-1/4 -left-1/2 w-1/2 rotate-12"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
            }}
            animate={{ x: ["0%", "260%"] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
          />
        </div>
      )}

      {/* Very subtle film grain */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Hero content */}
      <motion.div
        {...(reduced
          ? {}
          : {
              style: {
                y: textY,
                opacity: fade,
              },
            })}
        className="
          relative z-10 mx-auto flex h-full
          max-w-[112rem] flex-col justify-end
          px-6 pb-14
          sm:px-8 sm:pb-16
          lg:px-12 lg:pb-20
          xl:px-16 xl:pb-24
        "
      >
        {/*
          Fix: items-end (not items-baseline) so the right-hand glass panel
          bottoms out level with the CTA row instead of climbing up to the
          headline's baseline — that climb was what pushed it high enough
          to collide with the navbar's Reserve button.
        */}
        <div className="grid w-full gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* Main editorial block */}
          <div className="max-w-[960px]">
            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: INTRO_DELAY + 0.05,
                duration: 0.8,
                ease: EASE_EDITORIAL,
              }}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-parchment/15 bg-white/[0.04] px-4 py-2 backdrop-blur-md sm:px-5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
              </span>
              <p className="script text-lg leading-none text-ember sm:text-xl lg:text-[1.4rem]">
                Mehrauli · Galleria Market · M3M Gurgaon
              </p>
            </motion.div>

            <div style={{ textShadow: "0 3px 30px rgba(0,0,0,0.32)" }}>
              <EditorialHeading
                as="h1"
                delay={INTRO_DELAY + 0.18}
                lines={[
                  <>A little piece</>,
                  <span key="italy-line" className="relative inline-block">
                    of{" "}
                    <span className="relative inline-block">
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute -inset-x-4 -inset-y-2 -z-10 rounded-full bg-ember/30 blur-2xl"
                        animate={
                          reduced
                            ? undefined
                            : { opacity: [0.35, 0.6, 0.35], scale: [0.94, 1.03, 0.94] }
                        }
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span
                        className="italic text-ember"
                        style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
                      >
                        Italy,
                      </span>
                    </span>
                  </span>,
                  <>closer than you think.</>,
                ]}
                className="
                  max-w-[900px]
                  text-[clamp(2.8rem,6.6vw,6.8rem)]
                  leading-[0.94]
                  tracking-[-0.03em]
                  text-parchment
                "
              />
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: INTRO_DELAY + 0.95,
                duration: 0.8,
                ease: EASE_EDITORIAL,
              }}
              className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12"
            >
              <motion.div whileHover={reduced ? undefined : { y: -2 }} transition={{ duration: 0.2 }}>
                <WarmButton variant="filled" onClick={scrollToIntro}>
                  Discover Mi Piaci
                </WarmButton>
              </motion.div>

              <motion.a
                href="/menu"
                className="inline-flex"
                whileHover={reduced ? undefined : { y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <WarmButton variant="light">Explore the Menu</WarmButton>
              </motion.a>
            </motion.div>
          </div>

          {/* Supporting copy — desktop, glass card, now bottom-anchored via items-end above */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: INTRO_DELAY + 0.8,
              duration: 0.9,
              ease: EASE_EDITORIAL,
            }}
            className="hidden rounded-2xl border border-parchment/10 bg-white/[0.03] p-6 backdrop-blur-md lg:block xl:p-7"
          >
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.26em] text-ember">
              La nostra tavola
            </p>
            <p
              className="mt-4 text-[1rem] italic leading-[1.75] text-parchment/85"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
            >
              Handmade pasta, pizza from a wood-fired oven, coffee taken
              seriously, and the kind of Italian hospitality that makes you
              stay for one more course.
            </p>
          </motion.div>
        </div>

        {/* Supporting copy — mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: INTRO_DELAY + 1, duration: 0.8 }}
          className="mt-8 max-w-[34rem] rounded-xl border border-parchment/10 bg-white/[0.03] p-4 backdrop-blur-md lg:hidden"
        >
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-ember">
            La nostra tavola
          </p>
          <p
            className="mt-2 text-sm italic leading-relaxed text-parchment/75"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            Handmade pasta, pizza from a wood-fired oven, coffee taken
            seriously, and Italian hospitality that makes you stay for one
            more course.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          type="button"
          onClick={scrollToIntro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: INTRO_DELAY + 1.5, duration: 1 }}
          className="
            group absolute bottom-8 right-6
            hidden flex-col items-center gap-2
            text-[0.62rem] uppercase tracking-[0.28em]
            text-parchment/50 transition-colors
            hover:text-parchment
            lg:flex lg:right-12
          "
        >
          Scroll
          <motion.span
            aria-hidden
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-px bg-current opacity-60 transition-opacity group-hover:opacity-100"
          />
        </motion.button>
      </motion.div>
    </section>
  );
}