import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, LogOut, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import LeadDetail from "@/components/crm/LeadDetail";
import { STATUS_STYLES } from "@/components/crm/status";

export const Route = createFileRoute("/_authed/crm")({
  head: () => ({
    meta: [{ title: "Client Desk — Money Setu" }],
  }),
  component: CrmPage,
});

const FILTERS = [
  { key: "all", label: "All leads" },
  { key: "new", label: "New" },
  { key: "docs_pending", label: "Docs pending" },
  { key: "underwriting", label: "Underwriting" },
  { key: "sanctioned", label: "Sanctioned" },
];

function CrmPage() {
  const { user, logout } = useAuth();
  const [leads, setLeads] = useState([]);
  const [counts, setCounts] = useState({});
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const page =
      filter === "all"
        ? await base44.entities.Lead.list({ sort: "-created_date", limit: 50 })
        : await base44.entities.Lead.filter({ status: filter }, { sort: "-created_date", limit: 50 });
    const agg = await base44.entities.Lead.aggregate({ groupBy: "status" });
    const nextCounts = {};
    (agg?.rows || []).forEach((row) => {
      nextCounts[row.status] = row.count;
    });
    setLeads(page.items || []);
    setCounts(nextCounts);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const stats = [
    { label: "Total enquiries", value: total },
    { label: "New", value: counts.new || 0, tone: "text-sky-300" },
    { label: "Underwriting", value: counts.underwriting || 0, tone: "text-violet-300" },
    { label: "Sanctioned", value: counts.sanctioned || 0, tone: "text-emerald-300" },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F12]">
      <header className="border-b border-white/10 bg-[#0B0F12]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-slate-400 transition-colors hover:text-white"
              aria-label="Back to site"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
            <div>
              <p className="font-heading text-[14px] font-semibold text-white">Client Desk</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                Internal operations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] text-slate-500 sm:block">
              {user?.email}
            </span>
            <button
              type="button"
              onClick={() => logout()}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400 transition-colors hover:border-white/30 hover:text-white"
            >
              <LogOut className="h-3 w-3" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/10 bg-[#141A1F] p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                {stat.label}
              </p>
              <p className={`mt-2 font-mono text-[26px] font-semibold leading-none ${stat.tone || "text-white"}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={`rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors ${
                  filter === item.key
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                    : "border-white/10 text-slate-500 hover:text-slate-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500 hover:text-slate-300"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#141A1F]">
          <div className="hidden grid-cols-[110px_1.2fr_1.3fr_100px_120px_110px] gap-3 border-b border-white/10 bg-[#0E1418] px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500 lg:grid">
            <span>Reference</span>
            <span>Applicant</span>
            <span>Requirement</span>
            <span className="text-right">Amount</span>
            <span>Stage</span>
            <span className="text-right">Received</span>
          </div>

          {loading ? (
            <div className="space-y-2 p-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-11 animate-pulse rounded-md bg-white/[0.03]" />
              ))}
            </div>
          ) : leads.length === 0 ? (
            <div className="px-4 py-14 text-center">
              <p className="font-heading text-sm font-semibold text-white">No enquiries here yet</p>
              <p className="mx-auto mt-1.5 max-w-sm text-[12.5px] leading-relaxed text-slate-500">
                Submissions from the website land in this desk automatically. Share the eligibility
                link to start filling the pipeline.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {leads.map((lead) => {
                const style = STATUS_STYLES[lead.status] || STATUS_STYLES.new;
                return (
                  <button
                    key={lead.id}
                    type="button"
                    onClick={() => setSelected(lead)}
                    className="grid w-full grid-cols-1 gap-2 px-4 py-3 text-left transition-colors hover:bg-white/[0.03] lg:grid-cols-[110px_1.2fr_1.3fr_100px_120px_110px] lg:items-center lg:gap-3"
                  >
                    <span className="font-mono text-[10px] tracking-[0.08em] text-emerald-400/80">
                      {lead.reference || "—"}
                    </span>
                    <span>
                      <span className="block text-[13px] font-medium text-white">{lead.full_name}</span>
                      <span className="block font-mono text-[10px] text-slate-500">{lead.phone}</span>
                    </span>
                    <span className="text-[12px] text-slate-400">{lead.service}</span>
                    <span className="font-mono text-[11.5px] text-slate-300 lg:text-right">
                      {lead.amount ? `₹${Number(lead.amount).toLocaleString("en-IN")}` : "—"}
                    </span>
                    <span>
                      <span className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] ${style.badge}`}>
                        {style.label}
                      </span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 lg:text-right">
                      {lead.created_date ? format(new Date(lead.created_date), "dd MMM, HH:mm") : "—"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <p className="mt-4 font-mono text-[9px] leading-relaxed tracking-[0.04em] text-slate-600">
          Lead records are restricted to administrators. Applicant data is processed under the DPDP
          Act, 2023 — use it only for assessment of the submitted requirement.
        </p>
      </main>

      {selected && (
        <LeadDetail lead={selected} onClose={() => setSelected(null)} onUpdated={load} />
      )}
    </div>
  );
}