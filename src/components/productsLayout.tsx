import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { COLLECTIONS } from "@/graphql/landingPage";
import { useSearchParams } from "next/navigation";
import {
  StockLevel,
  discount,
  formatPrice,
  shimmerDataUrl,
} from "@/helpers/helper";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { ProductVariant } from "@/__generated__/graphql";
import placeHolder from "../assets/placeHolder.png";
import Shimmer from "./Shimmer";

const ProductCard = ({ item }: { item: ProductVariant }) => {
  const productImage =
    item.featuredAsset?.preview ||
    item.product.featuredAsset?.preview ||
    placeHolder;
  const rating = item.product.customFields?.reviewRating || 0;
  const mrp = item.customFields?.MRP || 0;
  const isItemOutOfStock = item.stockLevel === StockLevel.OutOfStock;
  return (
    <div className="group max-w-[360px] overflow-hidden rounded-xl2 bg-white shadow-card transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover">
      <div className="overflow-hidden">
        <Image
          placeholder="blur"
          blurDataURL={shimmerDataUrl}
          src={productImage}
          alt={item.name}
          height={360}
          width={360}
          className="aspect-square transition-transform duration-500 ease-smooth group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-4 sm:p-6">
        <div className="flex justify-between max-sm:flex-col max-sm:space-y-2 sm:space-x-2">
          <p className="line-clamp-2 h-12 font-medium text-primary-800">{item.product.name}</p>
          {rating !== 0 && (
            <div className="flex space-x-2">
              <Rating
                name="read-only"
                value={rating}
                precision={0.1}
                readOnly
              />
              <p className="max-[390px]:hidden">{rating}</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:space-y-2 sm:space-x-2">
          <p className="font-semibold text-accent">
            {formatPrice(item.priceWithTax)}
            <br className="min-[400px]:hidden" />
            <span className="ml-2 text-sm font-normal text-slate-400 line-through decoration-slate-400 min-[400px]:mx-3">
              {formatPrice(mrp)}
            </span>
            <br className="min-[400px]:hidden" />
            <span className="text-sm text-red-400">
              {discount(mrp, item.priceWithTax) > 0 ? (
                `${discount(mrp, item.priceWithTax)} % off! `
              ) : (
                <span className="text-transparent">.</span>
              )}
            </span>
          </p>
          <button
            className={
              isItemOutOfStock
                ? "rounded-full border border-red-200 px-4 py-1.5 text-sm font-medium text-red-600"
                : "rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white transition-colors duration-200 ease-smooth hover:bg-primary-700"
            }
          >
            {isItemOutOfStock ? "Out of Stock" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsLayout = ({ products, refetch, setFilterId }: any) => {
  const filterId = useSearchParams().get("filter");
  const [selectFilterIndex, setSelectedFilterIndex] = useState(
    filterId ? filterId : ""
  );
  const { loading, error, data } = useQuery(COLLECTIONS, {
    //variables: { options: { filter: { parentId: { eq: "1" } } } },
  });
  const items = data
    ? data?.collections.items.filter((x) => x.customFields?.Category)
    : [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filters = [{ name: "All", id: "" }, ...items];

  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      setIsContentScrollable(scrollWidth > clientWidth);
    }
  }, [filters]);
  const scrollForward = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 100;
    }
  };
  const scrollBackward = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 100;
    }
  };

  return (
    <div className="py-10">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="grow text-2xl font-bold text-primary-800 md:text-center md:text-3xl">
          Our Products
        </h2>
        {products.length <= 6 && (
          <button
            className="text-sm font-semibold tracking-wide text-accent transition-colors duration-150 hover:text-accent-dark sm:text-lg"
            onClick={() => router.push("/products")}
          >
            {"View All"}
          </button>
        )}
      </div>
      <div className="flex items-center space-x-3">
        {isContentScrollable && (
          <button onClick={scrollBackward}>
            <ArrowBackIos />
          </button>
        )}
        <div
          ref={scrollRef}
          className="flex space-x-3 overflow-x-auto [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden"
        >
          {filters &&
            filters.map((filter, index) => (
              <button
                key={index}
                className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ease-smooth ${
                  filter.id === selectFilterIndex
                    ? "border-primary bg-primary text-white shadow-card"
                    : "border-primary-200 text-primary-700 hover:border-primary-400"
                }`}
                onClick={() => {
                  setSelectedFilterIndex(filter.id);
                  setFilterId(filter.id);
                  refetch({
                    id: filter.id,
                    slug: filter.id ? "" : "all",
                    input: { take: 12 },
                  });
                }}
              >
                {filter.name}
              </button>
            ))}
        </div>
        {isContentScrollable && (
          <button onClick={scrollForward}>
            <ArrowForwardIos />
          </button>
        )}
      </div>
      <div className="my-14 grid grid-cols-2 place-items-center gap-8 lg:grid-cols-3">
        {products.length !== 0
          ? products.map((item: ProductVariant, index: number) => (
              <div
                key={index}
                onClick={() =>
                  router.push(
                    `/product-details?name=${item.product.slug}&variant=${item.name}`
                  )
                }
              >
                <ProductCard item={item} />
              </div>
            ))
          : Array(6)
              .fill("")
              .map((_i, index) => (
                <div key={index}>
                  <Shimmer height={360} width={360} />
                </div>
              ))}
      </div>
    </div>
  );
};

export default ProductsLayout;
