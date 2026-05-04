import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
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
  Calendar,
  Download,
  Users,
  CircleDot,
} from "lucide-react";

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

const upcomingLectures = [
  {
    id: 1,
    title: "Advanced Chart Patterns",
    instructor: "Amit Desai",
    date: "Apr 11, 2026",
    time: "10:00 AM - 12:00 PM",
    duration: "2 hours",
    attendees: 156,
    status: "upcoming",
    description: "Deep dive into advanced chart patterns including head and shoulders, triangles, and flags.",
  },
  {
    id: 2,
    title: "Options Trading Strategies",
    instructor: "Vikram Desai",
    date: "Apr 12, 2026",
    time: "2:00 PM - 3:30 PM",
    duration: "1.5 hours",
    attendees: 142,
    status: "upcoming",
    description: "Learn practical options trading strategies for different market conditions.",
  },
  {
    id: 3,
    title: "Risk Management Fundamentals",
    instructor: "Amit Desai",
    date: "Apr 13, 2026",
    time: "11:00 AM - 1:00 PM",
    duration: "2 hours",
    attendees: 178,
    status: "upcoming",
    description: "Master essential risk management techniques to protect your trading capital.",
  },
];

const pastLectures = [
  {
    id: 4,
    title: "Technical Indicators Masterclass",
    instructor: "Amit Desai",
    date: "Apr 8, 2026",
    duration: "2.5 hours",
    recording: true,
    notes: true,
    attended: true,
  },
  {
    id: 5,
    title: "Market Psychology and Sentiment",
    instructor: "Vikram Desai",
    date: "Apr 5, 2026",
    duration: "2 hours",
    recording: true,
    notes: true,
    attended: true,
  },
  {
    id: 6,
    title: "Candlestick Patterns Deep Dive",
    instructor: "Amit Desai",
    date: "Apr 2, 2026",
    duration: "2 hours",
    recording: true,
    notes: true,
    attended: false,
  },
  {
    id: 7,
    title: "Portfolio Construction Strategies",
    instructor: "Vikram Desai",
    date: "Mar 29, 2026",
    duration: "1.5 hours",
    recording: true,
    notes: true,
    attended: true,
  },
];

const liveLecture = {
  title: "Real-Time Market Analysis",
  instructor: "Amit Desai",
  viewers: 143,
  isLive: true,
  startedAt: "9:00 AM",
};

export default function Lectures() {
  return (
    <DashboardLayout navItems={navItems} userRole="student" userName="Rahul Sharma">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Live Lectures & Recordings</h1>
        <p className="text-[#0B2A5B]/70">Attend live sessions and access recorded lectures</p>
      </div>

      {/* Live Lecture Banner */}
      <Card className="p-6 mb-6 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <CircleDot className="animate-pulse" size={40} />
              <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
            </div>
            <div>
              <Badge className="mb-2 bg-white text-red-600">LIVE NOW</Badge>
              <h3 className="text-2xl font-bold mb-1">{liveLecture.title}</h3>
              <p className="text-white/90">
                with {liveLecture.instructor} • Started at {liveLecture.startedAt}
              </p>
              <p className="text-sm text-white/80 flex items-center gap-2 mt-2">
                <Users size={16} />
                {liveLecture.viewers} viewers watching
              </p>
            </div>
          </div>
          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 shadow-lg">
            <Play size={20} className="mr-2" />
            Join Now
          </Button>
        </div>
      </Card>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upcoming">Upcoming Lectures</TabsTrigger>
          <TabsTrigger value="recordings">Past Recordings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingLectures.map((lecture) => (
              <Card key={lecture.id} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  <Badge className="mb-3 bg-blue-100 text-blue-700">Scheduled</Badge>
                  <h3 className="text-xl font-semibold text-[#0B2A5B] mb-2">{lecture.title}</h3>
                  <p className="text-sm text-[#0B2A5B]/70 mb-4">{lecture.description}</p>
                </div>

                <div className="space-y-2 mb-4 pb-4 border-b border-[#0B2A5B]/10">
                  <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                    <GraduationCap size={16} className="text-[#C2A86A]" />
                    <span>{lecture.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                    <Calendar size={16} className="text-[#C2A86A]" />
                    <span>{lecture.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                    <Clock size={16} className="text-[#C2A86A]" />
                    <span>{lecture.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                    <Users size={16} className="text-[#C2A86A]" />
                    <span>{lecture.attendees} registered</span>
                  </div>
                </div>

                <Button className="w-full bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
                  Add to Calendar
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recordings">
          <div className="space-y-4">
            {pastLectures.map((lecture) => (
              <Card key={lecture.id} className="p-6 bg-white shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 bg-[#C2A86A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Video className="text-[#C2A86A]" size={28} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-[#0B2A5B]">{lecture.title}</h3>
                        {lecture.attended && (
                          <Badge className="bg-green-100 text-green-700">Attended</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#0B2A5B]/70 mb-3">
                        <span className="flex items-center gap-1">
                          <GraduationCap size={14} />
                          {lecture.instructor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {lecture.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {lecture.duration}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {lecture.recording && (
                          <Button
                            size="sm"
                            className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]"
                          >
                            <Play size={16} className="mr-2" />
                            Watch Recording
                          </Button>
                        )}
                        {lecture.notes && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#0B2A5B]/20 text-[#0B2A5B]"
                          >
                            <Download size={16} className="mr-2" />
                            Download Notes
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
