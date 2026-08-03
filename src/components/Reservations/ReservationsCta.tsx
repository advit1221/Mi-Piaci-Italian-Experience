import { Link } from "@tanstack/react-router";
import { EditorialHeading } from "@/components/Shared/EditorialHeading";
import { ImageReveal } from "@/components/Shared/ImageReveal";
import { SectionLabel } from "@/components/Shared/SectionLabel";
import { WarmButton } from "@/components/Shared/WarmButton";
import { photos } from "@/lib/images";

/** 07 / RESERVATIONS — closing invitation linking to the reservations page. */
export function ReservationsCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div className="absolute inset-0">
        <img
          src={photos.terrazza.src}
          alt={photos.terrazza.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      <div className="relative mx-auto grid max-w-[112rem] items-center gap-12 px-6 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-7">
          <SectionLabel index="07" className="text-ember">
            Reservations
          </SectionLabel>
          <EditorialHeading
            lines={[
              <>Come hungry,</>,
              <>
                stay <span className="italic">late.</span>
              </>,
            ]}
            className="mt-7 text-[clamp(2.4rem,6.4vw,5rem)] text-parchment"
          />
          <p className="mt-8 max-w-md text-sm leading-relaxed text-parchment/70">
            Lunch, dinner, or a coffee at the counter — tell us when, and which of the
            three rooms you&apos;d like to sit in.
          </p>
          <div className="mt-10">
            <Link to="/reservations" className="inline-flex">
              <WarmButton variant="light">Reserve a Table</WarmButton>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9" data-cursor="view">
          <ImageReveal
            photo={photos.qutubSign}
            parallax={26}
            className="aspect-[3/4] w-full"
            sizes="(max-width: 1024px) 100vw, 30vw"
          />
        </div>
      </div>
    </section>
  );
}
