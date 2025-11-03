import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Globe, CheckCircle2 } from "lucide-react";

export default function Targets() {
  const targets = [
    { id: 1, name: "Production API", url: "api.example.com", verified: true, status: "Active" },
    { id: 2, name: "Staging Web App", url: "staging.example.com", verified: true, status: "Active" },
    { id: 3, name: "Mobile Backend", url: "mobile-api.example.com", verified: false, status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Targets</h2>
          <p className="text-muted-foreground">Manage your testing targets</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Target
        </Button>
      </div>

      <div className="grid gap-4">
        {targets.map((target) => (
          <Card key={target.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">{target.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{target.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {target.verified && (
                    <span className="flex items-center gap-1 text-sm text-green-500">
                      <CheckCircle2 className="h-4 w-4" />
                      Verified
                    </span>
                  )}
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    target.status === "Active" 
                      ? "bg-green-500/10 text-green-500" 
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}>
                    {target.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">View Details</Button>
                <Button variant="outline" size="sm">Run Scan</Button>
                <Button variant="outline" size="sm">Settings</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
