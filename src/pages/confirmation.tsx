import { Order, OrderLine } from "@/__generated__/graphql";
import Layout from "@/components/layout";
import { ORDER_BY_CODE } from "@/graphql/orderWorkflow";
import { formatPrice } from "@/helpers/helper";
import { useQuery } from "@apollo/client";
import { CheckCircle } from "@mui/icons-material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

interface ProductProps {
  item: OrderLine;
  isReturn: boolean;
}

const Product = ({ item, isReturn }: ProductProps) => {
  const findProductOption = (optionType: string) => {
    return (
      item.productVariant.options.find(
        (x) => x.group.name.toLowerCase() === optionType
      )?.name || "NA"
    );
  };
  return (
    <div className="flex border-2 border-slate-400 p-4 max-sm:flex-col max-sm:items-center">
      <Image
        src={item.featuredAsset?.preview || ""}
        alt={item.featuredAsset?.name || ""}
        height={205}
        width={266}
      />
      <div className="mx-8 space-y-4">
        <p className="text-2xl font-semibold">{item.productVariant.name}</p>
        <div className="flex">
          <div className="space-y-4">
            <p>
              Size:{" "}
              <span className="font-bold">{findProductOption("size")}</span>
            </p>
            <p>
              Colour:{" "}
              <span className="font-bold">{findProductOption("color")} </span>
              <span className="ms-11">Quantity: {item.quantity}</span>
            </p>
            <p>
              Price:{" "}
              <span className="font-bold text-slate-500 line-through">
                {formatPrice(item.linePriceWithTax)}
              </span>{" "}
              <br />
              <span className="ms-11 font-bold">
                {formatPrice(item.linePrice)}
              </span>
              <span className="ms-4 text-green-500">
                {`You saved ${formatPrice(
                  item.linePriceWithTax - item.linePrice
                )}`}
              </span>
            </p>
            {isReturn && <p>Return till 14th May</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const Confirmation = () => {
  const searchParams = useSearchParams();
  const isReturn = searchParams.get("isReturn");
  const orderCode = searchParams.get("orderCode");
  const router = useRouter();
  const { data } = useQuery(ORDER_BY_CODE, {
    variables: { code: orderCode || "" },
  });
  const orders = data?.orderByCode as Order;
  const products = orders?.lines;
  return (
    <Layout>
      <div className="flex flex-col py-12 lg:px-32">
        <p className="text-center text-2xl font-semibold">
          <span className="me-4 text-green-500">
            <CheckCircle />
          </span>
          {isReturn
            ? `Thank you, Your return order has been scheduled!`
            : `Thank you, Your order has been placed!`}
        </p>
        <div className="my-4 space-y-4">
          {products?.map((product, index) => (
            <div key={index}>
              <Product item={product} isReturn={!!isReturn} />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <button
            className="mt-4 bg-primary px-6 py-3 font-semibold text-white"
            onClick={() => router.push("/")}
          >
            CONTINUE SHOPPING
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

export default Confirmation;
