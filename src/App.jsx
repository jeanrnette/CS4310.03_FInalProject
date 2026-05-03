/*
  OKAYYY the cards and ui compoents ave been split into different files so verythin aint combulted and whatnot...

  - Tailwind CSS for styling
  - Color variables are in App.css so like --teal, --egg etc

  THIS FILE: holds the simulation function and page layout
*/

import { useState } from "react";
import "./App.css";

import { HostConfig } from "./components/HostConfig";
import { VMList } from "./components/VMList";
import { ResultsPanel } from "./components/ResultsPanel";
import { StatusCard } from "./components/StatusCard";
import { ResourceUsage } from "./components/ResourceUsage";
import { InsightsPanel } from "./components/InsightsPanel";
import { Button } from "./components/ui/button";
import { runSimulation } from "./utils/simulation";

export default function App() {
  const [host, setHost] = useState({
    totalCpu: 100,
    totalMemory: 16384,
    reservedCpu: 10,
    reservedMemory: 2048,
  });

  const [vms, setVms] = useState([
    { id: 1, name: "VM-Database", cpu: 20, memory: 1000, workload: "medium" },
    { id: 2, name: "VM-3", cpu: 30, memory: 5000, workload: "low" },
  ]);

  const [results, setResults] = useState(null);

  const updateHost = (field, value) => {
    setHost({ ...host, [field]: Number(value) });
  };

  const addVM = () => {
    setVms([
      ...vms,
      {
        id: Date.now(),
        name: `VM-${vms.length + 1}`,
        cpu: 0,
        memory: 0,
        workload: "low",
      },
    ]);
  };

  const removeVM = (id) => {
    setVms(vms.filter((vm) => vm.id !== id));
  };

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
  };

  const simulate = () => {
    const output = runSimulation(host, vms);
    setResults(output);
  };

  return (
    <div className="min-h-screen bg-[var(--egg)] px-6 py-6 text-[var(--text-dark)]">
      <div className="mx-auto max-w-6xl">
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

        <main className="grid gap-5 lg:grid-cols-[1.03fr_0.97fr]">
          <section className="space-y-5">
            <HostConfig host={host} updateHost={updateHost} />

            <VMList
              vms={vms}
              addVM={addVM}
              removeVM={removeVM}
              updateVM={updateVM}
            />

            <Button
              onClick={simulate}
              className="w-full py-4 font-['Bebas_Neue'] text-2xl uppercase tracking-wide shadow-md"
            >
              ▷ Simulate Allocation
            </Button>
          </section>

          <section className="space-y-5">
            <ResultsPanel results={results} />
            <StatusCard results={results} />
            <ResourceUsage results={results} />
            <InsightsPanel results={results} />
          </section>
        </main>
      </div>
    </div>
  );
}