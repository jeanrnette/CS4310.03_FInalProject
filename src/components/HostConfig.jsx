// HostConfig.jsx
// Host OS Configuration

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { InputField } from "./ui/input";

export function HostConfig({ host, updateHost }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Host Configuration</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2">
        <InputField
          label="Total CPU (%)"
          type="number"
          value={host.totalCpu}
          onChange={(value) => updateHost("totalCpu", value)}
        />

        <InputField
          label="Total Memory (MB)"
          type="number"
          value={host.totalMemory}
          onChange={(value) => updateHost("totalMemory", value)}
        />

        <InputField
          label="Host Reserved CPU (%)"
          type="number"
          value={host.reservedCpu}
          onChange={(value) => updateHost("reservedCpu", value)}
        />

        <InputField
          label="Host Reserved Memory (MB)"
          type="number"
          value={host.reservedMemory}
          onChange={(value) => updateHost("reservedMemory", value)}
        />
      </CardContent>
    </Card>
  );
}