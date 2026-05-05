import { DashboardLayout } from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Users, BookOpen, IndianRupee, TrendingUp, BarChart3, GraduationCap, Clock, CheckCircle, Shield, Newspaper, MessageCircle, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

// Minimal Admin Dashboard with no fake data

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "#121212" }}>Admin Dashboard</h1>
        <p className="text-gray-600">Complete platform overview and real-time performance tracking</p>
      </div>



      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white shadow-sm border border-gray-100 h-full">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "#121212" }}>
            <TrendingUp className="h-5 w-5" style={{ color: "#E53935" }} />
            Quick Management Links
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Manage Roles", path: "/admin/roles" },
              { label: "Market Updates", path: "/admin/news" },
              { label: "Platform Settings", path: "/admin/settings" },
              { label: "Student List", path: "/admin/students" },
              { label: "Manage Courses", path: "/admin/courses" },
              { label: "Manage Lectures", path: "/admin/lectures" },
            ].map((link, i) => (
              <a key={i} href={link.path}>
                <Button variant="outline" className="w-full text-xs h-10 border-gray-200 hover:border-[#E53935] hover:text-[#E53935] bg-white">
                  {link.label}
                </Button>
              </a>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}


