import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useScans } from "@/hooks/useScans";
import { SCAN_TYPES } from "@/utils/constants";
import type { ScanType } from "@/types/scan";

export function ScanForm() {
  const [target, setTarget] = useState("");
  const [scanType, setScanType] = useState<ScanType>("full");
  const { createScan, isCreating } = useScans();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (target.trim()) {
      createScan({ target, type: scanType });
      setTarget("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Scan</CardTitle>
        <CardDescription>Configure and start a new security scan</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="target">Target URL or IP</Label>
            <Input
              id="target"
              placeholder="https://example.com or 192.168.1.1"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scan-type">Scan Type</Label>
            <Select value={scanType} onValueChange={(v) => setScanType(v as ScanType)}>
              <SelectTrigger id="scan-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SCAN_TYPES).map(([key, { label, description }]) => (
                  <SelectItem key={key} value={key}>
                    <div>
                      <div className="font-medium">{label}</div>
                      <div className="text-xs text-muted-foreground">{description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isCreating}>
            {isCreating ? "Creating..." : "Start Scan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
