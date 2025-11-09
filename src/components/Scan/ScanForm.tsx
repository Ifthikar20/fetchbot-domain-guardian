import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateScan } from "@/hooks/useScans";
import { useNavigate } from "react-router-dom";

export function ScanForm() {
  const [target, setTarget] = useState("");
  const { mutate: createScan, isPending: isCreating } = useCreateScan();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (target.trim()) {
      createScan(
        {
          target: target.trim()
        },
        {
          onSuccess: (scan) => {
            setTarget("");
            // Navigate to scan detail page
            navigate(`/dashboard/scans/${scan.job_id}`);
          }
        }
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Scan</CardTitle>
        <CardDescription>
          Start a dynamic security assessment. Our AI agents will automatically analyze your target and deploy specialized security testing modules.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="target">Target URL or IP</Label>
            <Input
              id="target"
              placeholder="https://example.com"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Enter a valid URL (e.g., https://example.com) or IP address. The system will dynamically create specialized agents based on what it discovers.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isCreating}>
            {isCreating ? "Starting Scan..." : "Start Dynamic Scan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
