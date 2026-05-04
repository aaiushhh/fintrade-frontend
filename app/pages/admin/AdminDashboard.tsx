import { DashboardLayout } from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Users, BookOpen, IndianRupee, TrendingUp, BarChart3, GraduationCap, Clock, CheckCircle, Shield, Newspaper, MessageCircle, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const revenueData = [
  { month: "Oct", revenue: 1200000 },
  { month: "Nov", revenue: 1450000 },
  { month: "Dec", revenue: 1680000 },
  { month: "Jan", revenue: 1820000 },
  { month: "Feb", revenue: 2100000 },
  { month: "Mar", revenue: 2450000 },
];

const studentGrowth = [
  { month: "Oct", students: 8420 },
  { month: "Nov", students: 9350 },
  { month: "Dec", students: 10280 },
  { month: "Jan", students: 11150 },
  { month: "Feb", students: 11890 },
  { month: "Mar", students: 12450 },
];

const stats = [
  { label: "Total Students", value: "12,450", change: "+12.5%", icon: Users, color: "#E53935", bg: "rgba(229, 57, 53, 0.1)" },
  { label: "Monthly Revenue", value: "₹24.5L", change: "+16.7%", icon: IndianRupee, color: "#4CAF50", bg: "rgba(76, 175, 80, 0.1)" },
  { label: "Course Enrollments", value: "856", change: "+8.2%", icon: BookOpen, color: "#2196F3", bg: "rgba(33, 150, 243, 0.1)" },
  { label: "Pass Rate", value: "87.3%", change: "+2.1%", icon: GraduationCap, color: "#9C27B0", bg: "rgba(156, 39, 176, 0.1)" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "#121212" }}>Admin Dashboard</h1>
        <p className="text-gray-600">Complete platform overview and real-time performance tracking</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
              </div>
              <div className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith("+") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                {stat.change}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold" style={{ color: "#121212" }}>{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 bg-white shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold" style={{ color: "#121212" }}>Revenue Growth (Projected vs Actual)</h3>
            <Select defaultValue="6m">
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
            </Select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E53935" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#E53935" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/100000}L`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#E53935" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold" style={{ color: "#121212" }}>Student Acquisition</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(229, 57, 53, 0.05)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="students" fill="#121212" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-white shadow-sm border border-gray-100 h-full">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "#121212" }}>
            <Clock className="h-5 w-5" style={{ color: "#E53935" }} />
            Recent Platform Activity
          </h3>
          <div className="space-y-4">
            {[
              { text: "New enrollment in Basic Trading", user: "Vikas K.", time: "2 min ago", icon: BookOpen },
              { text: "Monthly exam completed", user: "Aditi S.", time: "15 min ago", icon: GraduationCap },
              { text: "New support ticket raised", user: "Rohit M.", time: "1 hour ago", icon: MessageCircle },
              { text: "Admin role updated", user: "Super Admin", time: "3 hours ago", icon: Shield },
            ].map((activity, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <activity.icon className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#121212" }}>{activity.user} <span className="font-normal text-gray-500">{activity.text}</span></p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm border border-gray-100 h-full">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "#121212" }}>
            <Newspaper className="h-5 w-5" style={{ color: "#E53935" }} />
            Market Updates Status
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gray-50 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-bold">Today's Videos</p>
                <p className="text-xl font-bold" style={{ color: "#121212" }}>4 Published</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold" style={{ color: "#121212" }}>Top Performing Update</p>
              <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-100">
                <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100" alt="Market" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium line-clamp-1">NIFTY Market Analysis Today</p>
                  <p className="text-xs text-gray-500">12K views • 2h ago</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm border border-gray-100 h-full">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "#121212" }}>
            <TrendingUp className="h-5 w-5" style={{ color: "#E53935" }} />
            Quick Management Links
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Manage Roles", path: "/admin/roles" },
              { label: "Review Payments", path: "/admin/payments" },
              { label: "Market Updates", path: "/admin/news" },
              { label: "View Reports", path: "/admin/reports" },
              { label: "Platform Settings", path: "/admin/settings" },
              { label: "Student List", path: "/admin/students" },
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

function Select({ defaultValue, children }: { defaultValue: string; children: React.ReactNode }) {
  return (
    <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-2 py-1 outline-none focus:border-[#E53935]">
      {children}
    </select>
  );
}
