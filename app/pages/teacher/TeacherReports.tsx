import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Home, Users, Video, MessageCircle, FileQuestion, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const navItems = [
  { label: "Dashboard", path: "/teacher/dashboard", icon: <Home size={20} /> },
  { label: "Students", path: "/teacher/students", icon: <Users size={20} /> },
  { label: "Lectures", path: "/teacher/lectures", icon: <Video size={20} /> },
  { label: "Doubt Sessions", path: "/teacher/doubt-sessions", icon: <MessageCircle size={20} /> },
  { label: "Exams", path: "/teacher/exams", icon: <FileQuestion size={20} /> },
  { label: "Reports", path: "/teacher/reports", icon: <BarChart3 size={20} /> },
];

const attendanceData = [
  { week: "Week 1", attendance: 88 },
  { week: "Week 2", attendance: 92 },
  { week: "Week 3", attendance: 85 },
  { week: "Week 4", attendance: 90 },
];

const performanceData = [
  { module: "Module 1", average: 72 },
  { module: "Module 2", average: 78 },
  { module: "Module 3", average: 85 },
  { module: "Module 4", average: 81 },
];

export default function TeacherReports() {
  return (
    <DashboardLayout navItems={navItems} userRole="teacher" userName="Amit Desai">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Reports & Analytics</h1>
        <p className="text-[#0B2A5B]/70">Detailed insights into class performance</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Total Students</p>
          <p className="text-2xl font-bold text-[#0B2A5B]">156</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Avg Attendance</p>
          <p className="text-2xl font-bold text-green-600">89%</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Avg Score</p>
          <p className="text-2xl font-bold text-[#C2A86A]">79%</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Pass Rate</p>
          <p className="text-2xl font-bold text-green-600">94%</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0B2A5B20" />
              <XAxis dataKey="week" stroke="#0B2A5B" />
              <YAxis stroke="#0B2A5B" domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="#C2A86A" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Performance by Module</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0B2A5B20" />
              <XAxis dataKey="module" stroke="#0B2A5B" />
              <YAxis stroke="#0B2A5B" domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="average" fill="#0B2A5B" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </DashboardLayout>
  );
}
