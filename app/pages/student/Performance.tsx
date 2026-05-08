import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";



const skillData = [
  { skill: "Technical Analysis", score: 85, fullMark: 100 },
  { skill: "Risk Management", score: 78, fullMark: 100 },
  { skill: "Trading Psychology", score: 72, fullMark: 100 },
  { skill: "Strategy Development", score: 80, fullMark: 100 },
  { skill: "Market Understanding", score: 88, fullMark: 100 },
];

const examProgress = [
  { month: "Month 1", score: 78 },
  { month: "Month 2", score: 85 },
  { month: "Month 3", score: 0 },
];

const weeklyActivity = [
  { week: "Week 1", hours: 12 },
  { week: "Week 2", hours: 15 },
  { week: "Week 3", hours: 18 },
  { week: "Week 4", hours: 14 },
];

const strengths = [
  { area: "Chart Pattern Recognition", score: 92 },
  { area: "Technical Indicators", score: 88 },
  { area: "Market Sentiment Analysis", score: 85 },
];

const weaknesses = [
  { area: "Options Pricing Models", score: 58 },
  { area: "Portfolio Rebalancing", score: 62 },
  { area: "Derivative Strategies", score: 65 },
];

export default function Performance() {
  return (
    <DashboardLayout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Performance Analytics</h1>
        <p className="text-[#0B2A5B]/70">Comprehensive analysis of your learning progress</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Overall Score</p>
          <p className="text-3xl font-bold text-[#C2A86A]">81.5%</p>
          <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
            <TrendingUp size={14} />
            <span>+7.5% from last month</span>
          </div>
        </Card>
        <Card className="p-6 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Course Completion</p>
          <p className="text-3xl font-bold text-[#0B2A5B]">68%</p>
          <Progress value={68} className="mt-3 h-2" />
        </Card>
        <Card className="p-6 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Study Hours</p>
          <p className="text-3xl font-bold text-[#0B2A5B]">59 hrs</p>
          <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
            <TrendingUp size={14} />
            <span>+12 hrs this month</span>
          </div>
        </Card>
        <Card className="p-6 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Class Rank</p>
          <p className="text-3xl font-bold text-[#0B2A5B]">24/156</p>
          <p className="text-sm text-[#0B2A5B]/60 mt-2">Top 15%</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Skill Radar */}
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Skill Analysis</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={skillData}>
              <PolarGrid stroke="#0B2A5B20" />
              <PolarAngleAxis dataKey="skill" style={{ fontSize: "12px", fill: "#0B2A5B" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} style={{ fontSize: "10px" }} />
              <Radar
                name="Your Score"
                dataKey="score"
                stroke="#C2A86A"
                fill="#C2A86A"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Exam Progress */}
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Exam Performance Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={examProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0B2A5B20" />
              <XAxis dataKey="month" stroke="#0B2A5B" style={{ fontSize: "12px" }} />
              <YAxis stroke="#0B2A5B" style={{ fontSize: "12px" }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #C2A86A",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#C2A86A"
                strokeWidth={3}
                dot={{ fill: "#C2A86A", r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card className="p-6 bg-white shadow-lg mb-8">
        <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Weekly Study Hours</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0B2A5B20" />
            <XAxis dataKey="week" stroke="#0B2A5B" style={{ fontSize: "12px" }} />
            <YAxis stroke="#0B2A5B" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #C2A86A",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="hours" fill="#0B2A5B" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6 flex items-center gap-2">
            <TrendingUp className="text-green-600" size={24} />
            Your Strengths
          </h3>
          <div className="space-y-4">
            {strengths.map((strength, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#0B2A5B]">{strength.area}</span>
                  <span className="text-sm font-semibold text-green-600">{strength.score}%</span>
                </div>
                <Progress value={strength.score} className="h-2 bg-green-100" />
              </div>
            ))}
          </div>
        </Card>

        {/* Weaknesses */}
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6 flex items-center gap-2">
            <TrendingDown className="text-orange-600" size={24} />
            Areas for Improvement
          </h3>
          <div className="space-y-4">
            {weaknesses.map((weakness, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#0B2A5B]">{weakness.area}</span>
                  <span className="text-sm font-semibold text-orange-600">{weakness.score}%</span>
                </div>
                <Progress value={weakness.score} className="h-2 bg-orange-100" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
