export type ScanStatus = 'queued' | 'running' | 'completed' | 'failed';

export type ScanType = 'full' | 'quick' | 'deep' | 'api' | 'web' | 'mobile';

export type FindingSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface FindingEvidence {
  http_method?: string;
  status_code?: number;
  response_headers?: Record<string, string>;
  missing_header?: string;
  server?: string;
  detection_method?: string;
  tool_used?: string;
  request_sent?: string;
  curl_equivalent?: string;
  vulnerable_parameter?: string;
  payload_used?: string;
  injection_point?: string;
  sql_error_detected?: string;
  database_type?: string;
  injection_context?: string;
  vulnerable_url?: string;
}

export interface FindingRemediation {
  fix?: string;
  example?: string;
  implementation?: Record<string, string>;
  additional_steps?: string[];
  references?: string[];
}

export interface Finding {
  title: string;
  severity: FindingSeverity;
  type: string;
  description: string;
  discovered_by: string;
  url: string;
  payload?: string;
  evidence?: FindingEvidence | string; // Can be object or string for backward compatibility
  remediation?: FindingRemediation;
  cvss_score?: number;
  cwe?: string;
  owasp_category?: string;
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
  created_at?: string;
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
