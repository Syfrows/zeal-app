import Link from "next/link";

export default function ServiceNotice({ message }: { message: string }) {
  return (
    <section className="service-notice" role="status">
      <p>{message}</p>
      <div>
        <Link href="/products">Browse activewear</Link>
        <Link href="/contact-us">Contact support</Link>
      </div>
    </section>
  );
}
