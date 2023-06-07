import Layout from "@/components/layout";
import ProductsLayout from "@/components/productsLayout";
import Pagination from "@mui/material/Pagination";

const product = {
  image: null,
  name: "Men cotton jacket",
  rating: 4.4,
  price: 170,
  salePrice: 150,
};
const products = new Array(12).fill(product).map((e, index) => {
  return {
    ...product,
    image: `https://picsum.photos/id/${index}/360/300`,
  };
});

const Products = () => {
  return (
    <Layout>
      <div className="flex flex-col px-4 py-12 lg:px-48">
        <div className="grow">
          <ProductsLayout products={products} />
        </div>
        <div className="self-center rounded-lg border-2 border-gray-200 p-3">
          <Pagination count={3} shape="rounded" size="large" />
        </div>
      </div>
    </Layout>
  );
};

export default Products;
