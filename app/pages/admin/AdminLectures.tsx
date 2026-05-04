import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Home, Users, BookOpen, Video, FileQuestion, IndianRupee, Bot, TrendingUp, BarChart3, Settings, Plus, Calendar, Clock } from "lucide-react";

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

const lectures = [
  { id: 1, title: "Advanced Chart Patterns", teacher: "Amit Desai", date: "Apr 11, 2026", time: "10:00 AM", students: 45, status: "scheduled" },
  { id: 2, title: "Risk Management", teacher: "Vikram Desai", date: "Apr 13, 2026", time: "11:00 AM", students: 38, status: "scheduled" },
  { id: 3, title: "Options Trading", teacher: "Amit Desai", date: "Apr 8, 2026", time: "2:00 PM", students: 42, status: "completed" },
];

export default function AdminLectures() {
  return (
    <DashboardLayout navItems={navItems} userRole="admin" userName="Vikram Desai">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Lecture Management</h1>
          <p className="text-[#0B2A5B]/70">Schedule and assign lectures to teachers</p>
        </div>
        <Button className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
          <Plus size={16} className="mr-2" />
          Schedule Lecture
        </Button>
      </div>

      <div className="space-y-4">
        {lectures.map((lecture) => (
          <Card key={lecture.id} className="p-6 bg-white shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-[#0B2A5B]">{lecture.title}</h3>
                  <Badge className={lecture.status === "completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>
                    {lecture.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-[#0B2A5B]/70">
                  <span>Teacher: {lecture.teacher}</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {lecture.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {lecture.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {lecture.students} students
                  </span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-[#0B2A5B]/20">
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
