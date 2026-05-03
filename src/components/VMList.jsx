// VMList.jsx
// This renders the full list of virtual machines

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { VMCard } from "./VMCard";

export function VMList({ vms, addVM, removeVM, updateVM }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Virtual Machines</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {vms.map((vm) => (
          <VMCard
            key={vm.id}
            vm={vm}
            removeVM={removeVM}
            updateVM={updateVM}
          />
        ))}

        <Button variant="outline" onClick={addVM} className="w-full">
          + Add VM
        </Button>
      </CardContent>
    </Card>
  );
}