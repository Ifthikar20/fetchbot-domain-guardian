import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scansApi } from '@/api/scans';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';
import type { CreateScanRequest } from '@/types/scan';

/**
 * Hook to fetch all scans for the current organization
 */
export const useScans = (limit = 20, offset = 0) => {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['scans', user?.organization_id, limit, offset],
    queryFn: () => scansApi.getAll(user!.organization_id, limit, offset),
    enabled: !!user?.organization_id,
  });

  return {
    scans: data?.scans || [],
    total: data?.total || 0,
    isLoading,
  };
};

/**
 * Hook to fetch a single scan by job ID with automatic polling
 */
export const useScan = (jobId: string | undefined) => {
  const { data: scan, isLoading } = useQuery({
    queryKey: ['scan', jobId],
    queryFn: () => scansApi.getById(jobId!),
    enabled: !!jobId,
    refetchInterval: (data) => {
      // Poll every 5 seconds if scan is running
      return data?.status === 'running' ? 5000 : false;
    },
  });

  return { scan, isLoading };
};

/**
 * Hook to create a new scan
 */
export const useCreateScan = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateScanRequest) => scansApi.create(data),
    onSuccess: (scan) => {
      queryClient.invalidateQueries({ queryKey: ['scans'] });
      toast({
        title: 'Scan created',
        description: `Scan started for ${scan.target}`,
      });
    },
    onError: () => {
      toast({
        title: 'Failed to create scan',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook to delete a scan
 */
export const useDeleteScan = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (jobId: string) => scansApi.delete(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scans'] });
      toast({
        title: 'Scan deleted',
        description: 'The scan has been deleted successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Failed to delete scan',
        variant: 'destructive',
      });
    },
  });
};
