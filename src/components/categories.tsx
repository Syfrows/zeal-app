import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS } from "@/graphql/landingPage";
import { useQuery } from "@apollo/client";
import placeHolder from "../assets/placeHolder.png";
import CatalogStatus from "./catalogStatus";

export default function Categories() {
  const [showAll, setShowAll] = useState(false);
  const { loading, error, data, refetch } = useQuery(COLLECTIONS, {
    notifyOnNetworkStatusChange: true,
  });
  const categories =
    data?.collections.items.filter(
      (item) => item.customFields?.Category && !item.customFields?.OnlyFilter
    ) ?? [];

  return (
    <section
      id="categories"
      className="zeal-shell zeal-section"
      aria-labelledby="categories-heading"
    >
      <div className="zeal-section-heading">
        <h2 id="categories-heading" className="zeal-heading">
          Shop by category
        </h2>
        {categories.length > 8 && (
          <button
            type="button"
            className="zeal-text-link"
            aria-expanded={showAll}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show fewer categories" : "View all categories"}
          </button>
        )}
      </div>
      {categories.length ? (
        <div className="zeal-category-grid">
          {categories.slice(0, showAll ? undefined : 8).map((category) => (
            <Link
              className="zeal-category"
              key={category.id}
              href={{ pathname: "/products", query: { filter: category.id } }}
            >
              <Image
                src={category.featuredAsset?.source || placeHolder}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      ) : (
        <CatalogStatus
          loading={loading}
          unavailable={!!error}
          empty="There are no categories to show."
          retry={refetch}
        />
      )}
    </section>
  );
}
