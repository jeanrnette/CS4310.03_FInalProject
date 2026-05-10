// ResourceUsage.jsx
// The CPU and memory progress bars

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Determines color styling based on utilization level.
function getUsageColor(usage) {
  if (usage > 100) {
    return "bg-red-500"; // Overcommitted
  }

  if (usage > 70) {
    return "bg-yellow-400"; // High usage
  }

  return "bg-[var(--teal)]"; // Normal usage
}

// Returns a descriptive label for utilization level.
function getUsageLabel(usage) {
  if (usage > 100) {
    return "Overcommitted";
  }

  if (usage > 70) {
    return "High Usage";
  }

  return "Normal";
}

export function ResourceUsage({ results }) {
  if (!results) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Usage</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* CPU Usage */}
        <UsageBar
          label="CPU Usage"
          usage={results.cpuUsage}
          description="Based on VM vCPU demand compared to usable host CPU cores."
        />

        {/* Memory Usage */}
        <UsageBar
          label="Memory Usage"
          usage={results.memoryUsage}
          description="Based on VM memory demand compared to usable host memory."
        />
      </CardContent>
    </Card>
  );
}

// Reusable bar component for CPU and memory usage.
function UsageBar({ label, usage, description }) {
  const safeUsage = Math.max(0, usage);
  const displayWidth = Math.min(safeUsage, 100);
  const barColor = getUsageColor(safeUsage);
  const usageLabel = getUsageLabel(safeUsage);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <span className="text-sm font-medium text-slate-600">
          {safeUsage.toFixed(1)}% ({usageLabel})
        </span>
      </div>

      <div className="h-4 w-full rounded bg-[var(--sky-shade)] overflow-hidden">
        <div
          className={`h-full ${barColor}`}
          style={{ width: `${displayWidth}%` }}
        />
      </div>

      {safeUsage > 100 && (
        <p className="text-xs font-semibold text-red-600">
          Resource demand exceeds available capacity.
        </p>
      )}

      <p className="text-xs text-slate-500">{description}</p>
    </div>
  );
}