import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScan, useScanLogs } from "@/hooks/useScans";
import { useScanFindings } from "@/hooks/useFindings";
import { ScanStatus } from "./ScanStatus";
import { ScanActions } from "./ScanActions";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { FindingCard } from "./FindingCard";
import { ExecutionLogs } from "./ExecutionLogs";
import { formatDate } from "@/utils/formatters";
import { CheckCircle2, Loader2, Activity, Clock, Shield, AlertTriangle } from "lucide-react";

interface ScanDetailProps {
  scanId: string;
}

export function ScanDetail({ scanId }: ScanDetailProps) {
  const { scan, isLoading } = useScan(scanId);
  const { logs, isLoading: isLoadingLogs } = useScanLogs(scanId, scan?.status);
  // Pass scan status to findings hook for real-time polling during active scans
  const {
    findings,
    total,
    bySeverity,
    isLoading: isLoadingFindings
  } = useScanFindings(scanId, scan?.status);

  console.log('ScanDetail render:', { scanId, scan, isLoading });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading scan details...</span>
      </div>
    );
  }

  if (!scan) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Scan not found</p>
          <div className="mt-4 p-4 bg-muted rounded text-left text-xs">
            <p><strong>Debug Info:</strong></p>
            <p>Scan ID: {scanId}</p>
            <p>Is Loading: {isLoading.toString()}</p>
            <p>Scan Data: {scan ? 'exists' : 'null/undefined'}</p>
            <p className="mt-2 text-red-500">Check browser console for more details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Use real-time findings data from hook instead of scan object
  const criticalCount = bySeverity?.critical || 0;
  const highCount = bySeverity?.high || 0;
  const mediumCount = bySeverity?.medium || 0;
  const lowCount = bySeverity?.low || 0;

  const stats = [
    {
      title: "Status",
      value: scan.status.charAt(0).toUpperCase() + scan.status.slice(1),
      icon: Activity,
      color: scan.status === 'completed' ? "text-green-500" : scan.status === 'running' ? "text-blue-500" : "text-yellow-500"
    },
    {
      title: "Total Findings",
      value: total.toString(),
      icon: AlertTriangle,
      color: criticalCount > 0 ? "text-red-500" : "text-green-500"
    },
    {
      title: "Critical",
      value: criticalCount.toString(),
      icon: Shield,
      color: "text-red-500"
    },
    {
      title: "Duration",
      value: scan.execution_time_seconds ? `${Math.floor(scan.execution_time_seconds)}s` : "0s",
      icon: Clock,
      color: "text-primary"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Scan Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Scan Overview</CardTitle>
              <CardDescription>Job ID: {scan.job_id}</CardDescription>
            </div>
            <ScanStatus status={scan.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {scan.created_at && (
              <div>
                <p className="text-sm text-muted-foreground">Started</p>
                <p className="font-medium">{formatDate(scan.created_at)}</p>
              </div>
            )}
            {scan.completed_at && (
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="font-medium">{formatDate(scan.completed_at)}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Agents Deployed</p>
              <p className="font-medium">{scan.agents_created?.length || 0}</p>
            </div>
          </div>

          {scan.message && (
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm">{scan.message}</p>
            </div>
          )}

          <ScanActions scan={scan} />
        </CardContent>
      </Card>

      {/* Execution Logs */}
      <ExecutionLogs logs={logs} isLoading={isLoadingLogs} />

      {/* Findings Summary */}
      {total > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Findings Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
                <div className="text-sm text-muted-foreground">Critical</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{highCount}</div>
                <div className="text-sm text-muted-foreground">High</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{mediumCount}</div>
                <div className="text-sm text-muted-foreground">Medium</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{lowCount}</div>
                <div className="text-sm text-muted-foreground">Low</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Findings */}
      <Card>
        <CardHeader>
          <CardTitle>Security Findings ({findings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingFindings ? (
            <div className="text-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Loading findings...</p>
            </div>
          ) : findings.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              {scan?.status === 'running' || scan?.status === 'queued'
                ? '🔍 Scanning... Findings will appear here as they are discovered'
                : 'No security findings detected'}
            </div>
          ) : (
            <div className="space-y-4">
              {findings.map((finding, index) => (
                <FindingCard key={index} finding={finding} index={index} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Agents Created */}
      {scan.agents_created && scan.agents_created.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Agents Deployed</CardTitle>
            <CardDescription>{scan.agents_created.length} specialized security agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {scan.agents_created.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between border rounded p-3">
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Modules: {agent.modules.join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={agent.status === 'completed' ? 'default' : 'secondary'}>
                      {agent.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {agent.findings_count} findings
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
