import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Link } from "react-router";
import {
  Home,
  Users,
  Video,
  MessageCircle,
  FileQuestion,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";




const studentPerformance = [
  { name: "Module 1", average: 72 },
  { name: "Module 2", average: 78 },
  { name: "Module 3", average: 85 },
  { name: "Module 4", average: 81 },
  { name: "Module 5", average: 88 },
];

const upcomingLectures = [
  { title: "Advanced Chart Patterns", date: "Apr 11, 2026", time: "10:00 AM", students: 45 },
  { title: "Risk Management Fundamentals", date: "Apr 13, 2026", time: "11:00 AM", students: 38 },
  { title: "Options Trading Basics", date: "Apr 15, 2026", time: "2:00 PM", students: 42 },
];

const pendingDoubts = [
  { student: "Rahul Sharma", topic: "RSI Divergence", time: "2 hours ago", priority: "high" },
  { student: "Aditi Mehta", topic: "Fibonacci Retracement", time: "4 hours ago", priority: "medium" },
  { student: "Karan Patel", topic: "Position Sizing", time: "1 day ago", priority: "low" },
];

export default function TeacherDashboard() {
  return (
    <DashboardLayout role="teacher">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Welcome back, Amit!</h1>
        <p className="text-[#0B2A5B]/70">Manage your classes and student progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 bg-white border-l-4 border-l-[#C2A86A] shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#0B2A5B]/60 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-[#0B2A5B]">156</p>
            </div>
            <div className="w-12 h-12 bg-[#C2A86A]/10 rounded-full flex items-center justify-center">
              <Users className="text-[#C2A86A]" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-l-4 border-l-[#0B2A5B] shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#0B2A5B]/60 mb-1">Lectures This Month</p>
              <p className="text-3xl font-bold text-[#0B2A5B]">12</p>
            </div>
            <div className="w-12 h-12 bg-[#0B2A5B]/10 rounded-full flex items-center justify-center">
              <Video className="text-[#0B2A5B]" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-l-4 border-l-[#1a3d7a] shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#0B2A5B]/60 mb-1">Pending Doubts</p>
              <p className="text-3xl font-bold text-[#0B2A5B]">8</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <MessageCircle className="text-orange-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-l-4 border-l-[#d4bd8a] shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#0B2A5B]/60 mb-1">Avg Student Score</p>
              <p className="text-3xl font-bold text-green-600">82.8%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Student Performance Chart */}
        <Card className="lg:col-span-2 p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Class Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0B2A5B20" />
              <XAxis dataKey="name" stroke="#0B2A5B" style={{ fontSize: "12px" }} />
              <YAxis stroke="#0B2A5B" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #C2A86A",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="average" fill="#C2A86A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-br from-[#0B2A5B] to-[#1a3d7a] text-[#F4F1EA] shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-4">
            <Link to="/teacher/lectures" className="block">
              <Button className="w-full h-auto py-5 bg-[#C2A86A] text-[#0B2A5B] hover:bg-[#d4bd8a] shadow-lg shadow-[#C2A86A]/20 transition-all hover:scale-[1.02] flex items-center justify-center">
                <Video size={20} className="mr-3" />
                <span className="font-semibold">Start Live Lecture</span>
              </Button>
            </Link>
            <Link to="/teacher/doubt-sessions" className="block">
              <Button className="w-full h-auto py-5 bg-[#C2A86A] text-[#0B2A5B] hover:bg-[#d4bd8a] shadow-lg shadow-[#C2A86A]/20 transition-all hover:scale-[1.02] flex items-center justify-center">
                <MessageCircle size={20} className="mr-3" />
                <span className="font-semibold">Resolve Doubts</span>
              </Button>
            </Link>
            <Link to="/teacher/exams" className="block">
              <Button className="w-full h-auto py-5 bg-[#C2A86A] text-[#0B2A5B] hover:bg-[#d4bd8a] shadow-lg shadow-[#C2A86A]/20 transition-all hover:scale-[1.02] flex items-center justify-center">
                <FileQuestion size={20} className="mr-3" />
                <span className="font-semibold">Create Exam</span>
              </Button>
            </Link>
            <Link to="/teacher/students" className="block">
              <Button className="w-full h-auto py-5 bg-[#C2A86A] text-[#0B2A5B] hover:bg-[#d4bd8a] shadow-lg shadow-[#C2A86A]/20 transition-all hover:scale-[1.02] flex items-center justify-center">
                <Users size={20} className="mr-3" />
                <span className="font-semibold">View Students</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Lectures */}
        <Card className="p-6 bg-white shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[#0B2A5B]">Upcoming Lectures</h3>
            <Link to="/teacher/lectures">
              <Button variant="ghost" size="sm" className="text-[#C2A86A]">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingLectures.map((lecture, index) => (
              <div key={index} className="p-4 bg-[#F4F1EA] rounded-lg">
                <h4 className="font-semibold text-[#0B2A5B] mb-2">{lecture.title}</h4>
                <div className="flex items-center gap-4 text-sm text-[#0B2A5B]/70">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {lecture.date} at {lecture.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {lecture.students} students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Doubts */}
        <Card className="p-6 bg-white shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[#0B2A5B]">Pending Student Doubts</h3>
            <Link to="/teacher/doubt-sessions">
              <Button variant="ghost" size="sm" className="text-[#C2A86A]">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {pendingDoubts.map((doubt, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-[#F4F1EA] rounded-lg">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    doubt.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : doubt.priority === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <AlertCircle size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#0B2A5B]">{doubt.student}</p>
                  <p className="text-sm text-[#0B2A5B]/70 mb-1">{doubt.topic}</p>
                  <p className="text-xs text-[#0B2A5B]/50">{doubt.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
