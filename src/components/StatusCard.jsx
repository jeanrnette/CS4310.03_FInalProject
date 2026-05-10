// StatusCard.jsx
// This shows teh systems status and the performance score

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Determines styling based on system status.
function getStatusStyles(status) {
  switch (status) {
    case "Efficient":
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-300",
      };

    case "Moderate Load":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        border: "border-yellow-300",
      };

    case "Overloaded":
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-300",
      };

    case "Invalid Host Configuration":
      return {
        bg: "bg-gray-200",
        text: "text-gray-700",
        border: "border-gray-400",
      };

    case "No VMs Running":
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-300",
      };

    default:
      return {
        bg: "bg-slate-100",
        text: "text-slate-700",
        border: "border-slate-300",
      };
  }
}

// Returns a short explanation of the current system state.
function getStatusDescription(status) {
  switch (status) {
    case "Efficient":
      return "VM demand is within available CPU cores and memory. The system can handle additional low workloads.";

    case "Moderate Load":
      return "CPU cores or memory are becoming saturated. VMs may begin competing for resources.";

    case "Overloaded":
      return "VM demand exceeds available CPU cores or memory. This causes contention, slower performance, and potential instability.";

    case "Invalid Host Configuration":
      return "The host has no usable CPU cores or memory after reservation. VMs cannot run in this configuration.";

    case "No VMs Running":
      return "The host is idle. No virtual machines are currently consuming resources.";

    default:
      return "";
  }
}

export function StatusCard({ results }) {
  if (!results) return null;

  const styles = getStatusStyles(results.status);
  const description = getStatusDescription(results.status);

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Badge */}
        <div
          className={`rounded-[10px] border px-4 py-3 font-semibold ${styles.bg} ${styles.text} ${styles.border}`}
        >
          {results.status}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600">{description}</p>

        {/* Performance Score */}
        <div className="space-y-1">
          <p className="text-sm text-slate-600">Performance Score</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-slate-800">
              {results.performanceScore}/100
            </span>
          </div>

          {/* Score Bar */}
          <div className="h-3 w-full rounded bg-[var(--sky-shade)] overflow-hidden">
            <div
              className="h-full bg-[var(--teal)]"
              style={{ width: `${results.performanceScore}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}