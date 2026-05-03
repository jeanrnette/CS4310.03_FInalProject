// StatusCard.jsx
// This shows teh systems status and the performance score

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ProgressBar } from "./ResourceUsage";

export function StatusCard({ results }) {
  const statusClass = getStatusClass(results);

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className={`rounded-2xl border px-5 py-4 ${statusClass}`}>
          <p className="font-['Bebas_Neue'] text-2xl uppercase tracking-wide">
            {results ? results.status : "No Simulation Yet"}
          </p>
          <p className="mt-1 text-sm">
            {getStatusMessage(results)}
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm uppercase tracking-wide text-slate-600">
              Performance Score
            </p>
            <p className="font-['Bebas_Neue'] text-3xl text-[var(--teal)]">
              {results ? results.performanceScore : "--"}/100
            </p>
          </div>

          <ProgressBar
            percent={results ? results.performanceScore : 0}
            color="bg-emerald-500"
            hideLabel
          />
        </div>
      </CardContent>
    </Card>
  );
}

function getStatusClass(results) {
  if (!results) return "border-slate-200 bg-slate-100 text-slate-600";
  if (results.status === "Efficient") {
    return "border-emerald-400 bg-emerald-100 text-emerald-800";
  }
  if (results.status === "Moderate Load") {
    return "border-amber-400 bg-amber-100 text-amber-800";
  }
  return "border-red-400 bg-red-100 text-red-800";
}

function getStatusMessage(results) {
  if (!results) {
    return "Run the simulation to evaluate host and VM performance.";
  }

  if (results.status === "Overloaded") {
    return "System resources are overallocated - immediate action required.";
  }

  if (results.status === "Moderate Load") {
    return "System is under moderate load - monitor closely.";
  }

  return "System resources are optimally allocated.";
}