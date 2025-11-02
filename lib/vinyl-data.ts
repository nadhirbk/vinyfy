export interface Vinyl {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  genre: string;
  year: number;
  condition: string;
  category: "best-selling" | "new-releases" | "staff-picks";
}

export const vinyls: Vinyl[] = [
  {
    id: "1",
    title: "Abbey Road",
    artist: "The Beatles",
    price: 34.99,
    image: "/abbey-road-vinyl-record-cover.jpg",
    genre: "Rock",
    year: 1969,
    condition: "Mint",
    category: "best-selling",
  },
  {
    id: "2",
    title: "Dark Side of the Moon",
    artist: "Pink Floyd",
    price: 39.99,
    image: "/dark-side-of-the-moon-vinyl-record-cover.jpg",
    genre: "Progressive Rock",
    year: 1973,
    condition: "Near Mint",
    category: "best-selling",
  },
  {
    id: "3",
    title: "Rumours",
    artist: "Fleetwood Mac",
    price: 29.99,
    image: "/rumours-fleetwood-mac-vinyl-record-cover.jpg",
    genre: "Rock",
    year: 1977,
    condition: "Mint",
    category: "new-releases",
  },
  {
    id: "4",
    title: "Kind of Blue",
    artist: "Miles Davis",
    price: 44.99,
    image: "/kind-of-blue-miles-davis-vinyl-record-cover.jpg",
    genre: "Jazz",
    year: 1959,
    condition: "Mint",
    category: "staff-picks",
  },
  {
    id: "5",
    title: "Thriller",
    artist: "Michael Jackson",
    price: 32.99,
    image: "/thriller-michael-jackson-vinyl-record-cover.jpg",
    genre: "Pop",
    year: 1982,
    condition: "Near Mint",
    category: "best-selling",
  },
  {
    id: "6",
    title: "The Velvet Underground & Nico",
    artist: "The Velvet Underground",
    price: 49.99,
    image: "/velvet-underground-nico-banana-vinyl-record-cover.jpg",
    genre: "Art Rock",
    year: 1967,
    condition: "Mint",
    category: "staff-picks",
  },
  {
    id: "7",
    title: "Blue",
    artist: "Joni Mitchell",
    price: 36.99,
    image: "/blue-joni-mitchell-vinyl-record-cover.jpg",
    genre: "Folk",
    year: 1971,
    condition: "Mint",
    category: "new-releases",
  },
  {
    id: "8",
    title: "What's Going On",
    artist: "Marvin Gaye",
    price: 38.99,
    image: "/what-s-going-on-marvin-gaye-vinyl-record-cover.jpg",
    genre: "Soul",
    year: 1971,
    condition: "Near Mint",
    category: "staff-picks",
  },
  {
    id: "9",
    title: "Or Noir",
    artist: "Kaaris",
    price: 27.99,
    image: "/or-noir-kaaris.jpg",
    genre: "Rap",
    year: 2013,
    condition: "Mint",
    category: "new-releases",
  },
];

export function getVinylsByCategory(category: Vinyl["category"]): Vinyl[] {
  return vinyls.filter((vinyl) => vinyl.category === category);
}

export const categories = [
  {
    id: "best-selling" as const,
    name: "Best Selling",
    description: "Our most popular vinyl records",
  },
  {
    id: "new-releases" as const,
    name: "New Releases",
    description: "Fresh additions to our collection",
  },
  {
    id: "staff-picks" as const,
    name: "Staff Picks",
    description: "Handpicked favorites from our team",
  },
];
