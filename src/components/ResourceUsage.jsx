// ResourceUsage.jsx
// The CPU and memory progress bars

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ResourceUsage({ results }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Usage</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <ProgressBar
          label="CPU Usage"
          percent={results ? results.cpuUsage : 0}
          color={results ? getBarColor(results.cpuUsage) : "bg-slate-300"}
        />
        <ProgressBar
          label="Memory Usage"
          percent={results ? results.memoryUsage : 0}
          color={results ? getBarColor(results.memoryUsage) : "bg-slate-300"}
        />
      </CardContent>
    </Card>
  );
}

export function ProgressBar({ label, percent, color, hideLabel = false }) {
  const width = Math.max(0, Math.min(percent, 100));

  return (
    <div className="space-y-2">
      {!hideLabel && (
        <div className="flex justify-between text-sm">
          <span className="font-medium text-slate-700">{label}</span>
          <span className="text-slate-600">{percent.toFixed(1)}%</span>
        </div>
      )}

      <div className="h-4 overflow-hidden rounded-full border border-slate-300 bg-slate-300">
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function getBarColor(usage) {
  if (usage > 100) return "bg-red-500";
  if (usage > 70) return "bg-amber-400";
  return "bg-[var(--teal)]";
}