import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";
import { createLead } from "@/lib/leads.functions";
import { SERVICE_NAMES } from "@/lib/services";
import { PERSONAS } from "@/lib/personas";

const field =
  "w-full rounded-lg border border-white/10 bg-[#0E1418] px-3.5 py-2.5 text-[14px] text-white placeholder:text-slate-600 focus:border-emerald-500/60 focus:outline-none focus:ring-1 focus:ring-emerald-500/40";
const label = "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500";

export default function EnquiryForm({ initialService = "", source = "website", onDone }) {
  const submitLead = useServerFn(createLead);
  const [step, setStep] = useState(1);
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [form, setForm] = useState({
    service: initialService || SERVICE_NAMES[0],
    persona: "msme",
    amount: "",
    full_name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const next = () => {
    setError("");
    setStep(2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.full_name.trim() || form.full_name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!/^[0-9+\-\s()]{8,18}$/.test(form.phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!form.consent) {
      setError("Please accept the data consent to continue.");
      return;
    }
    setState("saving");
    try {
      const result = await submitLead({
        data: {
          full_name: form.full_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          persona: form.persona,
          service: form.service,
          amount: form.amount ? Number(form.amount) : null,
          message: form.message.trim(),
          consent: true,
          source,
        },
      });
      setReference(result.reference);
      setState("done");
      onDone?.(result);
    } catch (err) {
      setState("idle");
      setError(err?.message || "We could not submit your enquiry. Please try again.");
    }
  };

  if (state === "done") {
    return (
      <div className="py-6 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <Check className="h-5 w-5 text-emerald-400" />
        </span>
        <h3 className="mt-5 font-heading text-xl font-semibold text-white">Requirement logged</h3>
        <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-slate-400">
          An advisor reviews your requirement and reverts within one working day. Quote your
          reference in any follow-up.
        </p>
        <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#0E1418] px-3.5 py-2 font-mono text-[12px] tracking-[0.14em] text-emerald-300">
          {reference}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5 flex items-center gap-3">
        {[1, 2].map((n) => (
          <div key={n} className="flex flex-1 items-center gap-3">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] ${
                step >= n
                  ? "bg-emerald-500 text-[#04140E]"
                  : "border border-white/15 text-slate-500"
              }`}
            >
              {n}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
              {n === 1 ? "Requirement" : "Contact"}
            </span>
            {n === 1 && <span className="h-px flex-1 bg-white/10" />}
          </div>
        ))}
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <div>
            <label className={label} htmlFor="service">
              Practice area
            </label>
            <select
              id="service"
              className={field}
              value={form.service}
              onChange={(e) => set("service", e.target.value)}
            >
              {SERVICE_NAMES.map((name) => (
                <option key={name} value={name} className="bg-[#0E1418]">
                  {name}
                </option>
              ))}
              <option value="Loan Eligibility Assessment" className="bg-[#0E1418]">
                Loan Eligibility Assessment
              </option>
            </select>
          </div>

          <div>
            <span className={label}>You are</span>
            <div className="flex flex-wrap gap-2">
              {PERSONAS.map((persona) => (
                <button
                  key={persona.key}
                  type="button"
                  onClick={() => set("persona", persona.key)}
                  className={`rounded-full border px-3 py-1.5 text-[11.5px] transition-colors ${
                    form.persona === persona.key
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                      : "border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200"
                  }`}
                >
                  {persona.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={label} htmlFor="amount">
              Indicative requirement (₹) — optional
            </label>
            <input
              id="amount"
              type="number"
              min="0"
              className={`${field} font-mono`}
              placeholder="2500000"
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={next}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-[#04140E] transition-colors hover:bg-emerald-400"
          >
            Continue
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="full_name">
                Full name
              </label>
              <input
                id="full_name"
                className={field}
                placeholder="Ananya Rao"
                value={form.full_name}
                onChange={(e) => set("full_name", e.target.value)}
              />
            </div>
            <div>
              <label className={label} htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                className={`${field} font-mono`}
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={label} htmlFor="email">
              Work email
            </label>
            <input
              id="email"
              type="email"
              className={field}
              placeholder="ananya@company.in"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>

          <div>
            <label className={label} htmlFor="message">
              Brief context — optional
            </label>
            <textarea
              id="message"
              rows={3}
              className={`${field} resize-none`}
              placeholder="Turnover, existing facilities, timeline…"
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
            />
          </div>

          <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-white/10 bg-[#0E1418] p-3">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => set("consent", e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 accent-emerald-500"
            />
            <span className="text-[11.5px] leading-relaxed text-slate-400">
              I consent to Money Setu processing these details to assess my requirement, in line
              with the DPDP Act, 2023.
            </span>
          </label>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[12px] text-red-300">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setError("");
                setStep(1);
              }}
              className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300 transition-colors hover:border-white/40"
            >
              <ArrowLeft className="h-3 w-3" />
              Back
            </button>
            <button
              type="submit"
              disabled={state === "saving"}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-[#04140E] transition-colors hover:bg-emerald-400 disabled:opacity-60"
            >
              {state === "saving" ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Submitting
                </>
              ) : (
                "Submit requirement"
              )}
            </button>
          </div>

          <p className="flex items-center justify-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600">
            <ShieldCheck className="h-3 w-3" />
            Encrypted · Not a lender · No credit bureau pull yet
          </p>
        </div>
      )}
    </form>
  );
}