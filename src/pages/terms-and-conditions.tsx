import Layout from "@/components/layout";
import Link from "next/link";

const TermsConditions = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl p-4">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">1. User Responsibilities:</h2>
          <ul className="list-disc pl-4">
            <li>
              You are responsible for ensuring the accuracy of your personal
              information provided on our website.
            </li>
            <li>
              You agree not to use our website for any illegal or unauthorized
              purposes.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">2. Product Information:</h2>
          <ul className="list-disc pl-4">
            <li>
              We provide product information, including pricing and
              availability, to the best of our knowledge.
            </li>
            <li>
              Any warranties or guarantees offered on our products will be
              clearly stated.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">3. Payment Terms:</h2>
          <ul className="list-disc pl-4">
            <li>
              We accept payments through various methods, as indicated during
              the checkout process.
            </li>
            <li>
              Prices are listed in the currency displayed on the website, and
              any applicable taxes or shipping charges will be communicated
              during checkout.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">4. Order Placement:</h2>
          <p>
            To place an order, follow the instructions on our website. Orders
            are subject to acceptance and availability.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">5. Return Policy:</h2>
          <p>
            Our return policy is available{" "}
            <Link href="/return-policy" className="text-blue-500">
              here
            </Link>
            . Please review it for information on returns, exchanges, and
            refunds.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">6. Intellectual Property:</h2>
          <p>
            All content on this website, including logos and trademarks, is the
            property of ZealWear and protected by intellectual property laws.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">7. Privacy:</h2>
          <p>
            User data is collected in accordance with our Privacy Policy, which
            can be found{" "}
            <Link href="/privacy-and-policy" className="text-blue-500">
              here
            </Link>
            .
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">8. Termination:</h2>
          <p>
            We reserve the right to terminate user accounts or access to our
            website in case of violations of our terms and conditions.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">9. Dispute Resolution:</h2>
          <p>
            Any disputes will be resolved through arbitration or mediation as
            per the laws of India.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">10. Changes to Terms:</h2>
          <p>
            We may update or change these terms and conditions. It is your
            responsibility to review them periodically.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold">11. Contact Information:</h2>
          <p>
            For questions or concerns regarding our terms and conditions, please
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

export default TermsConditions;
