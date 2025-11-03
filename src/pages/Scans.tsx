import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCw } from "lucide-react";

export default function Scans() {
  const scans = [
    { id: 1, target: "Production API", status: "Running", progress: 65, duration: "15m 32s" },
    { id: 2, target: "Staging Web App", status: "Completed", progress: 100, duration: "23m 45s" },
    { id: 3, target: "Mobile Backend", status: "Paused", progress: 42, duration: "8m 12s" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Scans</h2>
          <p className="text-muted-foreground">Monitor your security scans</p>
        </div>
        <Button>
          <Play className="h-4 w-4 mr-2" />
          New Scan
        </Button>
      </div>

      <div className="grid gap-4">
        {scans.map((scan) => (
          <Card key={scan.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{scan.target}</CardTitle>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  scan.status === "Running" 
                    ? "bg-blue-500/10 text-blue-500" 
                    : scan.status === "Completed"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-yellow-500/10 text-yellow-500"
                }`}>
                  {scan.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{scan.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${scan.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Duration: {scan.duration}</span>
                <div className="flex gap-2">
                  {scan.status === "Running" ? (
                    <Button variant="outline" size="sm">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                  ) : scan.status === "Paused" ? (
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Restart
                    </Button>
                  )}
                  <Button variant="outline" size="sm">View Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
