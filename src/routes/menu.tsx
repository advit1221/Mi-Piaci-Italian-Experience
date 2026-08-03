import { createFileRoute } from "@tanstack/react-router";
import { MenuCategoryNav } from "@/components/Menu/MenuCategoryNav";
import { MenuSection } from "@/components/Menu/MenuSection";
import { ReservationsCta } from "@/components/Reservations/ReservationsCta";
import { EditorialHeading } from "@/components/Shared/EditorialHeading";
import { SectionLabel } from "@/components/Shared/SectionLabel";
import { menu } from "@/data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Mi Piaci Italian Kitchen & Coffee Bar" },
      {
        name: "description",
        content:
          "Starters, handmade pasta, wood-fired pizza, Italian coffee and cocktails at Mi Piaci in Delhi and Gurgaon.",
      },
      { property: "og:title", content: "Menu — Mi Piaci" },
      {
        property: "og:description",
        content:
          "Handmade pasta, wood-fired pizza, Italian coffee and cocktails — the full Mi Piaci menu.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <>
      <header className="paper relative bg-parchment pt-40 pb-14 lg:pt-52 lg:pb-16">
        <span aria-hidden className="paper-grain" />
        <div className="relative mx-auto max-w-[112rem] px-6 lg:px-12">
          <SectionLabel index="02">The Menu</SectionLabel>
          <EditorialHeading
            as="h1"
            lines={[
              <>
                Eat, drink, <span className="italic">linger.</span>
              </>,
            ]}
            className="mt-8 text-[clamp(2.6rem,7.6vw,6rem)] text-espresso"
          />
          <p className="mt-8 max-w-md text-sm leading-relaxed text-foreground/65">
            Prices in Indian Rupees. Some sections are still being finalised with the
            kitchen — those are marked rather than filled with guesses.
          </p>
        </div>
      </header>

      <MenuCategoryNav />

      <div className="paper relative bg-parchment pb-24">
        <span aria-hidden className="paper-grain" />
        <div className="relative mx-auto max-w-[112rem] px-6 lg:px-12">
          {menu.map((group) => (
            <div key={group.id} id={`group-${group.id}`} className="scroll-mt-32 pt-16">
              <div className="flex items-end justify-between border-b-2 border-espresso pb-4">
                <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] text-espresso">
                  {group.title}
                </h2>
                <p className="script text-xl text-terracotta">{group.kicker}</p>
              </div>
              {group.categories.map((category) => (
                <MenuSection key={category.id} category={category} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <ReservationsCta />
    </>
  );
}
