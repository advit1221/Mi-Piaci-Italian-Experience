export interface NavItem {
  label: string;
  to: string;
  hash?: string;
}

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Our Story", to: "/story" },
  { label: "Menu", to: "/menu" },
  { label: "Locations", to: "/", hash: "locations" },
  { label: "Gallery", to: "/", hash: "gallery" },
];
