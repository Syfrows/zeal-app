import Layout from "@/components/layout";
import React from "react";

const PricingPolicy = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl p-4">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">1. Product Pricing:</h2>
          <ul className="list-disc pl-4">
            <li>
              All product prices are listed in the currency displayed on the
              website.
            </li>
            <li>
              We aim to offer competitive and transparent pricing for all our
              items.
            </li>
            <li>
              Prices are subject to change without notice. However, your order
              will be charged at the price listed at the time of purchase.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">2. Additional Charges:</h2>
          <ul className="list-disc pl-4">
            <li>
              In addition to the product price, there may be applicable taxes,
              which will be clearly communicated during the checkout process.
            </li>
            <li>
              Shipping charges, if applicable, will also be displayed before you
              complete your order. We may offer free shipping under certain
              conditions.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">
            3. Promotions and Discounts:
          </h2>
          <ul className="list-disc pl-4">
            <li>
              We may run promotions or offer discounts on selected items. These
              promotions will have their terms and conditions clearly stated.
            </li>
            <li>
              Promotional codes can be applied during checkout for eligible
              products.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">4. Payment Methods:</h2>
          <ul className="list-disc pl-4">
            <li>
              We accept various payment methods, including credit cards, debit
              cards, and other secure online payment options.
            </li>
            <li>
              All payment transactions are processed securely to protect your
              financial information.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">5. Currency Conversion:</h2>
          <ul className="list-disc pl-4">
            <li>
              If you are making a purchase from a region with a different
              currency, the final price in your local currency may vary slightly
              due to currency conversion rates and fees imposed by your
              financial institution.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">6. Pricing Errors:</h2>
          <ul className="list-disc pl-4">
            <li>
              In the event of a pricing error on our website, we reserve the
              right to cancel orders for the affected items or offer the option
              to purchase at the corrected price.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">7. Contact Information:</h2>
          <p>
            If you have any questions or concerns regarding our pricing, please
            contact us at{" "}
            <a href="mailto:zeal@relaxzeal.com" className="text-blue-500">
              zeal@relaxzeal.com
            </a>{" "}
            or{" "}
            <a href="tel:+919823144128" className="text-blue-500">
              +91 9823144128
            </a>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPolicy;
