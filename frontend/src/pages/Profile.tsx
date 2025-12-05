import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getUserSkills, addUserSkill, removeUserSkill } from '@/lib/skillsStorage';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Code, Briefcase, GraduationCap, Sparkles } from 'lucide-react';

const SUGGESTED_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker',
  'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST API', 'Git', 'CI/CD',
  'Agile', 'Scrum', 'Machine Learning', 'Data Analysis', 'SQL', 'Linux', 'Azure',
  'GCP', 'Terraform', 'Redis', 'ElasticSearch', 'Microservices', 'System Design'
];

const Profile = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setSkills(getUserSkills());
  }, []);

  const handleAddSkill = (skill: string) => {
    if (!skill.trim()) return;
    
    const updated = addUserSkill(skill);
    setSkills(updated);
    setNewSkill('');
    
    toast({
      title: 'Skill added',
      description: `"${skill}" has been added to your profile`,
    });
  };

  const handleRemoveSkill = (skill: string) => {
    const updated = removeUserSkill(skill);
    setSkills(updated);
    
    toast({
      title: 'Skill removed',
      description: `"${skill}" has been removed from your profile`,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSkill(newSkill);
    }
  };

  const availableSuggestions = SUGGESTED_SKILLS.filter(
    s => !skills.some(skill => skill.toLowerCase() === s.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 pt-28 pb-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/10 mb-6">
              <Briefcase className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Your Skills Profile</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Add your skills here. When you analyze a job description, we'll show you how well your skills match the requirements.
            </p>
          </div>

          {/* Add skill input */}
          <div className="glass-card p-6 mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <label className="text-sm font-medium text-foreground mb-3 block">Add a Skill</label>
            <div className="flex gap-3">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., React, Python, AWS..."
                className="flex-1"
              />
              <Button
                variant="glow"
                onClick={() => handleAddSkill(newSkill)}
                disabled={!newSkill.trim()}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </div>

          {/* Your skills */}
          <div className="glass-card p-6 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Your Skills ({skills.length})</h2>
            </div>
            
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary border border-primary/30 rounded-lg group animate-scale-in"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="p-0.5 rounded hover:bg-primary/20 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No skills added yet</p>
                <p className="text-sm text-muted-foreground/70">Add your skills above or choose from suggestions below</p>
              </div>
            )}
          </div>

          {/* Suggested skills */}
          {availableSuggestions.length > 0 && (
            <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-warning" />
                <h2 className="text-lg font-semibold text-foreground">Suggested Skills</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Click to add popular tech skills</p>
              <div className="flex flex-wrap gap-2">
                {availableSuggestions.slice(0, 20).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleAddSkill(skill)}
                    className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border rounded-lg text-sm transition-colors hover:border-primary/50"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
