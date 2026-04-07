import { useState, useEffect } from 'react';
import { 
  FileText, Users, Plus, Loader2, UserPlus
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { api } from '../services/api';
import { CreateCourseModal } from '../components/CreateCourseModal';
import { AdminCreateUserModal } from '../components/AdminCreateUserModal';

interface AdminStats {
  total_users: number;
  total_courses: number;
  total_enrollments: number;
  total_exams: number;
  total_lectures: number;
  total_distributors: number;
}

interface Course {
  id: number;
  title: string;
  price: number;
  difficulty_level: string;
  is_published: boolean;
}

interface UserItem {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
  roles: { id: number; name: string }[];
}

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [statsData, coursesData, usersData] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/courses'),
        api.get('/admin/users?limit=5'),
      ]);
      setStats(statsData);
      setCourses(coursesData);
      setUsers(usersData.users || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCourseCreated = () => {
    fetchData(); // Refresh the data
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#00D1B2] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 relative">
      <CreateCourseModal 
        isOpen={isCreateCourseOpen} 
        onClose={() => setIsCreateCourseOpen(false)} 
        onSuccess={handleCourseCreated} 
      />
      <AdminCreateUserModal
        isOpen={isCreateUserOpen}
        onClose={() => setIsCreateUserOpen(false)}
        onSuccess={fetchData}
      />
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#E5E7EB] mb-1">Admin Dashboard</h1>
              <p className="text-sm text-[#9CA3AF]">Platform overview and management</p>
            </div>
            <Button onClick={() => setIsCreateUserOpen(true)} className="bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90 h-9">
              <UserPlus className="h-4 w-4 mr-2" />
              Create User
            </Button>
          </div>

          {error && (
            <div className="mb-6 text-red-400 text-sm p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="text-sm text-[#9CA3AF] mb-2">Total Users</div>
              <div className="text-3xl font-bold text-[#E5E7EB] mb-1 font-mono">{stats?.total_users?.toLocaleString('en-IN') ?? '—'}</div>
              <div className="text-xs text-[#9CA3AF]">All registered</div>
            </div>

            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="text-sm text-[#9CA3AF] mb-2">Active Courses</div>
              <div className="text-3xl font-bold text-[#E5E7EB] mb-1 font-mono">{stats?.total_courses ?? '—'}</div>
              <div className="text-xs text-[#9CA3AF]">All programs</div>
            </div>

            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="text-sm text-[#9CA3AF] mb-2">Total Enrollments</div>
              <div className="text-3xl font-bold text-[#E5E7EB] mb-1 font-mono">{stats?.total_enrollments?.toLocaleString('en-IN') ?? '—'}</div>
              <div className="text-xs text-[#9CA3AF]">All time</div>
            </div>

            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="text-sm text-[#9CA3AF] mb-2">Scheduled Lectures</div>
              <div className="text-3xl font-bold text-[#00D1B2] mb-1 font-mono">{stats?.total_lectures ?? '—'}</div>
              <div className="text-xs text-[#9CA3AF]">Total</div>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#9CA3AF] mb-2">Total Exams</div>
                  <div className="text-2xl font-bold text-[#E5E7EB] font-mono">{stats?.total_exams ?? '—'}</div>
                </div>
                <FileText className="h-8 w-8 text-[#3B82F6]" />
              </div>
            </div>

            <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#9CA3AF] mb-2">Distributors</div>
                  <div className="text-2xl font-bold text-[#E5E7EB] font-mono">{stats?.total_distributors ?? '—'}</div>
                </div>
                <Users className="h-8 w-8 text-[#A855F7]" />
              </div>
            </div>
          </div>

          {/* Course Management Table */}
          <div className="bg-[#111827] border border-[#334155] rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#E5E7EB]">Course Management</h2>
              <Button 
                onClick={() => setIsCreateCourseOpen(true)}
                className="bg-[#00D1B2] text-[#0F172A] hover:bg-[#00D1B2]/90 h-9"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#334155]">
                    <th className="text-left text-xs text-[#9CA3AF] pb-3">Course Name</th>
                    <th className="text-right text-xs text-[#9CA3AF] pb-3">Price</th>
                    <th className="text-center text-xs text-[#9CA3AF] pb-3">Level</th>
                    <th className="text-center text-xs text-[#9CA3AF] pb-3">Status</th>
                    <th className="text-center text-xs text-[#9CA3AF] pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 ? (
                    <tr><td colSpan={5} className="py-8 text-center text-sm text-[#9CA3AF]">No courses found</td></tr>
                  ) : (
                    courses.map((course) => (
                      <tr key={course.id} className="border-b border-[#334155]">
                        <td className="py-4 text-sm text-[#E5E7EB]">{course.title}</td>
                        <td className="py-4 text-right text-sm font-mono text-[#E5E7EB]">₹{course.price.toLocaleString('en-IN')}</td>
                        <td className="py-4 text-center">
                          <span className="text-xs px-2 py-1 rounded-full bg-[#1F2937] text-[#9CA3AF] capitalize">{course.difficulty_level}</span>
                        </td>
                        <td className="py-4 text-center">
                          <span className={`text-xs px-2 py-1 rounded-full ${course.is_published ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                            {course.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <Button variant="outline" className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937] h-8 text-xs mr-2">
                            Edit
                          </Button>
                          <Button variant="outline" className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937] h-8 text-xs">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-[#111827] border border-[#334155] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#E5E7EB]">Recent Users</h2>
              <Button variant="outline" className="border-[#334155] bg-transparent text-[#E5E7EB] hover:bg-[#1F2937] h-9">
                View All
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#334155]">
                    <th className="text-left text-xs text-[#9CA3AF] pb-3">Name</th>
                    <th className="text-left text-xs text-[#9CA3AF] pb-3">Email</th>
                    <th className="text-left text-xs text-[#9CA3AF] pb-3">Role</th>
                    <th className="text-center text-xs text-[#9CA3AF] pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan={4} className="py-8 text-center text-sm text-[#9CA3AF]">No users found</td></tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id} className="border-b border-[#334155]">
                        <td className="py-4 text-sm text-[#E5E7EB]">{u.full_name || '—'}</td>
                        <td className="py-4 text-sm text-[#9CA3AF]">{u.email}</td>
                        <td className="py-4 text-sm text-[#9CA3AF] capitalize">
                          {u.roles?.length > 0 ? u.roles.map(r => r.name).join(', ') : '—'}
                        </td>
                        <td className="py-4 text-center">
                          <span className={`text-xs px-2 py-1 rounded-full ${u.is_active ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                            {u.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
    </div>
  );
}
