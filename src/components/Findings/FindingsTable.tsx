import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFindings } from "@/hooks/useFindings";
import { getSeverityIcon, getSeverityBadgeColor } from "@/utils/severity";
import { formatRelativeTime } from "@/utils/formatters";
import type { FindingFilters } from "@/types/finding";

interface FindingsTableProps {
  filters?: FindingFilters;
}

export function FindingsTable({ filters }: FindingsTableProps) {
  const { findings, isLoading } = useFindings(filters);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!findings || findings.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No findings found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Target</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Discovered</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {findings.map((finding) => {
          const Icon = getSeverityIcon(finding.severity);
          return (
            <TableRow key={finding.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-medium">{finding.title}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className={`text-xs px-2 py-1 rounded ${getSeverityBadgeColor(finding.severity)}`}>
                    {finding.severity}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{finding.target}</TableCell>
              <TableCell>{finding.category}</TableCell>
              <TableCell className="text-muted-foreground">
                {formatRelativeTime(finding.discoveredAt)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
