import { ParsedJobData } from '@/types/job';
import { ResultCard } from './ResultCard';
import { StatusBadge } from './StatusBadge';
import { 
  Globe, 
  DollarSign, 
  Shield, 
  Briefcase, 
  Code, 
  MapPin,
  Building,
  Clock
} from 'lucide-react';

interface ParsedResultsProps {
  data: ParsedJobData;
}

export function ParsedResults({ data }: ParsedResultsProps) {
  const formatSalary = () => {
    if (data.salary.min && data.salary.max) {
      const currency = data.salary.currency || '$';
      return `${currency}${data.salary.min.toLocaleString()} - ${currency}${data.salary.max.toLocaleString()}${data.salary.period ? ` / ${data.salary.period}` : ''}`;
    }
    return data.salary.raw || 'Not specified';
  };

  const getH1bStatus = () => {
    switch (data.h1bSponsorship.status) {
      case 'yes':
        return { status: 'success' as const, label: 'Sponsors H1B' };
      case 'no':
        return { status: 'destructive' as const, label: 'No H1B Sponsorship' };
      default:
        return { status: 'muted' as const, label: 'Not Mentioned' };
    }
  };

  const getLocationStatus = () => {
    switch (data.location.type) {
      case 'remote':
        return { status: 'success' as const, label: 'Remote' };
      case 'hybrid':
        return { status: 'warning' as const, label: 'Hybrid' };
      case 'onsite':
        return { status: 'muted' as const, label: 'On-site' };
      default:
        return { status: 'muted' as const, label: 'Not Specified' };
    }
  };

  const h1bStatus = getH1bStatus();
  const locationStatus = getLocationStatus();

  return (
    <div className="space-y-6">
      {(data.title || data.company) && (
        <div className="mb-6 animate-fade-in">
          {data.title && (
            <h2 className="text-2xl font-bold text-foreground mb-1">{data.title}</h2>
          )}
          {data.company && (
            <p className="text-muted-foreground flex items-center gap-2">
              <Building className="w-4 h-4" />
              {data.company}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultCard icon={<Globe className="w-5 h-5" />} title="H1B Visa Sponsorship" delay={0}>
          <StatusBadge status={h1bStatus.status} label={h1bStatus.label} />
          {data.h1bSponsorship.details && (
            <p className="mt-2 text-sm text-muted-foreground">{data.h1bSponsorship.details}</p>
          )}
        </ResultCard>

        <ResultCard icon={<DollarSign className="w-5 h-5" />} title="Salary" delay={50}>
          <p className="text-lg font-semibold text-foreground">{formatSalary()}</p>
        </ResultCard>

        <ResultCard icon={<Shield className="w-5 h-5" />} title="Citizenship Requirements" delay={100}>
          <StatusBadge 
            status={data.citizenship.required ? 'destructive' : 'success'} 
            label={data.citizenship.required ? 'US Citizenship Required' : 'No Citizenship Requirement'} 
          />
          {data.citizenship.securityClearance && (
            <p className="mt-2 text-sm text-warning">Security Clearance Required</p>
          )}
          {data.citizenship.details && (
            <p className="mt-2 text-sm text-muted-foreground">{data.citizenship.details}</p>
          )}
        </ResultCard>

        <ResultCard icon={<Briefcase className="w-5 h-5" />} title="Experience Level" delay={150}>
          <div className="flex flex-wrap gap-2">
            {data.experience.level && (
              <StatusBadge status="muted" label={data.experience.level} showIcon={false} />
            )}
            {(data.experience.yearsMin || data.experience.yearsMax) && (
              <span className="text-foreground">
                {data.experience.yearsMin && data.experience.yearsMax 
                  ? `${data.experience.yearsMin}-${data.experience.yearsMax} years`
                  : data.experience.yearsMin 
                    ? `${data.experience.yearsMin}+ years`
                    : `Up to ${data.experience.yearsMax} years`
                }
              </span>
            )}
          </div>
          {data.employmentType && (
            <p className="mt-2 text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {data.employmentType}
            </p>
          )}
        </ResultCard>

        <ResultCard icon={<MapPin className="w-5 h-5" />} title="Location" delay={200}>
          <StatusBadge status={locationStatus.status} label={locationStatus.label} />
          {(data.location.city || data.location.state || data.location.country) && (
            <p className="mt-2 text-sm text-muted-foreground">
              {[data.location.city, data.location.state, data.location.country].filter(Boolean).join(', ')}
            </p>
          )}
        </ResultCard>

        <ResultCard icon={<Code className="w-5 h-5" />} title="Key Skills" delay={250} className="md:col-span-2">
          <div className="flex flex-wrap gap-2">
            {data.skills.length > 0 ? (
              data.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-secondary rounded-lg text-sm text-secondary-foreground border border-border"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-muted-foreground">No specific skills mentioned</span>
            )}
          </div>
        </ResultCard>
      </div>
    </div>
  );
}
