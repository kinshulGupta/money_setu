import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { SERVICE_DETAIL } from "@/lib/services";
import { openEnquiry } from "@/lib/enquiry";

export const Route = createFileRoute("/_site/services")({
  head: () => ({
    meta: [
      { title: "Practice Areas — Money Setu" },
      {
        name: "description",
        content:
          "Debt syndication, taxation, corporate law, virtual CFO, valuation and wealth facilitation — six practice verticals under one advisory desk.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center md:py-20">
          <Reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-500">
              Practice areas
            </span>
            <h1 className="mt-4 font-heading text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.035em] text-white">
              Six disciplines, executed to institutional standard.
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-slate-400">
              Each vertical is led by a named advisor and delivered with documented outputs — a
              credit assessment memo, a filed return, a signed valuation report. Nothing informal.
            </p>
            <button
              type="button"
              onClick={() => openEnquiry({ service: SERVICE_DETAIL[0].title, source: "services-hero" })}
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-[#04140E] transition-colors hover:bg-emerald-400"
            >
              Start a requirement
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative overflow-hidden rounded-xl border border-white/10">
              <Image
                src="https://media.base44.com/images/public/6aecf10883986b449f7887a2/c725c6960_generated_9ee61bb7.png"
                alt="Macro view of a dark glass and steel tower corner against an emerald twilight sky"
                className="h-[280px] w-full sm:h-[340px]"
                fittingType="fill"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B0F12] via-[#0B0F12]/70 to-transparent p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-400">
                  Institutional infrastructure
                </p>
                <p className="mt-1 font-mono text-[11px] text-slate-400">
                  40+ lenders · IBBI valuers · practising CAs
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0B0F12] py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] space-y-4 px-5 sm:px-8">
          {SERVICE_DETAIL.map((service, index) => (
            <Reveal key={service.code} delay={index * 50}>
              <div className="group grid gap-6 rounded-xl border border-white/10 bg-[#141A1F] p-6 transition-all duration-300 hover:border-emerald-500/35 md:grid-cols-[auto_1fr_1.1fr_auto] md:items-center md:gap-8">
                <span className="font-mono text-[11px] tracking-[0.2em] text-slate-600">
                  {service.code}
                </span>
                <div>
                  <h2 className="font-heading text-[18px] font-semibold leading-snug text-white">
                    {service.title}
                  </h2>
                  <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-slate-400">
                    {service.summary}
                  </p>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12.5px] text-slate-300">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openEnquiry({ service: service.title, source: "services-list" })}
                  className="inline-flex items-center gap-1.5 self-start rounded-full border border-white/15 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-300 transition-colors hover:border-emerald-400/60 hover:text-emerald-300"
                >
                  Enquire
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#080B0E] py-16">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <Image
                src="https://media.base44.com/images/public/6aecf10883986b449f7887a2/256e93c35_generated_13d6e81c.png"
                alt="Fountain pen resting on a stack of bond paper under dramatic light"
                className="h-[260px] w-full"
                fittingType="fill"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C5A880]">
              Valuation desk
            </span>
            <h2 className="mt-4 font-heading text-[clamp(1.7rem,3.2vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              Certified, defensible, filing-ready.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-400">
              Statutory valuations under Rule 11UA, ESOP perquisite pricing and DCF models are
              prepared and signed by IBBI-registered valuers — the certificate stands up in front
              of an assessing officer or an investor's diligence team.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Rule 11UA statutory valuation reports",
                "ESOP perquisite and 409A-style pricing support",
                "DCF, comparable company and net-asset methods",
                "Audit support by independent practising CAs",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] text-slate-300">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C5A880]" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}