import { photos, type Photo } from "@/lib/images";

export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  signature?: boolean;
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
  /** Set when the client has not yet supplied items for this category. */
  awaitingContent?: boolean;
  photo?: Photo;
  note?: string;
}

export interface MenuGroup {
  id: string;
  title: string;
  kicker: string;
  categories: MenuCategory[];
}

const pending = (id: string, title: string): MenuCategory => ({
  id,
  title,
  items: [],
  awaitingContent: true,
});

/**
 * Only items explicitly supplied by the client are listed. Categories marked
 * `awaitingContent` are intentional placeholders — nothing is invented here.
 */
export const menu: MenuGroup[] = [
  {
    id: "food",
    title: "Food",
    kicker: "Cucina",
    categories: [
      {
        id: "starters",
        title: "Starters",
        photo: photos.pizzaBurrata,
        items: [
          {
            name: "Burrata",
            price: "₹950",
            description:
              "Creamy burrata cheese with cherry tomatoes and toasted garlic bread.",
          },
        ],
      },
      {
        id: "pasta-risotti",
        title: "Pasta & Risotti",
        photo: photos.heartPizza,
        items: [
          {
            name: 'Tagliatelle "Mi Piaci"',
            price: "₹1,400",
            description:
              "Handmade tagliatelle with butter, truffle oil and Parmigiano.",
            signature: true,
          },
          {
            name: "Spaghetti Alla Carbonara",
            price: "₹1,100",
            description:
              "Handmade spaghetti alla chitarra with egg, crispy guanciale and pecorino romano.",
          },
        ],
      },
    ],
  },
  {
    id: "coffee",
    title: "Coffee",
    kicker: "Caffè",
    categories: [
      {
        id: "signature-hot",
        title: "Signature Hot",
        items: [],
        awaitingContent: true,
      },
      {
        id: "signature-cold",
        title: "Signature Cold",
        photo: photos.oven,
        items: [
          {
            name: "Pistachio Latte Milano",
            price: "₹375",
            description: "Pistachio paste, espresso and milk.",
            signature: true,
          },
        ],
      },
      pending("hot-coffee", "Hot Coffee"),
      pending("cold-coffee", "Cold Coffee"),
      pending("milk-add-ons", "Milk Add Ons"),
      pending("caffe-dessert", "Caffè Dessert"),
    ],
  },
  {
    id: "non-coffee",
    title: "Non-Coffee",
    kicker: "Senza Caffè",
    categories: [
      pending("matcha", "Matcha"),
      pending("shakes", "Shakes"),
      pending("smoothie", "Smoothie"),
      pending("soft-beverages", "Soft Beverages"),
    ],
  },
  {
    id: "bar",
    title: "Bar",
    kicker: "Il Bar",
    categories: [
      pending("signature-cocktails", "Signature Cocktails"),
      pending("classics", "Classics"),
      pending("bar-signatures", "Signatures"),
      pending("beers", "Beers"),
      pending("aperitivo-digestivo", "Aperitivo & Digestivo"),
    ],
  },
  {
    id: "wines",
    title: "Wines",
    kicker: "Vini",
    categories: [
      pending("vini-rossi", "Vini Rossi Italiani"),
      pending("vini-rosati", "Vini Rosati Italiani"),
      pending("vini-bianchi", "Vini Bianchi Italiani"),
      pending("bollicine", "Bollicine Italiane"),
      pending("wines-by-glass", "Wines by Glass"),
    ],
  },
];

export const menuPreview: MenuItem[] = [
  {
    name: "Burrata",
    price: "₹950",
    description:
      "Creamy burrata cheese with cherry tomatoes and toasted garlic bread.",
  },
  {
    name: 'Tagliatelle "Mi Piaci"',
    price: "₹1,400",
    description:
      "Handmade tagliatelle with butter, truffle oil and Parmigiano.",
    signature: true,
  },
  {
    name: "Spaghetti Alla Carbonara",
    price: "₹1,100",
    description:
      "Handmade spaghetti alla chitarra with egg, crispy guanciale and pecorino romano.",
  },
  {
    name: "Pistachio Latte Milano",
    price: "₹375",
    description: "Pistachio paste, espresso and milk.",
  },
];
