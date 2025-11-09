import { ScanForm } from "@/components/Scan/ScanForm";

export default function NewScan() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">New Scan</h2>
        <p className="text-muted-foreground">Create and configure a new security scan</p>
      </div>
      <ScanForm />
    </div>
  );
}
