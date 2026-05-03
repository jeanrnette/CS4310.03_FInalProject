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

    return {
        usableCpu,
        usableMemory,
        totalCpu,
        totalMemory,
        remainingCpu: usableCpu - totalCpu,
        remainingMemory: usableMemory - totalMemory,
        cpuUsage,
        memoryUsage,
        status,
        performanceScore,
    };
}