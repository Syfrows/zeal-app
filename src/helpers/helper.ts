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

const shimmer = (w: number | string, h: number | string) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#F0F0F0" offset="20%" />
      <stop stop-color="#E8E8E8" offset="50%" />
      <stop stop-color="#F0F0F0" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#F0F0F0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const shimmerDataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer("100%", "100%")
)}`;
