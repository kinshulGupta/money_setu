import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { openEnquiry } from "@/lib/enquiry";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#0B0F12] py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{ background: "radial-gradient(ellipse 60% 90% at 50% 120%, rgba(16,185,129,0.16), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-500">
            Next step
          </p>
          <h2 className="mt-3 max-w-xl font-heading text-[clamp(1.7rem,3.2vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            One desk. One conversation. A funded requirement.
          </h2>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-slate-400">
            Tell us the requirement — we shortlist the lender and stay accountable until
            disbursement.
          </p>
        </Reveal>
        <Reveal delay={100} className="w-full lg:w-auto">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openEnquiry({ service: "Loan Eligibility Assessment", source: "cta-band" })}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-[#04140E] transition-colors hover:bg-emerald-400"
            >
              Check Loan Eligibility
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="mailto:advisory@moneysetu.in"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 font-heading text-[12px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:border-white/45"
            >
              Talk to an advisor
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}