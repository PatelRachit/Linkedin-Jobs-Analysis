import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, Zap, Target } from 'lucide-react';

interface HeroSectionProps {
  onScrollToAnalyzer: () => void;
}

export function HeroSection({ onScrollToAnalyzer }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Job Analysis</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          Stop Reading
          <span className="block text-gradient mt-2">Ugly Job Descriptions</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
          Paste any job description and instantly extract what matters: 
          H1B sponsorship, salary, citizenship requirements, and skill match.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border">
            <Zap className="w-4 h-4 text-warning" />
            <span className="text-sm text-secondary-foreground">Instant Analysis</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border">
            <Target className="w-4 h-4 text-success" />
            <span className="text-sm text-secondary-foreground">Skill Matching</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-secondary-foreground">H1B Detection</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          variant="glow"
          size="lg"
          onClick={onScrollToAnalyzer}
          className="animate-fade-in group"
          style={{ animationDelay: '400ms' }}
        >
          Start Analyzing
          <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}
