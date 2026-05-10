// utils/presets.js
// Stores reusable VM simulation scenarios for quick comparison.


export const scenarioPresets = [
    { // HIGH PERFORMING SIMULATION
        id: "efficient",
        label: "High Performing",
        description: 
            "A lightly loaded host with enough CPU and memory available after host OS reservation.",
        scenario: 
            "This scenario represents an efficient VM environment where the host OS keeps enough resources for itself while VM demand remains low.",
        host: {
            totalCpu: 100,
            totalMemory: 16000,
            reservedCpu: 10,
            reservedMemory: 2000,
        },
        vms: [
            { id: 1, name: "VM-Web", cpu: 10, memory: 1000, workload: "low" },
            { id: 2, name: "VM-Tools", cpu: 8, memory: 1000, workload: "low" },
        ],
    },
    { // MEDIUM PERFORMING SIMULATION
        id: "moderate",
        label: "Medium Load",
        description:
            "A shared lab-style setup where multiple VMs compete for host resources.",
        scenario:
            "This scenario represents moderate contention, where CPU scheduling and memory allocation become more important but the system is not fully overloaded.",
        host: {
            totalCpu: 100,
            totalMemory: 16000,
            reservedCpu: 15,
            reservedMemory: 3000,
        },
        vms: [
            { id: 1, name: "VM-Database", cpu: 20, memory: 3000, workload: "medium" },
            { id: 2, name: "VM-Web", cpu: 15, memory: 2000, workload: "medium" },
            { id: 3, name: "VM-Lab", cpu: 10, memory: 1500, workload: "low" },
        ],
    },
    { // LOW PERFORMING SIMULATION
        id: "overloaded",
        label: "Overloaded",
        description:
            "A high-demand server setup where VM demand exceeds usable host capacity.",
        scenario:
            "This scenario represents resource overcommitment, where VM demand is greater than available host CPU or memory after the host OS reservation.",
        host: {
            totalCpu: 100,
            totalMemory: 16000,
            reservedCpu: 20,
            reservedMemory: 4000,
        },
        vms: [
            { id: 1, name: "VM-Database", cpu: 35, memory: 5000, workload: "high" },
            { id: 2, name: "VM-Analytics", cpu: 30, memory: 4000, workload: "high" },
            { id: 3, name: "VM-Web", cpu: 25, memory: 3000, workload: "medium" },
        ],
    },
];


// Creating IDs for VMs so react does not use an old VM state when switching presets.
export function createScenarioPresets(preset) {
  return {
    ...preset,
    host: { ...preset.host },
    vms: preset.vms.map((vm) => ({
      ...vm,
      id: crypto.randomUUID(),
    })),
  };
}