import { useEffect, useState } from "react";
import { BadgeCheck, X } from "lucide-react";

const EVENTS = [
  { amount: "₹25,00,000", type: "Working capital line", partner: "Partner NBFC", time: "38h to sanction" },
  { amount: "₹1,40,00,000", type: "Machinery term loan", partner: "Private bank", time: "5 days to sanction" },
  { amount: "₹75,00,000", type: "CGTMSE collateral-free", partner: "Public sector bank", time: "CGTMSE backed" },
  { amount: "₹8,50,000", type: "Professional OD facility", partner: "Partner NBFC", time: "29h to sanction" },
];

export default function SocialProofToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible || dismissed) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % EVENTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [visible, dismissed]);

  if (!visible || dismissed) return null;
  const item = EVENTS[index];

  return (
    <div
      key={index}
      className="ms-rise fixed bottom-4 left-4 z-[70] w-[280px] rounded-xl border border-white/12 bg-[#141A1F]/95 p-3.5 shadow-[0_18px_60px_-18px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:bottom-6 sm:left-6"
      role="status"
      aria-live="polite"
    >
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute right-2 top-2 text-slate-600 transition-colors hover:text-slate-300"
      >
        <X className="h-3 w-3" />
      </button>
      <div className="flex items-center gap-2">
        <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" />
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
          Recently facilitated
        </span>
      </div>
      <p className="mt-2 font-mono text-[16px] font-semibold text-white">{item.amount}</p>
      <p className="mt-0.5 text-[11.5px] leading-snug text-slate-400">{item.type}</p>
      <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.07] pt-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-slate-600">
          {item.partner}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-emerald-400/80">
          {item.time}
        </span>
      </div>
    </div>
  );
}