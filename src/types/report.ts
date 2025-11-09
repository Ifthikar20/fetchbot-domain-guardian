export type ReportFormat = 'pdf' | 'html' | 'json' | 'markdown';

export interface GenerateReportRequest {
  format: ReportFormat;
}

export interface GenerateReportResponse {
  report_url: string;
  generated_at: string;
}
