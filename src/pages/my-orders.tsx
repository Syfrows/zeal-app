import { Order } from "@/__generated__/graphql";
import Layout from "@/components/layout";
import SideNav from "@/components/sideNav";
import { GET_ORDERS } from "@/graphql/orders";
import { formatPrice } from "@/helpers/helper";
import { OrderState, getOrderStatus } from "@/helpers/order";
import { useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import placeHolder from "../assets/placeHolder.png";

interface OrderItemProps {
  order: Order;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const isReturns = useSearchParams().get("isReturns");
  const router = useRouter();
  const orderline = order.lines[0];
  return (
    <div className="flex flex-col border-2 border-gray-400 p-4 sm:flex-row">
      <Image
        src={orderline?.featuredAsset?.preview || placeHolder}
        alt={orderline?.featuredAsset?.name || ""}
        height={220}
        width={220}
        className="aspect-square self-center"
      />
      <div className="w-full max-sm:mt-4 sm:px-6">
        <div className="flex justify-between">
          <div>
            <p className="mb-3 text-2xl font-semibold">ORDER #{order.id}</p>
            <p>
              {order.totalQuantity} item,{" "}
              <span className="font-bold">
                {formatPrice(order.totalWithTax)}
              </span>
            </p>
          </div>
          <div className="text-end">
            <p className="mb-3 font-bold text-gray-500">
              {getOrderStatus(order.state)}
            </p>
            <p>
              {order?.orderPlacedAt
                ? DateTime.fromISO(order?.orderPlacedAt).toLocaleString(
                    DateTime.DATE_MED
                  )
                : ""}
            </p>
          </div>
        </div>
        <div className="my-6 border-t-2 border-gray-300" />
        <div className="flex justify-between">
          {order.state !== OrderState.Cancelled && (
            <button
              className="rounded-lg bg-primary  px-6 py-3 font-semibold text-white"
              onClick={() =>
                !isReturns && router.push(`/order-details?orderId=${order.id}`)
              }
            >
              {isReturns ? "Cancel Return " : "Details"}
            </button>
          )}
          {/* {!isReturns && (
            <button
              className="rounded-lg border-2 border-primary px-6 py-3 font-semibold"
              onClick={() => router.push("/return-details")}
            >
              Return or Replace
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

const MyOrders = () => {
  const searchParams = useSearchParams();
  const isReturns = searchParams.get("isReturns");
  const { data } = useQuery(GET_ORDERS);
  const ordersData = data?.authenticatedUser?.orders.items;
  const orders = ordersData?.filter((x) =>
    isReturns
      ? x.state === OrderState.Cancelled
      : x.state !== OrderState.Cancelled && x.state !== OrderState.AddingItems
  );
  orders?.sort((a, b) =>
    DateTime.fromISO(b.orderPlacedAt) < DateTime.fromISO(a.orderPlacedAt)
      ? -1
      : 1
  );

  return (
    <Layout>
      <div className="flex justify-center py-12 xl:px-32">
        <SideNav />
        <div className="flex flex-grow flex-col space-y-6">
          {orders?.map((order, index) => (
            <div key={index}>
              <OrderItem order={order as Order} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;
