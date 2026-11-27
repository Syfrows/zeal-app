import Head from "next/head";
import { useRouter } from "next/router";
import { useCollectionProducts } from "@/hooks/useCollectionProducts";
import Pagination from "@mui/material/Pagination";
import Layout from "@/components/layout";
import ProductsLayout from "@/components/productsLayout";
const PAGE_SIZE = 24;

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
  const facets = typeof router.query.facets === "string" ? router.query.facets : "";
  const selected = facets.split(",").filter(Boolean);
  const { values, items, loading, error, refetch } = useCollectionProducts(filterId, currentSort, router.isReady, facets);
  const groups = Array.from(new Map(values.map(v => [v.facet.id, v.facet])).values());
  const total = Math.ceil(items.length / PAGE_SIZE);

  function navigate(nextFilter: string, nextPage: number, nextSort: string, nextFacets = nextFilter === filterId ? facets : "") {
    const query: Record<string, string> = {};
    if (nextFacets) query.facets = nextFacets;
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
        {(groups.length > 0 || facets) && <div className="flex flex-wrap items-end gap-4 mb-5" aria-label="Product attributes">
          {groups.map(group => {
            const options = values.filter(v => v.facet.id === group.id).sort((a,b) => a.name.localeCompare(b.name));
            return <label key={group.id} className="zeal-sort">{group.name}
              <select value={selected.find(id => options.some(v => v.id === id)) || ""} onChange={e => {
                const remaining = selected.filter(id => !options.some(v => v.id === id));
                navigate(filterId, 1, currentSort, [...remaining, e.target.value].filter(Boolean).join(","));
              }}>
                <option value="">All</option>
                {options.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            </label>;
          })}
          {facets && <button type="button" className="zeal-text-link" onClick={() => navigate(filterId, 1, currentSort, "")}>Clear filters</button>}
        </div>}
        <ProductsLayout
          products={items.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)}
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
