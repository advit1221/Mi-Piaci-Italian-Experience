import { createFileRoute } from "@tanstack/react-router";
import { Locations } from "@/components/Locations";
import { ReservationForm } from "@/components/Reservations/ReservationForm";
import { EditorialHeading } from "@/components/Shared/EditorialHeading";
import { ImageReveal } from "@/components/Shared/ImageReveal";
import { SectionLabel } from "@/components/Shared/SectionLabel";
import { photos } from "@/lib/images";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations — Mi Piaci Delhi & Gurgaon" },
      {
        name: "description",
        content:
          "Request a table at Mi Piaci in Mehrauli, Galleria Market or M3M Gurgaon — lunch, dinner or coffee at the counter.",
      },
      { property: "og:title", content: "Reservations — Mi Piaci" },
      {
        property: "og:description",
        content:
          "Request a table at Mi Piaci across Mehrauli, Galleria Market and M3M Gurgaon.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ReservationsPage,
});

function ReservationsPage() {
  return (
    <>
      <header className="paper relative bg-flour pt-40 pb-16 lg:pt-52">
        <span aria-hidden className="paper-grain" />
        <div className="relative mx-auto max-w-[112rem] px-6 lg:px-12">
          <SectionLabel index="07">Reservations</SectionLabel>
          <EditorialHeading
            as="h1"
            lines={[
              <>Save yourself</>,
              <>
                a <span className="italic">seat.</span>
              </>,
            ]}
            className="mt-8 text-[clamp(2.8rem,8vw,6.5rem)] text-espresso"
          />
        </div>
      </header>

      <section className="paper relative bg-flour pb-24 lg:pb-32">
        <div className="relative mx-auto grid max-w-[112rem] gap-14 px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-7">
            <ReservationForm />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <ImageReveal
              photo={photos.interiorEvening}
              parallax={24}
              className="aspect-[3/4] w-full"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
            <p className="script mt-6 text-2xl text-terracotta">A tavola non si invecchia.</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/60">
              At the table, one never grows old.
            </p>
          </div>
        </div>
      </section>

      <Locations />
    </>
  );
}
