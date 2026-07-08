import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { COLLECTIONS } from "@/graphql/landingPage";
import { useQuery } from "@apollo/client";
import placeHolder from "../assets/placeHolder.png";
import Shimmer from "./Shimmer";

const Categories = () => {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const { loading, error, data } = useQuery(COLLECTIONS, {
    // variables: { options: { filter: { parentId: { eq: "1" } } } },
  });
  const categories = data?.collections.items.filter(
    (x) => x.customFields?.Category && !x.customFields?.OnlyFilter
  );

  return (
    <div className="py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary-800 sm:text-3xl">
          Shop by Category
        </h2>
        <button
          className="text-sm font-semibold tracking-wide text-accent transition-colors duration-150 hover:text-accent-dark sm:text-lg"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {categories
          ? categories
              ?.slice(0, showAll ? categories.length : 8)
              .map((category) => (
                <div
                  key={category.id}
                  className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl2 shadow-card transition-all duration-300 ease-smooth hover:shadow-card-hover"
                  onClick={() => router.push(`/products?filter=${category.id}`)}
                >
                  <Image
                    src={category.featuredAsset?.source || placeHolder}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <p className="absolute bottom-4 left-0 right-0 text-center text-base font-semibold text-white sm:text-lg">
                    {category.name}
                  </p>
                </div>
              ))
          : Array(4)
              .fill("")
              .map((_i, index) => (
                <div key={index} className="aspect-square">
                  <Shimmer height={240} width={240} />
                </div>
              ))}
      </div>
    </div>
  );
};

export default Categories;
