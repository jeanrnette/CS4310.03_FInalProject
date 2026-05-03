// Simple shadcn-inspired Button component.
// Supports default and outline variants.

export function Button({
  variant = "default",
  className = "",
  children,
  ...props
}) {
  const base =
    "rounded-full px-7 py-3 font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    default:
      "bg-[var(--teal)] text-white hover:bg-[var(--teal-shade)]",
    outline:
      "border border-[var(--teal)] bg-transparent text-[var(--teal)] hover:bg-[var(--sky)]",
    danger:
      "border border-red-300 bg-transparent text-red-600 hover:bg-red-50",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}