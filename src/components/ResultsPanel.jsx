// ResultsPanel.jsx
// The right side dashboard that displays the total/remaing resoucre resutls

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CpuCoreBar } from "../components/CpuCoreBar";
import { MemoryUsageBar } from "./MemoryUsageBar";

export function ResultsPanel({ results }) {
  if (!results) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulation Results</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <CpuCoreBar
          total={results.hostTotalCpu}
          reserved={results.hostReservedCpu}
          demand={results.totalCpu}
        />

        <MemoryUsageBar
          total={results.hostTotalMemory}
          reserved={results.hostReservedMemory}
          demand={results.totalMemory}
        />

        <div className="grid gap-3">
          <ResultRow label="Usable CPU for VMs" value={`${results.usableCpu} cores`} />
          <ResultRow label="VM CPU Demand" value={`${results.totalCpu.toFixed(1)} vCPU cores`} />
          <ResultRow label="Remaining CPU Capacity" value={`${results.remainingCpu.toFixed(1)} cores`} />
          
          <ResultRow label="Usable Memory for VMs" value={`${results.usableMemory} MB`} />
          <ResultRow label="VM Memory Demand" value={`${results.totalMemory.toFixed(0)} MB`} />
          <ResultRow label="Remaining Memory Capacity" value={`${results.remainingMemory.toFixed(0)} MB`} />
        </div>
      </CardContent>
    </Card>
  );
}

// Displays one label/value pair in the results card.
function ResultRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-[8px] border border-[var(--sky-shade)] bg-white px-3 py-2">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}