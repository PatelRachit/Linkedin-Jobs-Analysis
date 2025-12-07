import { Link, useLocation } from 'react-router-dom';
import { Sparkles, User, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">JobParser</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">AI-Powered Job Analysis</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button
              variant={location.pathname === '/' ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                'text-muted-foreground',
                location.pathname === '/' && 'text-foreground'
              )}
            >
              Analyzer
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              variant={location.pathname === '/dashboard' ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                'text-muted-foreground',
                location.pathname === '/dashboard' && 'text-foreground'
              )}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Dashboard
            </Button>
          </Link>
          <Link to="/profile">
            <Button
              variant={location.pathname === '/profile' ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                'text-muted-foreground',
                location.pathname === '/profile' && 'text-foreground'
              )}
            >
              <User className="w-4 h-4 mr-1" />
              Profile
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
