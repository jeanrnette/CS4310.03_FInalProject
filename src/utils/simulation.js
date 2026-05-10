// simulation.js
// Contains the core simulation model for host OS and VM resource allocation.

// Workload multipliers estimate how much pressure a VM places on the host.
// A VM with a "high" workload uses more effective CPU and memory than its base request.
const WORKLOAD_MULTIPLIERS = {
    low: 1,
    medium: 1.5,
    high: 2,
};

// Thresholds
const MODERATE_LOAD_THRESHOLD = 70; // where system is under pressure
const OVERLOAD_THRESHOLD = 100; // for vm demand going over usaable host capacity

// Used when usage cannot be calculated normally because usable capacity is zero or negative.
const INVALID_USAGE_VALUE = 999;

// Keeps a number within a minimum and maximum range.
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// Safely converts input values into numbers.
// Empty inputs or invalid values become 0 so the simulation does not crash.
function toNumber(value) {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : 0;
}

// Returns the multiplier for a VM workload level.
// Unknown workload values default to low pressure.
function getWorkloadMultiplier(workload) {
    return WORKLOAD_MULTIPLIERS[workload] || WORKLOAD_MULTIPLIERS.low;
}

// Calculates usage as a percentage of usable host capacity.
// Values above 100 mean the VM demand exceeds the available host capacity.
function calculateUsagePercent(totalDemand, usableCapacity) {
    if (usableCapacity > 0) {
        return (totalDemand / usableCapacity) * 100;
    }

    if (totalDemand > 0) {
        return INVALID_USAGE_VALUE;
    }

    return 0;
}

// Getting the overall system status from host capacity and resource pressure.
function getSystemStatus({ usableCpu, usableMemory, cpuUsage, memoryUsage, vmCount }) {
    if (usableCpu <= 0 || usableMemory <= 0) return "Invalid Host Configuration";
    if (vmCount === 0) return "No VMs Running";
    if (cpuUsage > OVERLOAD_THRESHOLD || memoryUsage > OVERLOAD_THRESHOLD) return "Overloaded";
    if (cpuUsage > MODERATE_LOAD_THRESHOLD || memoryUsage > MODERATE_LOAD_THRESHOLD) return "Moderate Load";

    return "Efficient";
}

// Calculates a simplified performance score from 0 to 100.
// It will drop as CPU pressure, memory pressure, and workload intensity increase.
function calculatePerformanceScore({ usableCpu, usableMemory, cpuUsage, memoryUsage, vms }) {
  if (usableCpu <= 0 || usableMemory <= 0) {
    return 0;
  }

  let score = 100;

  if (cpuUsage > MODERATE_LOAD_THRESHOLD) score -= 15;
  if (memoryUsage > MODERATE_LOAD_THRESHOLD) score -= 15;

  if (cpuUsage > OVERLOAD_THRESHOLD) score -= 25;
  if (memoryUsage > OVERLOAD_THRESHOLD) score -= 25;

  vms.forEach((vm) => {
    if (vm.workload === "medium") score -= 2;
    if (vm.workload === "high") score -= 5;
  });

  return clamp(score, 0, 100);
}

// Runs the VM resource allocation simulation.
// Host CPU and VM CPU are have CPU cores, while memory is in MB.
export function runSimulation(host, vms) {
    const hostTotalCpu = toNumber(host.totalCpu);
    const hostTotalMemory = toNumber(host.totalMemory);
    const hostReservedCpu = toNumber(host.reservedCpu);
    const hostReservedMemory = toNumber(host.reservedMemory);

    // Usable resources are what remains after the host OS reserves resources for itself.
    const usableCpu = hostTotalCpu - hostReservedCpu;
    const usableMemory = hostTotalMemory - hostReservedMemory;

    let totalCpu = 0;
    let totalMemory = 0;

    // Each VM contributes to demand based on its requested resources and workload level.
    vms.forEach((vm) => {
        const multiplier = getWorkloadMultiplier(vm.workload);

        totalCpu += toNumber(vm.cpu) * multiplier;
        totalMemory += toNumber(vm.memory) * multiplier;
    });

    // Remaining resources can be negative, which means the host is overcommitted.
    const remainingCpu = usableCpu - totalCpu;
    const remainingMemory = usableMemory - totalMemory;

    // Usage percentages compare total VM demand to the usable host resources.
    const cpuUsage = calculateUsagePercent(totalCpu, usableCpu);
    const memoryUsage = calculateUsagePercent(totalMemory, usableMemory);

    const status = getSystemStatus({
        usableCpu,
        usableMemory,
        cpuUsage,
        memoryUsage,
        vmCount: vms.length,
    });

    const performanceScore = calculatePerformanceScore({
        usableCpu,
        usableMemory,
        cpuUsage,
        memoryUsage,
        vms,
    });

    return {
        hostTotalCpu,
        hostTotalMemory,
        hostReservedCpu,
        hostReservedMemory,

        usableCpu,
        usableMemory,
        totalCpu,
        totalMemory,
        remainingCpu,
        remainingMemory,

        cpuUsage,
        memoryUsage,

        status,
        performanceScore,
    };
}