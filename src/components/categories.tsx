import React, { useState } from "react";
import Image from "next/image";
import category from "../assets/category.png";
import { useRouter } from "next/router";

const Categories = () => {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const categories = [
    { id: 1, name: "Category 1", image: category },
    { id: 2, name: "Category 2", image: category },
    { id: 3, name: "Category 3", image: category },
    { id: 4, name: "Category 4", image: category },
    { id: 5, name: "Category 5", image: category },
    { id: 6, name: "Category 6", image: category },
    { id: 7, name: "Category 7", image: category },
    { id: 8, name: "Category 8", image: category },
  ];

  return (
    <div className="py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Categories</h2>
        <button
          className="text-lg font-medium text-orange-600"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories
          .slice(0, showAll ? categories.length : 4)
          .map((category) => (
            <div
              key={category.id}
              className="m-4"
              onClick={() => router.push("/products")}
            >
              <Image
                src={category.image}
                alt={category.name}
                className="h-48 w-full rounded-l object-contain"
              />
              <p className="mt-2 text-center text-lg font-medium">
                {category.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
