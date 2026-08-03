import ovenAsset from "@/assets/oven.webp.asset.json";
import storefrontAsset from "@/assets/storefront-gurgaon.webp.asset.json";
import heartPizzaAsset from "@/assets/heart-pizza.webp.asset.json";
import terrazzaAsset from "@/assets/terrazza-night.webp.asset.json";
import pizzaBurrataAsset from "@/assets/pizza-burrata.webp.asset.json";
import interiorGinghamAsset from "@/assets/interior-gingham.webp.asset.json";
import storyPhotosAsset from "@/assets/story-photos.webp.asset.json";
import interiorEveningAsset from "@/assets/interior-evening.webp.asset.json";
import qutubSignAsset from "@/assets/qutub-sign.webp.asset.json";
import facadeArchesAsset from "@/assets/facade-arches.webp.asset.json";

export interface Photo {
  src: string;
  alt: string;
}

export const photos = {
  oven: {
    src: ovenAsset.url,
    alt: "The tiled wood-fired oven at Mi Piaci with the fire lit inside",
  },
  storefront: {
    src: storefrontAsset.url,
    alt: "Mi Piaci storefront with striped awning and outdoor bistro tables",
  },
  heartPizza: {
    src: heartPizzaAsset.url,
    alt: "Heart-shaped Neapolitan pizza held in front of the Mi Piaci oven",
  },
  terrazza: {
    src: terrazzaAsset.url,
    alt: "Terrazza Portofino at Mi Piaci lit up at night behind palms",
  },
  pizzaBurrata: {
    src: pizzaBurrataAsset.url,
    alt: "Olive oil poured over a pizza with burrata, rocket and tomatoes",
  },
  interiorGingham: {
    src: interiorGinghamAsset.url,
    alt: "Dining room with red gingham tablecloths and framed Italian prints",
  },
  storyPhotos: {
    src: storyPhotosAsset.url,
    alt: "Family photographs of a boy in a home kitchen in Italy",
  },
  interiorEvening: {
    src: interiorEveningAsset.url,
    alt: "Long linen-set table in the Mi Piaci dining room in the evening",
  },
  qutubSign: {
    src: qutubSignAsset.url,
    alt: "Glowing Mi Piaci neon sign with the Qutub Minar at dusk",
  },
  facadeArches: {
    src: facadeArchesAsset.url,
    alt: "Whitewashed Mi Piaci facade with arched windows and terrace above",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
