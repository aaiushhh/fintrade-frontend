import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Home, Users, BookOpen, Video, FileQuestion, IndianRupee, Bot, TrendingUp, BarChart3, Settings, Search, Download, Eye, Mail } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

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

const students = [
  { id: 1, name: "Rahul Sharma", email: "rahul.sharma@example.com", course: "Basic Trading", city: "Mumbai", enrolled: "Jan 15, 2026", progress: 68, status: "active" },
  { id: 2, name: "Aditi Mehta", email: "aditi.mehta@example.com", course: "Intermediate", city: "Bengaluru", enrolled: "Feb 1, 2026", progress: 75, status: "active" },
  { id: 3, name: "Karan Patel", email: "karan.patel@example.com", course: "Advanced", city: "Ahmedabad", enrolled: "Mar 10, 2026", progress: 45, status: "active" },
];

export default function AdminStudents() {
  return (
    <DashboardLayout navItems={navItems} userRole="admin" userName="Vikram Desai">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Student Management</h1>
        <p className="text-[#0B2A5B]/70">View and manage all enrolled students</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Total Students</p>
          <p className="text-2xl font-bold text-[#0B2A5B]">12,450</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Active Students</p>
          <p className="text-2xl font-bold text-green-600">11,280</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">New This Month</p>
          <p className="text-2xl font-bold text-[#C2A86A]">560</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Completion Rate</p>
          <p className="text-2xl font-bold text-blue-600">87%</p>
        </Card>
      </div>

      <Card className="p-6 bg-white shadow-lg mb-6">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B2A5B]/40" size={20} />
            <Input placeholder="Search students..." className="pl-10 bg-[#F4F1EA] border-[#0B2A5B]/20" />
          </div>
          <Button className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-white shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F4F1EA]">
                <TableHead className="text-[#0B2A5B]">Student</TableHead>
                <TableHead className="text-[#0B2A5B]">Course</TableHead>
                <TableHead className="text-[#0B2A5B]">Location</TableHead>
                <TableHead className="text-[#0B2A5B]">Enrolled</TableHead>
                <TableHead className="text-[#0B2A5B]">Progress</TableHead>
                <TableHead className="text-[#0B2A5B]">Status</TableHead>
                <TableHead className="text-[#0B2A5B]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-[#0B2A5B]">{student.name}</p>
                      <p className="text-xs text-[#0B2A5B]/60">{student.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#0B2A5B]">{student.course}</TableCell>
                  <TableCell className="text-[#0B2A5B]">{student.city}</TableCell>
                  <TableCell className="text-[#0B2A5B]">{student.enrolled}</TableCell>
                  <TableCell><span className="font-semibold text-[#0B2A5B]">{student.progress}%</span></TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700">{student.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-[#0B2A5B]/20"><Eye size={14} /></Button>
                      <Button size="sm" variant="outline" className="border-[#0B2A5B]/20"><Mail size={14} /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
