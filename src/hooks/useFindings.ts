import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { findingsApi } from '@/api/findings';
import type { FindingFilters } from '@/types/finding';

export const useFindings = (filters?: FindingFilters) => {
  const { data: findings, isLoading } = useQuery({
    queryKey: ['findings', filters],
    queryFn: () => findingsApi.getAll(filters),
  });

  return { findings, isLoading };
};

export const useFinding = (id: string) => {
  const { data: finding, isLoading } = useQuery({
    queryKey: ['finding', id],
    queryFn: () => findingsApi.getById(id),
    enabled: !!id,
  });

  return { finding, isLoading };
};

export const useScanFindings = (scanId: string) => {
  const { data: findings, isLoading } = useQuery({
    queryKey: ['scanFindings', scanId],
    queryFn: () => findingsApi.getByScanId(scanId),
    enabled: !!scanId,
  });

  return { findings, isLoading };
};

export const useUpdateFinding = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      findingsApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['findings'] });
    },
  });

  return mutation;
};
