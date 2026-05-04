import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Home, Users, BookOpen, Video, FileQuestion, IndianRupee, Bot, TrendingUp, BarChart3, Settings, Plus, Edit } from "lucide-react";

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

const courses = [
  { id: 1, title: "Basic Trading Fundamentals", level: "Beginner", modules: 5, students: 1240, price: 25000, status: "active" },
  { id: 2, title: "Intermediate Trading Strategies", level: "Intermediate", modules: 7, students: 856, price: 25000, status: "active" },
  { id: 3, title: "Advanced Technical Analysis", level: "Advanced", modules: 9, students: 624, price: 25000, status: "active" },
  { id: 4, title: "Master Trader Program", level: "Expert", modules: 12, students: 342, price: 25000, status: "active" },
];

export default function AdminCourses() {
  return (
    <DashboardLayout navItems={navItems} userRole="admin" userName="Vikram Desai">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Course Management</h1>
            <p className="text-[#0B2A5B]/70">Manage your course catalog</p>
          </div>
          <Button className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
            <Plus size={16} className="mr-2" />
            Add New Course
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="p-6 bg-white shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="mb-2 bg-blue-100 text-blue-700">{course.level}</Badge>
                <h3 className="text-xl font-semibold text-[#0B2A5B]">{course.title}</h3>
              </div>
              <Badge className="bg-green-100 text-green-700">{course.status}</Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-[#0B2A5B]/10">
              <div>
                <p className="text-xs text-[#0B2A5B]/60">Modules</p>
                <p className="text-lg font-semibold text-[#0B2A5B]">{course.modules}</p>
              </div>
              <div>
                <p className="text-xs text-[#0B2A5B]/60">Students</p>
                <p className="text-lg font-semibold text-[#0B2A5B]">{course.students}</p>
              </div>
              <div>
                <p className="text-xs text-[#0B2A5B]/60">Price</p>
                <p className="text-lg font-semibold text-[#C2A86A]">₹{course.price.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
                <Edit size={14} className="mr-2" />
                Edit Course
              </Button>
              <Button size="sm" variant="outline" className="flex-1 border-[#0B2A5B]/20">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
