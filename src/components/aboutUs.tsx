import Image from "next/image";
import React from "react";
import aboutus from "../assets/aboutus.png";
import instaIcon from "../assets/instaIcon.png";

const AboutUs = () => {
  const text = `At Relaxzeal, we're committed to helping you prioritize your
  well-being, so you can live your best life. We also provide training
  and guidance for your mental and physical health. And now, we're
  thrilled to introduce our new line of fitness products, "Zeal",
  designed to help you look and feel your best as you work towards your
  goals. With a focus on quality and comfort, our Zeal sports wear is
  perfect for any activity, from yoga to running and beyond. At
  Relaxzeal, we believe that wellness is a journey, and we're here to
  support you every step of the way.`;

  return (
    <div className="flex flex-col items-center rounded-xl2 bg-surface sm:p-14">
      <p className="mb-12 text-2xl font-bold text-primary-800 sm:text-3xl">
        About Us
      </p>
      <div className="mb-20 flex items-center">
        <p className="text-justify leading-relaxed text-slate-600 sm:text-xl">
          {text}
        </p>
        <Image
          src={aboutus}
          alt="aboutus"
          className="ml-10 hidden h-[320] w-[530] rounded-xl2 shadow-card lg:flex"
        />
      </div>
      <a
        href="https://instagram.com/zeal__wear?igshid=MWZjMTM2ODFkZg=="
        target="_blank"
        className="group flex flex-col items-center text-center transition-transform duration-200 ease-smooth hover:-translate-y-0.5"
      >
        <Image src={instaIcon} alt="instagram" />
        <p className="text-xl font-semibold text-primary-800 group-hover:text-accent sm:text-2xl">
          Follow us on Instagram @zeal__wear
        </p>
      </a>
    </div>
  );
};

export default AboutUs;
