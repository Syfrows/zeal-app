import Head from "next/head";
import Link from "next/link";
import HeroBanner from "@/components/heroBanner";
import { useState } from "react";
import { useCollectionProducts } from "@/hooks/useCollectionProducts";
import AboutUs from "@/components/aboutUs";
import Categories from "@/components/categories";
import Layout from "@/components/layout";
import ProductsLayout from "@/components/productsLayout";
import NewArrival from "@/components/newArrival";


export default function Home() {
  const [filter, setFilter] = useState("");
  const { items, loading, error, refetch } = useCollectionProducts(filter);

  return (
    <Layout flush>
      <Head>
        <title>Zeal Wear | Activewear by RelaxZeal</title>
        <meta
          name="description"
          content="Explore Zeal Wear activewear by RelaxZeal for training, running and everyday movement."
        />
      </Head>
      <HeroBanner />
      <div className="zeal-activities">
        <span>Training</span>
        <span>Running</span>
        <span>Everyday movement</span>
      </div>
      <Categories />
      <section
        className="zeal-collection"
        aria-labelledby="zeal-collection-heading"
      >
        <div className="zeal-shell zeal-section">
          <div className="zeal-section-heading">
            <h2 id="zeal-collection-heading" className="zeal-heading">
              The Zeal collection
            </h2>
            <Link className="zeal-text-link" href="/products">
              View all gear
            </Link>
          </div>
          <ProductsLayout
            products={items.slice(0, 6)}
            filter={filter}
            onFilter={setFilter}
            loading={loading}
            unavailable={!!error}
            retry={refetch}
          />
        </div>
      </section>
      <div className="zeal-shell">
        <NewArrival />
      </div>
      <section
        className="zeal-shell zeal-section"
        id="about"
        aria-label="About Zeal Wear"
      >
        <AboutUs />
      </section>
    </Layout>
  );
}
