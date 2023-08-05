import React from "react";
import Image from "next/image";
import logo from "../assets/logoWhite.png";
import payment from "../assets/payment.png";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "./icons";

const Footer = () => {
  const addressText = `Relax-Zeal, a complete fitness mantra of the 21st century gives fitness a holistic view with its all encompassing approach in giving a healthy body and peaceful mind.`;
  return (
    <div>
      <div className="flex justify-center bg-primary px-4 py-14 text-white max-sm:flex-col max-sm:space-y-8 sm:max-lg:space-x-16 lg:space-x-24">
        <div className="w-64">
          <div className="mb-4 flex">
            <Image
              src={logo}
              alt="RelaxZeal"
              className="mr-3"
              width={75}
              height={75}
            />
          </div>
          <address>{addressText}</address>
          <div className="mt-3 flex space-x-4">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
              <FacebookIcon width="7" height="11" color="white" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
              <InstagramIcon width="10" height="10" color="white" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
              <TwitterIcon width="12" height="10" color="white" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
              <LinkedInIcon width="12" height="12" color="white" />
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <p className=" mb-4 text-xl font-semibold">Quick Link</p>
          <Link href={""}>Home</Link>
          <Link href={""}>Blog</Link>
          <Link href={""}>Carrer</Link>
          <Link href={""}>New Arrival</Link>
        </div>
        <div className="flex flex-col">
          <p className=" mb-4 text-xl font-semibold">Support</p>
          <Link href={""}>FAQ</Link>
          <Link href={""}>How it Works</Link>
          <Link href={""}>Features</Link>
          <Link href={""}>Contact</Link>
        </div>
        <div className="flex flex-col">
          <p className=" mb-4 text-xl font-semibold">Support</p>
          <Link href={"tel:9923088128"}>+91 9923088128</Link>
          <Link href={"mailto:info@relaxzeal.com"}>info@relaxzeal.com</Link>
          <p>37/1 Aleraza Market</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-6 max-sm:flex-col">
        <p className="m-2 text-center text-slate-500">
          Copyright @2023 Relax-Zeal. All Rights Reserved By
          <span className="font-semibold text-black"> Relax Zeal.</span>
        </p>
        <Image src={payment} alt={"payment"} className="h-4" />
      </div>
    </div>
  );
};

export default Footer;
