import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResultCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ResultCard({ icon, title, children, className, delay = 0 }: ResultCardProps) {
  return (
    <div 
      className={cn(
        "glass-card p-5 animate-fade-in",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="text-secondary-foreground">
        {children}
      </div>
    </div>
  );
}
