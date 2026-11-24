import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import fallback from "../assets/catalog-texture.webp";

export default function CatalogImage({ src, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState<ImageProps["src"] | null>(null);
  const useFallback = !src || src === fallback || failed === src;
  return <Image {...props} src={useFallback ? fallback : src} alt={useFallback && alt ? "Product photography unavailable" : alt}
    onError={useFallback ? undefined : () => setFailed(src)} />;
}
