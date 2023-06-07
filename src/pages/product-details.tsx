import Layout from "@/components/layout";
import ProductAddedModal from "@/components/productAddedModal";
import { Add, KeyboardArrowDown } from "@mui/icons-material";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import { useState } from "react";

const details = {
  origins: `We work hard to ensure that the clothes we sell are durable and high in quality. If we don’t manufacture them ourselves, we source them from carefully chosen suppliers, preferring to good performance and quality.`,
  sku: "76645",
  category: "Clothing",
  stock: "In Stock",
  material: "100% Cotton",
};

const productImages = Array(4)
  .fill("")
  .map((e, index) => `https://picsum.photos/id/${index * 10}/360/300`);

const product = {
  name: "Pacer fit Shirt",
  images: productImages,
  rating: 4,
  reviews: [""],
  description: `Indeed, the Mona Lisa is a very realistic portrait. The subject's softly sculptural face shows Leonardo's skillful handling of sfumato, an artistic technique that uses subtle gradations of light and shadow to model form, and shows his understanding of the skull beneath the skin.`,
  price: 799,
  salePrice: 999,
  discount: 20,
  sizes: ["XS", "S", "L", "XL"],
  deliveryCharges: 150,
  deliveryDays: 2,
  details: details,
};

const ProductDetails = () => {
  const currency = "₹";
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [isModalVisible, setModalVisiblity] = useState(false);

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col items-center sm:w-1/2">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            height={569}
            width={436}
          />
          <div className="my-5 flex space-x-4">
            {product.images.map((image, index) => {
              return (
                index !== selectedImage && (
                  <Image
                    key={index}
                    src={image}
                    alt={product.name}
                    height={115}
                    width={115}
                    onClick={() => setSelectedImage(index)}
                  />
                )
              );
            })}
          </div>
        </div>
        <div className="flex flex-col space-y-4 sm:w-1/2">
          <p className="text-3xl font-semibold">Pacer fit Shirt</p>
          <div className="flex items-center space-x-2">
            <Rating
              name="read-only"
              value={product.rating}
              precision={0.1}
              readOnly
            />
            <p className="text-xs">{`(${product.reviews.length} customer review)`}</p>
          </div>
          <p>{product.description}</p>
          <p className="text-red-400 underline">View more detail</p>
          <div className="flex flex-col rounded-xl border-2 border-gray-200 p-6 max-sm:space-y-4 sm:flex-row sm:space-x-8 sm:self-start">
            <div>
              <p className="text-red-400">
                {product.discount}% off!{" "}
                <span className="text-2xl font-medium text-black">
                  {currency}
                  {product.salePrice}
                </span>
              </p>
              <p>
                M.R.P:{" "}
                <span className="line-through">
                  {currency}
                  {product.price}
                </span>
              </p>
            </div>
            <div className="bottom-2 space-x-4 rounded-xl border-gray-500 bg-gray-100 p-4">
              <span>1</span> <span className="border-s-2 border-gray-300" />{" "}
              <span>
                Pcs <KeyboardArrowDown />
              </span>
            </div>
            <button
              className="rounded-xl bg-orange-600 px-4 py-3 font-bold text-white"
              onClick={() => setModalVisiblity(true)}
            >
              <Add /> Add to Cart
            </button>
          </div>
          <div className="flex flex-col space-y-4 self-start rounded-xl border-2 border-gray-200 px-6 py-4">
            <p>Size: Click to select size</p>
            <div>
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`mb-2 me-4 rounded-xl px-8 py-2 ${
                    index === selectedSize
                      ? `bg-orange-600 text-white`
                      : `border-2 border-gray-500 text-black`
                  }`}
                  onClick={() => setSelectedSize(index)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p>
              <span className="text-blue-400">Size Chart </span>{" "}
              <KeyboardArrowDown />
            </p>
            <input
              type="text"
              placeholder="Enter Postal Code"
              className="flex-1 rounded-lg border-2 border-gray-400 px-4 py-1 focus:outline-none"
            />
            <p className="text-gray-500">
              Delivery:{" "}
              <span className="text-black">in {product.deliveryDays} days</span>
            </p>
            <p className="text-gray-500">
              Delivery charges:{" "}
              <span className="font-bold text-black">
                {currency}
                {product.deliveryCharges}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold">Description</p>
            <div className="my-4 border-t-2 border-gray-300" />
            <p className="my-2 font-medium">Origins</p>
            <p>{product.details.origins}</p>
            <p className="mb-2 mt-8 font-medium">Size Chart</p>
            <p>Measurements and chart will be attached</p>
          </div>
          <div className="space-y-4 py-12">
            <div className="flex">
              <p className="w-1/4 text-gray-500">SKU:</p>
              <p className="w-3/4">{product.details.sku}</p>
            </div>
            <div className="flex">
              <p className="w-1/4 text-gray-500">Category:</p>
              <p className="w-3/4">{product.details.category}</p>
            </div>
            <div className="flex">
              <p className="w-1/4 text-gray-500">Stock:</p>
              <p className="w-3/4">{product.details.stock}</p>
            </div>
            <div className="flex">
              <p className="w-1/4 text-gray-500">Material:</p>
              <p className="w-3/4">{product.details.material}</p>
            </div>
          </div>
        </div>
      </div>
      <ProductAddedModal
        isVisible={isModalVisible}
        setVisibilty={setModalVisiblity}
      />
    </Layout>
  );
};

export default ProductDetails;
