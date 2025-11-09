import { useParams } from "react-router-dom";
import { ScanDetail as ScanDetailComponent } from "@/components/Scan/ScanDetail";

export default function ScanDetail() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Scan ID not provided</div>;
  }

  return (
    <div className="space-y-6">
      <ScanDetailComponent scanId={id} />
    </div>
  );
}
