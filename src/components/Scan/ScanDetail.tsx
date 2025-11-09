import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScan } from "@/hooks/useScans";
import { ScanStatus } from "./ScanStatus";
import { ScanActions } from "./ScanActions";
import { formatDate } from "@/utils/formatters";

interface ScanDetailProps {
  scanId: string;
}

export function ScanDetail({ scanId }: ScanDetailProps) {
  const { scan, isLoading } = useScan(scanId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!scan) {
    return <div>Scan not found</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{scan.target}</CardTitle>
            <ScanStatus status={scan.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Started</p>
              <p className="font-medium">{formatDate(scan.created_at)}</p>
            </div>
            {scan.completed_at && (
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="font-medium">{formatDate(scan.completed_at)}</p>
              </div>
            )}
          </div>

          {scan.execution_time_seconds !== undefined && (
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{scan.execution_time_seconds}s</p>
            </div>
          )}

          <ScanActions scan={scan} />
        </CardContent>
      </Card>
    </div>
  );
}
