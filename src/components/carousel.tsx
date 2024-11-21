import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { HERO_SECTION } from "@/graphql/landingPage";
import MuiCarousel from "react-material-ui-carousel";
import Shimmer from "./Shimmer";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { data, error, loading } = useQuery(HERO_SECTION, {
    variables: {
      slug: "hero-section",
    },
  });

  const slides = useMemo(
    () => data?.collection?.children || [],
    [data?.collection?.children]
  );

  const web = slides.map((x) => ({
    ...slides,
    assets: x.assets.filter((x) => !x.name.includes("mobile")),
  }));
  const mobile = slides.map((x) => ({
    ...slides,
    assets: x.assets.filter((x) => x.name.includes("mobile")),
  }));

  if (!data) {
    return (
      <MuiCarousel animation="slide" className="-m-4">
        <Shimmer height={384} width={1536} />
      </MuiCarousel>
    );
  }

  return (
    <>
      <MuiCarousel animation="slide" className="-m-4 hidden sm:block">
        {web.map((slide, index) => (
          <div key={index} onClick={() => router.push(`/products`)}>
            <Image
              src={slide.assets[0]?.preview || ""}
              alt="RelaxZeal"
              className="aspect-[3/1]"
              width={1536}
              height={384}
            />
          </div>
        ))}
      </MuiCarousel>
      <MuiCarousel animation="slide" className="-m-4 sm:hidden">
        {mobile.map((slide, index) => (
          <div key={index} onClick={() => router.push(`/products`)}>
            <Image
              src={slide.assets[0]?.preview || ""}
              alt="RelaxZeal"
              className="aspect-[3/2]"
              width={1536}
              height={384}
            />
          </div>
        ))}
      </MuiCarousel>
    </>
  );
};

export default Carousel;
