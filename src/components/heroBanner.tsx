import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const slides = [
  { image: "hero.webp", title: "Built for", accent: "the work.", text: "Activewear for the early starts, the extra reps, and everything in between.", href: "/products", action: "Shop the collection" },
  { image: "catalog/footwear-cat.webp", title: "Ready to", accent: "run.", text: "Explore running shoes and cross-trainers for your next session.", href: "/products?filter=4", action: "Shop footwear" },
  { image: "catalog/accessories-cat.webp", title: "Pack your", accent: "kit.", text: "Gym bags and training gloves for the trip from home to the gym.", href: "/products?filter=5", action: "Shop accessories" },
];

export default function HeroBanner() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  function move(delta: number) {
    const el = track.current;
    if (el) el.scrollTo({ left: ((active + delta + slides.length) % slides.length) * el.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  return <section aria-label="Featured activewear" className="hero-banner">
    <div className="hero-track" ref={track} onScroll={e => setActive(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}>
      {slides.map((slide, i) => { const Heading = i === 0 ? "h1" : "h2"; return <article key={slide.href} className="zeal-hero">
        <Image src={"/zeal/"+slide.image} alt="" fill sizes="100vw" priority={i === 0} />
        <div className="zeal-shell zeal-hero-content"><p className="zeal-eyebrow">Activewear by RelaxZeal</p>
          <Heading className="hero-title">{slide.title}<br/><em>{slide.accent}</em></Heading>
          <p className="zeal-hero-description">{slide.text}</p><div className="zeal-hero-actions">
          <Link className="zeal-button zeal-button-lime" href={slide.href}>{slide.action}</Link>
          {i === 0 && <Link className="zeal-button zeal-button-outline" href="#categories">Browse categories</Link>}</div>
        </div></article>; })}
    </div><div className="hero-controls"><button aria-label="Previous banner" onClick={()=>move(-1)}>←</button><span aria-live="polite">{active+1} / {slides.length}</span><button aria-label="Next banner" onClick={()=>move(1)}>→</button></div>
  </section>;
}
