import Reveal from "@/components/Reveal";

const STEPS = [
  {
    code: "01",
    title: "Select financial need",
    body: "Intake call maps requirement, ticket size and timeline.",
    meta: "Intake",
  },
  {
    code: "02",
    title: "Submit minimal documentation",
    body: "Verified in encrypted, DPDP-compliant silos with consent-based access.",
    meta: "Verification",
  },
  {
    code: "03",
    title: "Advisory review & CAM",
    body: "Underwriting pack and lender shortlist prepared by your advisor.",
    meta: "Underwriting",
  },
  {
    code: "04",
    title: "Direct sanction & disbursement",
    body: "Sanction and disbursement tracked through to credit.",
    meta: "Execution",
  },
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="relative border-t border-white/10 bg-[#0B0F12] py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-500">
            08 — Institutional Process
          </span>
          <h2 className="mt-4 font-heading text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Four steps from requirement to disbursement.
          </h2>
        </Reveal>

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-[13px] hidden h-px overflow-hidden bg-white/10 lg:block">
            <span className="ms-beam block h-px w-1/3 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, index) => (
              <Reveal key={step.code} delay={index * 90}>
                <div className="relative lg:pr-4">
                  <div className="flex items-center gap-3">
                    <span className="relative z-10 flex h-[27px] w-[27px] items-center justify-center rounded-full border border-emerald-500/40 bg-[#0B0F12] font-mono text-[10px] text-emerald-400">
                      {step.code}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600 lg:hidden">
                      {step.meta}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-[16px] font-semibold leading-snug text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-slate-400">{step.body}</p>
                  <p className="mt-4 hidden font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600 lg:block">
                    {step.meta}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <p className="mt-12 border-l border-emerald-500/30 pl-4 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-slate-500">
            Indicative turnaround 48 hours from complete documentation. Sanction and disbursement
            remain at the sole discretion of the partner lender.
          </p>
        </Reveal>
      </div>
    </section>
  );
}