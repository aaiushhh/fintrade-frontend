import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Home,
  Users,
  Video,
  MessageCircle,
  FileQuestion,
  BarChart3,
  Play,
  Upload,
  Calendar,
  Clock,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/teacher/dashboard", icon: <Home size={20} /> },
  { label: "Students", path: "/teacher/students", icon: <Users size={20} /> },
  { label: "Lectures", path: "/teacher/lectures", icon: <Video size={20} /> },
  { label: "Doubt Sessions", path: "/teacher/doubt-sessions", icon: <MessageCircle size={20} /> },
  { label: "Exams", path: "/teacher/exams", icon: <FileQuestion size={20} /> },
  { label: "Reports", path: "/teacher/reports", icon: <BarChart3 size={20} /> },
];

const scheduledLectures = [
  {
    id: 1,
    title: "Advanced Chart Patterns",
    date: "Apr 11, 2026",
    time: "10:00 AM",
    duration: "2 hours",
    registered: 45,
    status: "scheduled",
  },
  {
    id: 2,
    title: "Risk Management Fundamentals",
    date: "Apr 13, 2026",
    time: "11:00 AM",
    duration: "2 hours",
    registered: 38,
    status: "scheduled",
  },
];

const pastLectures = [
  {
    id: 3,
    title: "Technical Indicators Masterclass",
    date: "Apr 8, 2026",
    duration: "2.5 hours",
    attended: 42,
    rating: 4.8,
    hasRecording: true,
  },
  {
    id: 4,
    title: "Candlestick Patterns Deep Dive",
    date: "Apr 5, 2026",
    duration: "2 hours",
    attended: 38,
    rating: 4.9,
    hasRecording: true,
  },
];

export default function TeacherLectures() {
  return (
    <DashboardLayout navItems={navItems} userRole="teacher" userName="Amit Desai">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">My Lectures</h1>
        <p className="text-[#0B2A5B]/70">Schedule and manage your live lectures</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6 bg-gradient-to-r from-[#0B2A5B] to-[#1a3d7a] text-[#F4F1EA] shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Start Live Lecture</h3>
          <p className="text-[#F4F1EA]/80 mb-6">
            Begin a live lecture session for your students
          </p>
          <Button className="bg-[#C2A86A] text-[#0B2A5B] hover:bg-[#d4bd8a] shadow-lg" size="lg">
            <Play size={20} className="mr-2" />
            Start Live Session
          </Button>
        </Card>

        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-4">Upload Notes</h3>
          <p className="text-[#0B2A5B]/70 mb-6">Share study materials with your students</p>
          <Button variant="outline" className="border-2 border-[#0B2A5B] text-[#0B2A5B]" size="lg">
            <Upload size={20} className="mr-2" />
            Upload Resources
          </Button>
        </Card>
      </div>

      {/* Scheduled Lectures */}
      <Card className="p-6 bg-white shadow-lg mb-6">
        <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Upcoming Lectures</h3>
        <div className="space-y-4">
          {scheduledLectures.map((lecture) => (
            <div key={lecture.id} className="p-4 bg-[#F4F1EA] rounded-lg flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-[#0B2A5B] mb-2">{lecture.title}</h4>
                <div className="flex items-center gap-4 text-sm text-[#0B2A5B]/70">
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
                    {lecture.registered} registered
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-[#0B2A5B]/20">
                  Edit
                </Button>
                <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                  <Play size={14} className="mr-2" />
                  Start
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Past Lectures */}
      <Card className="p-6 bg-white shadow-lg">
        <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Past Lectures</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {pastLectures.map((lecture) => (
            <div key={lecture.id} className="p-4 bg-[#F4F1EA] rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-[#0B2A5B]">{lecture.title}</h4>
                <Badge className="bg-green-100 text-green-700">Completed</Badge>
              </div>
              <div className="space-y-2 text-sm text-[#0B2A5B]/70 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{lecture.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>{lecture.attended} attended</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Rating: ⭐ {lecture.rating}/5</span>
                </div>
              </div>
              {lecture.hasRecording && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-[#0B2A5B]/20 text-[#0B2A5B]"
                >
                  <Video size={14} className="mr-2" />
                  View Recording
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
