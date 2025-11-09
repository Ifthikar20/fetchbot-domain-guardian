import { Badge } from "@/components/ui/badge";
import { SCAN_STATUSES } from "@/utils/constants";
import type { ScanStatus as ScanStatusType } from "@/types/scan";

interface ScanStatusProps {
  status: ScanStatusType;
}

export function ScanStatus({ status }: ScanStatusProps) {
  const statusConfig = SCAN_STATUSES[status];
  
  return (
    <Badge className={statusConfig.color}>
      {statusConfig.label}
    </Badge>
  );
}
