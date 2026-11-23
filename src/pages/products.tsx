import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Pagination from "@mui/material/Pagination";
import Layout from "@/components/layout";
import ProductsLayout from "@/components/productsLayout";
import { SortOrder } from "@/__generated__/graphql";
import { PRODUCTS_BY_COLLECTION } from "@/graphql/products";

const PAGE_SIZE = 24;
const sorting = {
  featured: undefined,
  "price-low": { priceWithTax: SortOrder.Asc },
  "price-high": { priceWithTax: SortOrder.Desc },
} as const;

const Products = () => {
  const router = useRouter();
  const { filter, page, sort } = router.query;
  const filterId = typeof filter === "string" ? filter : "";
  const parsedPage = typeof page === "string" ? Number(page) : 1;
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 && parsedPage <= 100000
      ? parsedPage
      : 1;
  const currentSort =
    sort === "price-low" || sort === "price-high" ? sort : "featured";
  const { data, loading, error, refetch } = useQuery(PRODUCTS_BY_COLLECTION, {
    skip: !router.isReady,
    variables: {
      id: filterId || undefined,
      slug: filterId ? undefined : "all",
      options: {
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        sort: sorting[currentSort],
      },
    },
    notifyOnNetworkStatusChange: true,
  });
  const total = Math.ceil(
    (data?.collection?.productVariants.totalItems ?? 0) / PAGE_SIZE
  );

  function navigate(nextFilter: string, nextPage: number, nextSort: string) {
    const query: Record<string, string> = {};
    if (nextFilter) query.filter = nextFilter;
    if (nextPage > 1) query.page = String(nextPage);
    if (nextSort !== "featured") query.sort = nextSort;
    void router.push({ pathname: "/products", query }, undefined, {
      shallow: true,
    });
  }

  return (
    <Layout flush>
      <Head>
        <title>Shop activewear | Zeal Wear</title>
        <meta
          name="description"
          content="Browse the Zeal Wear collection of sportswear and activewear by RelaxZeal."
        />
      </Head>
      <section className="zeal-shell zeal-section">
        <div className="zeal-section-heading zeal-shop-heading">
          <h1 className="zeal-heading">Shop activewear</h1>
          <label className="zeal-sort">
            Sort by
            <select
              value={currentSort}
              onChange={(event) => navigate(filterId, 1, event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>
        <ProductsLayout
          products={data?.collection?.productVariants.items ?? []}
          filter={filterId}
          onFilter={(id) => navigate(id, 1, currentSort)}
          loading={!router.isReady || loading}
          unavailable={!!error}
          retry={refetch}
        />
        {total > 1 && !loading && !error && (
          <div className="zeal-pagination">
            <Pagination
              count={total}
              page={currentPage}
              onChange={(_event, next) => navigate(filterId, next, currentSort)}
            />
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Products;
