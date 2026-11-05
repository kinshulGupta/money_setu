export const STATUS_OPTIONS = [
  "new",
  "contacted",
  "docs_pending",
  "underwriting",
  "sanctioned",
  "closed",
  "dropped",
];

export const STATUS_STYLES = {
  new: { label: "New", badge: "border-sky-500/30 bg-sky-500/10 text-sky-300", active: "border-sky-400/60 bg-sky-500/15 text-sky-200" },
  contacted: { label: "Contacted", badge: "border-amber-500/30 bg-amber-500/10 text-amber-300", active: "border-amber-400/60 bg-amber-500/15 text-amber-200" },
  docs_pending: { label: "Docs pending", badge: "border-amber-500/30 bg-amber-500/10 text-amber-300", active: "border-amber-400/60 bg-amber-500/15 text-amber-200" },
  underwriting: { label: "Underwriting", badge: "border-violet-500/30 bg-violet-500/10 text-violet-300", active: "border-violet-400/60 bg-violet-500/15 text-violet-200" },
  sanctioned: { label: "Sanctioned", badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300", active: "border-emerald-400/60 bg-emerald-500/15 text-emerald-200" },
  closed: { label: "Closed", badge: "border-white/15 bg-white/5 text-slate-400", active: "border-white/40 bg-white/10 text-slate-200" },
  dropped: { label: "Dropped", badge: "border-red-500/30 bg-red-500/10 text-red-300", active: "border-red-400/60 bg-red-500/15 text-red-200" },
};