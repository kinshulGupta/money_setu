import { useRef } from "react";
import {
  ArrowUpRight,
  Building2,
  Calculator,
  Landmark,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { openEnquiry } from "@/lib/enquiry";

const VERTICALS = [
  {
    icon: Landmark,
    title: "Loans & Credit Facilitation",
    points: ["Term loans, working capital, machinery funding", "CGTMSE collateral-free cover"],
    accent: "jade",
  },
  {
    icon: Calculator,
    title: "Direct & Indirect Taxation",
    points: ["Corporate ITR, advance tax, notices", "GST filings & reconciliation"],
    accent: "jade",
  },
  {
    icon: Building2,
    title: "Business Setup & Corporate Law",
    points: ["Pvt Ltd, LLP, Udyam, trademark", "Startup India tax structuring"],
    accent: "jade",
  },
  {
    icon: TrendingUp,
    title: "Virtual CFO & Reporting",
    points: ["MIS, unit economics, runway", "Cash-flow modelling"],
    accent: "jade",
  },
  {
    icon: Scale,
    title: "Valuation & Transaction Advisory",
    points: ["Statutory Rule 11UA & ESOP pricing", "DCF via registered valuers"],
    accent: "champagne",
    wide: true,
  },
  {
    icon: ShieldCheck,
    title: "Wealth & Risk Facilitation",
    points: ["Keyman & group health cover", "Treasury & SIP planning"],
    accent: "jade",
  },
];

function VerticalCard({ item, index, className = "" }) {
  const ref = useRef(null);
  const Icon = item.icon;
  const champagne = item.accent === "champagne";

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  return (
    <Reveal delay={index * 60} className={className}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        className={`ms-spotlight group flex h-full flex-col rounded-xl border border-white/10 bg-[#141A1F] p-6 transition-all duration-300 hover:-translate-y-1 ${
          champagne ? "hover:border-[#C5A880]/45" : "hover:border-emerald-500/40"
        }`}
      >
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
            champagne
              ? "border-[#C5A880]/30 bg-[#C5A880]/[0.08] text-[#C5A880]"
              : "border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-400"
          }`}
        >
          <Icon className="h-4 w-4" strokeWidth={1.6} />
        </span>

        <h3 className="mt-5 font-heading text-[17px] font-semibold leading-snug text-white">
          {item.title}
        </h3>

        <ul className="mt-3.5 flex-1 space-y-2">
          {item.points.map((point) => (
            <li key={point} className="flex gap-2 text-[13px] leading-relaxed text-slate-400">
              <span className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${champagne ? "bg-[#C5A880]" : "bg-emerald-500"}`} />
              {point}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => openEnquiry({ service: item.title, source: "practice-grid" })}
          className={`mt-6 inline-flex items-center gap-1.5 self-start font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
            champagne ? "text-[#C5A880] hover:text-[#E4D2B0]" : "text-emerald-400 hover:text-emerald-300"
          }`}
        >
          Enquire
          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </Reveal>
  );
}

export default function PracticeVerticals() {
  return (
    <section id="practice" className="relative border-t border-white/10 bg-[#0B0F12] py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-500">
            02 — Practice Verticals
          </span>
          <h2 className="mt-4 font-heading text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Six disciplines. One accountable desk.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
            Every mandate is scoped, documented and owned by a named advisor.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VERTICALS.map((item, index) => (
            <VerticalCard
              key={item.title}
              item={item}
              index={index}
              className={item.wide ? "lg:col-span-2" : ""}
            />
          ))}

          <Reveal delay={360}>
            <div className="flex h-full flex-col justify-between rounded-xl border border-emerald-500/25 bg-emerald-500/[0.05] p-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
                  Compliance by design
                </p>
                <p className="mt-4 font-heading text-[17px] font-semibold leading-snug text-white">
                  Sanctioned by RBI-regulated lenders. Certified by IBBI valuers.
                </p>
              </div>
              <p className="mt-4 text-[12.5px] leading-relaxed text-slate-400">
                DPDP-compliant documentation, with consent-based access for your credit team.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}