import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ExecutionLog } from "@/types/scan";
import { formatDistanceToNow } from "date-fns";

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          Execution Logs
        </CardTitle>
        <CardDescription>
          Real-time updates on what each agent is doing during the scan
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && logs.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <div className="animate-pulse">Loading logs...</div>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            No logs available yet. Logs will appear as the scan progresses.
          </div>
        ) : (
          <ScrollArea className="h-[500px] w-full rounded-md border p-4" ref={scrollAreaRef}>
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border/50 bg-card p-3 hover:bg-accent/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {log.agent}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <div className={`font-medium mb-1 ${getActionColor(log.action)} ${getSeverityColor(log.action)}`}>
                    {log.action}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {log.details}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
