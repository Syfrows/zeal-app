import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { PRODUCTS_BY_COLLECTION, type PublicFacetValue } from "@/graphql/products";
import type { GetProductsByCollectionCustomQuery } from "@/__generated__/graphql";
import { SortOrder } from "@/__generated__/graphql";

type Item = NonNullable<GetProductsByCollectionCustomQuery["collection"]>["productVariants"]["items"][number];
const batchSize = 100;

export function useCollectionProducts(filter: string, sort = "featured", ready = true, facets = "") {
  const client = useApolloClient();
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ key: "", items: [] as Item[], values: [] as PublicFacetValue[], error: false });
  const key = JSON.stringify([filter, sort, attempt, facets]);
  useEffect(() => {
    let active = true;
    async function load() {
      const grouped = new Map<string, Item>();
      const values = new Map<string, PublicFacetValue>();
      const selected = facets.split(",").filter(Boolean);
      let skip = 0;
      while (active) {
        const { data } = await client.query({
          query: PRODUCTS_BY_COLLECTION,
          variables: { id: filter || undefined, slug: filter ? undefined : "all",
            options: { take: batchSize, skip, sort: { id: SortOrder.Asc } } },
          fetchPolicy: "no-cache",
        });
        const page = data?.collection?.productVariants;
        if (!page?.items.length) break;
        const publicIds = new Set(data.facets.items.map(f => f.id));
        for (const item of page.items) {
          const tags = [...item.product.facetValues, ...item.facetValues].filter(v => publicIds.has(v.facet.id));
          for (const tag of tags) values.set(tag.id, tag);
          if (!selected.every(id => tags.some(tag => tag.id === id))) continue;
          const current = grouped.get(item.product.slug);
          if (!current || (current.stockLevel === "OUT_OF_STOCK" && item.stockLevel !== "OUT_OF_STOCK")) {
            grouped.set(item.product.slug, item);
          }
        }
        skip += page.items.length;
        if (skip >= page.totalItems) break;
      }
      const items = Array.from(grouped.values());
      if (sort === "price-low") items.sort((a, b) => a.priceWithTax - b.priceWithTax);
      if (sort === "price-high") items.sort((a, b) => b.priceWithTax - a.priceWithTax);
      if (active) setState({ key, items, values: Array.from(values.values()), error: false });
    }
    if (ready) load().catch(() => {
      if (active) setState({ key, items: [], values: [], error: true });
    });
    return () => { active = false; };
  }, [client, filter, sort, key, ready, facets]);
  return { values: state.values, items: state.items, loading: !ready || key !== state.key, error: key === state.key && state.error,
    refetch: () => setAttempt(n => n + 1) };
}
