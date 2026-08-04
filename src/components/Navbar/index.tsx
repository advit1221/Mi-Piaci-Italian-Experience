import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { EASE_EDITORIAL } from "@/components/Animations/motion";
import { navItems } from "@/components/Navbar/constants";
import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { cn } from "@/lib/utils";

/**
 * Transparent over the hero, cream after scrolling.
 * Reserve CTA uses Mi Piaci's signature brown for stronger visibility.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();

  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const overHero = pathname === "/";

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  const solid = scrolled || !overHero;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: overHero ? 1.5 : 0.2,
          duration: 0.7,
          ease: EASE_EDITORIAL,
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500",
          solid
            ? "border-b border-espresso/12 bg-parchment/95 py-4 backdrop-blur-sm"
            : "border-b border-transparent py-7",
        )}
      >
        <div className="mx-auto flex max-w-[112rem] items-center justify-between px-6 lg:px-12">

          {/* LOGO */}
          <motion.div
            whileHover={{
              scale: 1.02,
              rotate: -0.6,
            }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className={cn(
                "font-display text-2xl tracking-tight lg:text-[1.75rem]",
                solid ? "text-espresso" : "text-parchment",
              )}
            >
              Mi <span className="italic">Piaci</span>
            </Link>
          </motion.div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <motion.span
                key={item.label}
                whileHover="hover"
                className="inline-flex"
              >
                <Link
                  to={item.to}
                  {...(item.hash ? { hash: item.hash } : {})}
                  className={cn(
                    "label-xs relative py-1",
                    solid
                      ? "text-espresso/80"
                      : "text-parchment/85",
                  )}
                >
                  {item.label}

                  <motion.span
                    className="underline-draw-line"
                    initial={{ scaleX: 0 }}
                    variants={{
                      hover: {
                        scaleX: 1,
                      },
                    }}
                    transition={{
                      duration: 0.35,
                      ease: EASE_EDITORIAL,
                    }}
                  />
                </Link>
              </motion.span>
            ))}
          </nav>

          <div className="flex items-center gap-4">

            {/* RESERVE CTA */}
            <motion.span
              whileHover="hover"
              className="hidden lg:inline-flex"
            >
              <Link
                to="/reservations"
                className={cn(
                  "label-xs relative isolate overflow-hidden border px-6 py-3.5",
                  solid
                    ? "border-[#65330F]/50"
                    : "border-[#65330F]/70",
                )}
              >
                {/* HOVER BACKGROUND */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-bottom bg-[#65330F]"
                  initial={{
                    scaleY: 0,
                  }}
                  variants={{
                    hover: {
                      scaleY: 1,
                    },
                  }}
                  transition={{
                    duration: 0.45,
                    ease: EASE_EDITORIAL,
                  }}
                />

                {/* BUTTON TEXT */}
                <motion.span
                  className="relative font-medium text-[#65330F]"
                  variants={{
                    hover: {
                      color: "#F7F1E6",
                    },
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  Reserve a Table
                </motion.span>
              </Link>
            </motion.span>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  animate={
                    open
                      ? {
                          rotate: i === 0 ? 45 : -45,
                          y: i === 0 ? 3.5 : -3.5,
                        }
                      : {
                          rotate: 0,
                          y: 0,
                        }
                  }
                  transition={{
                    duration: 0.3,
                    ease: EASE_EDITORIAL,
                  }}
                  className={cn(
                    "block h-px w-7 origin-center",
                    open || solid
                      ? "bg-espresso"
                      : "bg-parchment",
                    open && "bg-parchment",
                  )}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}