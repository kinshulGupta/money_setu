/**
 * Decoupled enquiry trigger: any CTA on the site can request the fast-track
 * enquiry drawer without owning modal state. The drawer listens for this event.
 */
export const ENQUIRY_EVENT = "money-setu:enquire";

export function openEnquiry(detail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ENQUIRY_EVENT, { detail }));
}