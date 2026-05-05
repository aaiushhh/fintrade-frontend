import { useState, useEffect } from "react";
import api from "../../services/api";
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

// We will fetch lectures from the backend
type LectureType = {
  id: number;
  title: string;
  instructor_id: number;
  instructor_name?: string;
  start_time: string;
  end_time: string;
  description: string;
  meeting_url: string;
  recording_url?: string;
  status: string; // scheduled, live, completed, cancelled
  attendees?: number;
};

export default function Lectures() {
  const [upcomingLectures, setUpcoming] = useState<LectureType[]>([]);
  const [pastLectures, setPast] = useState<LectureType[]>([]);
  const [liveLecture, setLive] = useState<LectureType | null>(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await api.get("/lectures");
        const lectures: LectureType[] = res.data;
        
        const now = new Date();
        const upcoming: LectureType[] = [];
        const past: LectureType[] = [];
        let live: LectureType | null = null;

        lectures.forEach(l => {
          const start = new Date(l.start_time);
          const end = new Date(l.end_time);
          if (l.status === 'live' || (now >= start && now <= end)) {
            live = l;
          } else if (now < start || l.status === 'scheduled') {
            upcoming.push(l);
          } else {
            past.push(l);
          }
        });

        setUpcoming(upcoming);
        setPast(past);
        setLive(live);
      } catch (err) {
        console.error("Failed to load lectures", err);
      }
    };
    fetchLectures();
  }, []);
  return (
    <DashboardLayout navItems={navItems} userRole="student" userName="Rahul Sharma">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Live Lectures & Recordings</h1>
        <p className="text-[#0B2A5B]/70">Attend live sessions and access recorded lectures</p>
      </div>

      {/* Live Lecture Banner */}
      {liveLecture && (
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
                  with {liveLecture.instructor_name || "Instructor"} • Started at {new Date(liveLecture.start_time).toLocaleTimeString()}
                </p>
                <p className="text-sm text-white/80 flex items-center gap-2 mt-2">
                  <Users size={16} />
                  {liveLecture.attendees || 0} viewers watching
                </p>
              </div>
            </div>
            <a href={liveLecture.meeting_url || "#"} target="_blank" rel="noreferrer">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 shadow-lg">
                <Play size={20} className="mr-2" />
                Join Now
              </Button>
            </a>
          </div>
        </Card>
      )}

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
                    <span>{lecture.instructor_name || "Instructor"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                    <Calendar size={16} className="text-[#C2A86A]" />
                    <span>{new Date(lecture.start_time).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                    <Clock size={16} className="text-[#C2A86A]" />
                    <span>{new Date(lecture.start_time).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                    <Users size={16} className="text-[#C2A86A]" />
                    <span>{lecture.attendees || 0} registered</span>
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
                        <Badge className="bg-green-100 text-green-700">Completed</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#0B2A5B]/70 mb-3">
                        <span className="flex items-center gap-1">
                          <GraduationCap size={14} />
                          {lecture.instructor_name || "Instructor"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(lecture.start_time).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          2 hours
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {lecture.recording_url && (
                          <a href={lecture.recording_url} target="_blank" rel="noreferrer">
                            <Button
                              size="sm"
                              className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]"
                            >
                              <Play size={16} className="mr-2" />
                              Watch Recording
                            </Button>
                          </a>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#0B2A5B]/20 text-[#0B2A5B]"
                        >
                          <Download size={16} className="mr-2" />
                          Download Notes
                        </Button>
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
