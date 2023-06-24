import Layout from "@/components/layout";
import { formatPrice } from "@/helpers/helper";
import Image from "next/image";
import { useRouter } from "next/router";

const address = {
  name: "Kartik Chate",
  address: "Plot No.19,Ramnagar,Cidco,",
  city: "Aurangabad",
  pin: "431001",
  state: "Maharashtra",
  country: "Aurangabad",
  mobile: "+91-8275513320",
};

const product = {
  image: "https://picsum.photos/360/300",
  name: "Pacer fit Shirt",
  size: "M",
  price: 799,
  quantity: 1,
};

const details = {
  orderId: "#98332",
  dateAdded: "05/05/2023",
  paymentMethod: "UPI",
  shippingMethod: "Delhivery",
  billingAddress: address,
  shippingAddress: address,
  product: product,
  subTotal: 799,
  shippingCharges: 0,
  total: 799,
};

const OrderDetails = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="flex flex-col space-y-8 py-12 xl:px-32">
        <button
          className="self-end rounded-lg border-2 border-primary px-6 py-3 font-semibold"
          onClick={() => router.push("/return-details")}
        >
          Return or Replace
        </button>
        <div className="flex flex-col border-2 border-gray-300 p-4">
          <p className="font-bold">Order Details</p>
          <div className="my-4 border-t-2 border-gray-300" />
          <div className="flex flex-col justify-between sm:flex-row">
            <div>
              <p className="font-bold">
                Order ID:
                <span className="font-normal"> {details.orderId}</span>
              </p>
              <p className="font-bold">
                Date Added:
                <span className="font-normal"> {details.dateAdded}</span>
              </p>
            </div>
            <div>
              <p className="font-bold">
                Payment Method:
                <span className="font-normal"> {details.paymentMethod}</span>
              </p>
              <p className="font-bold">
                Shipping Method:
                <span className="font-normal"> {details.shippingMethod}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between border-2 border-gray-300 p-4 sm:flex-row">
          <div>
            <p className="font-bold">Billing Address</p>
            <div className="my-4 border-t-2 border-gray-300" />
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{`${address.city}, ${address.pin}, ${address.state}`}</p>
            <p>{address.country}</p>
            <p>Mobile: {address.mobile}</p>
          </div>
          <div className="flex-grow">
            <div className="my-10 border-t-2 border-gray-300" />
          </div>
          <div>
            <p className="font-bold">Shipping Address</p>
            <div className="my-4 border-t-2 border-gray-300" />
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{`${address.city}, ${address.pin}, ${address.state}`}</p>
            <p>{address.country}</p>
            <p>Mobile: {address.mobile}</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col border-2 border-gray-300 p-4 sm:flex-row">
            <Image
              src={product.image}
              alt={product.name}
              height={205}
              width={331}
              className="h-[205px] max-sm:mb-6"
            />
            <div className="space-y-3 sm:ms-16">
              <p className="text-2xl font-semibold">{product.name}</p>
              <p>
                Size: <span className="font-bold">{product.size}</span>
              </p>
              <p>
                Quantity: <span className="font-bold">{product.quantity}</span>
              </p>
              <p>
                Total:{" "}
                <span className="font-bold">{formatPrice(product.price)}</span>
              </p>
            </div>
          </div>
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[55%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Sub-Total:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {formatPrice(details.subTotal)}
            </p>
          </div>
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[55%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Shipping Charges:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {formatPrice(details.shippingCharges)}
            </p>
          </div>
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[55%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Total:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {formatPrice(details.total)}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
