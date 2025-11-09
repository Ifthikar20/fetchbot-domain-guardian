export type FindingSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export type FindingType =
  | 'INFORMATION_DISCLOSURE'
  | 'SQL_INJECTION'
  | 'XSS'
  | 'AUTHENTICATION'
  | 'AUTHORIZATION'
  | 'CONFIGURATION'
  | 'API_SECURITY'
  | 'OTHER';

export interface Finding {
  id: number;
  title: string;
  severity: FindingSeverity;
  type: FindingType;
  description: string;
  affected_url: string;
  payload?: string;
  evidence?: string;
  remediation?: string;
  discovered_at: string;
  discovered_by: string;
}

export interface FindingDetail extends Finding {
  scan: {
    job_id: string;
    target: string;
  };
}

export interface FindingsResponse {
  job_id: string;
  findings: Finding[];
  total: number;
  by_severity: {
    CRITICAL: number;
    HIGH: number;
    MEDIUM: number;
    LOW: number;
  };
}

export interface FindingFilters {
  severity?: FindingSeverity[];
  type?: FindingType[];
  job_id?: string;
}
