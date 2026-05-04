import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Home, Users, Video, MessageCircle, FileQuestion, BarChart3, Plus, Edit, Eye } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/teacher/dashboard", icon: <Home size={20} /> },
  { label: "Students", path: "/teacher/students", icon: <Users size={20} /> },
  { label: "Lectures", path: "/teacher/lectures", icon: <Video size={20} /> },
  { label: "Doubt Sessions", path: "/teacher/doubt-sessions", icon: <MessageCircle size={20} /> },
  { label: "Exams", path: "/teacher/exams", icon: <FileQuestion size={20} /> },
  { label: "Reports", path: "/teacher/reports", icon: <BarChart3 size={20} /> },
];

const exams = [
  { id: 1, title: "Month 1 Assessment", questions: 30, duration: "60 min", avgScore: 76.5, totalAttempts: 142, status: "completed" },
  { id: 2, title: "Month 2 Assessment", questions: 30, duration: "60 min", avgScore: 82.3, totalAttempts: 128, status: "completed" },
  { id: 3, title: "Month 3 Assessment", questions: 30, duration: "60 min", avgScore: 0, totalAttempts: 0, status: "draft" },
];

export default function TeacherExams() {
  return (
    <DashboardLayout navItems={navItems} userRole="teacher" userName="Amit Desai">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Exam Management</h1>
            <p className="text-[#0B2A5B]/70">Create and manage student assessments</p>
          </div>
          <Button className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
            <Plus size={16} className="mr-2" />
            Create New Exam
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <Card key={exam.id} className="p-6 bg-white shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#0B2A5B]">{exam.title}</h3>
              <Badge className={exam.status === "completed" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                {exam.status}
              </Badge>
            </div>
            <div className="space-y-2 text-sm text-[#0B2A5B]/70 mb-4">
              <p>Questions: {exam.questions}</p>
              <p>Duration: {exam.duration}</p>
              {exam.status === "completed" && (
                <>
                  <p>Avg Score: {exam.avgScore}%</p>
                  <p>Attempts: {exam.totalAttempts}</p>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 border-[#0B2A5B]/20">
                <Edit size={14} className="mr-2" />
                Edit
              </Button>
              <Button size="sm" variant="outline" className="flex-1 border-[#0B2A5B]/20">
                <Eye size={14} className="mr-2" />
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
