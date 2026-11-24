import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="zeal-story">
      <div className="zeal-story-photo">
        <Image src="/zeal/story.webp" alt="Two runners resting on sunlit stone steps after training" fill sizes="(max-width: 720px) 100vw, 52vw" />
      </div>
      <div className="zeal-story-copy">
        <p className="zeal-story-label">About Zeal Wear</p>
        <h2>Movement is for everyone.</h2>
        <p>Zeal Wear grew out of RelaxZeal’s work in physical and mental well-being. Our activewear brings that same approach to what you wear for a run, a yoga class, or a walk around the block.</p>
        <div className="zeal-story-links">
          <Link href="/products">Explore the collection <span aria-hidden="true">↗</span></Link>
          <a href="https://instagram.com/zeal__wear">@zeal__wear</a>
        </div>
      </div>
    </div>
  );
}
