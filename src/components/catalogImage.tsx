import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import fallback from "../assets/catalog-texture.webp";

const catalogArtwork = new Set([
  "mens-performance-tshirt",
  "mens-training-shorts",
  "mens-track-jacket",
  "womens-yoga-leggings",
  "womens-sports-bra",
  "womens-running-tank",
  "mens-running-shoes",
  "womens-training-shoes",
  "sports-duffel-bag",
  "gym-gloves",
  "mens-sportswear-cat",
  "womens-sportswear-cat",
  "footwear-cat",
  "accessories-cat",
]);

function resolveImage(src: ImageProps["src"]) {
  if (typeof src !== "string" || !src.startsWith("https://api.relaxzeal.com/assets/")) return src;
  const file = src.split("?")[0].split("/").pop() || "";
  const key = file.replace(/(?:__preview)?\.jpg$/i, "");
  return catalogArtwork.has(key) ? `/zeal/catalog/${key}.webp` : src;
}

export default function CatalogImage({ src, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState<ImageProps["src"] | null>(null);
  const image = resolveImage(src);
  const useFallback = !image || image === fallback || failed === image;
  return (
    <Image {...props} src={useFallback ? fallback : image}
      alt={useFallback && alt ? "Product photography unavailable" : alt}
      onError={useFallback ? undefined : () => setFailed(image)} />
  );
}
