import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Shield, Target, AlertTriangle, Github, Copy } from "lucide-react";
import { ExecutionLog } from "@/components/dashboard/ExecutionLog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const stats = [
  { title: "Active Targets", value: "12", icon: Target, color: "text-blue-500" },
  { title: "Running Scans", value: "3", icon: Activity, color: "text-green-500" },
  { title: "Vulnerabilities", value: "47", icon: AlertTriangle, color: "text-yellow-500" },
  { title: "Protected Assets", value: "156", icon: Shield, color: "text-primary" },
];

export default function Dashboard() {
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const { toast } = useToast();
  const attackApiIp = "203.0.113.42";

  const handleGithubConnect = () => {
    setIsGithubConnected(true);
    toast({
      title: "GitHub Connected",
      description: "Repository scanning enabled",
    });
  };

  const copyIpToClipboard = () => {
    navigator.clipboard.writeText(attackApiIp);
    toast({
      title: "IP Copied",
      description: "Attack API IP copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your security testing operations</p>
        </div>
        <div className="flex flex-col gap-2">
          <Button 
            onClick={handleGithubConnect}
            variant={isGithubConnected ? "secondary" : "default"}
            className="gap-2"
          >
            <Github className="h-4 w-4" />
            {isGithubConnected ? "GitHub Connected" : "Connect GitHub"}
          </Button>
          <div className="flex items-center gap-2 text-sm bg-muted px-3 py-2 rounded-md">
            <span className="text-muted-foreground">Attack API:</span>
            <code className="font-mono">{attackApiIp}</code>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={copyIpToClipboard}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExecutionLog />
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Critical Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "SQL Injection Risk", target: "api.example.com", severity: "High" },
                  { name: "XSS Vulnerability", target: "app.example.com", severity: "Medium" },
                  { name: "Weak Auth Token", target: "auth.example.com", severity: "High" },
                  { name: "CORS Misconfiguration", target: "api.example.com", severity: "Medium" },
                  { name: "Exposed API Keys", target: "cdn.example.com", severity: "Critical" }
                ].map((issue, i) => (
                  <div key={i} className="flex items-start justify-between border-b border-border pb-3 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{issue.name}</p>
                      <p className="text-xs text-muted-foreground">{issue.target}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      issue.severity === "Critical" 
                        ? "bg-red-500/10 text-red-500"
                        : issue.severity === "High"
                        ? "bg-orange-500/10 text-orange-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                      {issue.severity}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
