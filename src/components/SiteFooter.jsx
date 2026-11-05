import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

const PRACTICE_LINKS = [
  "Loans & Credit Facilitation",
  "Direct & Indirect Taxation",
  "Business Setup & Corporate Law",
  "Virtual CFO & Reporting",
  "Valuation & Transaction Advisory",
  "Wealth & Risk Facilitation",
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#080B0E]">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-md border border-emerald-500/40 bg-emerald-500/10">
                <span className="absolute inset-x-1.5 top-1/2 h-px -translate-y-1/2 bg-emerald-400/80" />
              </span>
              <span className="font-heading text-[15px] font-bold tracking-tight text-white">
                Money Setu
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              A single window for debt syndication, compliance and strategic advisory — built
              for Indian businesses and the people who run them.
            </p>
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2">
              <ShieldCheck className="ms-breathe h-4 w-4 shrink-0 text-emerald-400" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300/90">
                DPDP Act 2023 · Encrypted data silos
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Practice Areas
            </h3>
            <ul className="mt-4 space-y-2.5">
              {PRACTICE_LINKS.map((label) => (
                <li key={label}>
                  <Link
                    to="/services"
                    className="text-[13px] text-slate-400 transition-colors hover:text-emerald-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "Services", to: "/services" },
                { label: "Calculators", to: "/calculators" },
                { label: "Enquire", to: "/enquire" },
                { label: "Client Desk", to: "/crm" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-[13px] text-slate-400 transition-colors hover:text-emerald-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-1 font-mono text-[11px] leading-relaxed text-slate-500">
              <p>Mon–Sat · 10:00–19:00 IST</p>
              <p>advisory@moneysetu.in</p>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-4 border-t border-white/10 pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Regulatory Disclosure
          </p>
          <p className="max-w-4xl text-[12px] leading-relaxed text-slate-400">
            Money Setu is a financial facilitation and corporate advisory platform. Money Setu is
            not a Bank or a Non-Banking Financial Company (NBFC) and does not lend in its own
            name. All loans and credit lines are underwritten, sanctioned and disbursed solely by
            RBI-regulated partner lending institutions, at their sole discretion. Statutory
            valuations are certified by IBBI-registered valuers, and statutory audits are
            conducted by independent practising Chartered Accountants.
          </p>
          <p className="max-w-4xl text-[12px] leading-relaxed text-slate-500">
            All client information is collected, stored and processed in accordance with the
            Digital Personal Data Protection Act, 2023. Illustrative figures shown on this
            platform are for estimation only and do not constitute an offer, sanction letter or
            investment advice.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/5 pt-6 text-[11px] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Money Setu. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.14em]">
            Connecting you to financial solutions
          </p>
        </div>
      </div>
    </footer>
  );
}