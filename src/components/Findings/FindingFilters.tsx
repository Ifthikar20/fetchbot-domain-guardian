import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FindingSeverity, FindingStatus } from "@/types/finding";

interface FindingFiltersProps {
  selectedSeverities: FindingSeverity[];
  selectedStatuses: FindingStatus[];
  onSeveritiesChange: (severities: FindingSeverity[]) => void;
  onStatusesChange: (statuses: FindingStatus[]) => void;
}

const severities: FindingSeverity[] = ['critical', 'high', 'medium', 'low', 'info'];
const statuses: FindingStatus[] = ['open', 'in_progress', 'resolved', 'false_positive'];

export function FindingFilters({ 
  selectedSeverities, 
  selectedStatuses, 
  onSeveritiesChange, 
  onStatusesChange 
}: FindingFiltersProps) {
  const toggleSeverity = (severity: FindingSeverity) => {
    if (selectedSeverities.includes(severity)) {
      onSeveritiesChange(selectedSeverities.filter(s => s !== severity));
    } else {
      onSeveritiesChange([...selectedSeverities, severity]);
    }
  };

  const toggleStatus = (status: FindingStatus) => {
    if (selectedStatuses.includes(status)) {
      onStatusesChange(selectedStatuses.filter(s => s !== status));
    } else {
      onStatusesChange([...selectedStatuses, status]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base font-semibold">Severity</Label>
          {severities.map((severity) => (
            <div key={severity} className="flex items-center space-x-2">
              <Checkbox
                id={`severity-${severity}`}
                checked={selectedSeverities.includes(severity)}
                onCheckedChange={() => toggleSeverity(severity)}
              />
              <label
                htmlFor={`severity-${severity}`}
                className="text-sm font-medium capitalize cursor-pointer"
              >
                {severity}
              </label>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">Status</Label>
          {statuses.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${status}`}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => toggleStatus(status)}
              />
              <label
                htmlFor={`status-${status}`}
                className="text-sm font-medium capitalize cursor-pointer"
              >
                {status.replace('_', ' ')}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
