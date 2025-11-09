import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFindings } from "@/hooks/useFindings";
import { Shield } from "lucide-react";
import { getSeverityBadgeColor } from "@/utils/severity";

export function RecentFindings() {
  const { findings, isLoading } = useFindings({ status: ['open'] });
  const recentFindings = findings?.slice(0, 5) || [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Critical Issues</CardTitle>
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
          <Shield className="h-5 w-5" />
          Critical Issues
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentFindings.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No critical issues found
            </p>
          ) : (
            recentFindings.map((finding) => (
              <div key={finding.id} className="flex items-start justify-between border-b border-border pb-3 last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-sm">{finding.title}</p>
                  <p className="text-xs text-muted-foreground">{finding.target}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${getSeverityBadgeColor(finding.severity)}`}>
                  {finding.severity}
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
