/*
  OKAYYY the cards and ui compoents ave been split into different files so verythin aint combulted and whatnot...

  - Tailwind CSS for styling
  - Color variables are in App.css so like --teal, --egg etc

  THIS FILE: holds the simulation function and page layout
*/

import { useMemo, useState } from "react";
import "./App.css";

import { ScenarioChips } from "./components/ScenarioChips";
import { HostConfig } from "./components/HostConfig";
import { VMList } from "./components/VMList";
import { ResultsPanel } from "./components/ResultsPanel";
import { StatusCard } from "./components/StatusCard";
import { ResourceUsage } from "./components/ResourceUsage";
import { InsightsPanel } from "./components/InsightsPanel";
import { createScenarioPresets } from "./utils/presets";
import { runSimulation } from "./utils/simulation";

export default function App() {
  // For keeping track of which preset is on / if off
  const [activePreset, setActivePreset] = useState(null);

  // Applies a preset by updating the host and VMs.
  const applyPreset = (preset) => {
    const scenario = createScenarioPresets(preset);

    setHost(scenario.host);
    setVms(scenario.vms);
    setActivePreset(preset.id);
  };

  const [host, setHost] = useState({
    totalCpu: 100,
    totalMemory: 16000,
    reservedCpu: 10,
    reservedMemory: 2000,
  });

  const [vms, setVms] = useState([
    { id: 1, name: "VM-Database", cpu: 20, memory: 1000, workload: "medium" },
    { id: 2, name: "VM-3", cpu: 30, memory: 5000, workload: "low" },
  ]);
 
  const results = useMemo(() => {
    return runSimulation(host, vms);
  }, [host, vms]);

  // TO update the host and its fields. Clears the active preset when the user is updating to their custom scenario.
  const updateHost = (field, value) => {
    const numericValue = Math.max(0, Number(value));
    setHost({ ...host, [field]: Number(value) });
    setActivePreset(null);
  };

  // Adds a new VM + clears the active preset because the scenario is now custom.
  const addVM = () => {
    setVms([
      ...vms,
      {
        id: crypto.randomUUID(),
        name: `VM-${vms.length + 1}`,
        cpu: 10,
        memory: 1000,
        workload: "low",
      },
    ]);

    setActivePreset(null);
  };

  const removeVM = (id) => {
    setVms(vms.filter((vm) => vm.id !== id));
  };

  // EDIT EDIJFSOFSDJFSDJFNSDLJFBHDLFJHWREBLHRESDBFRSLDJHFBRSDLJHCFBDSLHCVFBDSFLCJHDSBFDFJHBSDJHFBSDLFJHDSBFLJSDUHFBSLDKFJHSLFKJSDHFLKSDJHFLSDKJFH
  // Updates a VM field and clears the active preset because the user is customizing the scenario.
  const updateVM = (id, field, value) => {
    setVms(
      vms.map((vm) =>
        vm.id === id
          ? {
              ...vm,
              [field]:
                field === "name" || field === "workload"
                  ? value
                  : Number(value),
            }
          : vm
      )
    );

    setActivePreset(null);
  };

  return (
    <div className="min-h-screen bg-[var(--egg)] px-6 py-6 text-[var(--text-dark)]">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--teal)] text-xl text-white shadow-md">
            ▭
          </div>

          <div>
            <h1 className="font-['Bebas_Neue'] text-4xl uppercase tracking-wide text-[var(--teal)]">
              VM Resource Simulator
            </h1>
            <p className="text-sm text-slate-600">
              Simulates host OS CPU and memory allocation across virtual machines
            </p>
          </div>
        </header>

        <main className="grid gap-5 lg:grid-cols-3">
          <section className="space-y-5">
            <ScenarioChips activePreset={activePreset} applyPreset={applyPreset} />
            
            <HostConfig host={host} updateHost={updateHost} />

            <VMList
              vms={vms}
              addVM={addVM}
              removeVM={removeVM}
              updateVM={updateVM}
            />
          </section>

          <section className="space-y-5">
            <ResultsPanel results={results} />
            <StatusCard results={results} />
            <ResourceUsage results={results} />
          </section>

          <section className="space-y-5">
            <InsightsPanel results={results} />
          </section>
        </main>
      </div>
    </div>
  );
}