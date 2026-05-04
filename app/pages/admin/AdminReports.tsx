import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Home, Users, BookOpen, Video, FileQuestion, IndianRupee, Bot, TrendingUp, BarChart3, Settings } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: <Home size={20} /> },
  { label: "Students", path: "/admin/students", icon: <Users size={20} /> },
  { label: "Courses", path: "/admin/courses", icon: <BookOpen size={20} /> },
  { label: "Lectures", path: "/admin/lectures", icon: <Video size={20} /> },
  { label: "Exams", path: "/admin/exams", icon: <FileQuestion size={20} /> },
  { label: "Payments", path: "/admin/payments", icon: <IndianRupee size={20} /> },
  { label: "AI Chatbot", path: "/admin/ai-chatbot", icon: <Bot size={20} /> },
  { label: "Simulator", path: "/admin/simulator", icon: <TrendingUp size={20} /> },
  { label: "Reports", path: "/admin/reports", icon: <BarChart3 size={20} /> },
  { label: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
];

const revenueData = [
  { month: "Oct", revenue: 1200000 },
  { month: "Nov", revenue: 1450000 },
  { month: "Dec", revenue: 1680000 },
  { month: "Jan", revenue: 1820000 },
  { month: "Feb", revenue: 2100000 },
  { month: "Mar", revenue: 2450000 },
];

const examData = [
  { month: "Oct", passRate: 88 },
  { month: "Nov", passRate: 91 },
  { month: "Dec", passRate: 89 },
  { month: "Jan", passRate: 93 },
  { month: "Feb", passRate: 94 },
  { month: "Mar", passRate: 92 },
];

export default function AdminReports() {
  return (
    <DashboardLayout navItems={navItems} userRole="admin" userName="Vikram Desai">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Analytics & Reports</h1>
        <p className="text-[#0B2A5B]/70">Comprehensive platform performance metrics</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">₹2.45Cr</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Student Growth</p>
          <p className="text-2xl font-bold text-[#C2A86A]">+4.7%</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Exam Success</p>
          <p className="text-2xl font-bold text-blue-600">92%</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Simulator Usage</p>
          <p className="text-2xl font-bold text-[#0B2A5B]">124K</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0B2A5B20" />
              <XAxis dataKey="month" stroke="#0B2A5B" />
              <YAxis stroke="#0B2A5B" />
              <Tooltip formatter={(value: number) => `₹${(value / 100000).toFixed(1)}L`} />
              <Line type="monotone" dataKey="revenue" stroke="#C2A86A" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Exam Pass Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={examData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0B2A5B20" />
              <XAxis dataKey="month" stroke="#0B2A5B" />
              <YAxis stroke="#0B2A5B" domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="passRate" fill="#0B2A5B" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </DashboardLayout>
  );
}
