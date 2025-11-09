export type ScanStatus = 'pending' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled';

export type ScanType = 'full' | 'quick' | 'deep' | 'api' | 'web' | 'mobile';

export interface Scan {
  id: string;
  target: string;
  type: ScanType;
  status: ScanStatus;
  progress: number;
  duration?: string;
  startedAt: string;
  completedAt?: string;
  findingsCount?: number;
}

export interface CreateScanData {
  target: string;
  type: ScanType;
  config?: Record<string, any>;
}
