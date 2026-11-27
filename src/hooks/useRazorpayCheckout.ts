import {
  GenerateRazorpayOrderIdMutation,
  RazorpayOrderIdSuccess,
} from "@/__generated__/graphql";
import { ACCOUNT_INFO } from "@/graphql/accounts";
import { GENERATE_RAZORPAY_ORDER_ID } from "@/graphql/orderWorkflow";
import { useMutation, useQuery } from "@apollo/client";
import useRazorpay, { RazorpayOptions } from "react-razorpay";

export interface CheckoutOptions {
  orderId: string;
  amount: string;
  onSucess: (metaData: any) => void;
  onClose: () => void;
  onError: () => void;
}

const useRazorpayCheckout = (checkout: CheckoutOptions) => {
  const [Razorpay] = useRazorpay();
  const [generateRazorpayOrderId] = useMutation(GENERATE_RAZORPAY_ORDER_ID);
  const { data } = useQuery(ACCOUNT_INFO);
  const details = data?.authenticatedUser;

  const handlePayment = () => {
    generateRazorpayOrderId({
      variables: {
        vendureOrderId: checkout.orderId,
      },
      onCompleted: payment,
      onError: checkout.onError,
    });
  };

  const payment = (data: GenerateRazorpayOrderIdMutation) => {
    const orderId = (data.generateRazorpayOrderId as RazorpayOrderIdSuccess)
      .razorpayOrderId;
    if (!Razorpay || !orderId || !process.env.NEXT_PUBLIC_RAZORPAY_ID) { checkout.onError(); return; }
    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_ID || "",
      amount: checkout.amount,
      currency: "INR",
      name: "ZealWear",
      order_id: orderId,
      handler: checkout.onSucess,
      modal: {
        ondismiss: checkout.onClose,
      },
      prefill: {
        name: details?.title || "",
        email: details?.emailAddress || "",
        contact: details?.phoneNumber || "",
      },
    };
    try { new Razorpay(options).open(); } catch { checkout.onError(); }
  };

  return handlePayment;
};

export default useRazorpayCheckout;
