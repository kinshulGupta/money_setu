import { useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import Reveal from "@/components/Reveal";
import { PERSONAS } from "@/lib/personas";
import { openEnquiry } from "@/lib/enquiry";

export default function PersonaPortal() {
  const [active, setActive] = useState(PERSONAS[0].key);
  const [copied, setCopied] = useState(false);
  const persona = PERSONAS.find((p) => p.key === active) || PERSONAS[0];

  const copyChecklist = async () => {
    const text = `${persona.label} — document checklist\n${persona.documents
      .map((doc, i) => `${i + 1}. ${doc}`)
      .join("\n")}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="personas" className="relative border-t border-white/10 bg-[#080B0E] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-500">
            07 — Readiness Portal
          </span>
          <h2 className="mt-4 font-heading text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Tell us who you are. Get the exact file set.
          </h2>
        </Reveal>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {PERSONAS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setActive(item.key);
                setCopied(false);
              }}
              className={`whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all ${
                active === item.key
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                  : "border-white/10 text-slate-500 hover:border-white/25 hover:text-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal key={`${persona.key}-left`}>
            <div className="flex h-full flex-col rounded-xl border border-white/10 bg-[#141A1F] p-6">
              <h3 className="font-heading text-[19px] font-semibold leading-snug text-white">
                {persona.headline}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-slate-400">{persona.blurb}</p>

              <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                Recommended for you
              </p>
              <ul className="mt-3 space-y-2.5">
                {persona.services.map((service) => (
                  <li key={service} className="flex items-start gap-2.5">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <span className="text-[13.5px] text-slate-300">{service}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => openEnquiry({ service: persona.services[0], source: `persona-${persona.key}` })}
                className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2.5 font-heading text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/5"
              >
                Enquire for this profile
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </Reveal>

          <Reveal key={`${persona.key}-right`} delay={80}>
            <div className="flex h-full flex-col rounded-xl border border-white/10 bg-[#0E1418] p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                    Document readiness
                  </p>
                  <p className="mt-1 font-heading text-sm font-semibold text-white">
                    {persona.documents.length} items to assemble
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyChecklist}
                  className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-all ${
                    copied
                      ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-300"
                      : "border-white/15 text-slate-400 hover:border-white/35 hover:text-white"
                  }`}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied" : "Copy checklist"}
                </button>
              </div>

              <ul className="mt-4 flex-1 divide-y divide-white/[0.06]">
                {persona.documents.map((doc, index) => (
                  <li key={doc} className="flex items-center gap-3 py-2.5">
                    <span className="font-mono text-[10px] text-slate-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] text-slate-300">{doc}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 border-t border-white/[0.06] pt-3 font-mono text-[9px] leading-relaxed tracking-[0.06em] text-slate-600">
                Documents are held in DPDP-compliant encrypted silos and shared only with the
                lender you approve.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}