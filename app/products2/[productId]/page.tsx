import { PRODUCTS } from "@/constants";
import Link from "next/link";

export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const product = PRODUCTS.find((p) => p.id === Number(params.productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Product Details</h1>
      <div className="space-y-2">
        <p className="">Brand: {product.brand}</p>
        <p className="">Description: {product.description}</p>
      </div>
      <Link
        href="/products"
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        Back to Products
      </Link>
    </div>
  );
}
