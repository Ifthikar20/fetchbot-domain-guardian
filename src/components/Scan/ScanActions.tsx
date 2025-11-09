import { Button } from "@/components/ui/button";
import { RotateCcw, FileText } from "lucide-react";
import type { Scan } from "@/types/scan";

interface ScanActionsProps {
  scan: Scan;
}

export function ScanActions({ scan }: ScanActionsProps) {
  return (
    <div className="flex gap-2">
      {scan.status === 'completed' && (
        <>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Restart
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            View Report
          </Button>
        </>
      )}
    </div>
  );
}
