import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  FileText,
  Play,
  FileAudio,
  FileVideo,
  Download,
  CheckCircle,
  Lock,
  Volume2,
  Settings,
} from "lucide-react";



const modules = [
  {
    id: 1,
    title: "Introduction to Stock Markets",
    description: "Understanding market structure, participants, and basic terminology",
    progress: 100,
    duration: "2.5 hours",
    status: "completed",
    lessons: [
      { id: 1, title: "What is the Stock Market?", type: "text", duration: "15 min", completed: true },
      { id: 2, title: "Market Participants", type: "video", duration: "20 min", completed: true },
      { id: 3, title: "Trading Terminology", type: "audio", duration: "18 min", completed: true },
    ],
  },
  {
    id: 2,
    title: "Chart Reading Basics",
    description: "Learn to read and interpret stock charts and candlestick patterns",
    progress: 100,
    duration: "3 hours",
    status: "completed",
    lessons: [
      { id: 1, title: "Types of Charts", type: "text", duration: "12 min", completed: true },
      { id: 2, title: "Candlestick Patterns", type: "video", duration: "35 min", completed: true },
      { id: 3, title: "Support and Resistance", type: "video", duration: "28 min", completed: true },
    ],
  },
  {
    id: 3,
    title: "Technical Indicators",
    description: "Master popular technical indicators and their applications",
    progress: 60,
    duration: "4 hours",
    status: "in-progress",
    lessons: [
      { id: 1, title: "Moving Averages", type: "video", duration: "30 min", completed: true },
      { id: 2, title: "RSI and Oscillators", type: "video", duration: "25 min", completed: true },
      { id: 3, title: "MACD Indicator", type: "text", duration: "20 min", completed: false },
      { id: 4, title: "Bollinger Bands", type: "audio", duration: "22 min", completed: false },
    ],
  },
  {
    id: 4,
    title: "Risk Management",
    description: "Essential risk management strategies for traders",
    progress: 0,
    duration: "3.5 hours",
    status: "locked",
    lessons: [
      { id: 1, title: "Position Sizing", type: "video", duration: "25 min", completed: false },
      { id: 2, title: "Stop Loss Strategies", type: "text", duration: "18 min", completed: false },
      { id: 3, title: "Portfolio Diversification", type: "audio", duration: "30 min", completed: false },
    ],
  },
  {
    id: 5,
    title: "Trading Psychology",
    description: "Develop the right mindset for successful trading",
    progress: 0,
    duration: "2.5 hours",
    status: "locked",
    lessons: [
      { id: 1, title: "Emotional Control", type: "video", duration: "22 min", completed: false },
      { id: 2, title: "Discipline and Patience", type: "text", duration: "15 min", completed: false },
      { id: 3, title: "Overcoming Fear and Greed", type: "audio", duration: "20 min", completed: false },
    ],
  },
];

export default function Modules() {
  const [selectedModule, setSelectedModule] = useState(modules[2]); // Current module
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <FileVideo className="text-[#C2A86A]" size={18} />;
      case "audio":
        return <FileAudio className="text-[#0B2A5B]" size={18} />;
      default:
        return <FileText className="text-[#1a3d7a]" size={18} />;
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Course Modules</h1>
        <p className="text-[#0B2A5B]/70">Complete all modules to unlock your certificate</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Module List */}
        <div className="lg:col-span-1 space-y-4">
          {modules.map((module) => (
            <Card
              key={module.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedModule.id === module.id
                  ? "bg-[#C2A86A]/10 border-2 border-[#C2A86A] shadow-lg"
                  : "bg-white hover:shadow-md"
              } ${module.status === "locked" ? "opacity-60" : ""}`}
              onClick={() => module.status !== "locked" && setSelectedModule(module)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-[#0B2A5B]/60">Module {module.id}</span>
                    {module.status === "completed" && (
                      <CheckCircle className="text-green-600" size={16} />
                    )}
                    {module.status === "locked" && <Lock className="text-[#0B2A5B]/40" size={16} />}
                  </div>
                  <h3 className="font-semibold text-[#0B2A5B] mb-1">{module.title}</h3>
                  <p className="text-xs text-[#0B2A5B]/60">{module.duration}</p>
                </div>
              </div>
              <Progress value={module.progress} className="h-2 mb-2" />
              <p className="text-xs text-[#0B2A5B]/70">{module.progress}% Complete</p>
            </Card>
          ))}
        </div>

        {/* Module Content */}
        <Card className="lg:col-span-2 p-6 bg-white shadow-lg">
          <div className="mb-6">
            <Badge
              className={`mb-3 ${
                selectedModule.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : selectedModule.status === "in-progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {selectedModule.status === "completed"
                ? "Completed"
                : selectedModule.status === "in-progress"
                ? "In Progress"
                : "Locked"}
            </Badge>
            <h2 className="text-2xl font-bold text-[#0B2A5B] mb-2">{selectedModule.title}</h2>
            <p className="text-[#0B2A5B]/70 mb-4">{selectedModule.description}</p>
            <div className="flex items-center gap-6 text-sm text-[#0B2A5B]/60">
              <span>{selectedModule.lessons.length} Lessons</span>
              <span>{selectedModule.duration}</span>
              <span>{selectedModule.progress}% Complete</span>
            </div>
          </div>

          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="lessons" className="space-y-3">
              {selectedModule.lessons.map((lesson, index) => (
                <Card
                  key={lesson.id}
                  className={`p-4 ${
                    lesson.completed ? "bg-green-50 border-green-200" : "bg-[#F4F1EA]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        {getTypeIcon(lesson.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#0B2A5B] mb-1">
                          {index + 1}. {lesson.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-[#0B2A5B]/60">
                          <span className="capitalize">{lesson.type}</span>
                          <span>•</span>
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {lesson.completed ? (
                        <CheckCircle className="text-green-600" size={20} />
                      ) : (
                        <Button
                          size="sm"
                          className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]"
                        >
                          <Play size={16} className="mr-2" />
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="resources">
              <div className="space-y-3">
                <Card className="p-4 bg-[#F4F1EA]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="text-[#C2A86A]" size={20} />
                      <div>
                        <p className="font-semibold text-[#0B2A5B]">Module Summary PDF</p>
                        <p className="text-xs text-[#0B2A5B]/60">2.4 MB</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#0B2A5B]/20">
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
                <Card className="p-4 bg-[#F4F1EA]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="text-[#C2A86A]" size={20} />
                      <div>
                        <p className="font-semibold text-[#0B2A5B]">Practice Exercises</p>
                        <p className="text-xs text-[#0B2A5B]/60">1.8 MB</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#0B2A5B]/20">
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
                <Card className="p-4 bg-[#F4F1EA]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="text-[#C2A86A]" size={20} />
                      <div>
                        <p className="font-semibold text-[#0B2A5B]">Additional Reading Material</p>
                        <p className="text-xs text-[#0B2A5B]/60">3.2 MB</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#0B2A5B]/20">
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Playback Controls */}
          <Card className="p-4 bg-[#F4F1EA] mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="text-[#0B2A5B]" size={20} />
                <div>
                  <p className="text-sm font-semibold text-[#0B2A5B]">Convert to Audio</p>
                  <p className="text-xs text-[#0B2A5B]/60">Listen on the go</p>
                </div>
              </div>
              <Button size="sm" className="bg-[#C2A86A] text-[#0B2A5B] hover:bg-[#d4bd8a]">
                <FileAudio size={16} className="mr-2" />
                Generate Audio
              </Button>
            </div>
          </Card>

          <div className="mt-4 flex items-center gap-4">
            <Settings className="text-[#0B2A5B]" size={20} />
            <span className="text-sm text-[#0B2A5B]">Playback Speed:</span>
            <div className="flex gap-2">
              {[0.75, 1.0, 1.25, 1.5, 2.0].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                    playbackSpeed === speed
                      ? "bg-[#C2A86A] text-[#0B2A5B]"
                      : "bg-white text-[#0B2A5B] hover:bg-[#F4F1EA]"
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
