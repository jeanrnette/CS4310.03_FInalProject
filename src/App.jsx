/*
  This is just soe start code so we can see some UI

  We will refactor this soon:
    - Create seperate components cards results etc
    - Seperate the acutal logic
*/

import { useState } from "react";
import "./App.css";

export default function App() {

  // HOST STATE representing the physical machine
  const [host, setHost] = useState({
    totalCpu: 100,          // percentage so out of 100
    totalMemory: 16384,     //
    reservedCpu: 10,        //
    reservedMemory: 2048,   // 
  });

  // VM STATE representing all virtual mahcine on host
  // 2 default for now
  const [vms, setVms] = useState([
    { id: 1, name: "VM-1", cpu: 20, memory: 2000, workload: "medium" },
    { id: 2, name: "VM-2", cpu: 30, memory: 4000, workload: "low" },
  ]);

  // RESULTS to store output from simulation
  const [results, setResults] = useState(null);



  //-----------------------------------------------------------

  // VIRTUAL MACHINE LIST MANAGEMENT

  // Adding a Virtual Machine
  const addVM = () => {
    setVms([
      ...vms,
      { id: Date.now(), name: "", cpu: 0, memory: 0, workload: "low" },
    ]);
  };

  // Removing a Virtual Machine
  const removeVM = (id) => {
    setVms(vms.filter((vm) => vm.id !== id));
  };

  // Updating a Virtual Machine
  const updateVM = (id, field, value) => {
    setVms(
      vms.map((vm) =>
        vm.id === id ? { ...vm, [field]: value } : vm
      )
    );
  };



  //-----------------------------------------------------------

  // SIMULATION LOGIC (basic formula for neow)
  const simulate = () => {

    // [1] Calculate the usable resources
    const usableCpu = host.totalCpu - host.reservedCpu;
    const usableMemory = host.totalMemory - host.reservedMemory;

    let totalCpu = 0;
    let totalMemory = 0;

    // [2] Simualting the workload impact
    vms.forEach((vm) => {
      // pressure
      let multiplier = 1;
      if (vm.workload === "medium") multiplier = 1.5;
      if (vm.workload === "high") multiplier = 2;

      totalCpu += vm.cpu * multiplier;
      totalMemory += vm.memory * multiplier;
    });

    // [3] Calculate usage percentage
    const cpuUsage = (totalCpu / usableCpu) * 100;
    const memoryUsage = (totalMemory / usableMemory) * 100;

    // [4] Determine the status of the system
    let status = "Efficient";
    if (cpuUsage > 70 || memoryUsage > 70) status = "Moderate";
    if (cpuUsage > 100 || memoryUsage > 100) status = "Overloaded";

    // [5] Store results
    setResults({
      totalCpu,
      totalMemory,
      cpuUsage,
      memoryUsage,
      status,
    });
  };



  //-----------------------------------------------------------
  // UI stuff, very simple layout. we will replace later
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>VM Resource Allocation Simulator</h1>



      {/* HOST CONFIG */}
      <h2>Host Configuration</h2>
      <input
        type="number"
        value={host.totalCpu}
        onChange={(e) =>
          setHost({ ...host, totalCpu: Number(e.target.value) })
        }
        placeholder="Total CPU"
      />
      <input
        type="number"
        value={host.totalMemory}
        onChange={(e) =>
          setHost({ ...host, totalMemory: Number(e.target.value) })
        }
        placeholder="Total Memory"
      />
      <input
        type="number"
        value={host.reservedCpu}
        onChange={(e) =>
          setHost({ ...host, reservedCpu: Number(e.target.value) })
        }
        placeholder="Reserved CPU"
      />
      <input
        type="number"
        value={host.reservedMemory}
        onChange={(e) =>
          setHost({ ...host, reservedMemory: Number(e.target.value) })
        }
        placeholder="Reserved Memory"
      />



      {/* VM LIST */}
      <h2>Virtual Machines</h2>
      {vms.map((vm) => (
        <div key={vm.id} style={{ border: "1px solid gray", marginBottom: "10px", padding: "10px" }}>
          {/* VM name */}
          <input
            value={vm.name}
            placeholder="VM Name"
            onChange={(e) => updateVM(vm.id, "name", e.target.value)}
          />

          {/* CPU request */}
          <input
            type="number"
            value={vm.cpu}
            placeholder="CPU"
            onChange={(e) => updateVM(vm.id, "cpu", Number(e.target.value))}
          />

          {/* Memory request */}
          <input
            type="number"
            value={vm.memory}
            placeholder="Memory"
            onChange={(e) => updateVM(vm.id, "memory", Number(e.target.value))}
          />

          {/* Pressure worklaod elvel */}
          <select
            value={vm.workload}
            onChange={(e) => updateVM(vm.id, "workload", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button onClick={() => removeVM(vm.id)}>Remove</button>
        </div>
      ))}

      <button onClick={addVM}>+ Add VM</button>

      <br /><br />



      {/* SIMULATE button trigger */}
      <button onClick={simulate}>Simulate Allocation</button>



      {/* RESULTS */}
      {results && (
        <div style={{ marginTop: "20px" }}>
          <h2>Results</h2>
          <p>Total CPU Used: {results.totalCpu.toFixed(2)}</p>
          <p>Total Memory Used: {results.totalMemory.toFixed(2)}</p>
          <p>CPU Usage %: {results.cpuUsage.toFixed(2)}%</p>
          <p>Memory Usage %: {results.memoryUsage.toFixed(2)}%</p>
          <p>Status: {results.status}</p>
        </div>
      )}
    </div>
  );
}