// presets.js
// Defines predefined simulation scenarios for comparing VM performance under different host configurations.


export const scenarioPresets = [
    { // HIGH PERFORMING SIMULATION
        id: "efficient",
        label: "High Performing",
        description: 
            "A lightly loaded system with available CPU cores and memory.",        
        scenario: 
            "This scenario represents a well-provisioned host where VM demand is comfortably within available CPU cores and memory, resulting in minimal contention.",
        // Host configuration: strong laptop / small workstation
        host: {
            totalCpu: 8,
            totalMemory: 16000,
            reservedCpu: 1,
            reservedMemory: 2000,
        },
        // VM configuration: low demand
        vms: [
            { id: 1, name: "VM-Web", cpu: 1, memory: 1000, workload: "low" },
            { id: 2, name: "VM-Tools", cpu: 1, memory: 1000, workload: "low" },
        ],
    },
    { // MEDIUM PERFORMING SIMULATION
        id: "moderate",
        label: "Moderate Load",
        description:
            "A shared environment where multiple VMs compete for resources.",
        scenario:
            "This scenario models a lab or shared server environment where CPU cores and memory are actively shared across several VMs, increasing contention risk.",
        // Host configuration: typical shared system
        host: {
            totalCpu: 8,
            totalMemory: 16000,
            reservedCpu: 1,
            reservedMemory: 3000,
        },
        // VM configuration: moderate demand
        vms: [
            { id: 1, name: "VM-Database", cpu: 2, memory: 3000, workload: "medium" },
            { id: 2, name: "VM-Web", cpu: 2, memory: 2000, workload: "medium" },
            { id: 3, name: "VM-Lab", cpu: 1, memory: 1500, workload: "low" },
        ],
    },
    { // LOW PERFORMING SIMULATION
        id: "overloaded",
        label: "Overloaded",
        description:
            "A system where VM demand exceeds available CPU cores and memory.",
        scenario:
            "This scenario demonstrates overcommitment, where VMs request more CPU cores and memory than the host can provide, leading to contention and degraded performance.",
        // Host configuration: same hardware, but higher demand
        host: {
            totalCpu: 8,
            totalMemory: 16000,
            reservedCpu: 2,
            reservedMemory: 4000,
        },
        // VM configuration: high demand (intentionally exceeds capacity)
        vms: [
            { id: 1, name: "VM-Database", cpu: 3, memory: 5000, workload: "high" },
            { id: 2, name: "VM-Analytics", cpu: 3, memory: 4000, workload: "high" },
            { id: 3, name: "VM-Web", cpu: 2, memory: 3000, workload: "medium" },
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