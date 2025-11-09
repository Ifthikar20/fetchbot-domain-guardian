import { useQuery } from '@tanstack/react-query';
import { agentsApi } from '@/api/agents';

/**
 * Hook to fetch agent graph for visualization
 */
export const useAgentGraph = (jobId: string | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ['agent-graph', jobId],
    queryFn: () => agentsApi.getGraph(jobId!),
    enabled: !!jobId,
    refetchInterval: 10000, // Refetch every 10 seconds for real-time updates
  });

  return {
    graph: data?.graph,
    hierarchy: data?.hierarchy,
    isLoading,
  };
};

/**
 * Hook to fetch agent status information
 */
export const useAgents = (jobId: string | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ['agents', jobId],
    queryFn: () => agentsApi.getAgents(jobId!),
    enabled: !!jobId,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  return {
    agents: data?.agents || [],
    totalAgents: data?.total_agents || 0,
    running: data?.running || 0,
    completed: data?.completed || 0,
    failed: data?.failed || 0,
    isLoading,
  };
};
