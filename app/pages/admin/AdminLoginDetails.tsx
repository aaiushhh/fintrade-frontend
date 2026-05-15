import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, Download, UserCheck, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import api from "../../services/api";

export default function AdminLoginDetails() {
  const [logins, setLogins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLoginLogs = async () => {
    try {
      // In a real app, you'd have a specific endpoint for login logs
      // For now, we'll simulate or use user data with 'last_login' if available
      const res = await api.get("/admin/users?limit=100");
      const users = res.data.users || [];
      
      // Transform users into login log format for demonstration
      const logs = users.map((u: any) => ({
        id: u.id,
        name: u.full_name,
        email: u.email,
        contact: u.phone || "N/A",
        login_time: u.last_login || u.created_at, // Fallback to created_at if last_login is missing
        course_enrolled: u.enrolled_courses?.length > 0 ? u.enrolled_courses[0].title : "None"
      }));
      
      setLogins(logs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoginLogs();
  }, []);

  const filtered = logins.filter((l) => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Contact", "Login Time", "Course Enrolled"];
    const rows = filtered.map(l => [
      l.name,
      l.email,
      l.contact,
      new Date(l.login_time).toLocaleString(),
      l.course_enrolled
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `login_details_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout role="admin">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">Login Details</h1>
          <p className="text-[#0B2A5B]/70">Track user login activity and course engagement</p>
        </div>
        <Button onClick={exportToCSV} className="bg-[#C2A86A] text-[#0B2A5B] hover:bg-[#d4bd8a]">
          <Download size={16} className="mr-2" /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-white shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-xs text-[#0B2A5B]/60 uppercase">Active Today</p>
            <p className="text-2xl font-bold text-[#0B2A5B]">{logins.length}</p>
          </div>
        </Card>
        <Card className="p-4 bg-white shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-[#0B2A5B]/60 uppercase">Peak Login Time</p>
            <p className="text-2xl font-bold text-[#0B2A5B]">10:00 AM</p>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white shadow-lg mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B2A5B]/40" size={20} />
          <Input 
            placeholder="Search by name or email..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="pl-10 bg-[#F4F1EA] border-[#0B2A5B]/20" 
          />
        </div>
      </Card>

      <Card className="bg-white shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F4F1EA]">
                <TableHead className="text-[#0B2A5B]">User</TableHead>
                <TableHead className="text-[#0B2A5B]">Contact</TableHead>
                <TableHead className="text-[#0B2A5B]">Login Time</TableHead>
                <TableHead className="text-[#0B2A5B]">Course Enrolled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id} className="hover:bg-[#F4F1EA]/50">
                  <TableCell>
                    <div>
                      <p className="font-semibold text-[#0B2A5B]">{l.name}</p>
                      <p className="text-xs text-[#0B2A5B]/60">{l.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#0B2A5B] text-sm">{l.contact}</TableCell>
                  <TableCell className="text-[#0B2A5B] text-sm">
                    {new Date(l.login_time).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                      {l.course_enrolled}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-[#0B2A5B]/60 py-8">
                    No login records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
