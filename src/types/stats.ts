export interface DashboardStats {
  total_scans: number;
  running_scans: number;
  completed_scans: number;
  failed_scans: number;
  total_findings: number;
  by_severity: {
    CRITICAL: number;
    HIGH: number;
    MEDIUM: number;
    LOW: number;
  };
  recent_scans: RecentScan[];
  recent_findings: RecentFinding[];
}

export interface RecentScan {
  job_id: string;
  target: string;
  status: 'running' | 'completed' | 'failed';
  created_at: string;
}

export interface RecentFinding {
  id: number;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  discovered_at: string;
}
