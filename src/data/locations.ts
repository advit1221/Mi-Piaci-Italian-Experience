import { photos, type Photo } from "@/lib/images";

export interface Location {
  id: string;
  name: string;
  city: string;
  blurb: string;
  mapsUrl: string;
  photo: Photo;
}

/**
 * Maps URLs are used exactly as supplied by the client.
 * NOTE: Galleria Market and M3M Gurgaon currently share the same supplied URL.
 */
export const locations: Location[] = [
  {
    id: "mehrauli",
    name: "Mi Piaci Mehrauli",
    city: "Delhi",
    blurb: "Arched windows, a rooftop terrazza and the Qutub Minar for company.",
    mapsUrl: "https://share.google/rQAafSvQblBODYsOT",
    photo: photos.facadeArches,
  },
  {
    id: "galleria",
    name: "Mi Piaci Galleria Market",
    city: "Gurgaon",
    blurb: "A striped awning, pavement tables and the smell of dough all day.",
    mapsUrl: "https://share.google/IjPTibirlOvA6a2s6",
    photo: photos.storefront,
  },
  {
    id: "m3m",
    name: "Mi Piaci Bistrò M3M",
    city: "Gurgaon",
    blurb: "Linen, olive trees and low light — the quieter side of Mi Piaci.",
    mapsUrl: "https://share.google/IjPTibirlOvA6a2s6",
    photo: photos.interiorEvening,
  },
];
