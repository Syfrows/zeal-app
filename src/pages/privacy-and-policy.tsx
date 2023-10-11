import Layout from "@/components/layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl p-4">
        <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>

        <p className="mb-4">
          At ZealWear, we value your privacy. This Privacy Policy explains how
          we collect, use, and protect your personal information. By using our
          website, you consent to the practices outlined herein.
        </p>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">1. Information Collection:</h2>
          <ul className="list-disc pl-4">
            <li>
              We collect personal information, including names, contact details,
              and payment information, to process orders and provide customer
              support.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">2. Data Usage:</h2>
          <p>
            We use collected data for order processing, customer support, and
            marketing purposes, with your consent.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">3. Data Protection:</h2>
          <p>
            We employ security measures to protect your data from unauthorized
            access or disclosure.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">4. Third-Party Sharing:</h2>
          <p>
            We may share your data with trusted third parties for order
            fulfillment and marketing purposes.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">5. Cookies:</h2>
          <p>
            Our website uses cookies for functionality and analytics. You can
            manage cookie preferences in your browser settings.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">6. User Rights:</h2>
          <p>
            You have the right to access, correct, or delete your personal data.
            Contact us to exercise these rights.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">7. Contact Information:</h2>
          <p>
            For privacy-related inquiries or requests, please contact us at{" "}
            <a href="mailto:zeal@relaxzeal.com" className="text-blue-500">
              zeal@relaxzeal.com
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
