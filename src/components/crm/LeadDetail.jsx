import { useState } from "react";
import { X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { STATUS_OPTIONS, STATUS_STYLES } from "@/components/crm/status";

export default function LeadDetail({ lead, onClose, onUpdated }) {
  const [status, setStatus] = useState(lead.status || "new");
  const [notes, setNotes] = useState(lead.notes || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    await base44.entities.Lead.update(lead.id, { status, notes });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    onUpdated?.();
  };

  return (
    <aside className="fixed inset-y-0 right-0 z-[75] flex w-full max-w-[420px] flex-col border-l border-white/10 bg-[#141A1F] shadow-[-20px_0_60px_-20px_rgba(0,0,0,0.9)]">
      <div className="flex items-start justify-between gap-3 border-b border-white/10 p-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-400">
            {lead.reference || "—"}
          </p>
          <h2 className="mt-1.5 font-heading text-lg font-semibold text-white">{lead.full_name}</h2>
          <p className="mt-1 font-mono text-[11px] text-slate-500">{lead.service}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-slate-400 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Phone", value: lead.phone },
            { label: "Email", value: lead.email },
            { label: "Profile", value: lead.persona },
            { label: "Requirement", value: lead.amount ? `₹${Number(lead.amount).toLocaleString("en-IN")}` : "—" },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-white/[0.07] bg-[#0E1418] p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500">
                {item.label}
              </p>
              <p
                className={`mt-1 break-words text-[12px] text-slate-200 ${
                  item.label === "Profile" ? "capitalize" : ""
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {lead.message && (
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
              Context
            </p>
            <p className="mt-2 rounded-lg border border-white/[0.07] bg-[#0E1418] p-3 text-[12.5px] leading-relaxed text-slate-300">
              {lead.message}
            </p>
          </div>
        )}

        <div>
          <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
            Pipeline stage
          </p>
          <div className="flex flex-wrap gap-1.5">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setStatus(option)}
                className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors ${
                  status === option
                    ? STATUS_STYLES[option].active
                    : "border-white/10 text-slate-500 hover:text-slate-300"
                }`}
              >
                {STATUS_STYLES[option].label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="notes"
            className="mb-2 block font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500"
          >
            Internal notes
          </label>
          <textarea
            id="notes"
            rows={5}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Lender shortlist, documents pending, call outcome…"
            className="w-full resize-none rounded-lg border border-white/10 bg-[#0E1418] p-3 text-[12.5px] text-slate-200 placeholder:text-slate-600 focus:border-emerald-500/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="w-full rounded-full bg-emerald-500 px-5 py-2.5 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-[#04140E] transition-colors hover:bg-emerald-400 disabled:opacity-60"
        >
          {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
        </button>
      </div>
    </aside>
  );
}