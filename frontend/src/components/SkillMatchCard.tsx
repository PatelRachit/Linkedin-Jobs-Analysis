import { ResultCard } from './ResultCard';
import { Target, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SkillMatchCardProps {
  matchedSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
  delay?: number;
}

export function SkillMatchCard({ matchedSkills, missingSkills, matchPercentage, delay = 0 }: SkillMatchCardProps) {
  const getMatchColor = () => {
    if (matchPercentage >= 70) return 'text-success';
    if (matchPercentage >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getMatchBg = () => {
    if (matchPercentage >= 70) return 'bg-success';
    if (matchPercentage >= 40) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <ResultCard icon={<Target className="w-5 h-5" />} title="Your Skill Match" delay={delay} className="md:col-span-2">
      <div className="space-y-4">
        {/* Match percentage */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-secondary"
              />
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${matchPercentage * 2.2} 220`}
                strokeLinecap="round"
                className={getMatchColor()}
              />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${getMatchColor()}`}>
              {matchPercentage}%
            </span>
          </div>
          <div>
            <p className="text-foreground font-medium">
              {matchPercentage >= 70 ? 'Great Match!' : matchPercentage >= 40 ? 'Partial Match' : 'Low Match'}
            </p>
            <p className="text-sm text-muted-foreground">
              {matchedSkills.length} of {matchedSkills.length + missingSkills.length} skills matched
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className={`h-full ${getMatchBg()} transition-all duration-500`}
            style={{ width: `${matchPercentage}%` }}
          />
        </div>

        {/* Skills breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {matchedSkills.length > 0 && (
            <div>
              <p className="text-sm font-medium text-success mb-2 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Skills You Have
              </p>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-success/10 text-success border border-success/30 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {missingSkills.length > 0 && (
            <div>
              <p className="text-sm font-medium text-destructive mb-2 flex items-center gap-1">
                <X className="w-4 h-4" />
                Skills to Learn
              </p>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-destructive/10 text-destructive border border-destructive/30 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add skills CTA */}
        {matchedSkills.length === 0 && missingSkills.length > 0 && (
          <Link 
            to="/profile" 
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Add your skills in Profile to see match
          </Link>
        )}
      </div>
    </ResultCard>
  );
}
