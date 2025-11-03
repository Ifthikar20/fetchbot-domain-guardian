import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Terminal, GitBranch, CheckCircle2, AlertCircle } from "lucide-react";

interface LogEntry {
  id: number;
  type: "thinking" | "decision" | "command" | "git" | "success" | "error";
  timestamp: string;
  content: string;
  details?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: 1,
    type: "thinking",
    timestamp: "14:32:01",
    content: "Analyzing target: api.example.com/users endpoint",
    details: "Evaluating authentication mechanisms and input validation patterns"
  },
  {
    id: 2,
    type: "decision",
    timestamp: "14:32:03",
    content: "Decision: Test SQL injection vectors on user_id parameter",
    details: "Reasoning: Parameter appears to be directly concatenated in query"
  },
  {
    id: 3,
    type: "command",
    timestamp: "14:32:04",
    content: "Executing: sqlmap -u 'api.example.com/users?id=1' --batch",
    details: "Testing with common SQL injection payloads"
  },
  {
    id: 4,
    type: "git",
    timestamp: "14:32:06",
    content: "Checking repository: github.com/company/api-service",
    details: "Found vulnerable code at: src/controllers/UserController.js:45"
  },
  {
    id: 5,
    type: "success",
    timestamp: "14:32:08",
    content: "Vulnerability confirmed: SQL Injection (High Severity)",
    details: "Successfully extracted database schema using UNION-based injection"
  },
  {
    id: 6,
    type: "thinking",
    timestamp: "14:32:10",
    content: "Analyzing XSS attack surface on search functionality",
    details: "Evaluating DOM manipulation and output encoding practices"
  },
  {
    id: 7,
    type: "decision",
    timestamp: "14:32:11",
    content: "Decision: Test reflected XSS in search parameter",
    details: "Reasoning: User input reflected in response without sanitization"
  },
  {
    id: 8,
    type: "command",
    timestamp: "14:32:12",
    content: "Executing: XSS payload injection on /search endpoint",
    details: "Payload: <script>alert(document.cookie)</script>"
  },
  {
    id: 9,
    type: "git",
    timestamp: "14:32:14",
    content: "Cross-referencing with repository code",
    details: "Found issue at: src/views/SearchResults.jsx:78 - Missing output encoding"
  },
  {
    id: 10,
    type: "success",
    timestamp: "14:32:16",
    content: "Vulnerability confirmed: Reflected XSS (Medium Severity)",
    details: "Script execution successful in response body"
  }
];

const getIconAndColor = (type: string) => {
  switch (type) {
    case "thinking":
      return { icon: Brain, color: "text-blue-400", bg: "bg-blue-500/10" };
    case "decision":
      return { icon: AlertCircle, color: "text-yellow-400", bg: "bg-yellow-500/10" };
    case "command":
      return { icon: Terminal, color: "text-green-400", bg: "bg-green-500/10" };
    case "git":
      return { icon: GitBranch, color: "text-purple-400", bg: "bg-purple-500/10" };
    case "success":
      return { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10" };
    case "error":
      return { icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/10" };
    default:
      return { icon: Terminal, color: "text-muted-foreground", bg: "bg-muted" };
  }
};

export function ExecutionLog() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          AI Execution Log
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="p-4 space-y-3 font-mono text-sm">
            {mockLogs.map((log) => {
              const { icon: Icon, color, bg } = getIconAndColor(log.type);
              return (
                <div key={log.id} className="group">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded ${bg} ${color} shrink-0`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                        <span className={`text-xs uppercase font-semibold ${color}`}>
                          [{log.type}]
                        </span>
                      </div>
                      <div className="text-foreground leading-relaxed">{log.content}</div>
                      {log.details && (
                        <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded mt-2 border-l-2 border-primary/30">
                          {log.details}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs">Scan in progress...</span>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
