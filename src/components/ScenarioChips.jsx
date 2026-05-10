// ScenarioChips.jsx
// Renders clickable scenario chips that load predefined host and VM configurations.

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { scenarioPresets } from "../utils/presets";

export function ScenarioChips({ activePreset, applyPreset }) {
    return (
        <Card>
        <CardHeader>
            <CardTitle>Preset Scenarios</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
            <p className="text-sm text-slate-600">
            Select a scenario to quickly compare efficient, moderate, and overloaded VM behavior.
            </p>

            <div className="flex flex-wrap gap-2">
            {scenarioPresets.map((preset, index) => {
                const isActive = activePreset === preset.id;

                return (
                <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`flex w-full items-start gap-3 rounded-[10px] border px-4 py-3 text-left transition ${
                        isActive
                            ? "border-[var(--teal)] bg-[var(--teal)] text-white shadow-sm"
                            : "border-[var(--teal)] bg-white text-[var(--teal)] hover:bg-[var(--sky)]"
                    }`}
                >
                    <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] text-sm font-bold ${
                            isActive
                            ? "bg-white text-[var(--teal)]"
                            : "bg-[var(--sky)] text-[var(--teal)]"
                        }`}
                    >
                        {index + 1}
                    </span>
                    <span>
                        <span className="block font-semibold">{preset.label}</span>
                        <span className={isActive ? "text-xs text-white/85" : "text-xs text-slate-500"}>
                            {preset.description}
                        </span>
                    </span>
                </button>
                );
            })}
            </div>

            {activePreset && (
                <div className="rounded-[8px] border border-[var(--sky-shade)] bg-[var(--sky)]/40 p-3 text-sm text-slate-700">
                    {scenarioPresets.find((preset) => preset.id === activePreset)?.scenario}
                </div>
            )}
        </CardContent>
        </Card>
    );
}