import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { openEnquiry } from "@/lib/enquiry";

const NAV = [
  { label: "Practice Areas", to: "/services" },
  { label: "Calculators", to: "/calculators" },
  { label: "Process", to: "/", hash: "process" },
  { label: "Personas", to: "/", hash: "personas" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F12]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="relative flex h-8 w-8 items-center justify-center rounded-md border border-emerald-500/40 bg-emerald-500/10">
            <span className="absolute inset-x-1.5 top-1/2 h-px -translate-y-1/2 bg-emerald-400/80" />
            <span className="absolute inset-y-1.5 left-1/2 w-px -translate-x-1/2 bg-emerald-400/30" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-[15px] font-bold tracking-tight text-white">
              Money Setu
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500">
              Capital · Advisory
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className="text-[13px] font-medium text-slate-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/enquire"
            className="hidden text-[13px] font-medium text-slate-300 transition-colors hover:text-white sm:block"
          >
            Talk to an advisor
          </Link>
          <button
            type="button"
            onClick={() => openEnquiry({ service: "Loan Eligibility Assessment", source: "header" })}
            className="hidden items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-[#04140E] transition-all hover:bg-emerald-400 hover:shadow-[0_0_24px_-6px_rgba(16,185,129,0.7)] sm:flex"
          >
            Check Eligibility
          </button>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-300 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-[#0B0F12]/95 md:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0"
        )}
        style={{ transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <div className="flex flex-col px-5 py-4">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3 text-sm text-slate-300 last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/enquire"
            onClick={() => setOpen(false)}
            className="mt-3 rounded-full bg-emerald-500 px-4 py-2.5 text-center font-heading text-xs font-semibold uppercase tracking-[0.12em] text-[#04140E]"
          >
            Check Eligibility
          </Link>
        </div>
      </div>
    </header>
  );
}