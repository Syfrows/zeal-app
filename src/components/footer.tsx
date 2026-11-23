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
      <div className="flex justify-center gap-x-16 bg-[#191c20] px-4 py-16 text-primary-100 max-sm:flex-col max-sm:gap-y-10 sm:max-lg:gap-x-16 lg:gap-x-24">
        <div className="w-64">
          <div className="mb-5 flex">
            <Image
              src={logo}
              alt="RelaxZeal"
              className="mr-3"
              width={75}
              height={75}
            />
          </div>
          <address className="text-sm not-italic leading-relaxed text-primary-200">
            {addressText}
          </address>
          <div className="mt-5 flex space-x-3">
            <a
              href="https://instagram.com/zeal__wear?igshid=MWZjMTM2ODFkZg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zeal Wear on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors duration-200 ease-smooth hover:bg-accent"
            >
              <InstagramIcon width="10" height="10" color="white" />
            </a>
          </div>
        </div>
        <div className="flex flex-col space-y-2.5">
          <p className="mb-2 text-xl font-semibold text-white">Support</p>
          <Link
            className="w-fit text-primary-200 transition-colors duration-150 hover:text-white"
            href={"/contact-us"}
          >
            Contact Us
          </Link>
          <Link
            className="w-fit text-primary-200 transition-colors duration-150 hover:text-white"
            href={"/terms-and-conditions"}
          >
            Terms & Conditions
          </Link>
          <Link
            className="w-fit text-primary-200 transition-colors duration-150 hover:text-white"
            href={"/privacy-and-policy"}
          >
            Privacy Policy
          </Link>
          <Link
            className="w-fit text-primary-200 transition-colors duration-150 hover:text-white"
            href={"/cancellation-and-refund-policy"}
          >
            Cancellation and Refund Policy
          </Link>
          <Link
            className="w-fit text-primary-200 transition-colors duration-150 hover:text-white"
            href={"/return-policy"}
          >
            Return Policy
          </Link>
          <Link
            className="w-fit text-primary-200 transition-colors duration-150 hover:text-white"
            href={"/shipping-and-delivery"}
          >
            Shipping and Delivery
          </Link>
          <Link
            className="w-fit text-primary-200 transition-colors duration-150 hover:text-white"
            href={"/pricing-policy"}
          >
            Pricing Policy
          </Link>
        </div>
        <div className="flex flex-col space-y-2.5">
          <p className="mb-2 text-xl font-semibold text-white">Contact Us</p>
          <Link
            className="w-fit text-primary-200 transition-colors duration-150 hover:text-white"
            href={"tel:+919823144128"}
          >
            +91 9823144128
          </Link>
          <Link
            className="w-fit text-primary-200 transition-colors duration-150 hover:text-white"
            href={"mailto:zeal@relaxzeal.com"}
          >
            zeal@relaxzeal.com
          </Link>
          <address className="not-italic text-primary-200">
            344/345,Narhari Enclave,
            <br />N 1, Cidco, Maharashtra 431003
          </address>
        </div>
      </div>
      <div className="flex items-center justify-between bg-surface p-6 max-sm:flex-col max-sm:space-y-3">
        <p className="m-2 text-center text-sm text-slate-500">
          Copyright @2023 Relax-Zeal. All Rights Reserved By
          <span className="font-semibold text-primary-800"> Relax Zeal.</span>
        </p>
        <Image src={payment} alt={"payment"} className="h-4" />
      </div>
    </div>
  );
};

export default Footer;
