import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Home, Users, BookOpen, Video, FileQuestion, IndianRupee, Bot, TrendingUp, BarChart3, Settings } from "lucide-react";

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

export default function AdminSettings() {
  return (
    <DashboardLayout navItems={navItems} userRole="admin" userName="Vikram Desai">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Platform Settings</h1>
        <p className="text-[#0B2A5B]/70">Configure platform settings and preferences</p>
      </div>

      <div className="space-y-6">
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">General Settings</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="platformName">Platform Name</Label>
                <Input
                  id="platformName"
                  defaultValue="FinTrade"
                  className="mt-2 bg-[#F4F1EA] border-[#0B2A5B]/20"
                />
              </div>
              <div>
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  defaultValue="support@fintrade.com"
                  className="mt-2 bg-[#F4F1EA] border-[#0B2A5B]/20"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="coursePrice">Default Course Price (₹)</Label>
                <Input
                  id="coursePrice"
                  type="number"
                  defaultValue="25000"
                  className="mt-2 bg-[#F4F1EA] border-[#0B2A5B]/20"
                />
              </div>
              <div>
                <Label htmlFor="retakeFee">Exam Retake Fee (₹)</Label>
                <Input
                  id="retakeFee"
                  type="number"
                  defaultValue="300"
                  className="mt-2 bg-[#F4F1EA] border-[#0B2A5B]/20"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Simulator Settings</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startingCapital">Starting Capital (₹)</Label>
                <Input
                  id="startingCapital"
                  type="number"
                  defaultValue="500000"
                  className="mt-2 bg-[#F4F1EA] border-[#0B2A5B]/20"
                />
              </div>
              <div>
                <Label htmlFor="dailyLossLimit">Daily Loss Limit (₹)</Label>
                <Input
                  id="dailyLossLimit"
                  type="number"
                  defaultValue="10000"
                  className="mt-2 bg-[#F4F1EA] border-[#0B2A5B]/20"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-[#0B2A5B] mb-6">Exam Settings</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="passingScore">Passing Score (%)</Label>
                <Input
                  id="passingScore"
                  type="number"
                  defaultValue="60"
                  className="mt-2 bg-[#F4F1EA] border-[#0B2A5B]/20"
                />
              </div>
              <div>
                <Label htmlFor="maxAttempts">Max Attempts Per Exam</Label>
                <Input
                  id="maxAttempts"
                  type="number"
                  defaultValue="3"
                  className="mt-2 bg-[#F4F1EA] border-[#0B2A5B]/20"
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" className="border-[#0B2A5B]/20 text-[#0B2A5B]">
            Reset to Default
          </Button>
          <Button className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
