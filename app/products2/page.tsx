import { PRODUCTS } from "@/constants";
import Link from "next/link";

export default function Products() {
  return (
    <div className="">
      {PRODUCTS &&
        PRODUCTS.map((product) => (
          <Link href={`/products2/${product.id}`} key={product.id}>
            <div className="grid grid-cols-3 place-items-center cursor-pointer hover:bg-gray-100 p-4">
              <p className="">{product.brand}</p>
              <p className="">{product.description}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
