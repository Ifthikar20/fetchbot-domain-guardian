import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

/**
 * Hook for real-time WebSocket updates
 * Use this when backend WebSocket is available
 */
export const useRealtimeScan = (jobId: string | undefined) => {
  const queryClient = useQueryClient();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!jobId) return;

    const ws = new WebSocket(`${WS_URL}/scan/${jobId}`);

    ws.onopen = () => {
      console.log(`WebSocket connected to scan ${jobId}`);
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      console.log('WebSocket update:', update);

      // Update the scan in cache
      queryClient.setQueryData(['scan', jobId], (old: any) => ({
        ...old,
        ...update
      }));

      // If findings updated, invalidate findings query
      if (update.findings) {
        queryClient.invalidateQueries({ queryKey: ['findings', jobId] });
      }

      // If agents updated, invalidate agent graph
      if (update.agents_created) {
        queryClient.invalidateQueries({ queryKey: ['agent-graph', jobId] });
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnected(false);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [jobId, queryClient]);

  return { connected };
};

/**
 * Simple polling hook for real-time updates (MVP approach)
 * Use this if WebSocket is not available yet
 */
export const usePolling = (
  queryKey: string[],
  interval: number = 5000,
  enabled: boolean = true
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    const pollInterval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey });
    }, interval);

    return () => clearInterval(pollInterval);
  }, [queryKey, interval, enabled, queryClient]);
};
