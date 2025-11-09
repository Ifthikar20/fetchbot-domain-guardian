import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, FileText } from "lucide-react";
import { useScans } from "@/hooks/useScans";
import type { Scan } from "@/types/scan";

interface ScanActionsProps {
  scan: Scan;
}

export function ScanActions({ scan }: ScanActionsProps) {
  const { pauseScan, resumeScan } = useScans();

  return (
    <div className="flex gap-2">
      {scan.status === 'running' && (
        <Button variant="outline" size="sm" onClick={() => pauseScan(scan.id)}>
          <Pause className="h-4 w-4 mr-2" />
          Pause
        </Button>
      )}
      
      {scan.status === 'paused' && (
        <Button variant="outline" size="sm" onClick={() => resumeScan(scan.id)}>
          <Play className="h-4 w-4 mr-2" />
          Resume
        </Button>
      )}
      
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
