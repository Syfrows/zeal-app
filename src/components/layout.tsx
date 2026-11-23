import React, { PropsWithChildren } from "react";
import NavBar from "./navBar";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "./footer";

const titles: Record<string, string> = {
  "/products": "Shop activewear",
  "/product-details": "Product details",
  "/cart": "Shopping bag",
  "/wishlist": "Wishlist",
  "/address": "Addresses",
  "/order-confirmation": "Checkout",
  "/confirmation": "Order confirmation",
  "/account-information": "Account details",
  "/my-orders": "My orders",
  "/order-details": "Order details",
  "/return-details": "Returns",
  "/contact-us": "Contact us",
  "/terms-and-conditions": "Terms and conditions",
  "/cancellation-and-refund-policy": "Cancellations and refunds",
  "/return-policy": "Return policy",
  "/shipping-and-delivery": "Shipping and delivery",
  "/privacy-and-policy": "Privacy policy",
  "/pricing-policy": "Pricing policy",
  "/404": "Page not found",
};
const Layout = ({
  children,
  flush = false,
}: PropsWithChildren<{ flush?: boolean }>) => {
  const router = useRouter();
  const title = titles[router.pathname];
  const support =
    /policy|terms-and-conditions|contact-us|shipping-and-delivery/.test(
      router.pathname
    );
  return (
    <div className="mx-auto min-h-screen bg-white">
      <a href="#main-content" className="zeal-skip">
        Skip to content
      </a>
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      {title && (
        <Head>
          <title>{title} | Zeal Wear</title>
        </Head>
      )}
      {!flush && title && (
        <header className="zeal-mast">
          <div className="zeal-shell">
            <Link href="/">Zeal Wear</Link>
            <h1>{title}</h1>
          </div>
        </header>
      )}
      <main
        id="main-content"
        tabIndex={-1}
        className={
          flush
            ? "grow"
            : `zeal-shell zeal-interior ${support ? "zeal-support" : ""}`
        }
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
