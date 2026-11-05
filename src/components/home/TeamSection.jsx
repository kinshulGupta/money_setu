import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Image } from "@/components/ui/image";
import { TEAM } from "@/lib/homeContent";
import { openEnquiry } from "@/lib/enquiry";

export default function TeamSection() {
  return (
    <section id="team" className="relative border-t border-white/10 bg-[#080B0E] py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-500">
              06 — Our Team
            </span>
            <h2 className="mt-4 font-heading text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              The practice leads who sign your file.
            </h2>
          </Reveal>
          <Reveal delay={90} className="max-w-sm">
            <p className="text-[13.5px] leading-relaxed text-slate-400">
              Chartered Accountants, Company Secretaries and IBBI valuers — every mandate
              delivered under a named partner.
            </p>
          </Reveal>
        </div>

        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, index) => (
            <Reveal key={member.name} delay={index * 80}>
              <article className="group h-full overflow-hidden rounded-xl border border-white/10 bg-[#141A1F] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/35">
                <div className="relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    className="block h-[268px] w-full grayscale-[45%] transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0 sm:h-[288px]"
                    fittingType="fill"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141A1F] via-[#141A1F]/20 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute right-3 top-3 flex h-7 w-7 translate-y-2 items-center justify-center rounded-full border border-white/15 bg-[#0B0F12]/70 text-emerald-400 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-heading text-[15.5px] font-semibold leading-snug text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-emerald-400/90">
                    {member.role}
                  </p>
                  <p className="mt-3 border-t border-white/[0.07] pt-3 font-mono text-[9.5px] uppercase tracking-[0.12em] text-slate-500">
                    {member.line}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-slate-400 transition-colors group-hover:border-white/20 group-hover:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-xl border border-white/10 bg-[#0E1418] p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-400">
                Direct access
              </p>
              <p className="mt-2 font-heading text-[16px] font-semibold leading-snug text-white">
                Every enquiry reaches a practice lead within one working day.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openEnquiry({ service: "Advisory mandate", source: "team" })}
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-heading text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/5"
            >
              Speak to a practice lead
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}