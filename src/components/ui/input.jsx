/*
  Reusable input field yas
*/

export function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="text-xs font-semibold uppercase text-slate-600">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[8px] border border-slate-400 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[var(--teal)]"
      />
    </div>
  );
}