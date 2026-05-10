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
        {results && results.insights?.length > 0 ? (
          <ul className="space-y-3 text-sm text-slate-700">
            {results.insights.map((text, index) => (
              <Insight key={index}>{text}</Insight>
            ))}
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