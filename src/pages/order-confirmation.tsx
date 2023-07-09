import { ActiveOrderFragment, OrderLine } from "@/__generated__/graphql";
import Layout from "@/components/layout";
import { ACTIVE_ORDER } from "@/graphql/orderWorkflow";
import { formatPrice } from "@/helpers/helper";
import { useQuery } from "@apollo/client";
import { ArrowBack } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";

interface ProductProps {
  product: OrderLine;
}

const Product = ({ product }: ProductProps) => {
  const findProductOption = (optionType: string) => {
    return (
      product.productVariant.options.find(
        (x) => x.group.name.toLowerCase() === optionType
      )?.name || "NA"
    );
  };
  return (
    <div className="flex border-2 border-t-0 border-gray-300">
      <div className="flex w-[40%] border-e-2 border-gray-300 max-sm:flex-col sm:w-[70%]">
        <Image
          src={product.featuredAsset?.preview ?? ""}
          alt={product.featuredAsset?.name ?? ""}
          height={106}
          width={138}
          className="border-gray-300 p-3 sm:border-e-2"
        />
        <div className="mx-3 space-y-3 p-3">
          <p className="line-clamp-2 font-semibold">
            {product.productVariant.name}
          </p>
          <p className="text-xs">
            Size: <span className="font-bold">{findProductOption("size")}</span>
          </p>
          <p className="text-xs">
            Colour:{" "}
            <span className="font-bold">{findProductOption("color")}</span>
          </p>
        </div>
      </div>
      <p className="w-[15%] border-e-2 border-gray-300 p-3 text-center sm:w-[10%]">
        {product.quantity}
      </p>
      <p className="w-[20%] border-e-2 border-gray-300 p-3 text-center sm:w-[10%]">
        {formatPrice(product.unitPriceWithTax)}
      </p>
      <p className="w-[25%] p-3 text-center sm:w-[10%]">
        {formatPrice(product.linePriceWithTax)}
      </p>
    </div>
  );
};

const OrderConfirmation = () => {
  const router = useRouter();
  const { data } = useQuery(ACTIVE_ORDER);
  const activeOrders = data?.activeOrder as ActiveOrderFragment;
  const products = activeOrders?.lines;
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
            <p>ITEMS: {activeOrders?.totalQuantity}</p>
            <p>TOTAL AMOUNT: {formatPrice(activeOrders?.totalWithTax)}</p>
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
          {products?.map((product, index) => (
            <div key={index}>
              <Product product={product as OrderLine} />
            </div>
          ))}
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[55%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Sub-Total:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {formatPrice(activeOrders?.subTotalWithTax)}
            </p>
          </div>
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[55%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Shipping Charges:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {formatPrice(activeOrders?.shippingWithTax)}
            </p>
          </div>
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[55%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Sub-Total:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {formatPrice(activeOrders?.totalWithTax)}
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
