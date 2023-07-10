export enum OrderState {
  ArrangingPayment = "ArrangingPayment",
  PaymentAuthorized = "PaymentAuthorized",
  PaymentSettled = "PaymentSettled",
  PartiallyShipped = "PartiallyShipped",
  Shipped = "Shipped",
  PartiallyDelivered = "PartiallyDelivered",
  Delivered = "Delivered",
  Modifying = "Modifying",
  ArrangingAdditionalPayment = "ArrangingAdditionalPayment",
  Cancelled = "Cancelled",
}

export const getOrderStatus = (orderState: string) => {
  return orderState.replace(/([A-Z])/g, " $1").trim();
};
