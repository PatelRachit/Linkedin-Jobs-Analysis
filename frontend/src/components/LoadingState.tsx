import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-secondary" />
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
      <p className="mt-6 text-muted-foreground font-medium">Analyzing job description...</p>
      <p className="mt-2 text-sm text-muted-foreground/70">Extracting key information</p>
    </div>
  );
}
