import { useQuery } from '@tanstack/react-query';
import { statsApi } from '@/api/stats';
import { useAuth } from './useAuth';

/**
 * Hook to fetch dashboard statistics
 */
export const useDashboardStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['stats', user?.organization_id],
    queryFn: () => statsApi.getDashboardStats(user!.organization_id),
    enabled: !!user?.organization_id,
    refetchInterval: 30000, // Refresh stats every 30 seconds
  });
};
