import Reveal from "@/components/Reveal";
import CountUp from "@/components/home/CountUp";
import ParallaxImage from "@/components/home/ParallaxImage";
import { useInView } from "@/lib/useInView";
import { CREDENTIALS, EXPERTISE, HOME_IMAGES, SECTORS } from "@/lib/homeContent";

export default function ExpertiseSection() {
  const [barsRef, barsInView] = useInView({ threshold: 0.2 });

  return (
    <section id="expertise" className="relative border-t border-white/10 bg-[#0B0F12] py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div className="min-w-0">
            <Reveal>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-500">
                05 — Our Expertise
              </span>
              <h2 className="mt-4 font-heading text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
                Depth where the mandate is decided.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-400">
                Credit, tax and valuation on one desk — every funding decision is stress-tested
                before submission.
              </p>
            </Reveal>

            <div ref={barsRef} className="mt-9">
              {EXPERTISE.map((item, index) => (
                <div key={item.label} className="border-t border-white/10 py-4 last:border-b">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[13px] text-slate-300">{item.label}</span>
                    <span className="font-mono text-[11px] text-emerald-400">
                      <CountUp value={item.value} suffix="%" />
                    </span>
                  </div>
                  <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-[width] duration-1000 ease-out"
                      style={{
                        width: barsInView ? `${item.value}%` : "0%",
                        transitionDelay: `${index * 90}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Reveal delay={100} className="min-w-0">
            <ParallaxImage
              src={HOME_IMAGES.skyline}
              alt="Financial district towers at night seen through a glass façade"
              className="h-[380px] w-full rounded-2xl border border-white/10 sm:h-[460px] lg:h-full lg:min-h-[520px]"
              strength={26}
            >
              <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3 sm:inset-x-5 sm:top-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-300">
                  Sector coverage
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-emerald-300">
                  7 verticals
                </span>
              </div>

              <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
                <div className="flex flex-wrap gap-1.5">
                  {SECTORS.map((sector) => (
                    <span
                      key={sector}
                      className="rounded-full border border-white/12 bg-[#0B0F12]/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-300 backdrop-blur-md transition-colors hover:border-emerald-400/40 hover:text-emerald-200"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
                <p className="mt-3 border-t border-white/10 pt-3 font-mono text-[9px] leading-relaxed tracking-[0.06em] text-slate-500">
                  NRI and cross-border mandates advised under FEMA.
                </p>
              </div>
            </ParallaxImage>
          </Reveal>
        </div>
      </div>

      <div className="ms-marquee mt-14 border-y border-white/10 py-4">
        <div className="ms-marquee-track items-center">
          {[...CREDENTIALS, ...CREDENTIALS].map((credential, index) => (
            <span
              key={`${credential}-${index}`}
              className="flex items-center gap-3 whitespace-nowrap px-6 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500"
              aria-hidden={index >= CREDENTIALS.length ? "true" : undefined}
            >
              <span className="h-1 w-1 rounded-full bg-emerald-500" aria-hidden="true" />
              {credential}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}