import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScans } from "@/hooks/useScans";
import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SCAN_STATUSES } from "@/utils/constants";

export function ActiveScans() {
  const { scans, isLoading } = useScans();
  const activeScans = scans?.filter(s => s.status === 'running') || [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Active Scans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Active Scans
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeScans.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No active scans
          </p>
        ) : (
          activeScans.map((scan) => (
            <div key={scan.job_id} className="space-y-2 pb-3 border-b border-border last:border-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">{scan.target}</p>
                <Badge className={SCAN_STATUSES[scan.status].color}>
                  {SCAN_STATUSES[scan.status].label}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Running...
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
