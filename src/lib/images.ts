export interface Photo {
  src: string;
  alt: string;
}

export const photos = {
  oven: {
    src: "/images/oven.webp",
    alt: "The tiled wood-fired oven at Mi Piaci with the fire lit inside",
  },
  storefront: {
    src: "/images/storefront-gurgaon.webp",
    alt: "Mi Piaci storefront with striped awning and outdoor bistro tables",
  },
  heartPizza: {
    src: "/images/heart-pizza.webp",
    alt: "Heart-shaped Neapolitan pizza held in front of the Mi Piaci oven",
  },
  terrazza: {
    src: "/images/terrazza-night.webp",
    alt: "Terrazza Portofino at Mi Piaci lit up at night behind palms",
  },
  pizzaBurrata: {
    src: "/images/pizza-burrata.webp",
    alt: "Olive oil poured over a pizza with burrata, rocket and tomatoes",
  },
  interiorGingham: {
    src: "/images/interior-gingham.webp",
    alt: "Dining room with red gingham tablecloths and framed Italian prints",
  },
  storyPhotos: {
    src: "/images/story-photos.webp",
    alt: "Family photographs of a boy in a home kitchen in Italy",
  },
  interiorEvening: {
    src: "/images/interior-evening.webp",
    alt: "Long linen-set table in the Mi Piaci dining room in the evening",
  },
  qutubSign: {
    src: "/images/qutub-sign.webp",
    alt: "Glowing Mi Piaci neon sign with the Qutub Minar at dusk",
  },
  facadeArches: {
    src: "/images/facade-arches.webp",
    alt: "Whitewashed Mi Piaci facade with arched windows and terrace above",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
