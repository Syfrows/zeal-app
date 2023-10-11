import Layout from "@/components/layout";

const ContactUS = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl p-4">
        <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>

        <p>
          We are here to assist you. If you have any questions or concerns,
          please do not hesitate to reach out to us:
        </p>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">Contact Information:</h2>
          <ul className="list-disc pl-4">
            <li>
              Email:{" "}
              <a href="mailto:zeal@relaxzeal.com" className="text-blue-500">
                zeal@relaxzeal.com
              </a>
            </li>
            <li>Phone: +91 7057923102</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">Customer Support:</h2>
          <p>
            Our customer support team is available during our business hours,
            10:00 am to 8:00 pm.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUS;
