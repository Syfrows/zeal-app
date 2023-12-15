import Layout from "@/components/layout";
import Image from "next/image";
import { Add, Remove } from "@mui/icons-material";
import { useRouter } from "next/router";
import { formatPrice } from "@/helpers/helper";
import { ACTIVE_ORDER, ADJUST_ORDER_LINE } from "@/graphql/orderWorkflow";
import { useMutation, useQuery } from "@apollo/client";
import { ActiveOrderFragment, OrderLine } from "@/__generated__/graphql";
import { useEffect, useState } from "react";
import { TOGGLE_WISHLIST } from "@/graphql/wishlist";
import placeHolder from "../assets/placeHolder.png";

interface CartItemProps {
  item: OrderLine;
  setActiveOrder: (activeOrder: ActiveOrderFragment) => void;
}

const CartItem = ({ item, setActiveOrder }: CartItemProps) => {
  const findProductOption = (optionType: string) => {
    return (
      item.productVariant.options.find(
        (x) => x.group.name.toLowerCase() === optionType
      )?.name || "NA"
    );
  };
  const [adjustOrder, { data, loading }] = useMutation(ADJUST_ORDER_LINE);
  const [addToWishlist] = useMutation(TOGGLE_WISHLIST);

  const updateOrder = (quantity: number) => {
    adjustOrder({
      variables: {
        orderLineId: item.id,
        quantity: quantity,
      },
    });
  };

  const onMoveToWishlist = () => {
    addToWishlist({
      variables: { productVariantId: item.productVariant.id },
      onCompleted: onItemMovedToWishList,
    });
  };

  const onItemMovedToWishList = () => {
    updateOrder(0);
  };

  useEffect(() => {
    const activeOrder =
      data?.adjustOrderLine.__typename === "Order"
        ? (data?.adjustOrderLine as ActiveOrderFragment)
        : null;
    activeOrder && setActiveOrder(activeOrder);
  }, [data, setActiveOrder]);

  const price = (item.productVariant.customFields?.MRP || 0) * item.quantity;

  return (
    <div className="flex flex-col border-2 border-slate-400 p-4 max-md:space-y-4 md:flex-row">
      <Image
        src={item.featuredAsset?.preview ?? placeHolder}
        alt={item.featuredAsset?.name ?? ""}
        height={260}
        width={260}
        className="aspect-square"
      />
      <div className="space-y-4 md:mx-8">
        <p className="text-2xl font-semibold">{item.productVariant.name}</p>
        <div className="flex flex-col xl:flex-row">
          <div className="space-y-4">
            <p>
              Size:{" "}
              <span className="font-bold">{findProductOption("size")}</span>
            </p>
            <p>
              Colour:{" "}
              <span className="font-bold">{findProductOption("color")}</span>
            </p>
            <p>
              Price:{" "}
              <span className="font-bold text-slate-500 line-through">
                {formatPrice(price)}
              </span>
              <br />
              <span className="ms-11 font-bold">
                {formatPrice(item.linePriceWithTax)}
              </span>
            </p>
          </div>
          <div className="mt-8 self-center xl:mx-8">
            <p className="mb-6 space-x-2">
              Quantity:
              <button
                className="ms-2"
                onClick={() => updateOrder(item.quantity - 1)}
              >
                <Remove />
              </button>
              <span className="border-2 border-slate-300 px-2 py-1">
                <input
                  onChange={(e) => updateOrder(Number(e.currentTarget.value))}
                  value={item.quantity}
                  type="number"
                  className="w-12 text-center [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />{" "}
              </span>
              <button onClick={() => updateOrder(item.quantity + 1)}>
                <Add />
              </button>
            </p>
          </div>
        </div>
        <div className="flex space-x-8">
          <button
            className="rounded-xl border-2 border-slate-500 px-8 py-2 font-semibold"
            onClick={() => updateOrder(0)}
          >
            Remove
          </button>
          <button
            className="rounded-xl border-2 border-slate-500 px-8 py-2 font-semibold"
            onClick={onMoveToWishlist}
          >
            Move to wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(ACTIVE_ORDER);
  const [activeOrder, setActiveOrder] = useState(
    data?.activeOrder as ActiveOrderFragment
  );
  const products = activeOrder?.lines;

  useEffect(
    () => setActiveOrder(data?.activeOrder as ActiveOrderFragment),
    [data]
  );

  return (
    <Layout>
      <div className="flex flex-col items-center justify-items-center p-12">
        {!products || products?.length === 0 ? (
          <div className="w-full space-y-3">
            <p className="text-2xl font-semibold">SHOPPING CART</p>
            <p>Your cart is empty!</p>
          </div>
        ) : (
          <div>
            <p className="mb-8 text-2xl font-semibold">
              HERE’S WHAT IN YOUR CART
            </p>
            <div className="flex flex-col max-xl:space-y-12 xl:flex-row xl:space-x-12">
              <div className="space-y-8">
                {products.map((item, index) => (
                  <div key={index}>
                    <CartItem
                      item={item as OrderLine}
                      setActiveOrder={setActiveOrder}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col max-xl:self-center">
                <p className="mb-3 text-2xl font-medium">Coupon and Vouchers</p>
                <p className="mb-2">Discount Coupon Code:</p>
                <span>
                  <input
                    type="text"
                    placeholder="Enter your coupon code here."
                    className="me-3 w-60 rounded-lg border-2 border-primary px-4 py-1 focus:outline-none"
                  />
                  <button className="font-semibold text-red-500">APPLY</button>
                </span>
                <div className="mb-6 mt-4 w-72 space-y-3">
                  <p className="font-semibold">Your Order Summary</p>
                  <div className=" border-[1px] border-gray-500" />
                  <div className="flex px-2 text-end">
                    <p className="w-1/2">Sub-Total:</p>
                    <p className="w-1/2">
                      {formatPrice(activeOrder.subTotalWithTax)}
                    </p>
                  </div>
                  <div className="border-[1px] border-gray-500" />
                  <div className="flex px-2 text-end">
                    <p className="w-1/2">Total:</p>
                    <p className="w-1/2">
                      {formatPrice(activeOrder.totalWithTax)}
                    </p>
                  </div>
                  <div className="border-[1px] border-gray-500" />
                </div>
                <button
                  className="w-72 bg-primary py-4 font-semibold text-white"
                  onClick={() => router.push("/address?order=true")}
                >
                  Proceed to Buy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
