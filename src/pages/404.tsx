import Layout from "@/components/layout";
import ServiceNotice from "@/components/serviceNotice";
export default function NotFound() {
  return (
    <Layout>
      <ServiceNotice message="This page may have moved, or the link may be incomplete." />
    </Layout>
  );
}
