import React, { useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";
import Image from "next/image";
import hero from "../assets/hero.png";
import { useRouter } from "next/router";

const slides = [
  {
    src: hero,
  },
  {
    src: hero,
  },
  {
    src: hero,
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSlideClick = (index: any) => {
    setCurrentSlide(index);
  };

  const handlePrevClick = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-96">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute h-full w-full ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
          onClick={() => router.push("/products")}
        >
          <Image
            src={slide.src}
            alt="RelaxZeal"
            className="h-full w-full object-contain"
          />
        </div>
      ))}

      <div className="absolute bottom-0 left-0 right-0 mb-4 flex items-center justify-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => handleSlideClick(index)}
            className={`mx-2 flex cursor-pointer items-center justify-center rounded-full border-2 border-primary ${
              currentSlide === index ? "h-4 w-4" : "h-3 w-3"
            }`}
          >
            {currentSlide === index && (
              <div className="h-2 w-2 rounded-full bg-gray-800" />
            )}
          </div>
        ))}
      </div>

      <div className="flex h-full items-center">
        <button
          onClick={handlePrevClick}
          className="absolute left-0 z-10 ml-4 border-2 border-primary bg-white p-3"
        >
          <ArrowLeftIcon width="9" height="13" color="black" />
        </button>
        <button
          onClick={handleNextClick}
          className="absolute right-0 z-10 mr-4 border-2 border-primary bg-primary p-3"
        >
          <ArrowRightIcon width="9" height="13" color="white" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
