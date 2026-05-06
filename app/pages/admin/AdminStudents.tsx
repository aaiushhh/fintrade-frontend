import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Home, Users, BookOpen, Video, FileQuestion, IndianRupee, Bot, TrendingUp, BarChart3, Settings, Search, Download, Eye, Mail, Plus, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import api from "../../services/api";

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

export default function AdminStudents() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    role: "faculty", // faculty or distributor
    email: "",
    full_name: "",
    password: "",
    region: "",
    referral_code: "",
    discount_percentage: 10
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (newUser.role === "faculty") {
        await api.post("/admin/users/create-faculty", {
          email: newUser.email,
          full_name: newUser.full_name,
          password: newUser.password
        });
      } else {
        await api.post("/admin/users/create-distributor", {
          email: newUser.email,
          full_name: newUser.full_name,
          password: newUser.password,
          region: newUser.region,
          referral_code: newUser.referral_code,
          discount_percentage: newUser.discount_percentage
        });
      }
      setShowAddModal(false);
      setNewUser({ role: "faculty", email: "", full_name: "", password: "", region: "", referral_code: "", discount_percentage: 10 });
      fetchUsers();
    } catch (err: any) {
      alert("Error creating user: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <DashboardLayout navItems={navItems} userRole="admin" userName="Admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B2A5B] mb-2">User Management</h1>
        <p className="text-[#0B2A5B]/70">View and manage all users across the platform</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-[#0B2A5B]/60 mb-1">Total Users</p>
          <p className="text-2xl font-bold text-[#0B2A5B]">{users.length}</p>
        </Card>
      </div>

      <Card className="p-6 bg-white shadow-lg mb-6">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B2A5B]/40" size={20} />
            <Input placeholder="Search users..." className="pl-10 bg-[#F4F1EA] border-[#0B2A5B]/20" />
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-[#E53935] text-white hover:bg-red-700">
            <Plus size={16} className="mr-2" />
            Add User
          </Button>
          <Button className="bg-[#0B2A5B] text-[#F4F1EA] hover:bg-[#1a3d7a]">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-white shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F4F1EA]">
                <TableHead className="text-[#0B2A5B]">User</TableHead>
                <TableHead className="text-[#0B2A5B]">Roles</TableHead>
                <TableHead className="text-[#0B2A5B]">Joined</TableHead>
                <TableHead className="text-[#0B2A5B]">Status</TableHead>
                <TableHead className="text-[#0B2A5B]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-[#0B2A5B]">{u.full_name}</p>
                      <p className="text-xs text-[#0B2A5B]/60">{u.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#0B2A5B]">
                    {u.roles.map((r: any) => (
                      <Badge key={r.id} className="mr-1 bg-blue-100 text-blue-700">{r.name}</Badge>
                    ))}
                  </TableCell>
                  <TableCell className="text-[#0B2A5B]">{new Date(u.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={u.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                      {u.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-[#0B2A5B]/20"><Eye size={14} /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 bg-white shadow-xl relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-black">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Role</label>
                <select 
                  className="w-full p-2 border rounded mt-1 bg-gray-50"
                  value={newUser.role} 
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="faculty">Faculty</option>
                  <option value="distributor">Distributor</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input required value={newUser.full_name} onChange={(e) => setNewUser({...newUser, full_name: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input required type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <Input required type="password" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
              </div>
              
              {newUser.role === "distributor" && (
                <>
                  <div>
                    <label className="text-sm font-medium">Region</label>
                    <Input required value={newUser.region} onChange={(e) => setNewUser({...newUser, region: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Referral Code</label>
                    <Input required value={newUser.referral_code} onChange={(e) => setNewUser({...newUser, referral_code: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Discount Percentage (%)</label>
                    <Input required type="number" min="0" max="100" value={newUser.discount_percentage} onChange={(e) => setNewUser({...newUser, discount_percentage: parseInt(e.target.value)})} />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full bg-[#E53935] text-white hover:bg-red-700">
                Create User
              </Button>
            </form>
          </Card>
        </div>
      )}

    </DashboardLayout>
  );
}
