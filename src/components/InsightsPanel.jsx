// InsightsPanel.jsx
// The little insight explanntion panel area

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { buildInsightSections } from "../utils/insights";


export function InsightsPanel({ results }) {
  const sections = buildInsightSections(results);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {sections.length > 0 ? (
          sections.map((section) => (
            <InsightSection key={section.title} section={section} />
          ))
        ) : (
          <p className="text-sm text-slate-500">
            Adjust the host or VM settings to generate insights.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function InsightSection({ section }) {
  return (
    <section className="space-y-3">
      <h3 className="font-['Bebas_Neue'] text-xl uppercase tracking-wide text-[var(--teal)]">
        {section.title}
      </h3>

      <div className="space-y-2">
        {section.items.map((item, index) => (
          <InsightCard key={`${section.title}-${index}`} item={item} />
        ))}
      </div>
    </section>
  );
}

function InsightCard({ item }) {
  return (
    <div className="rounded-[4px] border border-[var(--teal)] bg-[var(--sky)]/60 p-3">
      <p className="font-semibold text-slate-800">{item.title}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">
        {item.description}
      </p>
    </div>
  );
}