import { FileText, ArrowLeft } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="p-4 rounded-2xl bg-secondary/50 mb-6">
        <FileText className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">No Results Yet</h3>
      <p className="text-muted-foreground max-w-sm">
        Paste a job description on the left and click "Analyze" to extract key information
      </p>
      <div className="mt-6 flex items-center gap-2 text-primary">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Start by pasting a job description</span>
      </div>
    </div>
  );
}
