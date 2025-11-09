import { Github, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { ActiveScans } from "@/components/Dashboard/ActiveScans";
import { RecentFindings } from "@/components/Dashboard/RecentFindings";
import { ExecutionLog } from "@/components/dashboard/ExecutionLog";
import { Activity, Shield, Target, AlertTriangle } from "lucide-react";
import { useScans } from "@/hooks/useScans";
import { useFindings } from "@/hooks/useFindings";

export default function Dashboard() {
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const { toast } = useToast();
  const attackApiIp = "203.0.113.42";

  const { scans, isLoading: scansLoading } = useScans();
  const { findings, isLoading: findingsLoading } = useFindings({ status: ['open'] });

  console.log('Dashboard render:', { scans, findings, scansLoading, findingsLoading });

  // Show loading state while data is being fetched
  if (scansLoading || findingsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const runningScans = scans?.filter(s => s.status === 'running').length || 0;
  const totalFindings = findings?.length || 0;

  const stats = [
    { title: "Active Targets", value: scans?.length.toString() || "0", icon: Target, color: "text-blue-500" },
    { title: "Running Scans", value: runningScans.toString(), icon: Activity, color: "text-green-500" },
    { title: "Vulnerabilities", value: totalFindings.toString(), icon: AlertTriangle, color: "text-yellow-500" },
    { title: "Protected Assets", value: "156", icon: Shield, color: "text-primary" },
  ];

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
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExecutionLog />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <ActiveScans />
          <RecentFindings />
        </div>
      </div>
    </div>
  );
}
