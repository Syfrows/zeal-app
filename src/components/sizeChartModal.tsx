import Dialog from "@mui/material/Dialog";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { useState } from "react";

const guides = {
  Men: { heading: "Chest (in)", sizes: ["XS","S","M","L","XL","XXL","XXXL"], measures: ["34–35","36–37","38–39","40–41","42–43","44–45","46–47"], numerical: [36,38,40,42,44,46,48] },
  Women: { heading: "Bust (in)", sizes: ["XS","S","M","L","XL","XXL","XXXL"], measures: ["30–31","32–33","34–35","36–37","38–39","40–41","42–43"], numerical: [32,34,36,38,40,42,44] },
  Kids: { heading: "Age (years)", sizes: ["2","4","6","8","10","12","14"], measures: ["1–2","3–4","5–6","7–8","9–10","11–12","13–14"], numerical: [22,24,26,28,30,32,34] },
};
type Audience = keyof typeof guides;
export default function SizeChartModal({ isVisible, setVisibility }: {
  isVisible: boolean; setVisibility: (visible: boolean) => void;
}) {
  const [audience, setAudience] = useState<Audience>("Men");
  const chart = guides[audience];
  return <Dialog open={isVisible} onClose={() => setVisibility(false)} fullWidth maxWidth="xs" aria-labelledby="fit-heading">
    <section className="zeal-fit">
      <header><h2 id="fit-heading">T-shirt size guide</h2><button aria-label="Close size guide" onClick={() => setVisibility(false)}><CloseRounded /></button></header>
      <div className="zeal-fit-tabs" role="group" aria-label="Choose size guide">{(Object.keys(guides) as Audience[]).map(key =>
        <button key={key} aria-pressed={audience === key} onClick={() => setAudience(key)}>{key}</button>)}</div>
      <table aria-label={audience + " T-shirt sizes"}><thead><tr><th>Indian size</th><th>{chart.heading}</th><th>Numerical size</th></tr></thead>
        <tbody>{chart.sizes.map((size,i) => <tr key={size}><th scope="row">{size}</th><td>{chart.measures[i]}</td><td>{chart.numerical[i]}</td></tr>)}</tbody>
      </table>
    </section>
  </Dialog>;
}
