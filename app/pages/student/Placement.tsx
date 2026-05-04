import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
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
  CheckCircle,
  Building2,
  IndianRupee,
  MapPin,
  Users,
  Clock,
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

const eligibilityCriteria = [
  { criteria: "Course Completion", status: "completed", score: 100 },
  { criteria: "Average Exam Score", status: "completed", score: 81.5, required: 70 },
  { criteria: "Simulator Performance", status: "completed", score: 8.5, required: 5 },
  { criteria: "Total Study Hours", status: "completed", score: 59, required: 40 },
  { criteria: "Live Lecture Attendance", status: "completed", score: 92, required: 80 },
];

const placementOpportunities = [
  {
    id: 1,
    company: "Zerodha Securities",
    position: "Junior Trader",
    location: "Mumbai",
    salary: "₹6-8 LPA",
    type: "Full-time",
    openings: 5,
    deadline: "Apr 20, 2026",
    status: "open",
  },
  {
    id: 2,
    company: "ICICI Direct",
    position: "Trading Analyst",
    location: "Ahmedabad",
    salary: "₹5-7 LPA",
    type: "Full-time",
    openings: 3,
    deadline: "Apr 25, 2026",
    status: "open",
  },
  {
    id: 3,
    company: "Angel One",
    position: "Technical Analyst",
    location: "Bengaluru",
    salary: "₹7-9 LPA",
    type: "Full-time",
    openings: 4,
    deadline: "Apr 30, 2026",
    status: "open",
  },
  {
    id: 4,
    company: "Upstox Trading",
    position: "Market Research Associate",
    location: "Mumbai",
    salary: "₹5-6 LPA",
    type: "Full-time",
    openings: 2,
    deadline: "May 5, 2026",
    status: "open",
  },
];

const applicationStatus = [
  {
    company: "Zerodha Securities",
    position: "Junior Trader",
    appliedDate: "Apr 8, 2026",
    status: "Under Review",
    stage: "Interview Scheduled",
  },
  {
    company: "ICICI Direct",
    position: "Trading Analyst",
    appliedDate: "Apr 5, 2026",
    status: "Selected",
    stage: "Offer Received",
  },
];

export default function Placement() {
  const isEligible = eligibilityCriteria.every((c) => c.status === "completed");

  return (
    <DashboardLayout navItems={navItems} userRole="student" userName="Rahul Sharma">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Placement Portal</h1>
        <p className="text-[#0B2A5B]/70">Explore job opportunities from our partner firms</p>
      </div>

      {/* Eligibility Status */}
      <Card className={`p-6 mb-6 shadow-xl ${isEligible ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-orange-500 to-orange-600"} text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Placement Eligibility</h3>
            <p className="text-white/90">
              {isEligible
                ? "Congratulations! You're eligible for all placement opportunities."
                : "Complete all requirements to unlock placement opportunities."}
            </p>
          </div>
          {isEligible && (
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={40} />
            </div>
          )}
        </div>
      </Card>

      {/* Performance Analytics */}
      <Card className="p-6 bg-white shadow-lg mb-6">
        <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Eligibility Criteria</h3>
        <div className="space-y-4">
          {eligibilityCriteria.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {item.status === "completed" ? (
                    <CheckCircle className="text-green-600" size={20} />
                  ) : (
                    <div className="w-5 h-5 border-2 border-[#0B2A5B]/30 rounded-full" />
                  )}
                  <span className="text-[#0B2A5B]">{item.criteria}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-[#0B2A5B]">
                    {item.score}
                    {item.criteria.includes("Score") || item.criteria.includes("Performance") ? "%" : ""}
                    {item.criteria.includes("Hours") ? " hrs" : ""}
                  </span>
                  {item.required && (
                    <span className="text-sm text-[#0B2A5B]/60 ml-2">/ {item.required} required</span>
                  )}
                </div>
              </div>
              <Progress
                value={item.required ? (item.score / item.required) * 100 : item.score}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Application Status */}
      {applicationStatus.length > 0 && (
        <Card className="p-6 bg-white shadow-lg mb-6">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Your Applications</h3>
          <div className="space-y-4">
            {applicationStatus.map((app, index) => (
              <div key={index} className="p-4 bg-[#F4F1EA] rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-[#0B2A5B] mb-1">{app.position}</h4>
                    <p className="text-sm text-[#0B2A5B]/70">{app.company}</p>
                  </div>
                  <Badge
                    className={
                      app.status === "Selected"
                        ? "bg-green-100 text-green-700"
                        : app.status === "Under Review"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {app.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-[#0B2A5B]/70">
                  <span>Applied: {app.appliedDate}</span>
                  <span>•</span>
                  <span>Stage: {app.stage}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Placement Opportunities */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#0B2A5B] mb-4">Available Opportunities</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {placementOpportunities.map((job) => (
            <Card key={job.id} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-[#C2A86A]/10 rounded-lg flex items-center justify-center">
                    <Building2 className="text-[#C2A86A]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#0B2A5B] mb-1">{job.position}</h4>
                    <p className="text-sm text-[#0B2A5B]/70">{job.company}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">{job.type}</Badge>
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-[#0B2A5B]/10">
                <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                  <MapPin size={16} className="text-[#C2A86A]" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                  <IndianRupee size={16} className="text-[#C2A86A]" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                  <Users size={16} className="text-[#C2A86A]" />
                  <span>{job.openings} openings</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                  <Clock size={16} className="text-[#C2A86A]" />
                  <span>Apply by {job.deadline}</span>
                </div>
              </div>

              <Button
                className="w-full bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]"
                disabled={!isEligible}
              >
                {isEligible ? "Apply Now" : "Complete Eligibility First"}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Award className="text-blue-600 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Placement Support</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Resume building and review assistance</li>
              <li>• Mock interview sessions with industry experts</li>
              <li>• Direct referrals to partner trading firms</li>
              <li>• Salary negotiation guidance</li>
              <li>• Career counseling and mentorship</li>
            </ul>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
