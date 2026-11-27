import Image from "@/components/catalogImage";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import { COLLECTIONS } from "@/graphql/landingPage";
import { useQuery } from "@apollo/client";
import { StockLevel, formatPrice } from "@/helpers/helper";
import type { GetProductsByCollectionCustomQuery } from "@/__generated__/graphql";
import placeHolder from "../assets/catalog-texture.webp";
import CatalogStatus from "./catalogStatus";

type Item = NonNullable<
  GetProductsByCollectionCustomQuery["collection"]
>["productVariants"]["items"][number];

type ProductsLayoutProps = {
  products: Item[];
  loading: boolean;
  unavailable: boolean;
  retry: () => unknown;
  filter?: string;
  onFilter: (id: string) => void;
};

function ProductCard({ item }: { item: Item }) {
  const image =
    item.product.featuredAsset?.preview ||
    item.featuredAsset?.preview ||
    placeHolder;
  const rating = item.product.customFields?.reviewRating || 0;
  const mrp = item.customFields?.MRP || 0;
  const outOfStock = item.stockLevel === StockLevel.OutOfStock;

  return (
    <article className="zeal-card">
      <Link
        href={{
          pathname: "/product-details",
          query: { name: item.product.slug, variant: item.name },
        }}
        className="zeal-card-link"
      >
        <div className="zeal-card-image">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {outOfStock && <span className="zeal-stock">Out of stock</span>}
        </div>
        <div className="zeal-card-body">
          <h3>{item.product.name}</h3>
          <div className="zeal-card-price">
            <strong>{formatPrice(item.priceWithTax)}</strong>
            {mrp > item.priceWithTax && <del>{formatPrice(mrp)}</del>}
          </div>
        </div>
      </Link>
      {rating > 0 && (
        <div className="zeal-card-rating">
          <Rating value={rating} precision={0.1} readOnly size="small" />
        </div>
      )}
    </article>
  );
}

export default function ProductsLayout({
  products,
  loading,
  unavailable,
  retry,
  filter = "",
  onFilter,
}: ProductsLayoutProps) {
  const { data } = useQuery(COLLECTIONS);
  const filters = [
    { name: "All", id: "" },
    ...(data?.collections.items.filter((item) => item.customFields?.Category) ??
      []),
  ];

  return (
    <>
      {filters.length > 1 && (
        <div
          className="zeal-filters"
          role="group"
          aria-label="Filter by category"
        >
          {filters.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={item.id === filter}
              onClick={() => onFilter(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
      {loading || unavailable || !products.length ? (
        <CatalogStatus
          loading={loading}
          unavailable={unavailable}
          empty="No products found in this collection."
          retry={retry}
        />
      ) : (
        <div className="zeal-product-grid">
          {products.map((item) => (
            <ProductCard
              key={JSON.stringify([item.product.slug, item.name])}
              item={item}
            />
          ))}
        </div>
      )}
    </>
  );
}
