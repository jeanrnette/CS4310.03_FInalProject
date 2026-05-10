// insights.js
// Builds grouped insight cards from the current simulation results.

// Thresholds for host capacity based on usable CPU cores.
const LOW_CPU_THRESHOLD = 2;
const MODERATE_CPU_THRESHOLD = 6;

// Thresholds for memory in MB
const LOW_MEMORY_THRESHOLD = 4000;
const MODERATE_MEMORY_THRESHOLD = 10000;


// Get host capacity category based on usable CPU cores and memory
function getHostCapacityCategory(usableCpu, usableMemory) {
  if (usableCpu < LOW_CPU_THRESHOLD || usableMemory < LOW_MEMORY_THRESHOLD) {
    return "low";
  }

  if (usableCpu < MODERATE_CPU_THRESHOLD || usableMemory < MODERATE_MEMORY_THRESHOLD) {
    return "moderate";
  }

  return "high";
}


// Builds insight sections grouped by topic.
export function buildInsightSections(results) {
    if (!results) return [];

    const sections = [];


    /// HOST STUFF HERE --------------------------------------------------
    const hostItems = [];

    const cpuReservedPercent =
    results.hostTotalCpu > 0
        ? (results.hostReservedCpu / results.hostTotalCpu) * 100
        : 0;

    const memoryReservedPercent =
        results.hostTotalMemory > 0
        ? (results.hostReservedMemory / results.hostTotalMemory) * 100
        : 0;

    const capacityCategory = getHostCapacityCategory(
        results.usableCpu,
        results.usableMemory
    );

    if (results.usableCpu <= 0 || results.usableMemory <= 0) {
        hostItems.push({
            title: "Invalid Host Configuration",
            description:
                "The host has no usable CPU cores or memory after reservation. Virtual machines cannot be scheduled or allocated in this state.",
        });
    } else {
        if (capacityCategory === "low") {
            hostItems.push({
                title: "Low-Capacity Host",
                description:
                    "The host has very few usable CPU cores or limited memory. This restricts the number of VMs that can run efficiently and increases the likelihood of contention.",
            });
        } else if (capacityCategory === "moderate") {
            hostItems.push({
                title: "Moderate-Capacity Host",
                description:
                    "The host has a balanced number of CPU cores and memory. It can support several VMs, but heavier workloads may compete for CPU time and memory allocation.",
            });
        } else {
            hostItems.push({
                title: "High-Capacity Host",
                description:
                    "The host has multiple CPU cores and sufficient memory, allowing it to handle multiple VMs or high workloads with reduced contention.",
            });
        }
    }

    // Host reservation interpretation
    if (cpuReservedPercent > 25 || memoryReservedPercent > 25) {
        hostItems.push({
            title: "High Host Reservation",
            description:
                "A large portion of CPU cores or memory is reserved for the host OS. This improves host stability but reduces the number of cores available for VMs.",
        });
    } else if (cpuReservedPercent < 10 && memoryReservedPercent < 10) {
        hostItems.push({
            title: "Minimal Host Reservation",
            description:
                "Very few CPU cores or memory are reserved for the host OS. This maximizes VM capacity but may risk instability if the host needs additional resources.",
        });
    } else {
        hostItems.push({
            title: "Balanced Host Reservation",
            description:
                "The host reserves a reasonable portion of CPU cores and memory, balancing system stability with VM performance.",
        });
    }

    // Overload interpretation
    if (results.status === "Overloaded") {
        hostItems.push({
            title: "Host Resource Saturation",
            description:
                "The total VM demand exceeds the available CPU cores or memory. This indicates the host is overcommitted and cannot satisfy all VM requests simultaneously.",
        });
    }

    sections.push({
        title: "Host OS Configuration",
        items: hostItems,
    });

    
    
    /// CPU SUTFF HERE --------------------------------------------------

    const cpuItems = [];

    if (results.cpuUsage > 100) {
        cpuItems.push({
            title: "CPU Overcommitment",
            description:
                "VMs are requesting more CPU cores than the host can provide. In a real system, the hypervisor would time-slice CPU cores, causing slower execution for each VM.",
        });
    } else if (results.cpuUsage > 70) {
        cpuItems.push({
            title: "CPU Contention Risk",
            description:
                "Most CPU cores are in use. VMs may begin to experience scheduling delays as they compete for CPU time.",
        });
    } else {
        cpuItems.push({
            title: "CPU Headroom Available",
            description:
                "There are still unused CPU cores available, allowing additional VMs or increased workloads without significant performance impact.",
        });
    }

    sections.push({
        title: "CPU Behavior",
        items: cpuItems,
    });


    /// MEMORY SUTFF HERE --------------------------------------------------

    const memoryItems = [];

    if (results.memoryUsage > 100) {
        memoryItems.push({
            title: "Memory Overcommitment",
            description:
                "VM memory demand exceeds available host memory. This can lead to swapping or paging, significantly reducing performance.",
        });
    } else if (results.memoryUsage > 70) {
        memoryItems.push({
            title: "Memory Pressure",
            description:
                "Memory usage is high. Additional VMs may reduce efficiency as memory becomes a limiting factor.",
        });
    } else {
        memoryItems.push({
        title: "Memory Headroom Available",
        description:
            "Sufficient memory remains for current workloads, allowing stable VM operation.",
        });
    }

    sections.push({
        title: "Memory Behavior",
        items: memoryItems,
    });


    /// PERFORMANCE SUTFF HERE --------------------------------------------------
    const performanceItems = [];

    // Explains what the performance score means in practical terms.
    if (results.performanceScore >= 85) {
        performanceItems.push({
            title: `${results.performanceScore}/100 - High Performance`,
            description:
                "VMs are running efficiently with minimal contention. Additional low-demand VMs can likely be added without impacting performance.",

        });
    } else if (results.performanceScore >= 70) {
        performanceItems.push({
            title: `${results.performanceScore}/100 - Stable Performance`,
            description:
                "The system is stable but approaching higher utilization. Additional VMs should be added cautiously.",
        });
    } else if (results.performanceScore >= 50) {
        performanceItems.push({
            title: `${results.performanceScore}/100 - Moderate Performance Risk`,
            description:
                "Resource contention is noticeable. VMs may experience slower response times due to shared CPU cores and memory pressure.",
        });
    } else if (results.performanceScore >= 25) {
        performanceItems.push({
            title: `${results.performanceScore}/100 - Poor Performance`,
            description:
                "The system is heavily loaded. VM performance degradation is likely due to CPU time-slicing and memory pressure.",
        });
    } else {
        performanceItems.push({
            title: `${results.performanceScore}/100 - Critical Performance Failure`,
            description:
                "The host is severely overloaded. VMs may stall, fail to respond, or experience extreme latency due to insufficient CPU cores and memory.",
        });
    }

    sections.push({
        title: "Performance Interpretation",
        items: performanceItems,
    });

    return sections;
}