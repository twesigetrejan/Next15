export interface Product {
  id: number;
  description: string;
  brand: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    description: "iPhone 15 Pro",
    brand: "Apple",
  },
  {
    id: 2,
    description: "Galaxy S24",
    brand: "Samsung",
  },
  {
    id: 3,
    description: "Pixel 8",
    brand: "Google",
  },
];
