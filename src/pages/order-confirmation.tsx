import Layout from "@/components/layout";
import { ArrowBack } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";

const product = {
  image: null,
  name: "Men cotton jacket Men cotton jacket Men cotton jacket",
  size: "M",
  colour: "White",
  price: 170,
  salePrice: 150,
  quantity: 1,
};

const products = new Array(3).fill(product).map((e, index) => {
  return {
    ...product,
    image: `https://picsum.photos/id/${index}/360/300`,
  };
});

const currency = "₹";

const Product = ({ product }: any) => {
  return (
    <div className="flex border-2 border-t-0 border-gray-300">
      <div className="flex w-[40%] border-e-2 border-gray-300 max-sm:flex-col sm:w-[70%]">
        <Image
          src={product.image}
          alt={product.name}
          height={106}
          width={138}
          className="border-gray-300 p-3 sm:border-e-2"
        />
        <div className="mx-3 space-y-3 p-3">
          <p className="line-clamp-2 font-semibold">{product.name}</p>
          <p className="text-xs">
            Size: <span className="font-bold">{product.size}</span>
          </p>
          <p className="text-xs">
            Colour: <span className="font-bold">{product.colour}</span>
          </p>
        </div>
      </div>
      <p className="w-[15%] border-e-2 border-gray-300 p-3 text-center sm:w-[10%]">
        {product.quantity}
      </p>
      <p className="w-[20%] border-e-2 border-gray-300 p-3 text-center sm:w-[10%]">
        {currency}
        {product.salePrice}
      </p>
      <p className="w-[25%] p-3 text-center sm:w-[10%]">
        {currency}
        {product.salePrice * product.quantity}
      </p>
    </div>
  );
};

const OrderConfirmation = () => {
  const router = useRouter();
  let cartValue = 0;
  products.forEach((x) => (cartValue += x.quantity * x.salePrice));
  const shippingCharges = 0;
  const TotalAmount = cartValue + shippingCharges;
  return (
    <Layout>
      <div className="space-y-4 xl:px-32 xl:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ArrowBack />
            <p className="ms-4 text-2xl font-semibold">CONFIRM YOUR ORDER</p>
          </div>
          <button
            className="bg-primary px-4 py-2 font-semibold text-white"
            onClick={() => router.push("/confirmation")}
          >
            Continue
          </button>
        </div>
        <div>
          <div className="flex items-center justify-between bg-gray-300 p-3 font-semibold">
            <p>ITEMS: {products.length}</p>
            <p>TOTAL AMOUNT: Rs {TotalAmount}</p>
          </div>
          <div className="flex border-2 border-gray-300">
            <p className="w-[40%] border-e-2 border-gray-300 p-3 sm:w-[70%]">
              Product Details
            </p>
            <p className="w-[15%] border-e-2 border-gray-300 p-3 text-center sm:w-[10%]">
              Qty
            </p>
            <p className="w-[20%] border-e-2 border-gray-300 p-3 text-center sm:w-[10%]">
              Unit Price
            </p>
            <p className="w-[25%] p-3 text-center sm:w-[10%]">Total</p>
          </div>
          {products.map((product, index) => (
            <div key={index}>
              <Product product={product} />
            </div>
          ))}
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[55%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Sub-Total:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {currency}
              {cartValue}
            </p>
          </div>
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[55%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Shipping Charges:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {currency}
              {shippingCharges}
            </p>
          </div>
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[55%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Sub-Total:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {currency}
              {TotalAmount}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="mt-4 bg-primary px-6 py-3 font-semibold text-white"
            onClick={() => router.push("/confirmation")}
          >
            CONFIRM ORDER
          </button>
          <p className="my-4 text-center font-semibold">
            By placing order you’re agreeing to our
            <span className="text-red-400"> Terms and Conditions</span> and
            <span className="text-red-400"> Privacy Policy</span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
