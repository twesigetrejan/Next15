"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  description: string;
  brand: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.products);
      console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="flex justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid place-items-center grid-cols-3 gap-5">
      {products.map((item: Product) => (
        <div className="p-4 bg-green-500 cursor-pointer">
          <p className="text-lg">{item.description}</p>
          <p className="text-lg">{item.brand}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
