export function inr(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(Number(value) || 0));
}

export function inrCompact(value) {
  const n = Math.round(Number(value) || 0);
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(n % 10000000 === 0 ? 0 : 2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 2)} L`;
  return inr(n);
}

export function pct(value, digits = 1) {
  return `${Number(value).toFixed(digits)}%`;
}

export function emiFor(principal, annualRate, years) {
  const n = Math.max(1, Math.round(years * 12));
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function sipFutureValue(monthly, annualReturn, years) {
  const n = Math.max(1, Math.round(years * 12));
  const i = annualReturn / 12 / 100;
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}