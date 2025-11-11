import { useQuery } from '@tanstack/react-query';
import { findingsApi } from '@/api/findings';
import type { FindingFilters } from '@/types/finding';

/**
 * Hook to fetch all findings with optional filters
 * Note: /findings endpoint may not exist - findings are part of scan data
 */
export const useFindings = (filters?: FindingFilters) => {
  const { data: findings, isLoading } = useQuery({
    queryKey: ['findings', filters],
    queryFn: () => findingsApi.getAll(filters),
    retry: false,
    // Gracefully handle missing /findings endpoint (findings are included in scan data)
    onError: (error: any) => {
      if (error?.response?.status === 404) {
        console.log('Findings endpoint not available - findings are included in scan data');
      }
    },
  });

  return {
    findings: findings || [],
    isLoading,
  };
};

/**
 * Hook to fetch findings for a specific scan
 */
export const useScanFindings = (jobId: string | undefined, scanStatus?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['findings', jobId],
    queryFn: () => findingsApi.getByScanId(jobId!),
    enabled: !!jobId,
    refetchInterval: (data) => {
      // Poll every 3 seconds during active scans (running/queued)
      // Stop polling when scan completes
      return scanStatus === 'running' || scanStatus === 'queued'
        ? 3000  // Poll every 3 seconds during scan
        : false; // Stop when complete
    },
  });

  return {
    findings: data?.findings || [],
    total: data?.total || 0,
    bySeverity: data?.by_severity,
    isLoading,
  };
};

/**
 * Hook to fetch a single finding detail
 */
export const useFinding = (findingId: number | undefined) => {
  const { data: finding, isLoading } = useQuery({
    queryKey: ['finding', findingId],
    queryFn: () => findingsApi.getById(findingId!),
    enabled: !!findingId,
  });

  return { finding, isLoading };
};
