export const SCAN_TYPES = {
  full: { label: 'Full Scan', description: 'Comprehensive security assessment' },
  quick: { label: 'Quick Scan', description: 'Fast vulnerability check' },
  deep: { label: 'Deep Scan', description: 'In-depth analysis' },
  api: { label: 'API Scan', description: 'API endpoint testing' },
  web: { label: 'Web Scan', description: 'Web application scan' },
  mobile: { label: 'Mobile Scan', description: 'Mobile app testing' },
} as const;

export const SCAN_STATUSES = {
  running: { label: 'Running', color: 'text-blue-500' },
  completed: { label: 'Completed', color: 'text-green-500' },
  failed: { label: 'Failed', color: 'text-red-500' },
} as const;

export const FINDING_STATUSES = {
  open: { label: 'Open', color: 'text-red-500' },
  in_progress: { label: 'In Progress', color: 'text-yellow-500' },
  resolved: { label: 'Resolved', color: 'text-green-500' },
  false_positive: { label: 'False Positive', color: 'text-muted-foreground' },
} as const;
