import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { COLLECTIONS } from "@/graphql/landingPage";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/helpers/helper";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { ProductVariant } from "@/__generated__/graphql";

const ProductCard = ({ item }: { item: ProductVariant }) => {
  const productImage =
    item.featuredAsset?.preview || item.product.featuredAsset?.preview || "";
  const rating = item.product.customFields?.reviewRating || 0;
  return (
    <div className="max-w-[360px] overflow-hidden rounded-lg shadow-lg">
      <Image
        src={productImage}
        alt={item.name}
        height={360}
        width={360}
        className="aspect-square"
      />
      <div className="space-y-3 p-2 sm:p-6">
        <div className="flex justify-between max-sm:flex-col max-sm:space-y-2 sm:space-x-2">
          <p className="line-clamp-2 h-12	font-medium">{item.name}</p>
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
        <div className="flex justify-between  max-sm:flex-col max-sm:space-y-2 sm:space-x-2">
          <p className="text-orange-600">
            {formatPrice(item.priceWithTax)}
            <br className="min-[390px]:hidden" />
            <span className="text-slate-400 line-through decoration-slate-400 min-[390px]:ml-3">
              {formatPrice(item.customFields?.MRP || 0)}
            </span>
          </p>
          <button className="text-orange-600 underline">Buy Now</button>
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
      <div className="flex items-center space-x-3">
        {isContentScrollable && (
          <button onClick={scrollBackward}>
            <ArrowBackIos />
          </button>
        )}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden"
        >
          {filters &&
            filters.map((filter, index) => (
              <button
                key={index}
                className={`whitespace-nowrap rounded-md border-2 px-4 py-2 ${
                  filter.id === selectFilterIndex && "bg-orange-600 text-white"
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
        {products.map((item: ProductVariant, index: number) => (
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
        ))}
      </div>
    </div>
  );
};

export default ProductsLayout;
