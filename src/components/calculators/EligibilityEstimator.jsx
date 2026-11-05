import { useState } from "react";
import { Info } from "lucide-react";
import SliderRow from "@/components/hero/SliderRow";
import { inr, inrCompact } from "@/lib/format";
import { openEnquiry } from "@/lib/enquiry";

export default function EligibilityEstimator() {
  const [turnover, setTurnover] = useState(18000000);
  const [obligation, setObligation] = useState(45000);
  const [years, setYears] = useState(5);

  const monthlyTurnover = turnover / 12;
  const serviceable = Math.max(0, monthlyTurnover * 0.45 - obligation);
  const monthlyRate = 12.5 / 12 / 100;
  const n = years * 12;
  const eligible = serviceable > 0
    ? (serviceable * (Math.pow(1 + monthlyRate, n) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, n))
    : 0;
  const capped = Math.min(eligible, 500000000);

  return (
    <div className="rounded-xl border border-white/10 bg-[#141A1F] p-6">
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
          Indicative sizing
        </p>
        <h2 className="mt-1 font-heading text-lg font-semibold text-white">
          Working capital eligibility estimator
        </h2>
        <p className="mt-2 text-[12.5px] leading-relaxed text-slate-500">
          A directional read on serviceable debt, based on turnover and existing obligations.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <SliderRow
          label="Annual turnover"
          value={inrCompact(turnover)}
          min={2500000}
          max={500000000}
          step={500000}
          raw={turnover}
          onChange={setTurnover}
        />
        <SliderRow
          label="Existing monthly EMI"
          value={inrCompact(obligation)}
          min={0}
          max={500000}
          step={5000}
          raw={obligation}
          onChange={setObligation}
        />
        <SliderRow
          label="Desired tenure"
          value={`${years} yrs`}
          min={1}
          max={10}
          step={1}
          raw={years}
          onChange={setYears}
        />
      </div>

      <div className="mt-6 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-400/80">
          Indicative facility up to
        </p>
        <p
          className="mt-1.5 font-mono text-[26px] font-semibold leading-none text-emerald-300"
          style={{ textShadow: "0 0 26px rgba(16,185,129,0.3)" }}
        >
          {inr(capped)}
        </p>
        <p className="mt-2 font-mono text-[10px] text-slate-400">
          Serviceable surplus {inrCompact(serviceable)} / month
        </p>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/[0.07] bg-[#0E1418] p-3">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
        <p className="font-mono text-[9px] leading-relaxed tracking-[0.04em] text-slate-500">
          Assumes 45% of monthly turnover available for debt service at 12.5% over the selected
          tenure. Final eligibility is assessed by the partner lender against GST, banking and
          bureau data.
        </p>
      </div>

      <button
        type="button"
        onClick={() => openEnquiry({ service: "Loans & Credit Facilitation", source: "eligibility-estimator" })}
        className="mt-4 w-full rounded-full bg-emerald-500 px-5 py-3 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-[#04140E] transition-colors hover:bg-emerald-400"
      >
        Get a precise assessment
      </button>
    </div>
  );
}