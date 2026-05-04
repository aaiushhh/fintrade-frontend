import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Home,
  Users,
  Video,
  MessageCircle,
  FileQuestion,
  BarChart3,
  Search,
  Download,
  Eye,
  Mail,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const navItems = [
  { label: "Dashboard", path: "/teacher/dashboard", icon: <Home size={20} /> },
  { label: "Students", path: "/teacher/students", icon: <Users size={20} /> },
  { label: "Lectures", path: "/teacher/lectures", icon: <Video size={20} /> },
  { label: "Doubt Sessions", path: "/teacher/doubt-sessions", icon: <MessageCircle size={20} /> },
  { label: "Exams", path: "/teacher/exams", icon: <FileQuestion size={20} /> },
  { label: "Reports", path: "/teacher/reports", icon: <BarChart3 size={20} /> },
];

const students = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    city: "Mumbai",
    progress: 68,
    avgScore: 81.5,
    attendance: 92,
    status: "active",
  },
  {
    id: 2,
    name: "Aditi Mehta",
    email: "aditi.mehta@example.com",
    city: "Bengaluru",
    progress: 75,
    avgScore: 88.2,
    attendance: 95,
    status: "active",
  },
  {
    id: 3,
    name: "Karan Patel",
    email: "karan.patel@example.com",
    city: "Ahmedabad",
    progress: 45,
    avgScore: 65.8,
    attendance: 78,
    status: "at-risk",
  },
  {
    id: 4,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    city: "Mumbai",
    progress: 82,
    avgScore: 91.4,
    attendance: 98,
    status: "active",
  },
  {
    id: 5,
    name: "Vikram Desai",
    email: "vikram.desai@example.com",
    city: "Ahmedabad",
    progress: 58,
    avgScore: 72.6,
    attendance: 85,
    status: "active",
  },
  {
    id: 6,
    name: "Ananya Reddy",
    email: "ananya.reddy@example.com",
    city: "Bengaluru",
    progress: 91,
    avgScore: 94.7,
    attendance: 100,
    status: "active",
  },
];

export default function TeacherStudents() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout navItems={navItems} userRole="teacher" userName="Amit Desai">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">My Students</h1>
        <p className="text-[#0B2A5B]/70">Track student progress and performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Total Students</p>
          <p className="text-2xl font-bold text-[#0B2A5B]">156</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Active This Week</p>
          <p className="text-2xl font-bold text-green-600">142</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">At Risk</p>
          <p className="text-2xl font-bold text-orange-600">8</p>
        </Card>
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Avg Attendance</p>
          <p className="text-2xl font-bold text-[#C2A86A]">89%</p>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="p-6 bg-white shadow-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B2A5B]/40" size={20} />
            <Input
              placeholder="Search students by name, email, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#F4F1EA] border-[#0B2A5B]/20"
            />
          </div>
          <Button className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
            <Download size={16} className="mr-2" />
            Export Data
          </Button>
        </div>
      </Card>

      {/* Students Table */}
      <Card className="p-6 bg-white shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F4F1EA]">
                <TableHead className="text-[#0B2A5B]">Student</TableHead>
                <TableHead className="text-[#0B2A5B]">Location</TableHead>
                <TableHead className="text-[#0B2A5B]">Progress</TableHead>
                <TableHead className="text-[#0B2A5B]">Avg Score</TableHead>
                <TableHead className="text-[#0B2A5B]">Attendance</TableHead>
                <TableHead className="text-[#0B2A5B]">Status</TableHead>
                <TableHead className="text-[#0B2A5B]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-[#F4F1EA]/50">
                  <TableCell>
                    <div>
                      <p className="font-semibold text-[#0B2A5B]">{student.name}</p>
                      <p className="text-xs text-[#0B2A5B]/60">{student.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#0B2A5B]">{student.city}</TableCell>
                  <TableCell>
                    <div className="w-24">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#0B2A5B]">{student.progress}%</span>
                      </div>
                      <div className="h-2 bg-[#F4F1EA] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C2A86A]"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-[#0B2A5B]">{student.avgScore}%</span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-semibold ${
                        student.attendance >= 90
                          ? "text-green-600"
                          : student.attendance >= 75
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {student.attendance}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        student.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }
                    >
                      {student.status === "active" ? "Active" : "At Risk"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-[#0B2A5B]/20">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#0B2A5B]/20">
                        <Mail size={14} />
                      </Button>
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
