export type ScanStatus = 'queued' | 'running' | 'completed' | 'failed';

export type ScanType = 'full' | 'quick' | 'deep' | 'api' | 'web' | 'mobile';

export type FindingSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface Finding {
  title: string;
  severity: FindingSeverity;
  type: string;
  description: string;
  discovered_by: string;
  url: string;
  payload?: string;
  evidence?: string;
}

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
  findings?: Finding[];
  agents_created?: Agent[];
  total_findings?: number;
  critical_findings?: number;
  high_findings?: number;
  message?: string;
}

export interface CreateScanRequest {
  target: string;
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

export interface AgentGraphNode {
  id: string;
  name: string;
  parent_id: string | null;
  modules?: string[];
  status: string;
  findings_count?: number;
}

export interface AgentGraphEdge {
  from: string;
  to: string;
  type: string;
}

export interface AgentGraph {
  job_id: string;
  graph: {
    nodes: AgentGraphNode[];
    edges: AgentGraphEdge[];
  };
}
