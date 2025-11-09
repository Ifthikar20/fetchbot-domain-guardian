export type ScanStatus = 'running' | 'completed' | 'failed';

export interface Agent {
  id: string;
  name: string;
  modules: string[];
  status: string;
  findings_count: number;
}

export interface Scan {
  job_id: string;
  status: ScanStatus;
  target: string;
  created_at: string;
  completed_at?: string;
  execution_time_seconds?: number;
  findings?: any[];
  agents_created?: Agent[];
  total_findings?: number;
  critical_findings?: number;
  high_findings?: number;
  message?: string;
}

export interface CreateScanRequest {
  target: string;
  organization_id: number;
}

export interface ScanListResponse {
  scans: ScanSummary[];
  total: number;
  limit: number;
  offset: number;
}

export interface ScanSummary {
  job_id: string;
  target: string;
  status: ScanStatus;
  created_at: string;
  total_findings?: number;
  critical_findings?: number;
}
