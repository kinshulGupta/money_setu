import { createFileRoute } from "@tanstack/react-router";
import RepaymentSchedule from "@/components/calculators/RepaymentSchedule";
import EligibilityEstimator from "@/components/calculators/EligibilityEstimator";
import LoanVisualizer from "@/components/hero/LoanVisualizer";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

export const Route = createFileRoute("/_site/calculators")({
  head: () => ({
    meta: [
      { title: "Calculators — Money Setu" },
      {
        name: "description",
        content:
          "Estimate EMI, total interest, repayment schedules and indicative working capital eligibility before you apply.",
      },
    ],
  }),
  component: CalculatorsPage,
});

function CalculatorsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-20">
          <Reveal className="max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-500">
              Calculators
            </span>
            <h1 className="mt-4 font-heading text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.035em] text-white">
              Model the facility before you commit to it.
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
              Every figure below is computed live. Use it to pressure-test tenure, pricing and
              debt-service headroom — then take the numbers into an advisory call.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0B0F12] py-14 sm:py-16">
        <div className="mx-auto max-w-[1280px] space-y-6 px-5 sm:px-8">
          <Reveal>
            <RepaymentSchedule />
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal delay={60}>
              <EligibilityEstimator />
            </Reveal>
            <Reveal delay={120}>
              <div className="pt-6 lg:pt-8">
                <LoanVisualizer />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}