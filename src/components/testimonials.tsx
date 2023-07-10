import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";
import category from "../assets/category.png";
import Image from "next/image";

const testimonials = new Array(6)
  .fill({
    name: "Wade Warren",
    role: "UI designer",
    avatar: category,
    comment:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
  })
  .map((testimonial, index) => {
    return { ...testimonial, name: testimonial.name + "  " + index };
  });

const Testimonials = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonial = testimonials[testimonialIndex];
  const handlePrevClick = () => {
    setTestimonialIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNextClick = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="mb-16 flex items-center justify-between">
      <button
        className="ml-4 flex h-12 w-12 items-center justify-center border-2 border-primary bg-white p-3"
        onClick={handlePrevClick}
      >
        <ArrowLeftIcon width="9" height="13" color="black" />
      </button>
      <div className="flex flex-col overflow-hidden px-6 py-4 md:px-28">
        <p className="mb-8 text-center text-3xl font-semibold">
          What Say Our Regular Customer
        </p>
        <div className="flex flex-col items-center text-center">
          <p className="mb-9 italic sm:text-lg">{testimonial.comment}</p>
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            className="mb-4 h-16 w-16 rounded-full"
          />
          <p className="text-sm">{testimonial.name}</p>
          <p className="text-xs">{testimonial.role}</p>
        </div>
      </div>
      <button
        className="mr-4 flex h-12 w-12 items-center justify-center border-2 border-primary bg-primary p-3"
        onClick={handleNextClick}
      >
        <ArrowRightIcon width="9" height="13" color="white" />
      </button>
    </div>
  );
};

export default Testimonials;
