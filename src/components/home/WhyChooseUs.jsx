import {
  FileCheck2,
  Landmark,
  Timer,
  UserCheck,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/home/CountUp";
import ParallaxImage from "@/components/home/ParallaxImage";
import { DIFFERENTIATORS, HOME_IMAGES, METRICS } from "@/lib/homeContent";

const ICONS = {
  landmark: Landmark,
  "user-check": UserCheck,
  "file-check": FileCheck2,
  timer: Timer,
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden border-t border-white/10 bg-[#080B0E] py-20 sm:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 opacity-70 blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.13), transparent 68%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-500">
              04 — Why Choose Us
            </span>
            <h2 className="mt-4 font-heading text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              Institutional rigour, with an advisor who answers the phone.
            </h2>
          </Reveal>
          <Reveal delay={90} className="max-w-sm">
            <p className="text-[13.5px] leading-relaxed text-slate-400">
              We are paid by the client, not the lender — the recommendation follows your
              balance sheet.
            </p>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <dl className="mt-11 grid grid-cols-2 gap-y-8 border-y border-white/10 py-8 lg:grid-cols-4">
            {METRICS.map((metric) => (
              <div key={metric.label} className="px-1 lg:border-l lg:border-white/10 lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
                <dd className="font-mono text-[clamp(1.35rem,2.4vw,1.9rem)] font-semibold leading-none text-white">
                  <CountUp value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                </dd>
                <dt className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-slate-500">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {DIFFERENTIATORS.map((item, index) => {
              const Icon = ICONS[item.icon];
              return (
                <Reveal key={item.title} delay={index * 70}>
                  <div className="group h-full rounded-xl border border-white/10 bg-[#141A1F] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/35">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-500/15">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-4 font-heading text-[15.5px] font-semibold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-slate-400">{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={160}>
            <figure className="relative h-full min-h-[360px]">
              <ParallaxImage
                src={HOME_IMAGES.signing}
                alt="A sanction letter being signed beside printed financial statements"
                className="h-full w-full rounded-xl border border-white/10"
                strength={26}
              >
                <figcaption className="absolute inset-x-5 bottom-5">
                  <blockquote className="font-heading text-[16px] font-medium leading-snug text-white">
                    “A credit file should read like an argument, not a form.”
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3 border-t border-white/15 pt-3">
                    <span className="h-6 w-px bg-emerald-500" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-200">
                        Rajiv Menon
                      </p>
                      <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-slate-500">
                        Managing Partner
                      </p>
                    </div>
                  </div>
                </figcaption>
              </ParallaxImage>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}