// VMCard.jsx
// This hols just ONE virtual machine input card

import { InputField } from "./ui/input";

export function VMCard({ vm, removeVM, updateVM }) {
  return (
    <div className="rounded-[4px] border border-[var(--teal)] bg-[var(--sky)]/70 p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex items-end gap-3 md:col-span-2">
          <InputField
            label="VM Name"
            value={vm.name}
            placeholder="VM Name"
            onChange={(value) => updateVM(vm.id, "name", value)}
            className="flex-1"
          />

          <button
            onClick={() => removeVM(vm.id)}
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[8px] border border-[var(--red)] bg-[var(--pink)] text-[var(--red)] transition hover:bg-[var(--pink-shade)] hover:text-[var(--red)]"
            aria-label="Remove VM"
          >
            ×
          </button>
        </div>

        <InputField
          label="CPU (%)"
          type="number"
          value={vm.cpu}
          onChange={(value) => updateVM(vm.id, "cpu", value)}
        />

        <InputField
          label="Memory (MB)"
          type="number"
          value={vm.memory}
          onChange={(value) => updateVM(vm.id, "memory", value)}
        />

        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-semibold uppercase text-slate-600">
            Workload Level
          </label>
          <select
            value={vm.workload}
            onChange={(e) => updateVM(vm.id, "workload", e.target.value)}
            className="w-full rounded-[8px] border border-slate-400 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[var(--teal)]"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
  );
}