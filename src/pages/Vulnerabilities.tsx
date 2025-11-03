import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ShieldAlert, Info } from "lucide-react";

export default function Vulnerabilities() {
  const vulnerabilities = [
    { 
      id: 1, 
      title: "SQL Injection Vulnerability", 
      severity: "Critical", 
      target: "api.example.com/users",
      discovered: "2 hours ago"
    },
    { 
      id: 2, 
      title: "Cross-Site Scripting (XSS)", 
      severity: "High", 
      target: "app.example.com/search",
      discovered: "5 hours ago"
    },
    { 
      id: 3, 
      title: "Weak Password Policy", 
      severity: "Medium", 
      target: "auth.example.com",
      discovered: "1 day ago"
    },
    { 
      id: 4, 
      title: "Missing Security Headers", 
      severity: "Low", 
      target: "www.example.com",
      discovered: "2 days ago"
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "High": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Low": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Critical":
      case "High":
        return <ShieldAlert className="h-5 w-5" />;
      case "Medium":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Vulnerabilities</h2>
        <p className="text-muted-foreground">Discovered security issues across your targets</p>
      </div>

      <div className="grid gap-4">
        {vulnerabilities.map((vuln) => (
          <Card key={vuln.id} className="hover:bg-card/80 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${getSeverityColor(vuln.severity)}`}>
                    {getSeverityIcon(vuln.severity)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{vuln.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{vuln.target}</p>
                  </div>
                </div>
                <Badge className={getSeverityColor(vuln.severity)}>
                  {vuln.severity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Discovered {vuln.discovered}
                </span>
                <div className="flex gap-2">
                  <Badge variant="outline">Unresolved</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
