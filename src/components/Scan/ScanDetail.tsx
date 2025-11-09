import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScan } from "@/hooks/useScans";
import { ScanStatus } from "./ScanStatus";
import { ScanActions } from "./ScanActions";
import { formatDate } from "@/utils/formatters";
import { AlertTriangle, CheckCircle2, Info, Loader2 } from "lucide-react";

interface ScanDetailProps {
  scanId: string;
}

const severityColors = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-blue-500",
  info: "bg-gray-500",
};

const severityIcons = {
  critical: AlertTriangle,
  high: AlertTriangle,
  medium: Info,
  low: Info,
  info: CheckCircle2,
};

export function ScanDetail({ scanId }: ScanDetailProps) {
  const { scan, isLoading } = useScan(scanId);

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
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Scan Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{scan.target}</CardTitle>
              <CardDescription>Job ID: {scan.job_id}</CardDescription>
            </div>
            <ScanStatus status={scan.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            {scan.execution_time_seconds !== undefined && (
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{Math.floor(scan.execution_time_seconds)}s</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Total Findings</p>
              <p className="font-medium">{scan.total_findings || 0}</p>
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

      {/* Findings Summary */}
      {(scan.total_findings || 0) > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Findings Summary</CardTitle>
            <CardDescription>
              {scan.critical_findings || 0} critical, {scan.high_findings || 0} high severity issues found
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Detailed Findings */}
      {scan.findings && scan.findings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Security Findings</CardTitle>
            <CardDescription>{scan.findings.length} vulnerabilities discovered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scan.findings.map((finding, index) => {
                const SeverityIcon = severityIcons[finding.severity];
                return (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <SeverityIcon className={`h-5 w-5 mt-0.5 ${finding.severity === 'critical' || finding.severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
                        <div>
                          <h4 className="font-semibold">{finding.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{finding.description}</p>
                        </div>
                      </div>
                      <Badge className={`${severityColors[finding.severity]} text-white`}>
                        {finding.severity.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type:</span> {finding.type}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Discovered by:</span> {finding.discovered_by}
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">URL:</span>{" "}
                        <code className="bg-muted px-1 py-0.5 rounded text-xs">{finding.url}</code>
                      </div>
                      {finding.payload && (
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Payload:</span>
                          <pre className="bg-muted p-2 rounded text-xs mt-1 overflow-x-auto">{finding.payload}</pre>
                        </div>
                      )}
                      {finding.evidence && (
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Evidence:</span>
                          <pre className="bg-muted p-2 rounded text-xs mt-1 overflow-x-auto">{finding.evidence}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* No findings message for completed scans */}
      {scan.status === 'completed' && (!scan.findings || scan.findings.length === 0) && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="font-medium">No vulnerabilities found</p>
            <p className="text-sm text-muted-foreground">This target passed all security checks</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
