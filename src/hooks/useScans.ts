import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scansApi } from '@/api/scans';
import { useScanStore } from '@/store/scanStore';
import { useToast } from '@/hooks/use-toast';
import type { CreateScanData } from '@/types/scan';

export const useScans = () => {
  const queryClient = useQueryClient();
  const { setScans, addScan, updateScan } = useScanStore();
  const { toast } = useToast();

  const { data: scans, isLoading } = useQuery({
    queryKey: ['scans'],
    queryFn: async () => {
      const data = await scansApi.getAll();
      setScans(data);
      return data;
    },
  });

  const createScanMutation = useMutation({
    mutationFn: (data: CreateScanData) => scansApi.create(data),
    onSuccess: (scan) => {
      addScan(scan);
      queryClient.invalidateQueries({ queryKey: ['scans'] });
      toast({
        title: 'Scan created',
        description: 'Your scan has been started',
      });
    },
    onError: () => {
      toast({
        title: 'Failed to create scan',
        variant: 'destructive',
      });
    },
  });

  const pauseScanMutation = useMutation({
    mutationFn: (id: string) => scansApi.pause(id),
    onSuccess: (scan) => {
      updateScan(scan.id, scan);
      queryClient.invalidateQueries({ queryKey: ['scans'] });
    },
  });

  const resumeScanMutation = useMutation({
    mutationFn: (id: string) => scansApi.resume(id),
    onSuccess: (scan) => {
      updateScan(scan.id, scan);
      queryClient.invalidateQueries({ queryKey: ['scans'] });
    },
  });

  return {
    scans,
    isLoading,
    createScan: createScanMutation.mutate,
    pauseScan: pauseScanMutation.mutate,
    resumeScan: resumeScanMutation.mutate,
    isCreating: createScanMutation.isPending,
  };
};

export const useScan = (id: string) => {
  const { data: scan, isLoading } = useQuery({
    queryKey: ['scan', id],
    queryFn: () => scansApi.getById(id),
    enabled: !!id,
  });

  return { scan, isLoading };
};
