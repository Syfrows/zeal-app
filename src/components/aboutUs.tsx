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
    <div className="flex flex-col items-center sm:p-14">
      <p className="mb-12 text-3xl font-semibold">About Us</p>
      <div className="mb-28 flex">
        <p className="text-justify sm:text-2xl">{text}</p>
        <Image
          src={aboutus}
          alt="aboutus"
          className="ml-10 hidden h-[320] w-[530] lg:flex"
        />
      </div>
      <Image src={instaIcon} alt="instagram" />
      <p className="text-2xl font-semibold">
        Follow us in instagram @relax_zeal
      </p>
    </div>
  );
};

export default AboutUs;
