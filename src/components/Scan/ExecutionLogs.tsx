import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Terminal } from "lucide-react";
import type { ExecutionLog } from "@/types/scan";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface ExecutionLogsProps {
  logs: ExecutionLog[];
  isLoading: boolean;
}

export function ExecutionLogs({ logs, isLoading }: ExecutionLogsProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [logs]);

  // Helper to detect log types for Claude's decision-making
  const getLogType = (action: string) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes('analyzing') || actionLower.includes('claude analyzing') || actionLower.includes('question:')) return 'analysis';
    if (actionLower.includes('decision') || actionLower.includes('reasoning:') || actionLower.includes('next action:')) return 'decision';
    if (actionLower.includes('vulnerability confirmed') || actionLower.includes('confirmed') || actionLower.includes('🎯')) return 'confirmation';
    if (actionLower.includes('vulnerability') || actionLower.includes('found') || actionLower.includes('detected')) return 'finding';
    return 'normal';
  };

  // Helper to get icon for log type
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'analysis':
        return '🤔'; // Claude analyzing
      case 'decision':
        return '✅'; // Claude decided
      case 'confirmation':
        return '🎯'; // Claude confirmed finding
      case 'finding':
        return '🔍'; // Vulnerability found
      default:
        return '📝';
    }
  };

  const getSeverityColor = (action: string) => {
    if (action.includes("CRITICAL")) return "text-red-500 font-bold";
    if (action.includes("HIGH")) return "text-orange-500 font-semibold";
    if (action.includes("MEDIUM")) return "text-yellow-500";
    if (action.includes("LOW")) return "text-blue-500";
    return "text-gray-300";
  };

  const getActionColor = (action: string) => {
    if (action.includes("Vulnerability") || action.includes("Found")) return "text-red-400";
    if (action.includes("Spawned") || action.includes("Created")) return "text-green-400";
    if (action.includes("Started") || action.includes("Running")) return "text-blue-400";
    if (action.includes("Completed")) return "text-emerald-400";
    if (action.includes("Failed")) return "text-red-400";
    return "text-gray-300";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          Execution Logs
        </CardTitle>
        <CardDescription>
          Real-time scan activity and Claude's decision-making process
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && logs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <div className="animate-pulse">Loading execution logs...</div>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No execution logs yet. Logs will appear as the scan progresses.
          </div>
        ) : (
          <ScrollArea className="h-[500px] w-full" ref={scrollAreaRef}>
            <div className="space-y-3">
              {logs.map((log, index) => {
                const logType = getLogType(log.action);
                const icon = getLogIcon(logType);

                return (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-lg border-l-4 transition-colors",
                      logType === 'analysis' && "bg-blue-50 dark:bg-blue-950 border-blue-500",
                      logType === 'decision' && "bg-green-50 dark:bg-green-950 border-green-500",
                      logType === 'confirmation' && "bg-purple-50 dark:bg-purple-950 border-purple-500",
                      logType === 'finding' && "bg-red-50 dark:bg-red-950 border-red-500",
                      logType === 'normal' && "bg-gray-50 dark:bg-gray-900 border-gray-300"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <Badge variant="outline" className="font-mono text-xs">
                            {log.agent}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(log.timestamp), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>

                        <div className={cn(
                          "font-semibold mb-2",
                          logType === 'confirmation' && "text-purple-700 dark:text-purple-300",
                          logType === 'analysis' && "text-blue-700 dark:text-blue-300",
                          logType === 'decision' && "text-green-700 dark:text-green-300",
                          getSeverityColor(log.action)
                        )}>
                          {log.action}
                        </div>

                        {log.details && (
                          <div className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-white dark:bg-gray-800 p-3 rounded border">
                            {log.details}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
