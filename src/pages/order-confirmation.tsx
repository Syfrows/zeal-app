import ServiceNotice from "@/components/serviceNotice";
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
  ADJUST_ORDER_LINE,
  GET_PAYMENT_METHODS,
  GET_SHIPPING_METHODS,
  SET_SHIPPING_ADDRESS,
  SET_SHIPPING_METHOD,
  TRANSITION_ORDER,
} from "@/graphql/orderWorkflow";
import { formatPrice } from "@/helpers/helper";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Add, ArrowBack, Remove } from "@mui/icons-material";
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
import Link from "next/link";

interface ProductProps {
  product: OrderLine;
  setActiveOrders: (activeOrders: ActiveOrderFragment) => void;
}

const Product = ({ product, setActiveOrders }: ProductProps) => {
  const router = useRouter();
  const findProductOption = (optionType: string) => {
    return (
      product.productVariant.options.find(
        (x) => x.group.name.toLowerCase() === optionType
      )?.name || "NA"
    );
  };
  const [adjustOrder] = useMutation(ADJUST_ORDER_LINE);
  const updateOrder = (quantity: number) => {
    adjustOrder({
      variables: {
        orderLineId: product.id,
        quantity: quantity,
      },
      onCompleted: (data, _clientOptions) => {
        const activeOrders =
          data?.adjustOrderLine.__typename === "Order"
            ? (data?.adjustOrderLine as ActiveOrderFragment)
            : null;
        if (!activeOrders || activeOrders?.totalQuantity <= 0) router.push("/");
        activeOrders && setActiveOrders(activeOrders);
      },
    });
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
      <p className="w-[15%] border-e-2 border-gray-300 px-1 py-3 text-center max-sm:text-sm sm:w-[10%]">
        <button onClick={() => updateOrder(product.quantity - 1)}>
          <Remove />
        </button>
        <span className="border-2 border-slate-300 px-2 py-1">
          <input
            onChange={(e) => updateOrder(Number(e.currentTarget.value))}
            value={product.quantity}
            type="number"
            className="w-4 text-center [appearance:textfield] focus:outline-none sm:w-6 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />{" "}
        </span>
        <button
          className="max-sm:mt-1"
          onClick={() => updateOrder(product.quantity + 1)}
        >
          <Add />
        </button>
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
  const { data, error, loading: queryLoading } = useQuery(ACTIVE_ORDER);
  const [activeOrders, setActiveOrders] = useState(
    data?.activeOrderCustom as ActiveOrderFragment
  );
  const products = activeOrders?.lines;
  const paymentMethodsData = useQuery(GET_PAYMENT_METHODS);
  const paymentMethods = paymentMethodsData.data?.eligiblePaymentMethods;
  const [transitionOrder] = useMutation(TRANSITION_ORDER);
  const [addPayment] = useMutation(ADD_PAYMENT);
  const [isLoading, setIsLoading] = useState(false);
  const isConfirmOrderDisabled = !paymentMethod || isLoading;

  useEffect(
    () => setActiveOrders(data?.activeOrderCustom as ActiveOrderFragment),
    [data]
  );

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

  if (error)
    return (
      <Layout>
        <ServiceNotice message="Checkout is temporarily unavailable." />
      </Layout>
    );
  if (queryLoading)
    return (
      <Layout>
        <p role="status">Loading…</p>
      </Layout>
    );
  if (!activeOrders?.totalQuantity || paymentMethodsData.error)
    return (
      <Layout>
        <ServiceNotice message="Checkout requires an active bag and an available payment method." />
      </Layout>
    );
  return (
    <Layout>
      <div className="space-y-4 xl:px-32 xl:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ArrowBack onClick={() => router.back()} />
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
              <Product
                product={product as OrderLine}
                setActiveOrders={setActiveOrders}
              />
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
            <Link
              className="text-red-400"
              href={"/terms-and-conditions"}
              target="_blank"
            >
              {" "}
              Terms and Conditions
            </Link>{" "}
            and
            <Link
              className="text-red-400"
              href={"/privacy-and-policy"}
              target="_blank"
            >
              {" "}
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
