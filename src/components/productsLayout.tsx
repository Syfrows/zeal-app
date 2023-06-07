import Image from "next/image";
import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/router";

const ProductCard = ({ product }: any) => {
  const currency = "₹";
  return (
    <div className="max-w-[360px] overflow-hidden rounded-lg shadow-lg">
      <Image
        src={product.image}
        alt={product.name}
        height={300}
        width={360}
        className="h-[200px] w-[360px] sm:h-[300px]"
      />
      <div className="space-y-3 p-2 sm:p-6">
        <div className="flex justify-between max-sm:flex-col max-sm:space-y-2 sm:space-x-2">
          <p className="line-clamp-2	 font-medium	">{product.name}</p>
          <div className="flex space-x-2">
            <Rating
              name="read-only"
              value={product.rating}
              precision={0.1}
              readOnly
            />
            <p className="">{product.rating}</p>
          </div>
        </div>
        <div className="flex justify-between  max-sm:flex-col max-sm:space-y-2 sm:space-x-2">
          <p className="text-orange-600">
            {currency + product.salePrice}{" "}
            <span className="ml-3 text-slate-400 line-through decoration-slate-400">
              {currency + product.price}
            </span>
          </p>
          <button className="text-orange-600 underline">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

const ProductsLayout = ({ products }: any) => {
  const filters = new Array(10).fill("All");
  const [selectFilterIndex, setSelectedFilterIndex] = useState(0);
  const router = useRouter();
  return (
    <div className="py-8">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="grow text-3xl font-bold md:text-center">Our Product</h2>
        {products.length <= 6 && (
          <button
            className="text-lg font-medium text-orange-600"
            onClick={() => router.push("/products")}
          >
            {"View All"}
          </button>
        )}
      </div>
      <div className="flex space-x-4 overflow-x-auto [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={`rounded-md border-2 px-4 py-2 ${
              index === selectFilterIndex && "bg-orange-600 text-white"
            }`}
            onClick={() => setSelectedFilterIndex(index)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="my-14 grid grid-cols-2 place-items-center gap-8 lg:grid-cols-3">
        {products.map((product: any, index: any) => (
          <div key={index} onClick={() => router.push("/product-details")}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsLayout;
