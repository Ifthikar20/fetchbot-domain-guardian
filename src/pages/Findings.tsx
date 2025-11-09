import { useState } from "react";
import { FindingsTable } from "@/components/Findings/FindingsTable";
import { FindingFilters } from "@/components/Findings/FindingFilters";
import type { FindingSeverity, FindingStatus } from "@/types/finding";

export default function Findings() {
  const [selectedSeverities, setSelectedSeverities] = useState<FindingSeverity[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<FindingStatus[]>([]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Findings</h2>
        <p className="text-muted-foreground">Security vulnerabilities discovered across your targets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FindingFilters
            selectedSeverities={selectedSeverities}
            selectedStatuses={selectedStatuses}
            onSeveritiesChange={setSelectedSeverities}
            onStatusesChange={setSelectedStatuses}
          />
        </div>
        <div className="lg:col-span-3">
          <FindingsTable 
            filters={{
              severity: selectedSeverities.length > 0 ? selectedSeverities : undefined,
              status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
}
