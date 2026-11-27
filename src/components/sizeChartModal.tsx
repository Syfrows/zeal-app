import Dialog from "@mui/material/Dialog";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { useState } from "react";

const guides = {
  Men: { heading: "Chest (in)", sizes: ["XS","S","M","L","XL","XXL","XXXL"], measures: ["34–35","36–37","38–39","40–41","42–43","44–45","46–47"], numerical: [36,38,40,42,44,46,48] },
  Women: { heading: "Bust (in)", sizes: ["XS","S","M","L","XL","XXL","XXXL"], measures: ["30–31","32–33","34–35","36–37","38–39","40–41","42–43"], numerical: [32,34,36,38,40,42,44] },
  Kids: { heading: "Age (years)", sizes: ["2","4","6","8","10","12","14"], measures: ["1–2","3–4","5–6","7–8","9–10","11–12","13–14"], numerical: [22,24,26,28,30,32,34] },
};
type Audience = keyof typeof guides;
const measurements: Record<string, Array<[string, string]>> = {
  Shorts: [["Waist", "Measure around the waistband of shorts that fit you."], ["Hip", "Wrap the tape around the fullest part of your hips."], ["Inseam", "Measure along the inner seam from crotch to hem."]],
  Pants: [["Waist", "Measure around your waist where the waistband sits."], ["Hip", "Measure around the fullest part of your hips."], ["Inside leg", "Measure a well-fitting pair from crotch seam to ankle hem."]],
  Jackets: [["Chest", "Measure around the fullest part of your chest over your usual base layer."], ["Shoulder", "Measure shoulder seam to shoulder seam on a jacket that fits."], ["Length", "Measure from the base of the collar to the hem."]],
  Tops: [["Bust", "Wrap the tape around the fullest part of your bust."], ["Length", "Measure from the top of the shoulder to your preferred hem."]],
  Bra: [["Bust", "Measure around the fullest part of the bust."], ["Underbust", "Measure snugly around the rib cage directly below the bust."]],
  Footwear: [["Foot length", "Stand on paper and mark your heel and longest toe. Measure between the marks in cm."], ["Width", "Measure across the widest part of the forefoot."], ["Both feet", "Use the larger foot when comparing measurements."]],
  Gloves: [["Palm circumference", "Wrap a tape around your knuckles with your thumb outside the loop."], ["Hand length", "Measure from the wrist crease to the tip of the middle finger."]],
};
export function guideType(slug: string, categories: string[]) {
  if (slug === "gym-gloves") return "Gloves";
  if (slug === "womens-sports-bra") return "Bra";
  if (categories.includes("Workout Tops")) return "Tops";
  return ["Shirts","Shorts","Jackets","Pants","Footwear"].find(type => categories.includes(type));
}
export default function SizeChartModal({ isVisible, setVisibility, type = "Shirts", name = "", sizes = [] }: {
  isVisible: boolean; setVisibility: (visible: boolean) => void; type?: string; name?: string; sizes?: string[];
}) {
  const [audience, setAudience] = useState<Audience>("Men");
  const chart = guides[audience];
  const garment = type === "Shirts";
  return <Dialog open={isVisible} onClose={() => setVisibility(false)} fullWidth maxWidth="xs" aria-labelledby="fit-heading">
    <section className="zeal-fit">
      <header><h2 id="fit-heading">{name || "T-shirt"} size guide</h2><button aria-label="Close size guide" onClick={() => setVisibility(false)}><CloseRounded /></button></header>
      {sizes.length > 0 && <p className="my-3">Listed sizes: {sizes.join(" · ")}</p>}
      {garment ? <>
        <div className="zeal-fit-tabs" role="group" aria-label="Choose size guide">{(Object.keys(guides) as Audience[]).map(key =>
          <button key={key} aria-pressed={audience === key} onClick={() => setAudience(key)}>{key}</button>)}</div>
        <table aria-label={audience + " T-shirt sizes"}><thead><tr><th>Indian size</th><th>{chart.heading}</th><th>Numerical size</th></tr></thead>
          <tbody>{chart.sizes.map((size,i) => <tr key={size}><th scope="row">{size}</th><td>{chart.measures[i]}</td><td>{chart.numerical[i]}</td></tr>)}</tbody>
        </table></> : <>
          <table className="my-4" aria-label={name + " measurements"}><thead><tr><th>Measurement</th><th>How to measure</th></tr></thead>
            <tbody>{measurements[type]?.map(([label, text]) => <tr key={label}><th scope="row">{label}</th><td>{text}</td></tr>)}</tbody>
          </table>
          <p>For exact sizing, <a className="underline text-accent" href={`mailto:zeal@relaxzeal.com?subject=${encodeURIComponent("Size enquiry: " + name)}`}>ask Zeal about this product</a> with your measurements.</p>
        </>}
    </section>
  </Dialog>;
}
