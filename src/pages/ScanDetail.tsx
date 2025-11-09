import { useParams } from "react-router-dom";
import { ScanDetail as ScanDetailComponent } from "@/components/Scan/ScanDetail";
import { useScan } from "@/hooks/useScans";

export default function ScanDetail() {
  const { id } = useParams<{ id: string }>();
  const { scan } = useScan(id);

  if (!id) {
    return <div>Scan ID not provided</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Scan Details</h2>
          <p className="text-muted-foreground">
            {scan?.target || 'Loading scan information...'}
          </p>
        </div>
      </div>

      <ScanDetailComponent scanId={id} />
    </div>
  );
}
