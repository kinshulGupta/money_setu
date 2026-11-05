import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SliderRow from "@/components/hero/SliderRow";
import { useLerp } from "@/lib/useLerp";
import { emiFor, inr, inrCompact, sipFutureValue } from "@/lib/format";

const AMOUNT = { min: 500000, max: 50000000, step: 100000 };
const SIP = { min: 5000, max: 500000, step: 1000 };

export default function LoanVisualizer() {
  const [mode, setMode] = useState("emi");
  const [amount, setAmount] = useState(2500000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(11.5);
  const [sipYears, setSipYears] = useState(10);
  const [sipReturn, setSipReturn] = useState(12);

  const monthly = mode === "emi" ? emiFor(amount, rate, years) : sipFutureValue(amount, sipReturn, sipYears);
  const lerped = useLerp(monthly);
  const total = mode === "emi" ? monthly * years * 12 : amount * sipYears * 12;
  const interest = Math.max(0, total - (mode === "emi" ? amount : amount * sipYears * 12));

  return (
    <div className="relative">
      {/* Floating live sanction badge */}
      <div className="absolute -top-5 right-1 z-20 flex items-center gap-2 rounded-full border border-emerald-500/25 bg-[#0B1216]/95 px-3 py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:right-4">
        <span className="relative flex h-1.5 w-1.5">
          <span className="ms-beacon absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">
          Sanctioned <span className="text-emerald-300">₹25,00,000</span>
          <span className="hidden sm:inline"> · Working Capital Line · Partner NBFC</span>
        </span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#141A1F] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
              Live workspace
            </p>
            <h2 className="mt-1 font-heading text-sm font-semibold text-white">
              Loan EMI & SIP Visualizer
            </h2>
          </div>
          <div className="flex rounded-full border border-white/10 bg-[#0B0F12] p-0.5">
            {[
              { key: "emi", label: "Loan" },
              { key: "sip", label: "SIP" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setMode(tab.key)}
                className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                  mode === tab.key
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/[0.07] bg-[#0E1418] p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
            {mode === "emi" ? "Estimated monthly outflow" : "Projected corpus"}
          </p>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span
              className="font-mono text-[28px] font-semibold leading-none text-emerald-300 sm:text-[32px]"
              style={{ textShadow: "0 0 26px rgba(16,185,129,0.35)" }}
            >
              {inr(lerped)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
              {mode === "emi" ? "/ month" : `in ${sipYears} yrs`}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
                {mode === "emi" ? "Total interest" : "Invested"}
              </p>
              <p className="mt-1 font-mono text-[12px] text-slate-300">
                {inrCompact(mode === "emi" ? interest : amount * sipYears * 12)}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
                {mode === "emi" ? "Total payable" : "Est. gains"}
              </p>
              <p className="mt-1 font-mono text-[12px] text-slate-300">{inrCompact(total)}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {mode === "emi" ? (
            <>
              <SliderRow
                label="Facility amount"
                value={inrCompact(amount)}
                min={AMOUNT.min}
                max={AMOUNT.max}
                step={AMOUNT.step}
                raw={amount}
                onChange={setAmount}
              />
              <SliderRow
                label="Tenure"
                value={`${years} yrs`}
                min={1}
                max={20}
                step={1}
                raw={years}
                onChange={setYears}
              />
              <SliderRow
                label="Indicative rate"
                value={`${rate.toFixed(1)}%`}
                min={8}
                max={20}
                step={0.1}
                raw={rate}
                onChange={setRate}
              />
            </>
          ) : (
            <>
              <SliderRow
                label="Monthly SIP"
                value={inrCompact(amount)}
                min={SIP.min}
                max={SIP.max}
                step={SIP.step}
                raw={amount}
                onChange={setAmount}
              />
              <SliderRow
                label="Horizon"
                value={`${sipYears} yrs`}
                min={1}
                max={30}
                step={1}
                raw={sipYears}
                onChange={setSipYears}
              />
              <SliderRow
                label="Expected return"
                value={`${sipReturn.toFixed(1)}%`}
                min={6}
                max={18}
                step={0.5}
                raw={sipReturn}
                onChange={setSipReturn}
              />
            </>
          )}
        </div>

        <p className="mt-4 font-mono text-[9px] leading-relaxed tracking-[0.06em] text-slate-600">
          Illustrative only. Final pricing and tenure are set by the partner lending institution.
        </p>
      </div>

      {/* Floating trust pill */}
      <div className="absolute -bottom-5 left-1 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-[#0B1216]/95 px-3.5 py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:left-4">
        <ArrowUpRight className="h-3 w-3 text-emerald-400" />
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-300">
          40+ RBI-regulated lending partners
        </span>
      </div>
    </div>
  );
}