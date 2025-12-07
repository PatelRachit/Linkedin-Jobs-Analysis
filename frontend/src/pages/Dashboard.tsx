import { Navbar } from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ComposedChart,
  Line,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

// Top 20 Most Requested Skills Data (from LinkedIn analysis - full dataset)
const skillsData = [
  { skill: "Information Technology", count: 25255 },
  { skill: "Sales", count: 21190 },
  { skill: "Management", count: 20385 },
  { skill: "Manufacturing", count: 17728 },
  { skill: "Health Care Provider", count: 16675 },
  { skill: "Business Development", count: 13303 },
  { skill: "Engineering", count: 12530 },
  { skill: "Other", count: 12313 },
  { skill: "Finance", count: 8009 },
  { skill: "Marketing", count: 5399 },
  { skill: "Accounting/Auditing", count: 4998 },
  { skill: "Administrative", count: 4787 },
  { skill: "Customer Service", count: 4167 },
  { skill: "Project Management", count: 3824 },
  { skill: "Analyst", count: 3775 },
  { skill: "Research", count: 2928 },
  { skill: "Human Resources", count: 2608 },
  { skill: "Consulting", count: 2241 },
  { skill: "Legal", count: 2229 },
  { skill: "Education", count: 2217 },
];

// Top 10 Cities Hiring Data (from LinkedIn analysis - full dataset)
const citiesData = [
  { city: "New York", count: 3403 },
  { city: "Chicago", count: 1836 },
  { city: "Houston", count: 1776 },
  { city: "Dallas", count: 1394 },
  { city: "Atlanta", count: 1369 },
  { city: "Austin", count: 1325 },
  { city: "Boston", count: 1202 },
  { city: "Washington", count: 1118 },
  { city: "Los Angeles", count: 1100 },
];

// Salary Bucket Distribution (from LinkedIn analysis - full dataset)
const salaryBucketData = [
  { bucket: "<50k", count: 7986 },
  { bucket: "50k–100k", count: 13673 },
  { bucket: "100k–150k", count: 8521 },
  { bucket: "150k–200k", count: 3595 },
  { bucket: ">=200k", count: 1842 },
];

// Summary Statistics (from full dataset)
const summaryStats = {
  totalJobs: 123842,
  jobsWithSalary: 35617,
  unknownSalary: 88225,
  meanSalary: 96590,
  stdDevSalary: 60960,
  minSalary: 10000,
  maxSalary: 960000,
};

// Salary Distribution Data (histogram from LinkedIn analysis)
const salaryDistribution = [
  { range: "0-50K", count: 800 },
  { range: "50-100K", count: 4950 },
  { range: "100-150K", count: 4050 },
  { range: "150-200K", count: 3050 },
  { range: "200-250K", count: 2550 },
  { range: "250-300K", count: 1850 },
  { range: "300-350K", count: 1100 },
  { range: "350-400K", count: 600 },
  { range: "400-500K", count: 350 },
  { range: "500-600K", count: 150 },
  { range: "600-800K", count: 80 },
  { range: "800K+", count: 30 },
];

// Salary by Experience Level (box plot data from LinkedIn analysis)
const salaryData = [
  { level: "Entry Level", min: 10, q1: 42, median: 54, q3: 78, max: 550 },
  { level: "Associate", min: 16, q1: 58, median: 75, q3: 99, max: 960 },
  { level: "Mid-Senior", min: 10, q1: 78, median: 108, q3: 140, max: 750 },
  { level: "Director", min: 25, q1: 130, median: 165, q3: 202, max: 422 },
  { level: "Executive", min: 41, q1: 150, median: 193, q3: 264, max: 550 },
  { level: "Internship", min: 21, q1: 42, median: 51, q3: 60, max: 182 },
];

// Salary vs Views Scatter Data (from LinkedIn analysis - with all outliers)
const salaryVsViews = [
  // Entry level - low views
  { views: 6, salary: 90, level: "Entry level" },
  { views: 566, salary: 33, level: "Entry level" },
  { views: 3, salary: 60, level: "Entry level" },
  { views: 8, salary: 50, level: "Entry level" },
  { views: 10, salary: 35, level: "Entry level" },
  { views: 5, salary: 86, level: "Entry level" },
  { views: 41, salary: 87, level: "Entry level" },
  { views: 31, salary: 48, level: "Entry level" },
  { views: 54, salary: 240, level: "Entry level" },
  { views: 4, salary: 150, level: "Entry level" },
  { views: 57, salary: 63, level: "Entry level" },
  { views: 4, salary: 390, level: "Entry level" },
  { views: 1, salary: 390, level: "Entry level" },
  { views: 3, salary: 340, level: "Entry level" },
  { views: 6, salary: 303, level: "Entry level" },
  { views: 2, salary: 475, level: "Entry level" },
  { views: 2, salary: 550, level: "Entry level" },
  { views: 38, salary: 303, level: "Entry level" },
  // Entry level - high views
  { views: 1167, salary: 63, level: "Entry level" },
  { views: 1181, salary: 55, level: "Entry level" },
  { views: 743, salary: 55, level: "Entry level" },
  { views: 842, salary: 55, level: "Entry level" },
  { views: 9949, salary: 65, level: "Entry level" },
  { views: 1637, salary: 79, level: "Entry level" },
  { views: 676, salary: 108, level: "Entry level" },
  { views: 813, salary: 71, level: "Entry level" },
  // Associate
  { views: 8, salary: 66, level: "Associate" },
  { views: 15, salary: 54, level: "Associate" },
  { views: 35, salary: 62, level: "Associate" },
  { views: 43, salary: 118, level: "Associate" },
  { views: 67, salary: 50, level: "Associate" },
  { views: 9, salary: 225, level: "Associate" },
  { views: 4, salary: 268, level: "Associate" },
  { views: 6, salary: 310, level: "Associate" },
  { views: 2, salary: 435, level: "Associate" },
  { views: 6, salary: 313, level: "Associate" },
  { views: 9, salary: 433, level: "Associate" },
  { views: 12, salary: 960, level: "Associate" },
  { views: 1179, salary: 76, level: "Associate" },
  { views: 1580, salary: 63, level: "Associate" },
  { views: 3538, salary: 90, level: "Associate" },
  { views: 650, salary: 70, level: "Associate" },
  { views: 687, salary: 86, level: "Associate" },
  { views: 1378, salary: 200, level: "Associate" },
  { views: 528, salary: 81, level: "Associate" },
  { views: 681, salary: 99, level: "Associate" },
  { views: 670, salary: 111, level: "Associate" },
  { views: 703, salary: 86, level: "Associate" },
  { views: 4223, salary: 80, level: "Associate" },
  { views: 2118, salary: 73, level: "Associate" },
  { views: 595, salary: 102, level: "Associate" },
  { views: 1647, salary: 76, level: "Associate" },
  { views: 729, salary: 135, level: "Associate" },
  { views: 814, salary: 85, level: "Associate" },
  { views: 3466, salary: 50, level: "Associate" },
  { views: 609, salary: 128, level: "Associate" },
  { views: 733, salary: 42, level: "Associate" },
  { views: 511, salary: 88, level: "Associate" },
  { views: 991, salary: 103, level: "Associate" },
  // Mid-Senior level - low views
  { views: 36, salary: 155, level: "Mid-Senior level" },
  { views: 2, salary: 160, level: "Mid-Senior level" },
  { views: 3, salary: 85, level: "Mid-Senior level" },
  { views: 40, salary: 120, level: "Mid-Senior level" },
  { views: 147, salary: 110, level: "Mid-Senior level" },
  { views: 6, salary: 300, level: "Mid-Senior level" },
  { views: 260, salary: 110, level: "Mid-Senior level" },
  { views: 131, salary: 178, level: "Mid-Senior level" },
  { views: 44, salary: 308, level: "Mid-Senior level" },
  { views: 5, salary: 400, level: "Mid-Senior level" },
  { views: 4, salary: 475, level: "Mid-Senior level" },
  { views: 26, salary: 308, level: "Mid-Senior level" },
  { views: 8, salary: 350, level: "Mid-Senior level" },
  { views: 5, salary: 575, level: "Mid-Senior level" },
  { views: 62, salary: 375, level: "Mid-Senior level" },
  { views: 64, salary: 350, level: "Mid-Senior level" },
  { views: 6, salary: 680, level: "Mid-Senior level" },
  { views: 23, salary: 660, level: "Mid-Senior level" },
  { views: 5, salary: 500, level: "Mid-Senior level" },
  { views: 17, salary: 460, level: "Mid-Senior level" },
  { views: 7, salary: 750, level: "Mid-Senior level" },
  { views: 3, salary: 468, level: "Mid-Senior level" },
  { views: 4, salary: 545, level: "Mid-Senior level" },
  { views: 5, salary: 511, level: "Mid-Senior level" },
  { views: 7, salary: 570, level: "Mid-Senior level" },
  { views: 7, salary: 500, level: "Mid-Senior level" },
  { views: 1, salary: 596, level: "Mid-Senior level" },
  { views: 4, salary: 750, level: "Mid-Senior level" },
  { views: 2, salary: 541, level: "Mid-Senior level" },
  { views: 212, salary: 416, level: "Mid-Senior level" },
  // Mid-Senior level - high views
  { views: 565, salary: 70, level: "Mid-Senior level" },
  { views: 535, salary: 93, level: "Mid-Senior level" },
  { views: 1130, salary: 146, level: "Mid-Senior level" },
  { views: 1717, salary: 84, level: "Mid-Senior level" },
  { views: 533, salary: 133, level: "Mid-Senior level" },
  { views: 617, salary: 89, level: "Mid-Senior level" },
  { views: 669, salary: 113, level: "Mid-Senior level" },
  { views: 900, salary: 112, level: "Mid-Senior level" },
  { views: 942, salary: 73, level: "Mid-Senior level" },
  { views: 857, salary: 113, level: "Mid-Senior level" },
  { views: 821, salary: 234, level: "Mid-Senior level" },
  { views: 580, salary: 148, level: "Mid-Senior level" },
  { views: 960, salary: 105, level: "Mid-Senior level" },
  { views: 641, salary: 280, level: "Mid-Senior level" },
  { views: 633, salary: 147, level: "Mid-Senior level" },
  { views: 751, salary: 210, level: "Mid-Senior level" },
  { views: 1264, salary: 127, level: "Mid-Senior level" },
  { views: 666, salary: 114, level: "Mid-Senior level" },
  { views: 614, salary: 110, level: "Mid-Senior level" },
  { views: 2019, salary: 78, level: "Mid-Senior level" },
  { views: 528, salary: 98, level: "Mid-Senior level" },
  { views: 503, salary: 127, level: "Mid-Senior level" },
  { views: 501, salary: 165, level: "Mid-Senior level" },
  { views: 903, salary: 185, level: "Mid-Senior level" },
  { views: 541, salary: 146, level: "Mid-Senior level" },
  { views: 784, salary: 146, level: "Mid-Senior level" },
  { views: 627, salary: 132, level: "Mid-Senior level" },
  { views: 933, salary: 151, level: "Mid-Senior level" },
  { views: 4378, salary: 90, level: "Mid-Senior level" },
  { views: 643, salary: 114, level: "Mid-Senior level" },
  { views: 593, salary: 140, level: "Mid-Senior level" },
  // Director
  { views: 222, salary: 175, level: "Director" },
  { views: 816, salary: 164, level: "Director" },
  { views: 162, salary: 250, level: "Director" },
  { views: 4, salary: 336, level: "Director" },
  { views: 75, salary: 395, level: "Director" },
  { views: 201, salary: 354, level: "Director" },
  { views: 6, salary: 315, level: "Director" },
  { views: 9, salary: 315, level: "Director" },
  { views: 5, salary: 333, level: "Director" },
  { views: 3, salary: 422, level: "Director" },
  { views: 1868, salary: 195, level: "Director" },
  { views: 555, salary: 120, level: "Director" },
  { views: 901, salary: 173, level: "Director" },
  { views: 870, salary: 164, level: "Director" },
  // Executive
  { views: 10, salary: 193, level: "Executive" },
  { views: 891, salary: 185, level: "Executive" },
  { views: 188, salary: 350, level: "Executive" },
  { views: 484, salary: 500, level: "Executive" },
  { views: 4, salary: 463, level: "Executive" },
  { views: 21, salary: 463, level: "Executive" },
  { views: 3, salary: 525, level: "Executive" },
  { views: 613, salary: 328, level: "Executive" },
  { views: 78, salary: 350, level: "Executive" },
  { views: 125, salary: 325, level: "Executive" },
  { views: 88, salary: 364, level: "Executive" },
  { views: 101, salary: 400, level: "Executive" },
  { views: 4, salary: 451, level: "Executive" },
  { views: 108, salary: 450, level: "Executive" },
  { views: 51, salary: 400, level: "Executive" },
  { views: 155, salary: 325, level: "Executive" },
  { views: 5, salary: 400, level: "Executive" },
  { views: 2, salary: 550, level: "Executive" },
  { views: 2, salary: 450, level: "Executive" },
  { views: 73, salary: 368, level: "Executive" },
  { views: 3798, salary: 200, level: "Executive" },
  { views: 1503, salary: 238, level: "Executive" },
  // Internship
  { views: 7, salary: 80, level: "Internship" },
];

const EXPERIENCE_COLORS: Record<string, string> = {
  "Entry level": "#f97316",
  Associate: "#22c55e",
  "Mid-Senior level": "#8b5cf6",
  Director: "#f59e0b",
  Executive: "#06b6d4",
  Internship: "#ec4899",
};

const CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#1c1c1c",
          border: "1px solid #2e2e2e",
          borderRadius: "8px",
          padding: "12px",
        }}
      >
        <p
          style={{
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 500,
            margin: 0,
          }}
        >
          {label}
        </p>
        <p
          style={{
            color: "#2dd4bf",
            fontSize: "14px",
            fontWeight: 600,
            margin: "4px 0 0 0",
          }}
        >
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const SalaryTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = salaryData.find((d) => d.level === label);
    if (!data) return null;
    return (
      <div
        style={{
          backgroundColor: "#1c1c1c",
          border: "1px solid #2e2e2e",
          borderRadius: "8px",
          padding: "12px",
        }}
      >
        <p
          style={{
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 500,
            margin: "0 0 8px 0",
          }}
        >
          {label}
        </p>
        <p style={{ color: "#a1a1aa", fontSize: "12px", margin: "2px 0" }}>
          Min: ${data.min}K
        </p>
        <p style={{ color: "#a1a1aa", fontSize: "12px", margin: "2px 0" }}>
          Q1: ${data.q1}K
        </p>
        <p
          style={{
            color: "#2dd4bf",
            fontSize: "12px",
            fontWeight: 500,
            margin: "2px 0",
          }}
        >
          Median: ${data.median}K
        </p>
        <p style={{ color: "#a1a1aa", fontSize: "12px", margin: "2px 0" }}>
          Q3: ${data.q3}K
        </p>
        <p style={{ color: "#a1a1aa", fontSize: "12px", margin: "2px 0" }}>
          Max: ${data.max}K
        </p>
      </div>
    );
  }
  return null;
};

const ScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "#1c1c1c",
          border: "1px solid #2e2e2e",
          borderRadius: "8px",
          padding: "12px",
        }}
      >
        <p
          style={{
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 500,
            margin: 0,
          }}
        >
          {data.level}
        </p>
        <p style={{ color: "#a1a1aa", fontSize: "12px", margin: "4px 0 0 0" }}>
          Views: {data.views.toLocaleString()}
        </p>
        <p style={{ color: "#a1a1aa", fontSize: "12px", margin: "2px 0 0 0" }}>
          Salary: ${data.salary}K
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Job Market Dashboard
          </h1>
          <p className="text-muted-foreground">
            Analytics and insights from LinkedIn job postings data
          </p>
        </div>

        {/* Summary Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground">
                Total Job Postings
              </p>
              <p className="text-2xl font-bold text-foreground">
                {summaryStats.totalJobs.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground">Jobs with Salary</p>
              <p className="text-2xl font-bold text-foreground">
                {summaryStats.jobsWithSalary.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                (
                {(
                  (summaryStats.jobsWithSalary / summaryStats.totalJobs) *
                  100
                ).toFixed(1)}
                %)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground">Mean Salary</p>
              <p className="text-2xl font-bold text-foreground">
                ${(summaryStats.meanSalary / 1000).toFixed(0)}K
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground">Std Deviation</p>
              <p className="text-2xl font-bold text-foreground">
                ${(summaryStats.stdDevSalary / 1000).toFixed(0)}K
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground">Min Salary</p>
              <p className="text-2xl font-bold text-foreground">
                ${(summaryStats.minSalary / 1000).toFixed(0)}K
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground">Max Salary</p>
              <p className="text-2xl font-bold text-foreground">
                ${(summaryStats.maxSalary / 1000).toFixed(0)}K
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top 20 Skills Chart */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Top 20 Most Requested Skills</CardTitle>
              <CardDescription>Job postings by skill category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={skillsData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 140, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      type="number"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      dataKey="skill"
                      type="category"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      width={135}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    />
                    <Bar
                      dataKey="count"
                      fill="hsl(var(--primary))"
                      radius={[0, 4, 4, 0]}
                    >
                      {skillsData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fillOpacity={1 - index * 0.03}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Cities Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Cities Hiring</CardTitle>
              <CardDescription>Job postings by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={citiesData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 130, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      type="number"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      dataKey="city"
                      type="category"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      width={125}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    />
                    <Bar
                      dataKey="count"
                      fill="hsl(var(--primary))"
                      radius={[0, 4, 4, 0]}
                    >
                      {citiesData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fillOpacity={1 - index * 0.06}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Salary Distribution Histogram */}
          <Card>
            <CardHeader>
              <CardTitle>Distribution of Annual Salary (USD)</CardTitle>
              <CardDescription>
                Salary distribution with density curve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={salaryDistribution}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="range"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    />
                    <Bar
                      dataKey="count"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.7}
                      radius={[4, 4, 0, 0]}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Salary Bucket Distribution */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Salary Bucket Distribution</CardTitle>
              <CardDescription>
                Job postings by salary range (excluding unknown)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="h-[400px] flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={salaryBucketData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="bucket"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "rgba(255,255,255,0.05)" }}
                      />
                      <Bar
                        dataKey="count"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="lg:w-[300px] flex flex-col justify-center gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      Most Common Range
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      $50k – $100k
                    </p>
                    <p className="text-sm text-muted-foreground">
                      13,673 postings (38.4%)
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      Unknown Salary
                    </p>
                    <p className="text-xl font-bold text-foreground">88,225</p>
                    <p className="text-sm text-muted-foreground">
                      71.2% of total postings
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      High Earners (≥$200k)
                    </p>
                    <p className="text-xl font-bold text-foreground">1,842</p>
                    <p className="text-sm text-muted-foreground">
                      5.2% of known salaries
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Salary by Experience Level - Box Plot Simulation */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Salary by Experience Level</CardTitle>
              <CardDescription>
                Salary distribution in thousands (USD)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={salaryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="level"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      angle={-15}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `$${value}K`}
                    />
                    <Tooltip
                      content={<SalaryTooltip />}
                      cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    />
                    <Legend />
                    <Bar
                      dataKey="max"
                      stackId="a"
                      fill="hsl(var(--muted))"
                      name="Range"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="q3"
                      stackId="b"
                      fill="hsl(var(--primary))"
                      name="Q3"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="q1"
                      stackId="b"
                      fill="hsl(var(--primary)/0.5)"
                      name="Q1"
                    />
                    <Line
                      type="monotone"
                      dataKey="median"
                      stroke="hsl(var(--chart-4))"
                      strokeWidth={3}
                      name="Median"
                      dot={{
                        fill: "hsl(var(--chart-4))",
                        strokeWidth: 2,
                        r: 6,
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Salary vs Views Scatter Plot */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Salary vs Job Post Views</CardTitle>
              <CardDescription>
                Relationship between salary and job posting visibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      type="number"
                      dataKey="views"
                      name="Views"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
                      domain={[0, 10000]}
                    />
                    <YAxis
                      type="number"
                      dataKey="salary"
                      name="Salary"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(v) => `${(v / 1000).toFixed(1)}M`}
                      domain={[0, 1000]}
                    />
                    <ZAxis range={[40, 40]} />
                    <Tooltip content={<ScatterTooltip />} />
                    <Legend />
                    {Object.entries(EXPERIENCE_COLORS).map(([level, color]) => (
                      <Scatter
                        key={level}
                        name={level}
                        data={salaryVsViews.filter((d) => d.level === level)}
                        fill={color}
                      />
                    ))}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
