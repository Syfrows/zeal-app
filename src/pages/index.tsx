import PlatformFeatures from "@/components/platformFeatures";
import Testimonials from "@/components/testimonials";
import Carousel from "@/components/carousel";
import Categories from "@/components/categories";
import Layout from "@/components/layout";
import ProductsLayout from "@/components/productsLayout";
import AboutUs from "@/components/aboutUs";
import NewArrival from "@/components/newArrival";
import category from "../assets/category.png";

const product = {
  image: category,
  name: "Men cotton jacket",
  rating: 4.4,
  price: 170,
  salePrice: 150,
};
const products = new Array(6).fill(product);

export default function Home() {
  return (
    <main>
      <Layout>
        <Carousel />
        <div className="px-4 md:px-16 xl:px-32">
          <Categories />
          <ProductsLayout products={products} />
          <PlatformFeatures />
          <NewArrival />
          <Testimonials />
        </div>
        <div
          className="my-20 flex flex-col items-center justify-center px-4 py-28 text-center"
          style={{
            backgroundImage: `url('../images/newsletterBackground.png')`,
          }}
        >
          <p className="mb-2 text-3xl font-medium text-white">
            Sign Up Now & Get 10% Off
          </p>
          <p className="mb-6 text-white">
            Subscribe to our Newsletter and get instant 10% discount on your
            first order
          </p>
          <div className="flex h-14 md:w-[600px]">
            <input
              type="text"
              placeholder="Enter your email address."
              className="flex-1 px-4 py-1 focus:outline-none"
            />
            <button className="flex items-center justify-center bg-primary px-4 text-sm font-semibold text-white">
              Subscribe Now
            </button>
          </div>
        </div>
        <div className="px-4 md:px-16 xl:px-32">
          <AboutUs />
        </div>
      </Layout>
    </main>
  );
}
