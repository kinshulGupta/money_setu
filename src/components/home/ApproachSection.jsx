import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/home/CountUp";
import ParallaxImage from "@/components/home/ParallaxImage";
import { APPROACH, HOME_IMAGES } from "@/lib/homeContent";
import { openEnquiry } from "@/lib/enquiry";

export default function ApproachSection() {
  return (
    <section id="approach" className="relative border-t border-white/10 bg-[#0B0F12] py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.86fr_1fr] lg:gap-16">
          <Reveal className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <div className="relative">
              <ParallaxImage
                src={HOME_IMAGES.boardroom}
                alt="Advisors reviewing a credit file across a boardroom table at dusk"
                className="h-[380px] w-full rounded-2xl border border-white/10 sm:h-[480px]"
                scan
              >
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0B0F12]/70 px-3 py-1.5 backdrop-blur-md">
                  <span className="ms-ring h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-300">
                    Live mandate review
                  </span>
                </span>

                <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-[#0B0F12]/80 p-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-mono text-[19px] font-semibold text-white">
                        <CountUp value={14} suffix=" days" />
                      </p>
                      <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-slate-500">
                        Median sanction, 2025
                      </p>
                    </div>
                    <div className="border-l border-white/10 pl-4">
                      <p className="font-mono text-[19px] font-semibold text-emerald-400">
                        <CountUp value={92} suffix="%" />
                      </p>
                      <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-slate-500">
                        Files reaching sanction
                      </p>
                    </div>
                  </div>
                </div>
              </ParallaxImage>
            </div>
          </Reveal>

          <div className="min-w-0">
            <Reveal>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-500">
                03 — Our Approach
              </span>
              <h2 className="mt-4 font-heading text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
                A mandate runs on method, not on relationships alone.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-400">
                Four disciplines govern every mandate, from intake to the compliance calendar
                that follows disbursement.
              </p>
            </Reveal>

            <ol className="mt-9">
              {APPROACH.map((item, index) => (
                <Reveal key={item.code} delay={index * 70} as="li">
                  <div className="group relative border-t border-white/10 py-6 transition-colors duration-300 last:border-b hover:border-emerald-500/30">
                    <span
                      className="absolute left-0 top-6 bottom-6 w-px origin-top scale-y-0 bg-emerald-500 transition-transform duration-500 group-hover:scale-y-100"
                      aria-hidden="true"
                    />
                    <div className="flex items-baseline gap-4 pl-4 transition-transform duration-300 group-hover:translate-x-1.5">
                      <span className="font-mono text-[10px] text-slate-600 transition-colors group-hover:text-emerald-400">
                        {item.code}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="font-heading text-[16.5px] font-semibold leading-snug text-white">
                            {item.title}
                          </h3>
                          <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-slate-500">
                            {item.meta}
                          </span>
                        </div>
                        <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-slate-400">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={120}>
              <button
                type="button"
                onClick={() => openEnquiry({ service: "Advisory mandate", source: "approach" })}
                className="group mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400 transition-colors hover:text-emerald-300"
              >
                Start with a diagnostic call
                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}