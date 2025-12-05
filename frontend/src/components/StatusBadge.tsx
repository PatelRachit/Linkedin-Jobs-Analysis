import { cn } from '@/lib/utils';
import { Check, X, HelpCircle } from 'lucide-react';

type StatusType = 'success' | 'warning' | 'destructive' | 'muted';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  showIcon?: boolean;
}

export function StatusBadge({ status, label, showIcon = true }: StatusBadgeProps) {
  const statusClasses = {
    success: 'status-success',
    warning: 'status-warning',
    destructive: 'status-destructive',
    muted: 'status-muted',
  };

  const icons = {
    success: <Check className="w-3.5 h-3.5" />,
    warning: <HelpCircle className="w-3.5 h-3.5" />,
    destructive: <X className="w-3.5 h-3.5" />,
    muted: <HelpCircle className="w-3.5 h-3.5" />,
  };

  return (
    <span className={cn('status-badge', statusClasses[status])}>
      {showIcon && icons[status]}
      {label}
    </span>
  );
}
