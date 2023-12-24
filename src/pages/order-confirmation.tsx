import {
  ActiveOrderFragment,
  AddPaymentMutation,
  GetShippingMethodsQuery,
  Order,
  OrderLine,
} from "@/__generated__/graphql";
import Layout from "@/components/layout";
import {
  ACTIVE_ORDER,
  ADD_PAYMENT,
  GET_PAYMENT_METHODS,
  GET_SHIPPING_METHODS,
  SET_SHIPPING_ADDRESS,
  SET_SHIPPING_METHOD,
  TRANSITION_ORDER,
} from "@/graphql/orderWorkflow";
import { formatPrice } from "@/helpers/helper";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ArrowBack } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import placeHolder from "../assets/placeHolder.png";
import useRazorpayCheckout from "@/hooks/useRazorpayCheckout";
import { OrderState } from "@/helpers/order";
import { useSearchParams } from "next/navigation";

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
      <div className="flex w-[30%] border-e-2 border-gray-300 max-sm:flex-col sm:w-[70%]">
        <Image
          src={product.featuredAsset?.preview ?? placeHolder}
          alt={product.featuredAsset?.name ?? ""}
          height={150}
          width={150}
          className="aspect-square border-gray-300 p-3 sm:border-e-2"
        />
        <div className="space-y-3 p-3 sm:mx-3">
          <p className="line-clamp-2 font-semibold max-sm:text-sm">
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
      <p className="w-[15%] border-e-2 border-gray-300 p-3 text-center max-sm:text-sm sm:w-[10%]">
        {product.quantity}
      </p>
      <p className="w-[28%] border-e-2 border-gray-300 p-3 text-center max-sm:text-sm sm:w-[10%]">
        {formatPrice(product.unitPriceWithTax)}
      </p>
      <p className="w-[27%] p-3 text-center max-sm:text-sm sm:w-[10%]">
        {formatPrice(product.linePriceWithTax)}
      </p>
    </div>
  );
};

const OrderConfirmation = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { data } = useQuery(ACTIVE_ORDER);
  const activeOrders = data?.activeOrder as ActiveOrderFragment;
  const products = activeOrders?.lines;
  const paymentMethodsData = useQuery(GET_PAYMENT_METHODS);
  const paymentMethods = paymentMethodsData.data?.eligiblePaymentMethods;
  const [transitionOrder] = useMutation(TRANSITION_ORDER);
  const [addPayment] = useMutation(ADD_PAYMENT);
  const [isLoading, setIsLoading] = useState(false);
  const isConfirmOrderDisabled = !paymentMethod || isLoading;

  const isEventPurchase =
    !!useSearchParams().get("eventPurchase") &&
    process.env.NEXT_PUBLIC_ENABLE_EVENT_PURCHASE == "true";
  const [setShippingAddress] = useMutation(SET_SHIPPING_ADDRESS);
  const [getShippingMethods] = useLazyQuery(GET_SHIPPING_METHODS);
  const [setShippingMethods] = useMutation(SET_SHIPPING_METHOD);

  useEffect(() => {
    if (!isEventPurchase) return;
    setShippingAddress({
      variables: {
        input: {
          countryCode: "IN",
          streetLine1: "Maha Marathon Event",
        },
      },
      onCompleted: () => {
        getShippingMethods({
          onCompleted: (data: GetShippingMethodsQuery) => {
            setShippingMethods({
              variables: {
                shippingMethodId: data.eligibleShippingMethods[0].id,
              },
            });
          },
        });
      },
    });
  }, []);

  const onConfirmOrder = () => {
    setIsLoading(true);
    transitionOrder({
      variables: {
        state: OrderState.ArrangingPayment,
      },
      onCompleted: handlePayment,
    });
  };

  const handlePayment = () => {
    if (paymentMethod === "razorpay") {
      handleRazorpayPayment();
      return;
    }
    onTransitionOrder();
  };

  const onTransitionOrder = (metadata?: any) => {
    addPayment({
      variables: {
        input: {
          method: paymentMethod,
          metadata: JSON.stringify(metadata) || {},
        },
      },
      onCompleted: onPaymentAdded,
    });
  };

  const onPaymentModalClose = () => {
    transitionOrder({
      variables: {
        state: OrderState.AddingItems,
      },
      onCompleted: () => setIsLoading(false),
    });
  };

  const handleRazorpayPayment = useRazorpayCheckout({
    orderId: activeOrders?.id,
    amount: activeOrders?.totalWithTax,
    onSucess: onTransitionOrder,
    onClose: onPaymentModalClose,
  });

  const onPaymentAdded = (data: AddPaymentMutation) => {
    const order = data.addPaymentToOrder as Order;
    router.push(`/confirmation?orderCode=${order.code}`);
  };

  return (
    <Layout>
      <div className="space-y-4 xl:px-32 xl:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ArrowBack />
            <p className="ms-4 text-2xl font-semibold">CONFIRM YOUR ORDER</p>
          </div>
          {/* <button
            className="bg-primary px-4 py-2 font-semibold text-white"
            onClick={() => router.push("/confirmation")}
          >
            Continue
          </button> */}
        </div>
        <div>
          <div className="flex items-center justify-between bg-gray-300 p-3 font-semibold">
            <p>ITEMS: {activeOrders?.totalQuantity}</p>
            <p>TOTAL AMOUNT: {formatPrice(activeOrders?.totalWithTax)}</p>
          </div>
          <div className="flex border-2 border-gray-300">
            <p className="w-[30%] border-e-2 border-gray-300 p-3 sm:w-[70%]">
              Product Details
            </p>
            <p className="w-[15%] border-e-2 border-gray-300 p-3 text-center sm:w-[10%]">
              Qty
            </p>
            <p className="w-[28%] border-e-2 border-gray-300 p-3 text-center sm:w-[10%]">
              Unit Price
            </p>
            <p className="w-[27%] p-3 text-center sm:w-[10%]">Total</p>
          </div>
          {products?.map((product, index) => (
            <div key={index}>
              <Product product={product as OrderLine} />
            </div>
          ))}
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[45%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Sub-Total:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {formatPrice(activeOrders?.subTotalWithTax)}
            </p>
          </div>
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[45%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Shipping Charges:
            </p>
            <p className="self-center p-3 text-center sm:w-[10%]">
              {formatPrice(activeOrders?.shippingWithTax)}
            </p>
          </div>
          <div className="flex border-2 border-t-0 border-gray-300">
            <p className="w-[45%] border-e-2 border-gray-300 p-3 text-end font-semibold  sm:w-[90%]">
              Sub-Total:
            </p>
            <p className="p-3 text-center sm:w-[10%]">
              {formatPrice(activeOrders?.totalWithTax)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="me-4 font-bold">Payment Options : </p>
          <RadioGroup
            row
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
          >
            {paymentMethods?.map((method, index) => (
              <FormControlLabel
                key={index}
                value={method.code}
                control={<Radio color="default" />}
                label={method.name}
              />
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-col items-center">
          <button
            className={`mt-4 bg-primary px-6 py-3 font-semibold text-white ${
              isConfirmOrderDisabled && "opacity-50"
            }`}
            onClick={onConfirmOrder}
            disabled={isConfirmOrderDisabled}
          >
            {isLoading && (
              <CircularProgress color="inherit" size={16} className="mr-2" />
            )}
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
