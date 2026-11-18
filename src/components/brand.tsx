import { Sparkles } from "lucide-react";

export function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark" aria-hidden="true"><Sparkles size={18} /></span>
      <span>TALENT <span className="brand-accent">TO</span> IMPACT</span>
    </span>
  );
}
