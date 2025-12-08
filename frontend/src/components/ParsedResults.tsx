import { ResultCard } from "./ResultCard";
import { StatusBadge } from "./StatusBadge";
import {
  Globe,
  DollarSign,
  Briefcase,
  Code,
  MapPin,
  Building,
} from "lucide-react";

interface Experience {
  level: string;
  years_min: number | null;
  years_max: number | null;
}

interface JobData {
  company: string | null;
  location: string | null;
  experience: Experience;
  salary: string | null;
  skills_extracted: string[];
  role_category: string;
  role_confidence: number;
  predicted_top_skills: string[];
  h1b_sponsorship: string; // "Yes", "No", "Not Mentioned"
}

interface ParsedResultsProps {
  data: JobData;
}

export function ParsedResults({ data }: ParsedResultsProps) {
  console.log("ParsedResults data:", data);
  const getH1bStatus = () => {
    switch (data.h1b_sponsorship) {
      case "Yes":
        return { status: "success" as const, label: "Sponsors H1B" };
      case "No":
        return { status: "destructive" as const, label: "No H1B Sponsorship" };
      default:
        return { status: "muted" as const, label: "Not Mentioned" };
    }
  };

  const h1bStatus = getH1bStatus();

  return (
    <div className="space-y-6">
      {(data.role_category || data.company) && (
        <div className="mb-6 animate-fade-in">
          {data.role_category && (
            <h2 className="text-2xl font-bold text-foreground mb-1">
              {data.role_category}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({(data.role_confidence * 100).toFixed(0)}% confidence)
              </span>
            </h2>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultCard
          icon={<Globe className="w-5 h-5" />}
          title="H1B Visa Sponsorship"
          delay={0}
        >
          <StatusBadge status={h1bStatus.status} label={h1bStatus.label} />
        </ResultCard>

        <ResultCard
          icon={<DollarSign className="w-5 h-5" />}
          title="Salary"
          delay={50}
        >
          <p className="text-lg font-semibold text-foreground">
            {data.salary || "Not specified"}
          </p>
        </ResultCard>

        <ResultCard
          icon={<Briefcase className="w-5 h-5" />}
          title="Experience Level"
          delay={150}
        >
          <div className="flex flex-wrap gap-2 items-center">
            {data.experience.level && (
              <StatusBadge
                status="muted"
                label={data.experience.level}
                showIcon={false}
              />
            )}
            {(data.experience.years_min || data.experience.years_max) && (
              <span className="text-foreground">
                {data.experience.years_min && data.experience.years_max
                  ? `${data.experience.years_min}-${data.experience.years_max} years`
                  : data.experience.years_min
                  ? `${data.experience.years_min}+ years`
                  : `Up to ${data.experience.years_max} years`}
              </span>
            )}
          </div>
        </ResultCard>

        <ResultCard
          icon={<MapPin className="w-5 h-5" />}
          title="Location"
          delay={200}
        >
          <p className="text-foreground">{data.location || "Not specified"}</p>
        </ResultCard>

        <ResultCard
          icon={<Code className="w-5 h-5" />}
          title="Skills Extracted"
          delay={250}
          className="md:col-span-2"
        >
          <div className="flex flex-wrap gap-2">
            {data.skills_extracted.length > 0 ? (
              data.skills_extracted.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-secondary rounded-lg text-sm text-secondary-foreground border border-border"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-muted-foreground">
                No specific skills detected
              </span>
            )}
          </div>
        </ResultCard>

        {data.predicted_top_skills.length > 0 && (
          <ResultCard
            icon={<Code className="w-5 h-5" />}
            title="Predicted Skills (ML)"
            delay={300}
            className="md:col-span-2"
          >
            <div className="flex flex-wrap gap-2">
              {data.predicted_top_skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-primary/10 rounded-lg text-sm text-primary border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </ResultCard>
        )}
      </div>
    </div>
  );
}
