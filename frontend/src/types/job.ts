export interface ParsedJobData {
  h1bSponsorship: {
    status: 'yes' | 'no' | 'unknown';
    details?: string;
  };
  salary: {
    min?: number;
    max?: number;
    currency?: string;
    period?: string;
    raw?: string;
  };
  citizenship: {
    required: boolean;
    details?: string;
    securityClearance?: boolean;
  };
  experience: {
    yearsMin?: number;
    yearsMax?: number;
    level?: string;
  };
  skills: string[];
  location: {
    type: 'remote' | 'hybrid' | 'onsite' | 'unknown';
    city?: string;
    state?: string;
    country?: string;
  };
  company?: string;
  title?: string;
  employmentType?: string;
}
