import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScan } from "@/hooks/useScans";
import { Progress } from "@/components/ui/progress";
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
              <p className="font-medium">{formatDate(scan.startedAt)}</p>
            </div>
            {scan.completedAt && (
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="font-medium">{formatDate(scan.completedAt)}</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{scan.progress}%</span>
            </div>
            <Progress value={scan.progress} />
          </div>

          {scan.duration && (
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{scan.duration}</p>
            </div>
          )}

          <ScanActions scan={scan} />
        </CardContent>
      </Card>
    </div>
  );
}
