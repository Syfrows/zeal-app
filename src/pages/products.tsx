import Layout from "@/components/layout";
import ProductsLayout from "@/components/productsLayout";
import { PRODUCTS_BY_COLLECTION } from "@/graphql/products";
import { useQuery } from "@apollo/client";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Products = () => {
  const selectedfilterId = useSearchParams().get("filter");
  const { data, refetch } = useQuery(PRODUCTS_BY_COLLECTION, {
    variables: {
      id: selectedfilterId,
      slug: selectedfilterId ? "" : "all",
      options: { skip: 0, take: 12 },
    },
  });
  const products = data?.collection
    ? data.collection.productVariants.items
    : [];
  const totalCount = data?.collection
    ? Math.ceil(data.collection.productVariants.totalItems / 12)
    : 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [filterId, setFilterId] = useState(
    selectedfilterId ? selectedfilterId : ""
  );
  useEffect(() => setCurrentPage(1), [filterId]);
  return (
    <Layout>
      <div className="flex flex-col px-4 py-12 lg:px-48">
        <div className="grow">
          <ProductsLayout
            products={products}
            refetch={refetch}
            setFilterId={setFilterId}
          />
        </div>
        <div className="self-center rounded-lg border-2 border-gray-200 p-3">
          <Pagination
            count={totalCount}
            shape="rounded"
            size="large"
            onChange={(_event, value) => {
              setCurrentPage(value);
              refetch({
                id: filterId,
                options: {
                  skip: (value - 1) * 12,
                  take: 12,
                },
              });
            }}
            page={currentPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Products;
