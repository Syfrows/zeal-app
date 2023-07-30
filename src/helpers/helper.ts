import { CurrencyCode } from "@/__generated__/graphql";

export const formatPrice = (value: number, currency?: CurrencyCode) => {
  currency = currency ?? CurrencyCode.Inr;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value / 100);
};

export enum StockLevel {
  InStock = "IN_STOCK",
  LowStock = "LOW_STOCK",
  OutOfStock = "OUT_OF_STOCK",
}

export const discount = (mrp: number, price: number) => {
  return Math.round(((mrp - price) / mrp) * 100);
};
