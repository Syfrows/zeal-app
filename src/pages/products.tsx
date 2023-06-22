import Layout from "@/components/layout";
import ProductsLayout from "@/components/productsLayout";
import { SEARCH } from "@/graphql/landingPage";
import { useQuery } from "@apollo/client";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Products = () => {
  const selectedfilterId = useSearchParams().get("filter");
  const { data, refetch } = useQuery(SEARCH, {
    variables: { input: { skip: 0, take: 12, collectionId: selectedfilterId } },
  });
  const products = data ? data?.search.items : [];
  const totalCount = data ? Math.ceil(data?.search.totalItems / 12) : 1;
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
                input: {
                  skip: (value - 1) * 12,
                  take: 12,
                  collectionId: filterId,
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
