import { useQuery } from '@tanstack/react-query';
import { agentsApi } from '@/api/agents';

export const useAgentGraph = (scanId: string) => {
  const { data: graph, isLoading } = useQuery({
    queryKey: ['agentGraph', scanId],
    queryFn: () => agentsApi.getGraph(scanId),
    enabled: !!scanId,
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });

  return { graph, isLoading };
};

export const useAgentExecutions = (scanId: string) => {
  const { data: executions, isLoading } = useQuery({
    queryKey: ['agentExecutions', scanId],
    queryFn: () => agentsApi.getExecutions(scanId),
    enabled: !!scanId,
    refetchInterval: 3000,
  });

  return { executions, isLoading };
};
