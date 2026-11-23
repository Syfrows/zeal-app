import Layout from "@/components/layout";
import Link from "next/link";

export default function ReturnDetails() {
  return (
    <Layout>
      <section className="service-notice">
        <h2>Request a return</h2>
        <p>
          Email the support team with your order number, the item and the reason
          for your return. They will confirm eligibility and send the next
          steps.
        </p>
        <div>
          <a href="mailto:zeal@relaxzeal.com?subject=Return%20request">
            Email returns support
          </a>
          <Link href="/return-policy">Read the return policy</Link>
        </div>
      </section>
    </Layout>
  );
}
