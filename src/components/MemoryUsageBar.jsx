// MemoryUsageBar.jsx
// Visualizes total host memory, host-reserved memory, VM memory demand, and memory overcommitment.

export function MemoryUsageBar({ total, reserved, demand }) {
  const safeTotal = Math.max(0, Number(total));
  const safeReserved = Math.max(0, Number(reserved));
  const safeDemand = Math.max(0, Number(demand));

  const reservedPercent =
    safeTotal > 0 ? Math.min((safeReserved / safeTotal) * 100, 100) : 0;

  const usableMemory = Math.max(0, safeTotal - safeReserved);
  const vmDemandInsideCapacity = Math.min(safeDemand, usableMemory);

  const demandPercent =
    safeTotal > 0 ? Math.min((vmDemandInsideCapacity / safeTotal) * 100, 100) : 0;

  const isOvercommitted = safeReserved + safeDemand > safeTotal;

  return (
    <div className="space-y-2 rounded-[10px] border border-[var(--sky-shade)] bg-white p-3">
      <div>
        <p className="font-semibold text-slate-800">Memory Allocation</p>
        <p className="text-sm text-slate-600">
          Shows host-reserved memory, VM memory demand, and memory pressure.
        </p>
      </div>

      <div className="h-5 w-full overflow-hidden rounded-[6px] bg-[var(--sky-shade)]">
        <div className="flex h-full w-full">
          <div
            className="h-full bg-slate-400"
            style={{ width: `${reservedPercent}%` }}
            title="Host reserved memory"
          />
          <div
            className="h-full bg-[var(--teal)]"
            style={{ width: `${demandPercent}%` }}
            title="VM memory demand"
          />
        </div>
      </div>

      {isOvercommitted && (
        <p className="text-xs font-semibold text-red-600">
          Memory is overcommitted. VM demand plus host reservation exceeds physical memory.
        </p>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
        <LegendItem className="bg-slate-400" label="Host reserved" />
        <LegendItem className="bg-[var(--teal)]" label="VM demand" />
        <LegendItem className="bg-[var(--sky-shade)]" label="Free capacity" />
      </div>
    </div>
  );
}

function LegendItem({ className, label }) {
  return (
    <span className="flex items-center gap-1">
      <span className={`h-3 w-3 rounded-[3px] ${className}`} />
      {label}
    </span>
  );
}