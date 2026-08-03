import { motion } from "motion/react";
import { useState } from "react";
import { EASE_EDITORIAL } from "@/components/Animations/motion";
import { WarmButton } from "@/components/Shared/WarmButton";
import { locations } from "@/data/locations";

const times = ["12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

const fieldClass =
  "w-full border-0 border-b border-espresso/25 bg-transparent px-0 py-3 text-espresso placeholder:text-espresso/35 focus:border-terracotta focus:outline-none transition-colors duration-300";

/**
 * Reservation enquiry form. No booking backend is connected yet, so on submit
 * it confirms locally and points the guest at the restaurant.
 */
export function ReservationForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
        className="border border-terracotta/30 bg-flour p-10"
      >
        <p className="script text-3xl text-terracotta">Grazie!</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/70">
          Your request has been noted. Reservations aren&apos;t connected to a live
          booking system yet, so please call the restaurant to have your table
          confirmed — we&apos;ll wire this up as soon as the booking details are ready.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="label-xs mt-8 text-espresso/60 underline decoration-terracotta underline-offset-4"
        >
          Make another request
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-8 sm:grid-cols-2"
    >
      <label className="block sm:col-span-2">
        <span className="label-xs text-terracotta">Name</span>
        <input required name="name" placeholder="Your full name" className={fieldClass} />
      </label>

      <label className="block">
        <span className="label-xs text-terracotta">Email</span>
        <input required type="email" name="email" placeholder="you@email.com" className={fieldClass} />
      </label>

      <label className="block">
        <span className="label-xs text-terracotta">Phone</span>
        <input required name="phone" placeholder="+91" className={fieldClass} />
      </label>

      <label className="block">
        <span className="label-xs text-terracotta">Location</span>
        <select required name="location" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Choose a restaurant
          </option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.name}>
              {loc.name} · {loc.city}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="label-xs text-terracotta">Guests</span>
        <select required name="guests" defaultValue="2" className={fieldClass}>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} {i === 0 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="label-xs text-terracotta">Date</span>
        <input required type="date" name="date" className={fieldClass} />
      </label>

      <label className="block">
        <span className="label-xs text-terracotta">Time</span>
        <select required name="time" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Choose a time
          </option>
          {times.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="block sm:col-span-2">
        <span className="label-xs text-terracotta">Anything we should know?</span>
        <textarea
          name="notes"
          rows={3}
          placeholder="Allergies, celebrations, a preferred table…"
          className={fieldClass}
        />
      </label>

      <div className="sm:col-span-2">
        <WarmButton type="submit" variant="filled">
          Request a Table
        </WarmButton>
      </div>
    </form>
  );
}
