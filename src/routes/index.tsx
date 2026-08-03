import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Locations } from "@/components/Locations";
import { MenuPreview } from "@/components/Menu/MenuPreview";
import { ReservationsCta } from "@/components/Reservations/ReservationsCta";
import { OvenTransition } from "@/components/Shared/OvenTransition";
import { FattoAMano } from "@/components/Story/FattoAMano";
import { Intro } from "@/components/Story/Intro";
import { StoryPreview } from "@/components/Story/StoryPreview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mi Piaci — Authentic Italian in Delhi & Gurgaon" },
      {
        name: "description",
        content:
          "Handmade pasta, wood-fired pizza and serious coffee at Mi Piaci — three Italian restaurants across Mehrauli, Galleria Market and M3M Gurgaon.",
      },
      { property: "og:title", content: "Mi Piaci — Authentic Italian in Delhi & Gurgaon" },
      {
        property: "og:description",
        content:
          "Handmade pasta, wood-fired pizza and serious coffee. Three Italian rooms across Delhi and Gurgaon.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <FattoAMano />
      <OvenTransition />
      <StoryPreview />
      <MenuPreview />
      <Locations />
      <Gallery />
      <ReservationsCta />
    </>
  );
}
