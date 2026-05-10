// CpuCoreBar.jsx
// Visualizes host CPU cores, host-reserved cores, VM vCPU demand, and CPU overcommitment.

export function CpuCoreBar({ total, reserved, demand }) {
  const totalCores = Math.max(0, Math.floor(Number(total)));
  const reservedCores = Math.min(totalCores, Math.floor(Number(reserved)));
  const demandCores = Math.max(0, Math.ceil(Number(demand)));
  const usableCores = Math.max(0, totalCores - reservedCores);
  const vmCoresInsideCapacity = Math.min(demandCores, usableCores);
  const overflowCores = Math.max(0, demandCores - usableCores);

  return (
    <div className="space-y-2 rounded-[10px] border border-[var(--sky-shade)] bg-white p-3">
      <div>
        <p className="font-semibold text-slate-800">CPU Core Allocation</p>
        <p className="text-sm text-slate-600">
          Shows host-reserved cores, VM vCPU demand, and CPU overcommitment.
        </p>
      </div>

      <div className="flex flex-wrap gap-1">
        {Array.from({ length: reservedCores }).map((_, index) => (
          <div
            key={`reserved-core-${index}`}
            className="h-6 w-6 rounded-[5px] bg-slate-400"
            title="Host reserved CPU core"
          />
        ))}

        {Array.from({ length: vmCoresInsideCapacity }).map((_, index) => (
          <div
            key={`vm-core-${index}`}
            className="h-6 w-6 rounded-[5px] bg-[var(--teal)]"
            title="VM vCPU demand"
          />
        ))}

        {Array.from({ length: usableCores - vmCoresInsideCapacity }).map((_, index) => (
          <div
            key={`free-core-${index}`}
            className="h-6 w-6 rounded-[5px] bg-[var(--sky-shade)]"
            title="Free CPU core capacity"
          />
        ))}

        {Array.from({ length: overflowCores }).map((_, index) => (
          <div
            key={`overflow-core-${index}`}
            className="h-6 w-6 rounded-[5px] bg-red-500"
            title="Overcommitted vCPU demand"
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
        <LegendItem className="bg-slate-400" label="Host reserved" />
        <LegendItem className="bg-[var(--teal)]" label="VM demand" />
        <LegendItem className="bg-[var(--sky-shade)]" label="Free capacity" />
        <LegendItem className="bg-red-500" label="Overcommitted" />
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