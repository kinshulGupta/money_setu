import { useState } from "react";
import SliderRow from "@/components/hero/SliderRow";
import { emiFor, inr, inrCompact } from "@/lib/format";

export default function RepaymentSchedule() {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(11);
  const [years, setYears] = useState(7);

  const emi = emiFor(amount, rate, years);
  const months = years * 12;
  const totalPayable = emi * months;
  const totalInterest = totalPayable - amount;
  const principalShare = (amount / totalPayable) * 100;

  const rows = [];
  let balance = amount;
  const monthlyRate = rate / 12 / 100;
  for (let i = 1; i <= Math.min(12, months); i += 1) {
    const interest = balance * monthlyRate;
    const principal = emi - interest;
    balance = Math.max(0, balance - principal);
    rows.push({ month: i, interest, principal, balance });
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#141A1F] p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
            Facility amortisation
          </p>
          <h2 className="mt-1 font-heading text-lg font-semibold text-white">
            EMI & repayment schedule
          </h2>
        </div>
        <p className="font-mono text-[11px] text-slate-500">{months} instalments</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <SliderRow
            label="Facility amount"
            value={inrCompact(amount)}
            min={500000}
            max={50000000}
            step={100000}
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

          <div className="rounded-lg border border-white/[0.07] bg-[#0E1418] p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
              Monthly EMI
            </p>
            <p className="mt-1 font-mono text-[26px] font-semibold leading-none text-emerald-300">
              {inr(emi)}
            </p>
            <div className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${principalShare}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.1em]">
              <span className="text-emerald-400">Principal {principalShare.toFixed(0)}%</span>
              <span className="text-slate-500">
                Interest {(100 - principalShare).toFixed(0)}%
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500">
                  Total interest
                </p>
                <p className="mt-1 font-mono text-[12px] text-slate-200">{inrCompact(totalInterest)}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500">
                  Total payable
                </p>
                <p className="mt-1 font-mono text-[12px] text-slate-200">{inrCompact(totalPayable)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-white/[0.07]">
          <table className="w-full">
            <thead className="bg-[#0E1418]">
              <tr className="font-mono text-[9px] uppercase tracking-[0.1em] text-slate-500">
                <th className="px-3 py-2 text-left font-medium">Mo</th>
                <th className="px-3 py-2 text-right font-medium">Principal</th>
                <th className="px-3 py-2 text-right font-medium">Interest</th>
                <th className="px-3 py-2 text-right font-medium">Balance</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.month} className="border-t border-white/[0.05]">
                  <td className="px-3 py-1.5 font-mono text-[10px] text-slate-500">
                    {String(row.month).padStart(2, "0")}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono text-[10.5px] text-slate-300">
                    {inrCompact(row.principal)}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono text-[10.5px] text-slate-500">
                    {inrCompact(row.interest)}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono text-[10.5px] text-slate-400">
                    {inrCompact(row.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-white/[0.07] bg-[#0E1418] px-3 py-2 font-mono text-[9px] leading-relaxed text-slate-600">
            First 12 instalments shown. Illustrative schedule — actual amortisation follows the
            lender's sanction terms.
          </p>
        </div>
      </div>
    </div>
  );
}