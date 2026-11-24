import Link from "next/link";

const groups = [
  { title: "Shop", links: [["All products", "/products"], ["Categories", "/#categories"], ["Our story", "/#about"]] },
  { title: "Customer care", links: [["Contact us", "/contact-us"], ["Shipping & delivery", "/shipping-and-delivery"], ["Return policy", "/return-policy"], ["Cancellations & refunds", "/cancellation-and-refund-policy"]] },
  { title: "Policies", links: [["Pricing", "/pricing-policy"], ["Privacy", "/privacy-and-policy"], ["Terms & conditions", "/terms-and-conditions"]] },
];
export default function Footer() {
  return <footer className="store-footer"><div className="zeal-shell">
    <div className="footer-grid"><div><Link href="/" className="footer-wordmark">Zeal Wear</Link>
      <address><a href="mailto:zeal@relaxzeal.com">zeal@relaxzeal.com</a><a href="tel:+919823144128">+91 98231 44128</a>
      344/345, Narhari Enclave<br/>N-1, CIDCO, Maharashtra 431003</address></div>
      {groups.map(({title,links})=><nav key={title} aria-label={title+" footer links"}><h2>{title}</h2>{links.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}</nav>)}
    </div><div className="footer-base"><small>© {new Date().getFullYear()} RelaxZeal. All rights reserved.</small><a href="https://www.instagram.com/zeal__wear/">Instagram ↗</a></div>
  </div></footer>;
}
