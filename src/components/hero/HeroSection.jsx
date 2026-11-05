import { ArrowRight, Zap } from "lucide-react";
import LoanVisualizer from "@/components/hero/LoanVisualizer";
import { openEnquiry } from "@/lib/enquiry";

const METRICS = [
  { value: "₹500Cr+", label: "Facilitated volume" },
  { value: "40+", label: "Lending partners" },
  { value: "48h", label: "Indicative turnaround" },
];

export default function HeroSection() {
  return (
    <section aria-label="Money Setu — financial sourcing and advisory" className="relative overflow-hidden">
      {/* ambient mesh + glow */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-[10%] top-[-18%] h-[620px] w-[620px] rounded-full opacity-80 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,92,158,0.55), rgba(10,60,80,0.18) 45%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-8%] bottom-[-30%] h-[520px] w-[520px] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.28), transparent 68%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-16 py-14 md:grid-cols-[1fr_minmax(0,510px)] md:items-stretch md:gap-x-12 md:py-16">
          {/* ---------- left: manifesto ---------- */}
          <div className="flex min-w-0 flex-col justify-between gap-10 md:gap-0">
            <div>
              <span className="ms-rise inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                <Zap className="h-3 w-3 text-emerald-400" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-300 sm:text-[10px]">
                  Single-window financial sourcing & advisory
                </span>
              </span>

              <h1
                className="ms-rise mt-6 font-heading text-[clamp(2.2rem,5.1vw,4rem)] font-bold leading-[1.02] tracking-[-0.038em] text-white"
                style={{ animationDelay: "80ms" }}
              >
                Connecting You to Financial Solutions.
                <span className="mt-1 block text-emerald-400">Empowering Your Growth.</span>
              </h1>
            </div>

            <div className="mt-8 flex flex-col items-start gap-7 md:mt-14">
              <p
                className="ms-rise max-w-[30rem] text-[15px] leading-[1.65] text-slate-400 sm:text-[16.5px]"
                style={{ animationDelay: "160ms" }}
              >
                Debt syndication, taxation and valuation, structured by one accountable desk —
                from first call to disbursement.
              </p>

              <div
                className="ms-rise flex flex-col gap-3 sm:flex-row sm:items-center"
                style={{ animationDelay: "220ms" }}
              >
                <button
                  type="button"
                  onClick={() => openEnquiry({ service: "Loan Eligibility Assessment", source: "hero" })}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-[#04140E] transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_38px_-8px_rgba(16,185,129,0.75)]"
                >
                  Check Loan Eligibility
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <a
                  href="#practice"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 px-6 py-3.5 font-heading text-[12px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-white hover:bg-white/[0.06]"
                >
                  Explore Services
                  <svg
                    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M4 12h15" strokeLinecap="round" />
                    <path d="M13 6l7 6-7 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              <dl
                className="ms-rise flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-5"
                style={{ animationDelay: "300ms" }}
              >
                {METRICS.map((m) => (
                  <div key={m.label}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd>
                      <span className="block font-mono text-[17px] font-semibold text-white">
                        {m.value}
                      </span>
                      <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                        {m.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* ---------- right: live financial workspace ---------- */}
          <div className="ms-rise min-w-0 md:pt-2" style={{ animationDelay: "140ms" }}>
            <LoanVisualizer />
          </div>
        </div>
      </div>
    </section>
  );
}