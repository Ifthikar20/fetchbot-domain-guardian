import { AlertTriangle, AlertCircle, Info, ShieldAlert } from 'lucide-react';
import type { FindingSeverity } from '@/types/finding';

export const getSeverityColor = (severity: FindingSeverity) => {
  const colors = {
    critical: 'text-red-500 bg-red-500/10',
    high: 'text-orange-500 bg-orange-500/10',
    medium: 'text-yellow-500 bg-yellow-500/10',
    low: 'text-blue-500 bg-blue-500/10',
    info: 'text-muted-foreground bg-muted',
  };
  return colors[severity] || colors.info;
};

export const getSeverityIcon = (severity: FindingSeverity) => {
  const icons = {
    critical: ShieldAlert,
    high: AlertTriangle,
    medium: AlertCircle,
    low: Info,
    info: Info,
  };
  return icons[severity] || Info;
};

export const getSeverityBadgeColor = (severity: FindingSeverity) => {
  const colors = {
    critical: 'bg-red-500/10 text-red-500',
    high: 'bg-orange-500/10 text-orange-500',
    medium: 'bg-yellow-500/10 text-yellow-500',
    low: 'bg-blue-500/10 text-blue-500',
    info: 'bg-muted text-muted-foreground',
  };
  return colors[severity] || colors.info;
};
