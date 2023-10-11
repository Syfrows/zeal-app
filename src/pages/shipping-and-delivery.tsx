import Layout from "@/components/layout";

const ShippingDelivery = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl p-4">
        <h1 className="mb-4 text-3xl font-bold">Shipping and Delivery</h1>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">1. Shipping Information:</h2>
          <ul className="list-disc pl-4">
            <li>
              We offer shipping to all over India with estimated delivery times
              of 4-5 days.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">2. Tracking:</h2>
          <ul className="list-disc pl-4">
            <li>
              You can track your order through the provided tracking number.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">3. Delivery Charges:</h2>
          <ul className="list-disc pl-4">
            <li>
              Shipping fees, if applicable, will be communicated during the
              checkout process. We may offer free shipping under certain
              conditions.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">4. Delay or Issues:</h2>
          <ul className="list-disc pl-4">
            <li>
              In case of delayed or damaged deliveries, please contact our
              customer support for assistance.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">5. Contact Information:</h2>
          <p>
            For shipping-related inquiries, please contact us at{" "}
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

export default ShippingDelivery;
