import { useEffect, useState } from "react";
import { X } from "lucide-react";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import { ENQUIRY_EVENT } from "@/lib/enquiry";

export default function EnquiryDrawer() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");
  const [source, setSource] = useState("website");

  useEffect(() => {
    const handler = (event) => {
      const detail = event.detail || {};
      setService(detail.service || "");
      setSource(detail.source || "website");
      setOpen(true);
    };
    window.addEventListener(ENQUIRY_EVENT, handler);
    return () => window.removeEventListener(ENQUIRY_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close enquiry"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        className="ms-drawer-in relative z-10 max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl border border-white/12 bg-[#141A1F] p-5 shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.9)] sm:max-w-[480px] sm:rounded-2xl sm:p-6"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-white/30 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-500">
          Fast-track enquiry
        </p>
        <h2 id="enquiry-title" className="mt-2 font-heading text-xl font-semibold text-white">
          Two steps. One working day to revert.
        </h2>
        <p className="mt-1.5 mb-5 text-[12.5px] leading-relaxed text-slate-400">
          Share the requirement — an advisor maps it to the right lender or practice desk.
        </p>

        <EnquiryForm initialService={service} source={source} />
      </div>
    </div>
  );
}