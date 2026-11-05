import { createFileRoute } from "@tanstack/react-router";
import { Clock, FileCheck2, Lock, PhoneCall } from "lucide-react";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import Reveal from "@/components/Reveal";

export const Route = createFileRoute("/_site/enquire")({
  head: () => ({
    meta: [
      { title: "Raise a Requirement — Money Setu" },
      {
        name: "description",
        content:
          "Submit a loan, taxation, valuation or virtual CFO requirement. Two steps, one working day to revert, DPDP-compliant handling.",
      },
    ],
  }),
  component: EnquirePage,
});

const ASSURANCES = [
  {
    icon: Clock,
    title: "Revert in one working day",
    body: "A named advisor owns your file from intake through to sanction.",
  },
  {
    icon: FileCheck2,
    title: "No obligation to proceed",
    body: "Assessment is advisory. You approve which lender receives your file.",
  },
  {
    icon: Lock,
    title: "DPDP-compliant handling",
    body: "Details sit in encrypted silos with consent-based access only.",
  },
];

function EnquirePage() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1280px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
        <Reveal>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-500">
            Fast-track enquiry
          </span>
          <h1 className="mt-4 font-heading text-[clamp(2rem,4.2vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white">
            Tell us the requirement. We structure the route.
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-400">
            Loans, taxation, incorporation, virtual CFO or valuation — one intake, routed to the
            practice desk that owns it.
          </p>

          <div className="mt-9 space-y-3">
            {ASSURANCES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-lg border border-white/[0.08] bg-[#141A1F]/60 p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-emerald-500/25 bg-emerald-500/[0.08]">
                    <Icon className="h-3.5 w-3.5 text-emerald-400" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="font-heading text-[13.5px] font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-slate-400">{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
            <PhoneCall className="h-3.5 w-3.5 text-slate-600" />
            Mon–Sat · 10:00–19:00 IST · advisory@moneysetu.in
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-xl border border-white/10 bg-[#141A1F] p-6">
            <EnquiryForm source="enquire-page" />
          </div>
          <p className="mt-4 font-mono text-[9px] leading-relaxed tracking-[0.06em] text-slate-600">
            Money Setu is a financial facilitation and advisory platform, not a bank or NBFC.
            Credit is sanctioned solely by RBI-regulated partner institutions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}