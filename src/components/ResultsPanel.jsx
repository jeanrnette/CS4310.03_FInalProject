// ResultsPanel.jsx
// The right side dashboard that displays the total/remaing resoucre resutls

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ResultsPanel({ results }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulation Results</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2">
        <ResultBox
          highlight
          label="Total CPU Used"
          value={results ? `${results.totalCpu.toFixed(0)}%` : "--"}
        />
        <ResultBox
          highlight
          label="Total Memory Used"
          value={results ? `${results.totalMemory.toFixed(0)} MB` : "--"}
        />
        <ResultBox
          label="Remaining CPU"
          value={results ? `${results.remainingCpu.toFixed(0)}%` : "--"}
        />
        <ResultBox
          label="Remaining Memory"
          value={results ? `${results.remainingMemory.toFixed(0)} MB` : "--"}
        />
      </CardContent>
    </Card>
  );
}

function ResultBox({ label, value, highlight = false }) {
  return (
    <div
      className={`rounded-2xl border p-3 ${
        highlight
          ? "border-[var(--teal)] bg-[var(--sky)]"
          : "border-[var(--sky-shade)] bg-[#f8fbfb]"
      }`}
    >
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 font-['Bebas_Neue'] text-3xl tracking-wide text-slate-900">
        {value}
      </p>
    </div>
  );
}