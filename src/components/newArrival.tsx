import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { NEW_ARRIVAL } from "@/graphql/landingPage";
import placeHolder from "../assets/placeHolder.png";

export default function NewArrival() {
  const { data } = useQuery(NEW_ARRIVAL, {
    variables: { slug: "new-arrival" },
  });
  const products = data?.collection?.productVariants.items ?? [];

  if (!products.length) return null;

  return (
    <section className="zeal-section" aria-labelledby="new-arrivals-heading">
      <div className="zeal-section-heading">
        <h2 id="new-arrivals-heading" className="zeal-heading">
          New arrivals
        </h2>
        <Link className="zeal-text-link" href="/products">
          Shop all
        </Link>
      </div>
      <div className="zeal-product-grid">
        {products.slice(0, 4).map(({ name, product }) => (
          <article
            className="zeal-card"
            key={JSON.stringify([product.slug, name])}
          >
            <Link
              className="zeal-card-link"
              href={{
                pathname: "/product-details",
                query: { name: product.slug, variant: name },
              }}
            >
              <div className="zeal-card-image">
                <Image
                  src={product.featuredAsset?.preview || placeHolder}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="zeal-card-body">
                <h3>{name}</h3>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
