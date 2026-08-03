import { photos, type Photo } from "@/lib/images";

export interface GalleryEntry extends Photo {
  caption: string;
  /** Layout span within the editorial masonry grid. */
  span: "tall" | "wide" | "square" | "hero";
}

export const gallery: GalleryEntry[] = [
  { ...photos.pizzaBurrata, caption: "Burrata, rocket, first pour of oil", span: "tall" },
  { ...photos.interiorGingham, caption: "Gingham, afternoon light", span: "square" },
  { ...photos.oven, caption: "The oven, always lit", span: "wide" },
  { ...photos.heartPizza, caption: "One made with feeling", span: "tall" },
  { ...photos.qutubSign, caption: "Mehrauli, dusk", span: "square" },
  { ...photos.terrazza, caption: "Terrazza Portofino after dark", span: "tall" },
  { ...photos.interiorEvening, caption: "Linen laid, olive trees in", span: "square" },
  { ...photos.facadeArches, caption: "Arches, whitewash, terrace above", span: "tall" },
  { ...photos.storefront, caption: "Pavement tables in Gurgaon", span: "wide" },
];
