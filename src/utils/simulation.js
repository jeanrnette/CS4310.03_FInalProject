// simulation.js
// All the actual logic will be stored here


// these multipliers are to simulate how HEAVY a Vm is.
const WORKLOAD_MULTIPLIERS = {
  low: 1,
  medium: 1.5,
  high: 2, // DOUBLE IT (give it to the next )
};


export function runSimulation(host, vms) {
    // What are the usable resources?
    // The Host has to reserve some CPU and memoery for itself so only what remains can be used by the virtual machines
    const usableCpu = host.totalCpu - host.reservedCpu;
    const usableMemory = host.totalMemory - host.reservedMemory;



    // Calcualte the total demand from the virtual machines
    let totalCpu = 0;
    let totalMemory = 0;

    vms.forEach((vm) => {
        const multiplier = WORKLOAD_MULTIPLIERS[vm.workload] || 1;

        totalCpu += Number(vm.cpu) * multiplier;
        totalMemory += Number(vm.memory) * multiplier;
    });

    // Calculate the remaoog resurces. 
    // if negative, the host is overallocated.
    const remainingCpu = usableCpu - totalCpu;
    const remainingMemory = usableMemory - totalMemory;


    // Compute the percantge of resource usage.
    // TO show how much of the avaiable resources are being used.
    let cpuUsage = 0;
    if (usableCpu > 0)  cpuUsage = (totalCpu / usableCpu) * 100;
    let memoryUsage = 0;
    if (usableMemory > 0) memoryUsage = (totalMemory / usableMemory) * 100;


    
    // Detmine the system status
    // efficiently using sources, moderat, or is it overloaded and the system is demanding alot.
    let status = "Efficient";
    if (cpuUsage > 70 || memoryUsage > 70) status = "Moderate Load";
    if (cpuUsage > 100 || memoryUsage > 100) status = "Overloaded";


    // Computing the performac score (#/100)
    // THis decreases as more resources are being used.
    let performanceScore = 100;

    // a lot of utilization
    if (cpuUsage > 70) performanceScore -= 15;
    if (memoryUsage > 70) performanceScore -= 15;

    // OVERBOARD, we are going over capcacity
    if (cpuUsage > 100) performanceScore -= 25;
    if (memoryUsage > 100) performanceScore -=25;

    // more penalties if the workload of a vm is set to higher
    vms.forEach((vm) => {
        if (vm.workload === "medium") performanceScore -= 2;
        if (vm.workload === "high") performanceScore -= 5;
    });

    // Keep the score betwen 0 - 100
    performanceScore = Math.max(0, Math.min(100, performanceScore));

    // To gnerate dynamic insgihts basedo nt he resutls of the simulation.
    const insights = [];

    if (host.reservedCpu > 0 || host.reservedMemory > 0) {
        insights.push(
        "The host OS reserves CPU and memory before resources are made available to virtual machines."
        );
    }

    if (cpuUsage > 80) {
        insights.push(
        "CPU usage is high, which suggests increased scheduling contention between VMs."
        );
    }

    if (memoryUsage > 80) {
        insights.push(
        "Memory usage is high, which may create memory pressure and reduce VM efficiency."
        );
    }

    if (remainingCpu < 0) {
        insights.push(
        "CPU demand exceeds available host CPU, so VM performance may degrade."
        );
    }

    if (remainingMemory < 0) {
        insights.push(
        "Memory demand exceeds available host memory, which may lead to paging, swapping, or allocation issues."
        );
    }

    const hasHighWorkload = vms.some((vm) => vm.workload === "high");

    if (hasHighWorkload) {
        insights.push(
        "At least one VM is running a high workload, increasing effective demand on the host OS."
        );
    }

    if (status === "Efficient") {
        insights.push(
        "The current VM workload is within the host’s available resource range."
        );
    }

    if (status === "Moderate Load") {
        insights.push(
        "The host is under moderate load; adding more VMs may cause performance overhead."
        );
    }

    if (status === "Overloaded") {
        insights.push(
        "The host is overloaded because VM demand exceeds available resources."
        );
    }

    return {
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
        insights,
    };
}