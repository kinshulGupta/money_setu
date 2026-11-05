export default function SliderRow({ label, value, min, max, step, raw, onChange }) {
  const fill = ((raw - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label className="text-[11px] font-medium uppercase tracking-[0.1em] text-slate-500">
          {label}
        </label>
        <span className="font-mono text-[12px] font-medium text-slate-200">{value}</span>
      </div>
      <input
        type="range"
        className="ms-range"
        min={min}
        max={max}
        step={step}
        value={raw}
        aria-label={label}
        style={{ "--fill": `${fill}%` }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}