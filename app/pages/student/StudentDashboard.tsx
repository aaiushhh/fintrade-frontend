import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Link } from "react-router";
import {
  Home,
  BookOpen,
  Video,
  MessageSquare,
  FileText,
  BarChart3,
  Award,
  TrendingUp,
  GraduationCap,
  Play,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const navItems = [
  { label: "Dashboard", path: "/student/dashboard", icon: <Home size={20} /> },
  { label: "Courses", path: "/student/courses", icon: <BookOpen size={20} /> },
  { label: "Modules", path: "/student/modules", icon: <GraduationCap size={20} /> },
  { label: "Lectures", path: "/student/lectures", icon: <Video size={20} /> },
  { label: "AI Tutor", path: "/student/ai-tutor", icon: <MessageSquare size={20} /> },
  { label: "Exams", path: "/student/exams", icon: <FileText size={20} /> },
  { label: "Performance", path: "/student/performance", icon: <BarChart3 size={20} /> },
  { label: "Certificate", path: "/student/certificate", icon: <Award size={20} /> },
  { label: "Simulator", path: "/student/simulator", icon: <TrendingUp size={20} /> },
  { label: "Placement", path: "/student/placement", icon: <Award size={20} /> },
];

const performanceData = [
  { month: "Month 1", score: 65 },
  { month: "Month 2", score: 78 },
  { month: "Month 3", score: 85 },
];

const skillData = [
  { name: "Technical Analysis", value: 85, color: "#C2A86A" },
  { name: "Risk Management", value: 78, color: "#0B2A5B" },
  { name: "Trading Psychology", value: 72, color: "#1a3d7a" },
  { name: "Strategy Development", value: 80, color: "#d4bd8a" },
];

const upcomingLectures = [
  {
    title: "Advanced Chart Patterns",
    instructor: "Amit Desai",
    date: "Apr 11, 2026",
    time: "10:00 AM",
    duration: "2 hours",
  },
  {
    title: "Options Trading Strategies",
    instructor: "Vikram Desai",
    date: "Apr 12, 2026",
    time: "2:00 PM",
    duration: "1.5 hours",
  },
  {
    title: "Risk Management Fundamentals",
    instructor: "Amit Desai",
    date: "Apr 13, 2026",
    time: "11:00 AM",
    duration: "2 hours",
  },
];

const recentActivity = [
  { action: "Completed Module 4: Technical Indicators", time: "2 hours ago", type: "success" },
  { action: "Passed Monthly Exam 2 with 85%", time: "1 day ago", type: "success" },
  { action: "Attended Live Lecture: Chart Patterns", time: "2 days ago", type: "info" },
  { action: "AI Tutor session completed", time: "3 days ago", type: "info" },
];

export default function StudentDashboard() {
  return (
    <DashboardLayout navItems={navItems} userRole="student" userName="Rahul Sharma">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Welcome back, Rahul!</h1>
        <p className="text-[#0B2A5B]/70">Track your progress and continue your learning journey</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 bg-white border-l-4 border-l-[#C2A86A] shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#0B2A5B]/60 mb-1">Course Progress</p>
              <p className="text-3xl font-bold text-[#0B2A5B]">68%</p>
            </div>
            <div className="w-12 h-12 bg-[#C2A86A]/10 rounded-full flex items-center justify-center">
              <BookOpen className="text-[#C2A86A]" size={24} />
            </div>
          </div>
          <Progress value={68} className="mt-4 h-2" />
        </Card>

        <Card className="p-6 bg-white border-l-4 border-l-[#0B2A5B] shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#0B2A5B]/60 mb-1">Exams Passed</p>
              <p className="text-3xl font-bold text-[#0B2A5B]">2/3</p>
            </div>
            <div className="w-12 h-12 bg-[#0B2A5B]/10 rounded-full flex items-center justify-center">
              <FileText className="text-[#0B2A5B]" size={24} />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">Last: 85% Score</p>
        </Card>

        <Card className="p-6 bg-white border-l-4 border-l-[#1a3d7a] shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#0B2A5B]/60 mb-1">Simulator P&L</p>
              <p className="text-3xl font-bold text-green-600">+₹42,500</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-[#0B2A5B]/60 mt-2">+8.5% Returns</p>
        </Card>

        <Card className="p-6 bg-white border-l-4 border-l-[#d4bd8a] shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#0B2A5B]/60 mb-1">Lectures Attended</p>
              <p className="text-3xl font-bold text-[#0B2A5B]">24</p>
            </div>
            <div className="w-12 h-12 bg-[#d4bd8a]/10 rounded-full flex items-center justify-center">
              <Video className="text-[#d4bd8a]" size={24} />
            </div>
          </div>
          <p className="text-sm text-[#0B2A5B]/60 mt-2">3 upcoming</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Chart */}
        <Card className="lg:col-span-2 p-6 bg-white shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-[#0B2A5B]">Exam Performance</h3>
              <p className="text-sm text-[#0B2A5B]/60">Monthly exam scores trend</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0B2A5B20" />
              <XAxis dataKey="month" stroke="#0B2A5B" style={{ fontSize: "12px" }} />
              <YAxis stroke="#0B2A5B" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #C2A86A",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="score" fill="#C2A86A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Skill Distribution */}
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Skill Distribution</h3>
          <div className="space-y-4">
            {skillData.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#0B2A5B]/80">{skill.name}</span>
                  <span className="text-sm font-semibold text-[#0B2A5B]">{skill.value}%</span>
                </div>
                <Progress
                  value={skill.value}
                  className="h-2"
                  style={{ backgroundColor: "#F4F1EA" }}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Lectures */}
        <Card className="p-6 bg-white shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[#0B2A5B]">Upcoming Lectures</h3>
            <Link to="/student/lectures">
              <Button variant="ghost" size="sm" className="text-[#C2A86A] hover:text-[#a38c52]">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingLectures.map((lecture, index) => (
              <div
                key={index}
                className="p-4 bg-[#F4F1EA] rounded-lg border border-[#0B2A5B]/10 hover:border-[#C2A86A] transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-[#0B2A5B]">{lecture.title}</h4>
                  <div className="w-10 h-10 bg-[#C2A86A]/10 rounded-full flex items-center justify-center">
                    <Play className="text-[#C2A86A]" size={16} />
                  </div>
                </div>
                <p className="text-sm text-[#0B2A5B]/60 mb-2">by {lecture.instructor}</p>
                <div className="flex items-center gap-4 text-xs text-[#0B2A5B]/70">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {lecture.date} at {lecture.time}
                  </span>
                  <span>{lecture.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === "success"
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {activity.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#0B2A5B]">{activity.action}</p>
                  <p className="text-xs text-[#0B2A5B]/60 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-r from-[#0B2A5B] to-[#1a3d7a] text-[#F4F1EA] shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/student/modules">
            <Button className="w-full bg-[#C2A86A] text-[#0B2A5B] hover:bg-[#d4bd8a] shadow-lg shadow-[#C2A86A]/20">
              Continue Learning
            </Button>
          </Link>
          <Link to="/student/simulator">
            <Button className="w-full bg-[#C2A86A] text-[#0B2A5B] hover:bg-[#d4bd8a] shadow-lg shadow-[#C2A86A]/20">
              Open Simulator
            </Button>
          </Link>
          <Link to="/student/ai-tutor">
            <Button className="w-full bg-[#C2A86A] text-[#0B2A5B] hover:bg-[#d4bd8a] shadow-lg shadow-[#C2A86A]/20">
              Ask AI Tutor
            </Button>
          </Link>
          <Link to="/student/exams">
            <Button className="w-full bg-[#C2A86A] text-[#0B2A5B] hover:bg-[#d4bd8a] shadow-lg shadow-[#C2A86A]/20">
              View Exams
            </Button>
          </Link>
        </div>
      </Card>
    </DashboardLayout>
  );
}
