import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinding, useUpdateFinding } from "@/hooks/useFindings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSeverityIcon, getSeverityBadgeColor } from "@/utils/severity";
import { formatDate } from "@/utils/formatters";

interface FindingDetailProps {
  findingId: string;
}

export function FindingDetail({ findingId }: FindingDetailProps) {
  const { finding, isLoading } = useFinding(findingId);
  const updateFinding = useUpdateFinding();
  const Icon = finding ? getSeverityIcon(finding.severity) : null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!finding || !Icon) {
    return <div>Finding not found</div>;
  }

  const handleStatusChange = (status: string) => {
    updateFinding.mutate({ id: finding.id, status });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3 flex-1">
              <div className={`p-3 rounded-lg ${getSeverityBadgeColor(finding.severity)}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{finding.title}</CardTitle>
                <CardDescription>{finding.target}</CardDescription>
              </div>
            </div>
            <Badge className={getSeverityBadgeColor(finding.severity)}>
              {finding.severity}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{finding.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-medium">{finding.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="outline">{finding.status}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Discovered</p>
              <p className="font-medium">{formatDate(finding.discoveredAt)}</p>
            </div>
            {finding.cvss && (
              <div>
                <p className="text-sm text-muted-foreground">CVSS Score</p>
                <p className="font-medium">{finding.cvss}</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={() => handleStatusChange('in_progress')}>
              Mark In Progress
            </Button>
            <Button variant="outline" onClick={() => handleStatusChange('resolved')}>
              Mark Resolved
            </Button>
            <Button variant="outline" onClick={() => handleStatusChange('false_positive')}>
              False Positive
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
