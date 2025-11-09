import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { scansApi } from '@/api/scans';
import { LogEntry, ScanStatus } from '@/types/scan';
import { Loader2 } from 'lucide-react';

interface ExecutionLogsProps {
  scanId: string;
  scanStatus: ScanStatus;
}

export function ExecutionLogs({ scanId, scanStatus }: ExecutionLogsProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const pollIntervalRef = useRef<number | null>(null);

  const fetchLogs = async () => {
    try {
      const response = await scansApi.getLogs(scanId);
      setLogs(response.logs);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (logsContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = logsContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

      if (isNearBottom || logs.length <= 1) {
        logsContainerRef.current.scrollTop = scrollHeight;
      }
    }
  }, [logs]);

  // Polling logic
  useEffect(() => {
    // Initial fetch
    fetchLogs();

    // Start polling if scan is running
    if (scanStatus === 'running') {
      pollIntervalRef.current = window.setInterval(() => {
        fetchLogs();
      }, 2500);
    }

    // Cleanup
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [scanId, scanStatus]);

  // Stop polling when scan completes or fails
  useEffect(() => {
    if ((scanStatus === 'completed' || scanStatus === 'failed') && pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
      // Fetch logs one final time
      fetchLogs();
    }
  }, [scanStatus]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getLogClass = (log: LogEntry) => {
    // Add visual distinction for different log types
    if (log.action.includes('CRITICAL') || log.action.includes('Failed')) {
      return 'log-critical';
    }
    if (log.action.includes('HIGH')) {
      return 'log-high';
    }
    if (log.action.includes('Created') || log.action.includes('Agent')) {
      return 'log-agent';
    }
    if (log.action.includes('Executing')) {
      return 'log-tool';
    }
    if (log.action.includes('completed')) {
      return 'log-success';
    }
    return '';
  };

  return (
    <Card className="bg-[#1a1a1a] border-[#333]">
      <CardHeader>
        <CardTitle className="text-white">Live Execution Logs</CardTitle>
        <CardDescription className="text-gray-400">
          Real-time updates from security agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          ref={logsContainerRef}
          className="logs-container bg-[#0d0d0d] border border-[#333] rounded p-4 max-h-[500px] overflow-y-auto font-mono text-sm"
        >
          {isLoading && logs.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span>Loading logs...</span>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-gray-600 italic">
              Waiting for scan to start...
            </div>
          ) : (
            <div className="space-y-1">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`log-entry grid grid-cols-[90px_180px_1fr] gap-3 py-1.5 border-b border-[#222] last:border-b-0 ${getLogClass(log)}`}
                >
                  <span className="log-timestamp text-gray-500 text-xs">
                    {formatTime(log.timestamp)}
                  </span>
                  <span className="log-agent text-[#4a9eff] font-semibold truncate">
                    {log.agent}
                  </span>
                  <div className="log-content">
                    <span className="log-action text-white font-medium">
                      {log.action}
                    </span>
                    {log.details && (
                      <div className="log-details text-gray-400 text-xs mt-0.5">
                        {log.details}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <style>{`
        .log-entry.log-critical {
          background: rgba(220, 38, 38, 0.1);
          border-left: 3px solid #dc2626;
          padding-left: 8px;
        }

        .log-entry.log-high {
          background: rgba(249, 115, 22, 0.1);
          border-left: 3px solid #f97316;
          padding-left: 8px;
        }

        .log-entry.log-agent {
          background: rgba(34, 197, 94, 0.05);
        }

        .log-entry.log-tool {
          background: rgba(59, 130, 246, 0.05);
        }

        .log-entry.log-success {
          background: rgba(34, 197, 94, 0.1);
          border-left: 3px solid #22c55e;
          padding-left: 8px;
        }

        .logs-container::-webkit-scrollbar {
          width: 8px;
        }

        .logs-container::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        .logs-container::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 4px;
        }

        .logs-container::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </Card>
  );
}
