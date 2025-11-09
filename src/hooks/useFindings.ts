import { useQuery } from '@tanstack/react-query';
import { findingsApi } from '@/api/findings';
import type { FindingFilters } from '@/types/finding';

/**
 * Hook to fetch all findings with optional filters
 */
export const useFindings = (filters?: FindingFilters) => {
  const { data: findings, isLoading } = useQuery({
    queryKey: ['findings', filters],
    queryFn: () => findingsApi.getAll(filters),
  });

  return {
    findings: findings || [],
    isLoading,
  };
};

/**
 * Hook to fetch findings for a specific scan
 */
export const useScanFindings = (jobId: string | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ['findings', jobId],
    queryFn: () => findingsApi.getByScanId(jobId!),
    enabled: !!jobId,
    refetchInterval: (data) => {
      // Poll every 10 seconds if there are findings
      return data && data.findings.length > 0 ? 10000 : false;
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
