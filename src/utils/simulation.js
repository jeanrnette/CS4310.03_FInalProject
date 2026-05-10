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
const INVALID_USAGE_VALUE = 0;

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
    if (usableCapacity <= 0) return 0;
    return (totalDemand / usableCapacity) * 100;
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

  // If over mod. threshold, remove 15 points from performance score
  if (cpuUsage > MODERATE_LOAD_THRESHOLD) score -= 15;
  if (memoryUsage > MODERATE_LOAD_THRESHOLD) score -= 15;

  // if cpu overloaded, remove 25 points.
  if (cpuUsage > OVERLOAD_THRESHOLD) score -= 25;
  if (memoryUsage > OVERLOAD_THRESHOLD) score -= 25;

  // Every vm will also reduce the performance by a little depending on workload level
  vms.forEach((vm) => {
    if (vm.workload === "medium") score -= 2;
    if (vm.workload === "high") score -= 5;
  });

  return clamp(score, 0, 100);
}

// Runs the VM resource allocation simulation.
// Host CPU and VM CPU are have CPU cores, while memory is in MB.
export function runSimulation(host, vms) {
    const hostTotalCpuCores = toNumber(host.totalCpuCores);
    const hostTotalMemory = toNumber(host.totalMemory);
    const hostReservedCpu = toNumber(host.reservedCpu);
    const hostReservedMemory = toNumber(host.reservedMemory);

    // Usable resources are what remains after the host OS reserves resources for itself.
    const usableCpu = hostTotalCpuCores - hostReservedCpu;
    const usableMemory = hostTotalMemory - hostReservedMemory;

    let totalCpuDemand = 0;
    let totalMemoryDemand = 0;

    // Each VM contributes to demand based on its requested resources and workload level.
    vms.forEach((vm) => {
        const multiplier = getWorkloadMultiplier(vm.workload);

        totalCpuDemand += toNumber(vm.cpu) * multiplier;
        totalMemoryDemand += toNumber(vm.memory) * multiplier;
    });

    // Remaining resources can be negative, which means the host is overcommitted.
    const remainingCpu = usableCpu - totalCpuDemand;
    const remainingMemory = usableMemory - totalMemoryDemand;

    // Usage percentages compare total VM demand to the usable host resources.
    const cpuUsage = calculateUsagePercent(totalCpuDemand, usableCpu);
    const memoryUsage = calculateUsagePercent(totalMemoryDemand, usableMemory);

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
        hostTotalCpuCores,
        hostTotalMemory,
        hostReservedCpu,
        hostReservedMemory,

        usableCpu,
        usableMemory,
        totalCpuDemand,
        totalMemoryDemand,
        remainingCpu,
        remainingMemory,

        cpuUsage,
        memoryUsage,
        status,
        performanceScore,
    };
}