import Layout from "@/components/layout";

const ReturnPolicy = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl p-4">
        <h1 className="mb-4 text-3xl font-bold">Return Policy</h1>

        <p className="mb-6">
          At ZealWear, we want you to be completely satisfied with your
          purchase. If you are not happy with your purchase for any reason, you
          may return it in accordance with the following guidelines:
        </p>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">
            1. Eligibility for Returns:
          </h2>
          <ul className="list-disc pl-4">
            <li>You may return items within 7 days of the date of delivery.</li>
            <li>
              To be eligible for a return, the item must be in its original
              condition, unused, and with all tags and packaging intact.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">
            2. How to Initiate a Return:
          </h2>
          <ul className="list-disc pl-4">
            <li>
              To initiate a return, please contact our customer support team at{" "}
              <a href="mailto:zeal@relaxzeal.com" className="text-blue-500">
                zeal@relaxzeal.com
              </a>{" "}
              or{" "}
              <a href="tel:+917057923102" className="text-blue-500">
                +91 7057923102
              </a>
              .
            </li>
            <li>
              Provide your order number and a detailed reason for the return.
            </li>
            <li>
              Our customer support team will guide you through the return
              process and provide you with a return authorization if applicable.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">3. Return Shipping:</h2>
          <ul className="list-disc pl-4">
            <li>You are responsible for shipping the item back to us.</li>
            <li>
              Please pack the item securely to prevent damage during transit.
            </li>
            <li>We recommend using a trackable and insured shipping method.</li>
            <li>
              Shipping costs for returns are your responsibility unless the
              return is due to our error or a defective product.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">
            4. Inspection and Processing:
          </h2>
          <ul className="list-disc pl-4">
            <li>
              Once we receive the returned item, our team will inspect it to
              ensure it meets the return eligibility criteria.
            </li>
            <li>
              If the return is approved, we will process your refund or exchange
              within 7 business days.
            </li>
            <li>
              Refunds will be issued to the original payment method used for the
              purchase.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">
            5. Refund and Exchange Options:
          </h2>
          <ul className="list-disc pl-4">
            <li>
              You can choose to receive a refund to your original payment method
              or store credit.
            </li>
            <li>
              If you prefer an exchange, we will send the replacement item as
              soon as the return is processed.
            </li>
            <li>
              Please note that some items may not be eligible for exchanges due
              to availability.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">6. Non-Returnable Items:</h2>
          <ul className="list-disc pl-4">
            <li>Certain items are not eligible for return, including:</li>
            <ul className="list-disc pl-8">
              <li>Items marked as final sale.</li>
              <li>Personalized or custom-made products.</li>
              <li>Undergarments and swimwear (for hygiene reasons).</li>
            </ul>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">
            7. Damaged or Defective Items:
          </h2>
          <ul className="list-disc pl-4">
            <li>
              If you receive a damaged or defective item, please contact us
              immediately.
            </li>
            <li>
              We will arrange for a replacement or provide further instructions
              on resolving the issue.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">8. Contact Information:</h2>
          <p>
            For any questions or concerns regarding our return policy, please
            reach out to us at{" "}
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

export default ReturnPolicy;
