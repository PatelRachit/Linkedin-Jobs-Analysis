import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ParsedResults } from "@/components/ParsedResults";
import { SkillMatchCard } from "@/components/SkillMatchCard";
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { ParsedJobData } from "@/types/job";
import { getUserSkills, calculateSkillMatch } from "@/lib/skillsStorage";
import { Sparkles, Clipboard, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Index = () => {
  const [jobDescription, setJobDescription] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [parsedData, setParsedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [skillMatch, setSkillMatch] = useState<{
    matchedSkills: string[];
    missingSkills: string[];
    matchPercentage: number;
  } | null>(null);

  const analyzerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setUserSkills(getUserSkills());
  }, []);

  const scrollToAnalyzer = () => {
    analyzerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnalyze = async () => {
    console.log(jobDescription);
    if (!jobDescription.trim()) {
      toast({
        title: "No job description",
        description: "Please paste a job description to analyze",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsLoading(true);
      setSkillMatch(null);

      const { data } = await axios.post("http://localhost:8000/analyze", {
        description: jobDescription,
      });
      // Simulate API call delay

      setParsedData(data);

      // Calculate skill match
      const currentUserSkills = getUserSkills();
      setUserSkills(currentUserSkills);
      const match = calculateSkillMatch(
        currentUserSkills,
        parsedData?.skills_extracted || []
      );
      setSkillMatch(match);

      setIsLoading(false);

      toast({
        title: "Analysis complete",
        description: "Job description has been parsed successfully",
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Error analyzing job description:", error);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJobDescription(text);
      toast({
        title: "Pasted from clipboard",
        description: "Job description has been pasted",
      });
    } catch {
      toast({
        title: "Unable to paste",
        description: "Please paste manually using Ctrl+V",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setJobDescription("");
    setParsedData(null);
    setSkillMatch(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <HeroSection onScrollToAnalyzer={scrollToAnalyzer} />

      {/* Analyzer Section */}
      <section ref={analyzerRef} className="relative py-20">
        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Analyze Job Description
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Paste any job posting below and get instant insights about visa
              sponsorship, salary, and requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Job Description
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePaste}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Clipboard className="w-4 h-4 mr-1" />
                    Paste
                  </Button>
                  {jobDescription && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClear}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </div>

              <div className="glass-card p-1">
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here...

Example: We are looking for a Senior Software Engineer to join our team. 
H1B visa sponsorship available. Salary: $150,000 - $200,000/year.
Requirements: 5+ years of experience with React, TypeScript, and Node.js.
Location: Remote (US-based) or Hybrid (San Francisco, CA)"
                  className="min-h-[400px] bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <Button
                variant="glow"
                size="lg"
                className="w-full"
                onClick={handleAnalyze}
                disabled={isLoading || !jobDescription.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⚡</span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze Job Description
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Powered by AI • Extracts key job information instantly
              </p>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Parsed Results
              </h3>

              <div className="glass-card p-6 min-h-[500px]">
                {isLoading ? (
                  <LoadingState />
                ) : parsedData ? (
                  <div className="space-y-6">
                    <ParsedResults data={parsedData} />
                    {skillMatch && (
                      <SkillMatchCard
                        matchedSkills={skillMatch.matchedSkills}
                        missingSkills={skillMatch.missingSkills}
                        matchPercentage={skillMatch.matchPercentage}
                        delay={300}
                      />
                    )}
                  </div>
                ) : (
                  <EmptyState />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
