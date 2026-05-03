// InsightsPanel.jsx
// The little insight explanntion panel area

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function InsightsPanel({ results }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
      </CardHeader>

      <CardContent>
        {results ? (
          <ul className="space-y-3 text-sm text-slate-700">
            <Insight>
              The host OS reserves CPU and memory before resources are made
              available to virtual machines.
            </Insight>
            <Insight>
              Higher VM workloads increase simulated scheduling pressure and
              reduce overall efficiency.
            </Insight>
            <Insight>
              {results.status === "Overloaded"
                ? "The current VM workload exceeds available host resources."
                : "The current VM workload is within the host’s available resource range."}
            </Insight>
          </ul>
        ) : (
          <p className="text-sm text-slate-500">
            Run the simulation to generate host and VM performance insights.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function Insight({ children }) {
  return (
    <li className="rounded-2xl border border-[var(--teal)] bg-[var(--sky)]/70 p-3">
      {children}
    </li>
  );
}