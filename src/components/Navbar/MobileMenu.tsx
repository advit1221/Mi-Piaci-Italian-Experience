import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { EASE_EDITORIAL } from "@/components/Animations/motion";
import { navItems } from "@/components/Navbar/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Fullscreen espresso menu with staggered link entrance. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
          className="paper fixed inset-0 z-40 flex flex-col justify-between bg-espresso px-6 pt-28 pb-10 lg:hidden"
        >
          <span aria-hidden className="paper-grain mix-blend-overlay" />
          <nav className="relative flex flex-col gap-2">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.22 + i * 0.07, duration: 0.6, ease: EASE_EDITORIAL }}
              >
                <Link
                  to={item.to}
                  {...(item.hash ? { hash: item.hash } : {})}
                  onClick={onClose}
                  className="font-display block py-2 text-[2.6rem] leading-none text-parchment"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative"
          >
            <Link
              to="/reservations"
              onClick={onClose}
              className="label-xs flex items-center justify-between border border-parchment/40 px-6 py-5 text-parchment"
            >
              Reserve a Table <span aria-hidden>→</span>
            </Link>
            <p className="script mt-6 text-lg text-ember">Ci vediamo presto.</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
