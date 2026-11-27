export default function RhinoLoader() {
  return (
    <picture>
      <source media="(prefers-reduced-motion: reduce)" srcSet="/zeal/rhino-run.png" />
      <img className="zeal-rhino-loader" src="/zeal/rhino-run.webp" width={180} height={102} alt="" />
    </picture>
  );
}
