import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSeverityIcon, getSeverityBadgeColor } from "@/utils/severity";
import { formatRelativeTime } from "@/utils/formatters";
import type { Finding } from "@/types/finding";

interface FindingCardProps {
  finding: Finding;
  onClick?: () => void;
}

export function FindingCard({ finding, onClick }: FindingCardProps) {
  const Icon = getSeverityIcon(finding.severity);

  return (
    <Card 
      className="hover:bg-card/80 transition-colors cursor-pointer" 
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3 flex-1">
            <div className={`p-2 rounded-lg ${getSeverityBadgeColor(finding.severity)}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg mb-1">{finding.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{finding.target}</p>
            </div>
          </div>
          <Badge className={getSeverityBadgeColor(finding.severity)}>
            {finding.severity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Discovered {formatRelativeTime(finding.discoveredAt)}
          </span>
          <Badge variant="outline">{finding.status}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
