import ServiceNotice from "@/components/serviceNotice";
import { Order } from "@/__generated__/graphql";
import Layout from "@/components/layout";
import { ORDER_BY_ID } from "@/graphql/orders";
import { formatPrice } from "@/helpers/helper";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { DateTime } from "luxon";
import placeHolder from "../assets/placeHolder.png";

const OrderDetails = () => {
  const router = useRouter();
  const orderId = useSearchParams().get("orderId") || "";
  const {
    data,
    error,
    loading: queryLoading,
  } = useQuery(ORDER_BY_ID, { variables: { id: orderId }, skip: !orderId });
  const order = data?.order as Order;
  const products = order?.lines;
  const address = order?.shippingAddress;
  const paymentMethod = order?.payments?.[0]?.method;
  const shippingMethod = order?.shippingLines?.[0]?.shippingMethod?.name;
  const invoiceDownloadUrl = order?.invoices?.[0]?.downloadUrl;
  if (error)
    return (
      <Layout>
        <ServiceNotice message="Order details are temporarily unavailable." />
      </Layout>
    );
  if (queryLoading)
    return (
      <Layout>
        <p role="status">Loading…</p>
      </Layout>
    );
  if (!order)
    return (
      <Layout>
        <ServiceNotice message="Select an order from your order history to see its details." />
      </Layout>
    );
  return (
    <Layout>
      <div className="flex flex-col space-y-8 py-12 xl:px-32">
        {/* <button
          className="self-end rounded-lg border-2 border-primary px-6 py-3 font-semibold"
          onClick={() => router.push("/return-details")}
        >
          Return or Replace
        </button> */}
        <div className="flex flex-col border-2 border-gray-300 p-4">
          <p className="font-bold">Order Details</p>
          <div className="my-4 border-t-2 border-gray-300" />
          <div className="flex flex-col justify-between sm:flex-row">
            <div>
              <p className="font-bold">
                Order ID:
                <span className="font-normal"> #{order?.id}</span>
              </p>
              <p className="font-bold">
                Date Added:
                <span className="font-normal">
                  {" "}
                  {order?.orderPlacedAt
                    ? DateTime.fromISO(order?.orderPlacedAt).toLocaleString()
                    : ""}
                </span>
              </p>
            </div>
            <div>
              <p className="font-bold">
                Payment Method:
                <span className="font-normal"> {paymentMethod}</span>
              </p>
              <p className="font-bold">
                Shipping Method:
                <span className="font-normal"> {shippingMethod}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between border-2 border-gray-300 p-4 sm:flex-row">
          <div>
            <p className="font-bold">Billing Address</p>
            <div className="my-4 border-t-2 border-gray-300" />
            <p>{address?.fullName}</p>
            <p>{address?.streetLine1}</p>
            <p>{address?.streetLine2}</p>
            <p>{`${address?.city || ""}${address?.city ? "," : ""} ${
              address?.postalCode || ""
            }${address?.postalCode ? "," : ""} ${address?.province || ""}`}</p>
            <p>{address?.country}</p>
            {address?.phoneNumber && <p>Mobile: {address?.phoneNumber}</p>}{" "}
          </div>
          <div className="flex-grow">
            <div className="my-10 border-t-2 border-gray-300" />
          </div>
          <div>
            <p className="font-bold">Shipping Address</p>
            <div className="my-4 border-t-2 border-gray-300" />
            <p>{address?.fullName}</p>
            <p>{address?.streetLine1}</p>
            <p>{address?.streetLine2}</p>
            <p>{`${address?.city || ""}${address?.city ? "," : ""} ${
              address?.postalCode || ""
            }${address?.postalCode ? "," : ""} ${address?.province || ""}`}</p>
            <p>{address?.country}</p>
            {address?.phoneNumber && <p>Mobile: {address?.phoneNumber}</p>}{" "}
          </div>
        </div>
        <div>
          {products?.map((product, index) => {
            const findProductOption = (optionType: string) => {
              return (
                product.productVariant.options.find(
                  (x) => x.group.name.toLowerCase() === optionType
                )?.name || "NA"
              );
            };
            return (
              <div
                key={index}
                className="flex flex-col border-2 border-gray-300 p-4 sm:flex-row"
              >
                <Image
                  src={product.featuredAsset?.preview || placeHolder}
                  alt={product.featuredAsset?.name || ""}
                  height={250}
                  width={250}
                  className="aspect-square max-sm:mb-6"
                />
                <div className="space-y-3 sm:ms-16">
                  <p className="text-2xl font-semibold">
                    {product.productVariant.name}
                  </p>
                  <p>
                    Size:{" "}
                    <span className="font-bold">
                      {findProductOption("size")}
                    </span>
                  </p>
                  <p>
                    Quantity:{" "}
                    <span className="font-bold">{product.quantity}</span>
                  </p>
                  <p>
                    Total:{" "}
                    <span className="font-bold">
                      {formatPrice(product.linePriceWithTax)}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[55%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Sub-Total:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {formatPrice(order?.subTotalWithTax)}
            </p>
          </div>
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[55%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Shipping Charges:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {formatPrice(order?.shippingWithTax)}
            </p>
          </div>
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[55%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Total:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {formatPrice(order?.totalWithTax)}
            </p>
          </div>
        </div>
        <button
          className={`self-center rounded-lg border-2 bg-primary px-6 py-3 font-semibold text-white ${
            !invoiceDownloadUrl && "opacity-60"
          }`}
          disabled={!invoiceDownloadUrl}
        >
          <a href={invoiceDownloadUrl} target="_blank">
            Invoice
          </a>
        </button>
      </div>
    </Layout>
  );
};

export default OrderDetails;
