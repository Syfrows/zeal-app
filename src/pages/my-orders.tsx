import Layout from "@/components/layout";
import SideNav from "@/components/sideNav";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const OrderItem = ({ order }: any) => {
  const router = useRouter();
  const currency = "₹";
  return (
    <div className="flex flex-col border-2 border-gray-400 p-4 sm:flex-row">
      <Image
        src={order.image}
        alt={order.orderId}
        height={205}
        width={283}
        className="h-[205px] self-center"
      />
      <div className="w-full max-sm:mt-4 sm:px-6">
        <div className="flex justify-between">
          <div>
            <p className="mb-3 text-2xl font-semibold">
              ORDER #{order.orderId}
            </p>
            <p>
              {order.numberOfItems} item,{" "}
              <span className="font-bold">
                {currency}
                {order.amount}
              </span>
            </p>
          </div>
          <div className="text-end">
            <p className="mb-3 font-bold text-gray-500">{order.orderStatus}</p>
            <p>{order.date}</p>
          </div>
        </div>
        <div className="my-6 border-t-2 border-gray-300" />
        <div className="flex justify-between">
          {order.orderStatus !== "Returned" && (
            <button
              className="rounded-lg bg-primary  px-6 py-3 font-semibold text-white"
              onClick={() => !order.isReturn && router.push("/order-details")}
            >
              {order.isReturn ? "Cancel Return " : "Details"}
            </button>
          )}
          {!order.isReturn && (
            <button
              className="rounded-lg border-2 border-primary px-6 py-3 font-semibold"
              onClick={() => router.push("/return-details")}
            >
              Return or Replace
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const MyOrders = () => {
  const searchParams = useSearchParams();
  const isReturns = searchParams.get("isReturns");

  const orders = Array(3)
    .fill({
      image: null,
      orderId: "98332",
      numberOfItems: 1,
      amount: 799,
      orderStatus: isReturns ? "Pickup Scheduled" : "Delivered",
      date: "5 May 2023",
      isReturn: isReturns,
    })
    .map((order, index) => {
      return {
        ...order,
        image: `https://picsum.photos/id/${index}/360/300`,
      };
    });

  if (isReturns) {
    orders[2].orderStatus = "Returned";
  }

  return (
    <Layout>
      <div className="flex justify-center py-12 xl:px-32">
        <SideNav />
        <div className="flex flex-grow flex-col space-y-6">
          {orders.map((order, index) => (
            <div key={index}>
              <OrderItem order={order} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;
