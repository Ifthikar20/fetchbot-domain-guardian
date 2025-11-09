export type FindingSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export type FindingStatus = 'open' | 'in_progress' | 'resolved' | 'false_positive';

export interface Finding {
  id: string;
  scanId: string;
  title: string;
  description: string;
  severity: FindingSeverity;
  status: FindingStatus;
  category: string;
  target: string;
  discoveredAt: string;
  cwe?: string;
  cvss?: number;
}

export interface FindingFilters {
  severity?: FindingSeverity[];
  status?: FindingStatus[];
  scanId?: string;
  category?: string[];
}
