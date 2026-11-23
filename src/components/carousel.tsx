import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { HERO_SECTION } from "@/graphql/landingPage";
import MuiCarousel from "react-material-ui-carousel";

export default function Carousel() {
  const { data } = useQuery(HERO_SECTION, {
    variables: { slug: "hero-section" },
  });
  const slides = (data?.collection?.children ?? []).flatMap((item) => {
    const wide = item.assets.find((asset) => !asset.name.includes("mobile"));
    const narrow = item.assets.find((asset) => asset.name.includes("mobile"));
    const primary = wide ?? narrow;
    return primary
      ? [
          {
            id: item.id,
            name: item.name,
            wide: primary,
            narrow: narrow ?? primary,
          },
        ]
      : [];
  });

  if (!slides.length) return null;

  return (
    <section className="zeal-section" aria-label="Featured collections">
      <MuiCarousel
        animation="slide"
        autoPlay={false}
        navButtonsAlwaysVisible={slides.length > 1}
      >
        {slides.map((slide) => (
          <Link href="/products" className="block" key={slide.id}>
            <Image
              src={slide.wide.preview}
              alt={slide.name}
              className="hidden w-full rounded sm:block"
              width={1536}
              height={512}
            />
            <Image
              src={slide.narrow.preview}
              alt={slide.name}
              className="w-full rounded sm:hidden"
              width={768}
              height={512}
            />
          </Link>
        ))}
      </MuiCarousel>
    </section>
  );
}
