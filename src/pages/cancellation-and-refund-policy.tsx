import Layout from "@/components/layout";
import Link from "next/link";
import React from "react";

const CancellationRefundPolicy = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl p-4">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">1. Cancellation Policy:</h2>
          <p>
            You can cancel your order before it ships. To cancel, contact our
            customer support at{" "}
            <a href="mailto:zeal@relaxzeal.com" className="text-blue-500">
              zeal@relaxzeal.com
            </a>{" "}
            or{" "}
            <a href="tel:+917057923102" className="text-blue-500">
              +91 7057923102
            </a>
            .
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">2. Refund Policy:</h2>
          <p>
            Refunds will be processed according to our Return Policy. Please
            review it{" "}
            <Link href="/return-policy" className="text-blue-500">
              here
            </Link>
            .
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">3. Contact Information:</h2>
          <p>
            For questions or assistance with cancellations and refunds, please
            contact us at{" "}
            <a href="mailto:zeal@relaxzeal.com" className="text-blue-500">
              zeal@relaxzeal.com
            </a>{" "}
            or{" "}
            <a href="tel:+917057923102" className="text-blue-500">
              +91 7057923102
            </a>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default CancellationRefundPolicy;
